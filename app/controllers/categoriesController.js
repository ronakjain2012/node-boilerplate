const APIError = require('../services/error.js');
const Category = require('../models/Category.js');

exports.index = async function index(req, res, next) {
  try {
    const category = await req.paginationProcess(Category.find());
    apiResponse.successResponseWithData(res, 'Category', category);
  } catch (err) {
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, true, err));
  }
};

exports.store = async function store(req, res, next) {
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
};

exports.show = async function show(req, res, next) {
  try {
    const category = await Category.findById(req.params.id);
    apiResponse.successResponseWithData(res, 'Category', category.toJSON());
  } catch (err) {
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, true, err));
  }
};

exports.edit = async function edit(req, res, next) {
  try {
    const category = await Category.findById(req.params.id);
    apiResponse.successResponseWithData(res, 'Category', category.toJSON());
  } catch (err) {
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, true, err));
  }
};

exports.update = async function update(req, res, next) {
  try {
    let category = await Category.findById(req.params.id);
    for (var field in req.body) {
      category[field] = req.body[field];
    }
    await category.save();
    category = await Category.findById(req.params.id);
    apiResponse.successResponseWithData(res, 'Category', category.toJSON());
  } catch (err) {
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, true, err));
  }
};

exports.destroy = async function destroy(req, res, next) {
  try {
    await Category.findOneAndDelete({ _id: req.params.id });
    apiResponse.successResponse(res, 'Category deleted.');
  } catch (err) {
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, true, err));
  }
};
