import express from 'express';

const routes =  express.Router();

routes.get('/test', (req,res) => {
    res.status(200).send({data:500/5});
});

export default routes