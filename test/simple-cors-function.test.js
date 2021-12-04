const { exec } = require('child_process');
const { request } = require('axios');
const waitPort = require('wait-port');
const path = require('path');
const { expect } = require('chai')

const functionPath = path.resolve(__dirname, '../examples/simple-cors-function')
const PORT = 8888;
const BASE_URL = `http://localhost:${PORT}`;

describe('simple-cors-function', () => {

  before(async () => {
    this.ffProc = exec(
      `npx functions-framework --target=helloWorld --signature-type=http --port=${PORT} --source=${functionPath}`
    );
    await waitPort({ host: 'localhost', port: PORT });
  });

  after(() => this.ffProc.kill());

  it('should return hello world', async () => {
    const response = await request({
      url: `${BASE_URL}/helloWorld`,
      method: 'GET',
    });

    expect(response.status).to.equal(200);
    expect(response.headers).to.include({ 'access-control-allow-origin': '*' });
    expect(response.data).to.equal('Hello World!');
  });

  it('should return cors options', async () => {
    const response = await request({
      url: `${BASE_URL}/helloWorld`,
      method: 'OPTIONS',
    });

    expect(response.status).to.equal(204);
    expect(response.headers).to.include({
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET,HEAD,PUT,PATCH,POST,DELETE'
    });
    expect(response.data).to.be.empty;
  });
});
