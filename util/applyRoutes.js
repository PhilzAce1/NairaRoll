module.exports = (app) => {
  app.use('/api/user', require('../routes/users'));
};

module.exports.error = (app) => {
  app.use(require('./error').notFound);
  app.use(require('./error').default);
};
