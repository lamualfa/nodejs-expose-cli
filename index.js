const util = require('util');
const xtend = require('xtend');

function wrapHandler(handler) {
  return args => {
    try {
      const returned = handler(args);

      if (util.types.isPromise(returned)) {
        return returned;
      }

      return Promise.resolve(returned);
    } catch (err) {
      return Promise.reject(err);
    }
  };
}

module.exports = function expose(handlers, opts) {
  const defaultOpts = {
    printReturn: false,
    exitOnSuccess: true,
    exitOnError: true,
    customConsoleLog: console.log,
    customConsoleError: console.error
  };
  const parseOpts = xtend(defaultOpts, opts);

  const handlerName = process.argv[2];
  const handlerArgs = process.argv.slice(3);

  if (handlerName && util.isFunction(handlers[handlerName])) {
    wrapHandler(handlers[handlerName])(...handlerArgs)
      .then(res => {
        if (parseOpts.printReturn) {
          defaultOpts.customConsoleLog(res);
        }
        if (parseOpts.exitOnSuccess) process.exit(0);
      })
      .catch(err => {
        defaultOpts.customConsoleError(err);
        if (parseOpts.exitOnError) process.exit(1);
      });
  } else if (parseOpts.exitOnSuccess) {
    process.exit(0);
  }
};
