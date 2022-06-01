const APIError = require('./../services/error.js');
// const rp = 'request-promise';
const config = require('./../../config/env/index.js');
// const dotenv = 'dotenv';
module.exports = {
  getTest: async function(req, res) {
    try {
      apiResponse.successResponseWithData(res, '', config);
    } catch (err) {
      apiResponse.ErrorResponse(res,`${err.message} >> ${err.statusCode}`);
    }
  },
  postTest: async function (req, res, next) {
    try {
      apiResponse.successResponseWithData(res, '', { a: 'anda' });
    } catch (err) {
      next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, true, err));
    }
  }
};