const User = require('../../models/User');
const request = require('supertest');
describe('/api/user routes', () => {
  let server;
  let user;
  let userData;
  let userLogin;
  let token;
  beforeEach(async () => {
    server = require('../../index');
    userData = {
      name: 'Akuagwu Phwilemon',
      username: 'someone',
      email: 'somone@gmail.com',
      password: 'something',
    };

    userLogin = {
      email: 'testing@gmail.com',
      password: '10000',
    };

    user = new User({
      name: 'testing1',
      email: 'testing1@gmail.com',
      username: 'test1',
      password: '12345',
    });
    await user.save();
  });
  afterEach(async () => {
    await User.deleteMany({});
    await server.close();
  });
  const exec = () => {
    return request(server).post('/api/user/register').send(userData);
  };

  beforeEach(() => {
    token = user.generateAuthToken();
    userData.name - 'Philmeon';
  });
  describe('/api/user/register', () => {
    it('should return a 400 error when an invalid param is passed', async () => {
      userData.name = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return a 400 error if a user already exist', async () => {
      userData.email = 'testing1';
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return a 200 status code and save when a valid param is passed ', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });
  });
  describe('/api/user/login', () => {
    const exec = () => {
      return request(server).post('/api/user/login').send(userLogin);
    };
    it('should return a 400 error when an invalid param is passed', async () => {
      userLogin.email = '';
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return a 404 error if the user is not found', async () => {
      const res = await exec();
      expect(res.status).toBe(404);
    });
    it('should return a 400 error if user input wrong password', async () => {
      userLogin.email = user.email;
      userLogin.password = user.password;
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it('should return a ruturn a success and status code 200 if login successful', async () => {
      let newUser = new User(userData);
      userLogin.email = newUser.email;
      userLogin.password = newUser.password;
      newUser = await newUser.save();
      const res = await exec();
      expect(res.status).toBe(200);
    });
  });
  describe('Update User Route', () => {
    const exec = () => {
      return request(server)
        .patch('/api/user/updateusername')
        .set('x-auth-token', token)
        .send({ username: 'aceee' });
    };

    it('should return a 200 status code if the user is updated ', async () => {
      userData = user;
      const res = await exec();
      expect(res.status).toBe(200);
    });
  });
});
