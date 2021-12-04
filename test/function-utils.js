const { spawn } = require('child_process');
const waitPort = require('wait-port');

async function start(target, functionPath, port) {
  const proc = spawn(
    'npx', ['functions-framework', `--target=${target}`, '--signature-type=http', `--port=${port}`, `--source=${functionPath}`]
  );
  await waitPort({ host: 'localhost', port: port });
  return proc;
}

function kill(proc) {
  return new Promise(resolve => {
    proc.kill('SIGKILL');
    proc.on('exit', () => resolve());
  });
}

module.exports = {
  start,
  kill,
};
