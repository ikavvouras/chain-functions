const { simpleFunction } = require('../../index');
const cors = require('cors');

async function authorizationFilter(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }

  const token = authorizationHeader.split('Bearer ')[1];
  if (token !== 'my-token') {
    res.status(403).send({ error: 'Unauthorized' });
    return;
  }

  await next();
}

function helloWorldFunction(req, res) {
  res.send(`Hello ${(req.query.name || req.body.name || 'World')}!`);
}

exports.authFunction = simpleFunction(cors(), authorizationFilter, helloWorldFunction);
