const User = require('../../../models/User');
const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const payload = {
  _id: new mongoose.Types.ObjectId().toHexString(),
  role: 1,
};
describe('user.generateAuthToken ', () => {
  it('should generate a valid JWT', () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      role: 1,
    };
    const user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    expect(decoded).toMatchObject(payload);
  });
});
