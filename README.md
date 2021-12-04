# chain-functions
[![npm version](https://img.shields.io/npm/v/chain-functions.svg?style=flat-square)](https://www.npmjs.org/package/chain-functions)

A lightweight builder for [Google Cloud Functions](https://cloud.google.com/functions) with middleware support.

```javascript
const { simpleFunction } = require('chain-functions');
const cors = require('cors');

exports.helloWorld = simpleFunction(cors(), (req, res) => {
  res.send('Hello World!');
});
```

## Installation
Add chain-functions to your `package.json` file using `npm`.

```
npm install chain-functions
```

## Usage
`simpleFunction` is useful for http related google cloud functions & firebase functions.

`simpleFunction` returns a function that can be used as a Cloud Function.
```javascript
(req, res) => {...}
```

#### Parameters 
It takes the following parameters:
1. the middleware functions; each middleware function should have the following structure:
   ```javascript
   (req, res, next) => next()
   ```
2. the function to be executed as parameters.
   ```javascript
   (req, res) => res.send('Hello World!')
   ```

All the functions are executed in chaining mode; as a result each middleware function should call the `next()` function.

#### Promise Support
Each middleware function can return a value or a Promise.

#### Use Express middlewares
Express middleware are also supported, since they follow the same middleware function signature.

### Example
```javascript
const { simpleFunction } = require('chain-functions');
const cors = require('cors');

function auth(req, res, next) {
  if (!authorizationHeader) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }
  return next();
}

function helloWorld(req, res) {
  res.send('Hello World!');
}

exports.helloWorld = simpleFunction(cors(), auth, helloWorld);
```

More examples can be found in [examples folder](examples).
