import {setApiCache} from '../app/middlewares/redisApiCache.js';
import config from '../config/env/index.js';

export const API_STATUS = {
  API_SUCCESS: 200,
  UNAUTHORIZED: 401, // login required
  BAD_REQUEST: 400, // Token Expired
  SERVER_ERROR: 500, // Server Issue 
  UNPROCESSABLE_ENTITY: 422, // Validation Failed
  FORBIDDEN: 403, // User Is Blocked
  NOT_FOUND: 404
};

export function successResponse(res, msg) {
  const data = {
    status: 1,
    message: msg,
  };
  return res.status(API_STATUS.API_SUCCESS).json(data);
}

export function successRawResponse(res, data) {
  return res.status(API_STATUS.API_SUCCESS).json(data);
}

export function successResponseWithData(res, msg, data) {
  const resData = {
    status: 1,
    message: msg,
    data,
  };
  if(res.pagination){
    resData['pagination'] = res.pagination;
    resData['pagination']['page'] = resData['pagination']['page']+1;
    if(config.REDIS_API_CACHE)
      setApiCache(res.routePath, resData);
  } else {
    resData['pagination'] = false;
  }
  return res.status(API_STATUS.API_SUCCESS).json(resData);
}

export function ErrorResponse(res, msg) {
  const data = {
    status: 0,
    message: msg,
  };
  return res.status(API_STATUS.UNPROCESSABLE_ENTITY).json(data);
}

export function notFoundResponse(res, msg) {
  const data = {
    status: 0,
    message: msg,
  };
  return res.status(404).json(data);
}

export function validationErrorWithData(res, msg, data) {
  const resData = {
    status: 0,
    message: msg,
    data,
  };
  return res.status(API_STATUS.UNPROCESSABLE_ENTITY).json(resData);
}

export function unauthorizedResponse(res, msg) {
  const data = {
    status: 0,
    message: msg,
  };
  return res.status(API_STATUS.UNAUTHORIZED).json(data);
}

export function expiredAuthResponse(res, msg) {
  const data = {
    status: 0,
    message: msg,
  };
  return res.status(API_STATUS.BAD_REQUEST).json(data);
}