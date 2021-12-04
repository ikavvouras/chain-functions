const FunctionChain = require('./function-chain');

function simpleFunction(...middlewareFunctionChain) {
  return (req, res) => FunctionChain.fromFunctionArray(middlewareFunctionChain).call(req, res);
}

module.exports = simpleFunction
