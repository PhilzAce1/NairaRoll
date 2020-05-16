const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

module.exports = (app) => {
  app.use(require('morgan')('tiny'));
  // app.use(require('helmet')());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(require('compression')());
  // app.use(require('cors')({ credentials: true, origin: true }));
};
