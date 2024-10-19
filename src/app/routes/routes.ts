import express from 'express';
import apiRoutes from './api.routes';
import docsRoute from './docs.routes';
import APIError from '../utils/APIError';
import httpStatus from 'http-status';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/api',
    route: apiRoutes,
  },
];

const devRoutes = [
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

devRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


// send back a 404 error for any unknown api request
router.use((req, res, next) => {
  next(new APIError(httpStatus.NOT_FOUND, 'Not found', true, ''));
});

export default router;
