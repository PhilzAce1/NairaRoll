const User = require('../../models/User');
const request = require('supertest');
let server;

describe('auth middleware', () => {
  beforeEach(() => {
    server = require('../../index');
  });
  afterEach(async () => {
    await User.deleteMany({});
    await server.close();
  });
  let token;
  const exec = () => {
    return request(server)
      .patch('/api/user/updateusername')
      .set('x-auth-token', token)
      .send({ username: 'genre1' });
  };
  beforeEach(() => {
    token = new User({ name: 'philemon' }).generateAuthToken();
  });
  it('should return a 401 error if no token is provided', async () => {
    token = '';
    const res = await exec();
    expect(res.status).toBe(401);
    // expect(token).toBe('');
  });
  it('should return 400 if token is invalid', async () => {
    token = 'a';
    const res = await exec();
    expect(res.status).toBe(400);
  });
  // it('should return 200 if a valid token is passed ', async () => {
  //   const res = await exec();
  //   console.log(res.text);
  //   expect(res.status).toBe(200);
  // });
});
