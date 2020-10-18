'use strict';

const { setApiCache } = require('../app/middlewares/redisApiCache.js');
const config = require('../config/env/index.js');

const API_STATUS = {
  API_SUCCESS: 200,
  UNAUTHORIZED: 401, // login required
  BAD_REQUEST: 400, // Token Expired
  SERVER_ERROR: 500, // Server Issue
  UNPROCESSABLE_ENTITY: 422, // Validation Failed
  FORBIDDEN: 403, // User Is Blocked
  NOT_FOUND: 404,
};

exports.API_STATUS = API_STATUS;

function successResponse(res, msg) {
  const data = {
    status: 1,
    message: msg,
  };
  return res.status(API_STATUS.API_SUCCESS).json(data);
}
exports.successResponse = successResponse;

function successRawResponse(res, data) {
  return res.status(API_STATUS.API_SUCCESS).json(data);
}
exports.successRawResponse = successRawResponse;

function successResponseWithData(res, msg, data) {
  const resData = {
    status: 1,
    message: msg,
    data,
  };
  if (res.pagination) {
    resData['pagination'] = res.pagination;
    resData['pagination']['page'] = resData['pagination']['page'] + 1;
    resData['pagination']['orderAsc'] = resData['pagination']['orderAsc']===1?1:0;
    if (config.REDIS_API_CACHE) {
      setApiCache(res.cacheKey, resData);
    }
  } else {
    resData['pagination'] = false;
  }
  return res.status(API_STATUS.API_SUCCESS).json(resData);
}
exports.successResponseWithData = successResponseWithData;

function ErrorResponse(res, msg) {
  const data = {
    status: 0,
    message: msg,
  };
  return res.status(API_STATUS.UNPROCESSABLE_ENTITY).json(data);
}
exports.ErrorResponse = ErrorResponse;

function notFoundResponse(res, msg) {
  const data = {
    status: 0,
    message: msg,
  };
  return res.status(404).json(data);
}
exports.notFoundResponse = notFoundResponse;

function validationErrorWithData(res, msg, data) {
  const resData = {
    status: 0,
    message: msg,
    data,
  };
  return res.status(API_STATUS.UNPROCESSABLE_ENTITY).json(resData);
}
exports.validationErrorWithData = validationErrorWithData;

function unauthorizedResponse(res, msg) {
  const data = {
    status: 0,
    message: msg,
  };
  return res.status(API_STATUS.UNAUTHORIZED).json(data);
}
exports.unauthorizedResponse = unauthorizedResponse;

function expiredAuthResponse(res, msg) {
  const data = {
    status: 0,
    message: msg,
  };
  return res.status(API_STATUS.BAD_REQUEST).json(data);
}
exports.expiredAuthResponse = expiredAuthResponse;
