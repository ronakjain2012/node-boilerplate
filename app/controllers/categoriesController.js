import HTTPStatus from 'http-status';
import APIError from '../services/error.js';
import Category from '../models/Category.js';

export async function index(req, res, next) {
  try {
    const category = await req.paginationProcess(Category.find());
    apiResponse.successResponseWithData(res, 'Category', category);
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

export async function store(req, res, next) {
  try {
    const category = await Category.create(req.body);
    apiResponse.successResponseWithData(res, 'Category created successfully.', category.toJSON());
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

export async function show(req, res, next) {
  try {
    const category = await Category.findById(req.params.id);
    apiResponse.successResponseWithData(res, 'Category', category.toJSON());
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
    const category = await Category.findById(req.params.id);
    apiResponse.successResponseWithData(res, 'Category', category.toJSON());
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
    let category = await Category.findOneAndUpdate({_id:req.params.id},req.body);
    category = await Category.findById(req.params.id);
    apiResponse.successResponseWithData(res, 'Category', category.toJSON());
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
    await Category.findOneAndDelete({_id:req.params.id});
    apiResponse.successResponse(res, 'Category deleted.');
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
