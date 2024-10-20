import express from 'express';
import apiRoutes from './api.routes';
import docsRoute from './docs.routes';
import APIError from '../utils/APIError';
import httpStatus from 'http-status';
import { UUIDV1 } from 'sequelize';
import { getRandomID } from '@/helper';

const router = express.Router();

router.use((req, res, next) => {
  req.id = getRandomID();
  console.log('Request: ', req.method, req.url, req.id);
  next();
});

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

for (let i = 0; i < defaultRoutes.length; i++) {
  router.use(defaultRoutes[i]['path'], defaultRoutes[i]['route']);
}

for (let i = 0; i < devRoutes.length; i++) {
  router.use(devRoutes[i]['path'], devRoutes[i]['route']);
}

// send back a 404 error for any unknown request and error handler middleware will handle it
router.use((req, res, next) => {
  next(
    new APIError(httpStatus.NOT_FOUND, 'Not found', new Error('Not found'), true, {
      requestId: req.id,
      requestUrl: req.url,
      requestMethod: req.method,
      requestBody: req.body,
      requestQuery: req.query,
    }),
  );
});

export default router;
