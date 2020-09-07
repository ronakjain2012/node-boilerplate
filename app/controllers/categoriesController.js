import APIError from '../services/error.js';
import Category from '../models/Category.js';

export async function index(req, res, next) {
  try {
    const category = await req.paginationProcess(Category.find());
    apiResponse.successResponseWithData(res, 'Category', category);
  } catch (err) {
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, true, err));
  }
}

export async function store(req, res, next) {
  try {
    const category = await Category.create(req.body);
    apiResponse.successResponseWithData(
      res,
      'Category created successfully.',
      category.toJSON(),
    );
  } catch (err) {
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, true, err));
  }
}

export async function show(req, res, next) {
  try {
    const category = await Category.findById(req.params.id);
    apiResponse.successResponseWithData(res, 'Category', category.toJSON());
  } catch (err) {
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, true, err));
  }
}

export async function edit(req, res, next) {
  try {
    const category = await Category.findById(req.params.id);
    apiResponse.successResponseWithData(res, 'Category', category.toJSON());
  } catch (err) {
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, true, err));
  }
}

export async function update(req, res, next) {
  try {
    let category = await Category.findById(req.params.id);
    for(var field in req.body) {
      category[field] = req.body[field];
    }
    await category.save();
    category = await Category.findById(req.params.id);
    apiResponse.successResponseWithData(res, 'Category', category.toJSON());
  } catch (err) {
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, true, err));
  }
}

export async function destroy(req, res, next) {
  try {
    await Category.findOneAndDelete({ _id: req.params.id });
    apiResponse.successResponse(res, 'Category deleted.');
  } catch (err) {
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, true, err));
  }
}
