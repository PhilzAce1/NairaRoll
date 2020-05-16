const User = require('../../../models/User');
const auth = require('../../../middleware/auth');
const mongoose = require('mongoose');

describe('auth middleware', () => {
  it('should populate req.user with the payload of a valid JWt', () => {
    const user = {
      _id: mongoose.Types.ObjectId().toHexString(),
      role: 0,
    };
    const token = new User(user).generateAuthToken();
    const req = {
      header: jest.fn().mockReturnValue(token),
    };
    const res = {};
    const next = jest.fn();
    auth(req, res, next);
    expect(req.user).toMatchObject(user);
  });
});
