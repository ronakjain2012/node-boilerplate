import express from 'express';
import * as testController from './../app/controllers/testController.js';

const routes = express.Router();

routes
  .route('/test')
  .get(testController.getTest)
  .post(testController.postTest);

export default routes;