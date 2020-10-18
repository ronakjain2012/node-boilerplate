const express = require('express');
const routes = express.Router();

routes.get('/', function (req, res) {
  res.render('index', {
    title: 'Node Boilerplate by ronakjain2012',
    message: 'Hello World!',
  });
});

module.exports = routes;
