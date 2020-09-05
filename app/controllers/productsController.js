import HTTPStatus from 'http-status';
import APIError from '../services/error.js';
import Product from '../models/Product.js';

export async function index(req, res, next) {
  try {
    const product = await req.paginationProcess(Product.find());
    apiResponse.successResponseWithData(res, 'Product', product);
  } catch (err) {
    console.log(err);
    next(
      new APIError(
        'Opps! Somting went wrong',
        HTTPStatus.INTERNAL_SERVER_ERROR,
        true,
      ),
    );
  }
}

export async function store(req, res, next) {
  try {
    const product = await Product.create(req.body);
    apiResponse.successResponseWithData(res, 'Product created successfully.', product.toJSON());
  } catch (err) {
    console.log(err);
    next(
      new APIError(
        'Opps! Somting went wrong',
        HTTPStatus.INTERNAL_SERVER_ERROR,
        true,
      ),
    );
  }
}

export async function show(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    apiResponse.successResponseWithData(res, 'Product', product.toJSON());
  } catch (err) {
    next(
      new APIError(
        'Opps! Somting went wrong',
        HTTPStatus.INTERNAL_SERVER_ERROR,
        true,
      ),
    );
  }
}

export async function edit(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    apiResponse.successResponseWithData(res, 'Product', product.toJSON());
  } catch (err) {
    next(
      new APIError(
        'Opps! Somting went wrong',
        HTTPStatus.INTERNAL_SERVER_ERROR,
        true,
      ),
    );
  }
}


export async function update(req, res, next) {
  try {
    let product = await Product.findOneAndUpdate({_id:req.params.id},req.body);
    product = await Product.findById(req.params.id);
    apiResponse.successResponseWithData(res, 'Product', product.toJSON());
  } catch (err) {
    next(
      new APIError(
        'Opps! Somting went wrong',
        HTTPStatus.INTERNAL_SERVER_ERROR,
        true,
      ),
    );
  }
}

export async function destroy(req, res, next) {
  try {
    await Product.findOneAndDelete({_id:req.params.id});
    apiResponse.successResponse(res, 'Product deleted.');
  } catch (err) {
    next(
      new APIError(
        'Opps! Somting went wrong',
        HTTPStatus.INTERNAL_SERVER_ERROR,
        true,
      ),
    );
  }
}
