const winston = require('winston');
// require('express-async-errors');

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      colorize: true,
      prettyPrint: true,
      level: 'info',
    }),
    new winston.transports.File({
      filename: 'path/to/error.log',
      colorize: true,
      prettyPrint: true,
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'path/to/info.log',
      handleExceptions: true,
      colorize: true,
      prettyPrint: true,
      level: 'info',
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'path/to/exceptions.log' }),
  ],
});

module.exports = logger;
