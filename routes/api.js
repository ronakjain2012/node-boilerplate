import express from 'express';
import * as testController from './../app/controllers/testController.js';
import * as userController from './../app/controllers/userController.js';
import * as categoriesController from './../app/controllers/categoriesController.js';
import * as productsController from './../app/controllers/productsController.js';
import auth from '../app/middlewares/auth.js';
import pagination from '../app/middlewares/pagination.js';
const routes = express.Router();

routes.route('/test').get(testController.getTest).post(testController.postTest);

routes.post('/users/register', userController.register);
routes.post('/users/login', userController.login);

routes.get('/users',auth,pagination,userController.index);
routes.get('/categories',pagination,categoriesController.index);
routes.post('/categories/store',auth,categoriesController.store);
routes.get('/categories/show/:id',auth,categoriesController.show);
routes.get('/categories/edit/:id',auth,categoriesController.edit);
routes.post('/categories/update/:id',auth,categoriesController.update);
routes.get('/categories/remove/:id',auth,categoriesController.destroy);

routes.get('/products',pagination,productsController.index);
routes.post('/products/store',auth,productsController.store);
routes.get('/products/show/:id',auth,productsController.show);
routes.get('/products/edit/:id',auth,productsController.edit);
routes.post('/products/update/:id',auth,productsController.update);
routes.get('/products/remove/:id',auth,productsController.destroy);


export default routes;
