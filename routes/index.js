const express = require('express');
const APIError = require('../app/services/error.js');
const logErrorService = require('../app/services/log.js');
const ApiRoutes = require('./api.js');

const routes = express.Router();

routes.use('/api', ApiRoutes);
routes.all('/api/*', (req, res, next) =>
  next(new APIError('Not Found!', apiResponse.API_STATUS.NOT_FOUND, true)),
);

routes.use(logErrorService);
module.exports = routes;