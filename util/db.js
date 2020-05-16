const logger = require('./logger');
const mongoose = require('mongoose');
const config = require('config');
module.exports = () => {
  mongoose
    .connect(
      process.env.MONGO_URI ||
        config.get('db') ||
        'mongodb://localhost/nairaroll',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    )
    .then(() => logger.info('MongoDB connected'));
};
