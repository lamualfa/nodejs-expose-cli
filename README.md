# Simple Way To Run Your Local Function From CLI

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
const exposeCli = require('expose-cli');

async function asyncPrint(arg1) {
  return `hello from asyncPrint: ${arg1}`;
}

function print(arg1) {
  return `hello from print: ${arg1}`;
}

function promisePrint() {
  return Promise.reject('hello from promise');
}

exposeCli(
  {
    asyncPrint,
    promisePrint,
    print
  },
  {
    printReturn: true
  }
);
```

**Execute**

`node index.js print world`

**Output**

`hello world from print: world`

## Calling Format

`exposeCli(handlers, [config])`

### `config`

```javascript
{
  // Print returned value from function called
  "printReturn": false, // default

  // Trigger process.exit() when finished
  "exitOnSuccess": true, // default

  // Trigger process.exit(1) when error
  "exitOnError": true, // default

  // cutom log handler
  "customConsoleLog": console.log, // default
  "customConsoleError": console.error // default
}
```

## Support

- Can be used using [webpack](https://github.com/webpack/webpack)
- Supports calling `async` function or function that return `Promise` or closures
- Supports function that `throw` error

## Change Log

### **1.0.1**

- Fixed Bug
- Adding `exitOnSuccess` and `exitOnError` options
