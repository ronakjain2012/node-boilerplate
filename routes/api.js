import { Router } from 'express';

const routes = new Router();

routes.get('/test', (req,res) => {
    res.status(503).send({data:500/5});
});

export default routes