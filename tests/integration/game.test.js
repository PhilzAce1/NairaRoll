const User = require('../../models/User');
const request = require('supertest');
const Game = require('../../models/Game');
const mongoose = require('mongoose');
// _id: mongoose.Types.ObjectId().toHexString(),

describe('/api/game routes', () => {
  let server;
  let game;
  let id;
  let gameData;
  let token;
  let router;

  beforeEach(async () => {
    server = require('../../index');
    gameData = {
      user: [],
      pricetojoin: 100,
      ongoing: true,
      author: 'auaet',
    };

    game = new Game({
      user: [],
      pricetojoin: 100,
      ongoing: true,
    });
  });
  afterEach(async () => {
    await Game.deleteMany({});
    await server.close();
  });

  beforeEach(() => {
    token = user.generateAuthToken();
    id = game._id;
  });
  const get = () => {
    return request(server).get('/api/game/allcurrentgames/' + id);
  };
  const post = () => {
    return request(server)
      .post('/api/game/' + router)
      .set('x-auth-token', token)
      .send(gameData);
  };
  describe('allcurrentgames/?search', async () => {
    it('should return a 200 status code and result', async () => {
      const res = await get();
      expect(res.status).toBe(200);
    });
  });
  describe('createnew Game', async () => {
    router = 'createnewgame';
    it('should return a 400 error if a wrong param is passed', async () => {
      userData = {};
      const res = await post();
      expect(res.status).toBe(400);
    });
    it('should return a 200 status code if a game is created', async () => {
      const res = await post();
      const data = await Game.find();
      expect(res.status).toBe(200);
      //   expect(data)
      //   to do
      // res.body should have some propertirs
    });
  });
  describe('get game info', async () => {
    it('should return a 400 error if the a wrong id is passed', async () => {
      id = 'a';
      const res = await get();
      expect(res.status).toBe(400);
    });
    it('should return a 404 error if the game with the id is wrong', async () => {
      id = mongoose.Types.ObjectId();
      const res = await get();
      expect(res.status).toBe(404);
    });
    it('should return a 200 error if the a wrong id is passed', async () => {
      const res = await get();
      expect(res.status).toBe(200);
    });
  });
});
