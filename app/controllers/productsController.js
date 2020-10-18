const APIError = require('../services/error.js');
const Product = require('../models/Product.js');

exports.index = async function index(req, res, next) {
  try {
    const product = await req.paginationProcess(Product.find());
    apiResponse.successResponseWithData(res, 'Product', product);
  } catch (err) {
    console.log(err);
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, true, err));
  }
};

exports.store = async function store(req, res, next) {
  try {
    const product = await Product.create(req.body);
    apiResponse.successResponseWithData(
      res,
      'Product created successfully.',
      product.toJSON(),
    );
  } catch (err) {
    console.log(err);
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, true, err));
  }
};

exports.show = async function show(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    apiResponse.successResponseWithData(res, 'Product', product.toJSON());
  } catch (err) {
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, true, err));
  }
};

exports.edit = async function edit(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    apiResponse.successResponseWithData(res, 'Product', product.toJSON());
  } catch (err) {
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, true, err));
  }
};

exports.update = async function update(req, res, next) {
  try {
    let product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body);
    product = await Product.findById(req.params.id);
    apiResponse.successResponseWithData(res, 'Product', product.toJSON());
  } catch (err) {
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, true, err));
  }
};

exports.destroy = async function destroy(req, res, next) {
  try {
    await Product.findOneAndDelete({ _id: req.params.id });
    apiResponse.successResponse(res, 'Product deleted.');
  } catch (err) {
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, true, err));
  }
};
