const app = require('express')();
const logger = require('./util/logger');
const routes = require('./routes');
const { connectDB, applyMiddleware, applyRoutes } = require('./util');
applyMiddleware(app);
connectDB();
applyRoutes(app);
applyRoutes.error(app);
const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  logger.info(`Server running on port ${port} 🔥`)
);

module.exports = server;
