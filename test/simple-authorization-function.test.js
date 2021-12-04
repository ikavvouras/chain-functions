const { exec } = require('child_process');
const { request } = require('axios');
const waitPort = require('wait-port');
const path = require('path');
const { expect } = require('chai');

const functionPath = path.resolve(__dirname, '../examples/simple-authorization-function');
const PORT = 8888;
const BASE_URL = `http://localhost:${PORT}`;

describe('simple-authorization-function', () => {

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
      headers: {
        'Authorization': 'Bearer my-token'
      },
      method: 'GET',
    });

    expect(response.status).to.equal(200);
    expect(response.headers).to.include({ 'access-control-allow-origin': '*' });
    expect(response.data).to.equal('Hello World!');
  });

  it('should return 401 if authorization header is missing', async () => {
    try {
      await request({
        url: `${BASE_URL}/helloWorld`,
        method: 'GET'
      });
    } catch (e) {
      expect(e.response.status).to.equal(401);
    }
  });
});
