const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
exports.login = async (req, res, next) => {
  // validate user input
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ success: false, payload: errors.array() });

  // check if the user exist
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(404)
      .json({ success: false, payload: 'user does not exist' });

  // confirm password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json({ success: false, payload: 'wrong password' });

  // generate token
  const token = user.generateAuthToken();
  // send token
  res.header('x-auth-token', token).status(200).json({
    success: true,
    payload: {
      token,
      user,
    },
  });
};
exports.register = async (req, res, next) => {
  // validate user input
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({
      success: false,
      payload: errors.array(),
    });

  // check if user already exist
  const { name, email, username, password } = req.body;
  const userExist = await User.findOne({ $or: [{ email }, { username }] });
  if (userExist)
    return res.status(400).json({
      success: false,
      payload: 'user already exist Please choose another email or username',
    });
  // create user
  const newUser = await new User({
    name,
    email,
    username,
    password,
  });
  await newUser.save();
  // send payload of the user  that has been created
  const token = newUser.generateAuthToken();
  res.header('x-auth-token', token).status(200).json({
    success: true,
    payload: newUser,
  });
};
exports.updateusername = async (req, res, next) => {
  // return res.send(req.user);
  const { _id } = req.user;
  // check for user
  const user = await User.findOne({ _id });
  if (!user)
    return res.status(400).json({
      success: false,
      payload: 'user does not exist',
    });
  user.username = req.body.username;
  await user.save();
  res.status(200).json({
    success: true,
    payload: 'username update successful',
    update: user.username,
  });
};
exports.getUserDetails = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId))
    return res.status(404).json({
      success: false,
      payload: 'Invalid ID.',
    });
  const users = await User.find().select({ name: 1, username: 1, email: 1 });
  res.status(200).json({
    success: true,
    payload: users,
  });
};
