import express from 'express';

const routes = express.Router();

routes.get('/', function (req, res) {
    res.render('index', {
        title: 'Node Boilerplate by ronakjain2012',
        message: 'Hello World!'
    });
});

export default routes;