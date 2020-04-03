import express from 'express';

const routes = express.Router();

routes
  .route('/test')
  .get((req,res) => {
    res.send([65,56,56,56,56,56]);
  })
  .post((req,res) => {
    res.send([65,56,56,56,56,56]);
  });

export default routes;
