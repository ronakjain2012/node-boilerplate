import HTTPStatus from 'http-status';
import APIError from './../services/error.js';

export async function getTest(req, res, next) {
  try {
    apiResponse.successResponseWithData(res, '', { a: 'anda' });
  } catch (err) {
    next(new APIError('Exception....', HTTPStatus.NOT_FOUND, true));
  }
}

export async function postTest(req, res, next) {
  try {
    apiResponse.successResponseWithData(res, '', { a: 'anda' });
  } catch (err) {
    next(new APIError('Exception....', HTTPStatus.NOT_FOUND, true));
  }
}
