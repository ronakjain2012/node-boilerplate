const express = require('express');
const testController = require('./../app/controllers/testController.js');
// const userController = require('./../app/controllers/userController.js');
// const categoriesController = require('./../app/controllers/categoriesController.js');
// const productsController = require('./../app/controllers/productsController.js');
// const auth = require('../app/middlewares/auth.js');
// const pagination = require('../app/middlewares/pagination.js');
// const getApiCache = require('../app/middlewares/redisApiCache.js');
const routes = express.Router();

routes.route('/test').get(testController.getTest).post(testController.postTest);

// routes.post('/users/register', userController.register);
// routes.post('/users/login', userController.login);

// routes.get('/users', auth, pagination, userController.index);
// routes.get('/categories', pagination, getApiCache, categoriesController.index);
// routes.post('/categories/store', auth, categoriesController.store);
// routes.get('/categories/show/:id', auth, categoriesController.show);
// routes.get('/categories/edit/:id', auth, categoriesController.edit);
// routes.post('/categories/update/:id', auth, categoriesController.update);
// routes.get('/categories/remove/:id', auth, categoriesController.destroy);

// routes.get('/products', pagination, getApiCache, productsController.index);
// routes.post('/products/store', auth, productsController.store);
// routes.get('/products/show/:id', auth, productsController.show);
// routes.get('/products/edit/:id', auth, productsController.edit);
// routes.post('/products/update/:id', auth, productsController.update);
// routes.get('/products/remove/:id', auth, productsController.destroy);

module.exports = routes;
