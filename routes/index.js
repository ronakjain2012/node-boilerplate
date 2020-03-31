import express from 'express';
import HTTPStatus from 'http-status';
import APIError from '../app/services/error.js';
import logErrorService from '../app/services/log.js';
import ApiRoutes from './api.js'
import WebRoutes from './web.js'

const routes = express.Router();

routes.use('/',WebRoutes)
routes.use('/api',ApiRoutes)

routes.all('*', (req, res, next) =>
  next(new APIError('Not Found!', HTTPStatus.NOT_FOUND, true)),
);

routes.use(logErrorService);
export default routes;
