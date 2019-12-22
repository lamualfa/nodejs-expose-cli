const chalk = require('chalk');
const util = require('util');
const xtend = require('xtend');

function wrapHandler(handler) {
  return (...args) => {
    try {
      const returned = handler(...args);

      if (util.types.isPromise(returned)) {
        return returned;
      }

      return Promise.resolve(returned);
    } catch (err) {
      return Promise.reject(err);
    }
  };
}

function defaultHelpHandler(infoHandlers) {
  for (const handlerName in infoHandlers) {
    if (infoHandlers.hasOwnProperty(handlerName)) {
      const parsedInfoHandler = infoHandlers[handlerName];
      const handlerInfo = parsedInfoHandler.handler
        .toString()
        .match(
          /^((async)?\s*)?function\s*([\w$]*)\s*\(([\w\s,$]*)\)\s*\{([\w\W\s\S]*)\}$/
        );

      let functionName;
      let functionArgs;

      if (!handlerInfo) {
        functionName = '<unreachable>';
        functionArgs = '<unreachable>';
      } else {
        functionName = handlerInfo[3];
        functionArgs = handlerInfo[4];
      }

      if (parsedInfoHandler.name) {
        functionName = parsedInfoHandler.name;
      }

      if (parsedInfoHandler.args) {
        functionArgs = parsedInfoHandler.join(', ');
      }

      console.log(
        '-',
        chalk.bold.white(handlerName),
        ':',
        `${chalk.bold.cyan(functionName)}${chalk.bold.yellow(
          '('
        )}${chalk.bold.red(functionArgs)}${chalk.bold.yellow(')')}`,
        '-',
        parsedInfoHandler.description
          ? parsedInfoHandler.description
          : 'No Description',
        '\n'
      );
    }
  }

  return '';
}

const defaultOpts = {
  printReturn: false,
  exitOnSuccess: true,
  exitOnError: true,
  customConsoleLog: console.log,
  customConsoleError: console.error,
  customHelpName: 'help',
  customHelp: {
    handler: defaultHelpHandler,
    name: 'help',
    args: '',
    description: 'Show all the functions listed.'
  }
};

module.exports = function expose(infoHandlers, opts) {
  const parsedOpts = xtend(defaultOpts, opts);

  const targetHandlerName = process.argv[2];
  const handlerArgs = process.argv.slice(3);

  if (targetHandlerName) {
    let parsedInfoHandlers = {
      ...infoHandlers
    };
    let handler;

    if (!parsedInfoHandlers.hasOwnProperty(parsedOpts.customHelpHandlerName)) {
      parsedInfoHandlers[parsedOpts.customHelpName] = {
        ...parsedOpts.customHelp,
        handler: parsedOpts.customHelp.handler.bind(null, parsedInfoHandlers)
      };
    }

    for (const handlerName in parsedInfoHandlers) {
      if (parsedInfoHandlers.hasOwnProperty(handlerName)) {
        const infoHandler = parsedInfoHandlers[handlerName];

        if (util.isFunction(infoHandler)) {
          parsedInfoHandlers[handlerName] = {
            handler: infoHandler
          };

          if (targetHandlerName === handlerName) {
            handler = infoHandler;
          }
        } else if (infoHandler && typeof infoHandler === 'object') {
          if (typeof infoHandler.handler === 'function') {
            parsedInfoHandlers[handlerName] = infoHandler;

            if (targetHandlerName === handlerName) {
              handler = infoHandler.handler;
            }
          }
        } else {
          delete parsedInfoHandlers[handlerName];
        }
      }
    }

    if (handler) {
      wrapHandler(handler)(...handlerArgs)
        .then(res => {
          if (parsedOpts.printReturn) {
            defaultOpts.customConsoleLog(res);
          }
          if (parsedOpts.exitOnSuccess) process.exit(0);
        })
        .catch(err => {
          defaultOpts.customConsoleError(err);
          if (parsedOpts.exitOnError) process.exit(1);
        });
    }
  } else if (parsedOpts.exitOnSuccess) {
    process.exit(0);
  }
};
