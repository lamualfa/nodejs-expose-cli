<a href="https://imgbb.com/"><img src="https://i.ibb.co/cctCBkx/coding.png" alt="coding" border="0"></a> 

# expose-cli

## Simple Way To Run Your Local Function From CLI

`node index.js localFunction arg1 arg2 arg3`

## Installation

```bash
# NPM
npm i expose-cli

# Yarn
yarn add expose-cli
```

## Example Usage

`index.js`

```javascript
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

```

**Execute**

`node index.js printSyncWithArg world`

**Output**

`Printed from printSyncWithArg: world`

**Execute command `help`**

`node index.js printSyncWithArg world`

**Output**
<a href="https://imgbb.com/"><img src="https://i.ibb.co/DKtHMRm/Screenshot-from-2019-12-22-17-10-58.png" alt="Screenshot-from-2019-12-22-17-10-58" border="0"></a>

## Calling Format

`exposeCli(handlers, [config])`

### `handlers`

Object format:

`name: handler`

- name: `string`
- handler:
  - `function`
  - `object`
    - `name`: `string`
    - `args`: `array`
    - `description`: `string`

### `config`

```javascript
{
  // Print returned value from function called
  printReturn: false, // default

  // Trigger process.exit() when finished
  exitOnSuccess: true, // default

  // Trigger process.exit(1) when error
  exitOnError: true, // default

  // cutom log handler
  customConsoleLog: console.log, // default
  customConsoleError: console.error, // default

  // custom command `help` name
  customHelpName: 'help',  // default

  // custom additional command `help` options
  customHelp: {
    handler: defaultHelpHandler,
    name: 'help',
    args: '',
    description: 'Show all the functions listed.'
  }  // default
}
```

## Support

- Can be used using [webpack](https://github.com/webpack/webpack)
- Supports calling `async` function or function that return `Promise` or closures
- Supports function that `throw` an error

## Change Log

### v0.0.2

- Fixed bugs
- Added default handler for `help`
- Support `object` format for `handlers` arguments
