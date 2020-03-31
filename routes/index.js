import { Router } from 'express';
import HTTPStatus from 'http-status';
import APIError from '../app/services/error';
import logErrorService from '../app/services/log';
import ApiRoutes from './api'
import WebRoutes from './web'

const routes = new Router();

routes.use('/',WebRoutes)
routes.use('/api',ApiRoutes)

routes.all('*', (req, res, next) =>
  next(new APIError('Not Found!', HTTPStatus.NOT_FOUND, true)),
);

routes.use(logErrorService);
export default routes;
