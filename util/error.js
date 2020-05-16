const logger = require('./logger');
exports.notFound = (req, res, next) => {
  const error = new Error('page not found');
  error.status = 404;
  next(error);
};

exports.default = (error, req, res, next) => {
  res.status(error.status || 500);
  const info = {
    success: false,
    msg: error.message,
  };
  res.json(info);
  logger.error(info, error);
};
