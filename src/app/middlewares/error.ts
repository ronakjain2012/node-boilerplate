import httpStatus from 'http-status';
import config from '../../config/index';
import APIError from '../utils/APIError';
import logger from '../services/logger';
import { basicAppInfoByRequest } from '@/helper';

export const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof APIError)) {
    // const statusCode =
    //   error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new APIError(statusCode, message, false, err.stack,basicAppInfoByRequest(req));
  }
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.env === 'production' && !err.isPublic) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  if (config.env === 'development') {
    logger.error('@errorHandler', err);
  }
  res.status(statusCode).send(response).end();
};
