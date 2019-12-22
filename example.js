const exposeCli = require('./index');

function printSync() {
  console.log('Printed from `printSync`');
}

async function printAsync() {
  console.log('Printed from `printAsync`');
}

function printPromise() {
  return new Promise(resolve => {
    console.log('Printed from `printPromise`');
    resolve();
  });
}

const printClosure = () => {
  console.log('Printed from `printClosure`');
};

function printSyncWithArg(arg1) {
  console.log(`Printed from \`printSyncWithArg\` with arg1: ${arg1}`);
}

async function printAsyncWithArg(arg1) {
  console.log(`Printed from \`printAsyncWithArg\` with arg1: ${arg1}`);
}

function printSyncWithRestArgs(...args) {
  console.log(
    `Printed from \`printSyncWithRestArgs\` with args: ${args.join(', ')}`
  );
}

async function printAsyncWithRestArgs(...args) {
  console.log(
    `Printed from \`printAsyncWithRestArgs\` with args: ${args.join(', ')}`
  );
}

function returnSync() {
  return 'Returned from `returnSync`';
}

async function returnAsync() {
  return 'Returned from `returnAsync`';
}

function returnPromise() {
  return new Promise(resolve => resolve('Returned from `returnPromise`'));
}

exposeCli(
  {
    printSync,
    printAsync,
    printPromise,
    printClosure,
    printSyncWithArg,
    printAsyncWithArg,
    printSyncWithRestArgs,
    printAsyncWithRestArgs,
    returnSync,
    returnAsync,
    returnPromise
  },
  {
    printReturn: true
  }
);
