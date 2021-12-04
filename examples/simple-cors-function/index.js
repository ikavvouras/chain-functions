const { simpleFunction } = require('../../index');
const cors = require('cors');

function helloWorldFunction(req, res) {
  res.send(`Hello ${(req.query.name || req.body.name || 'World')}!`);
}

exports.corsFunction = simpleFunction(cors(), helloWorldFunction);
