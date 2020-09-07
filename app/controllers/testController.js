import APIError from './../services/error.js';
// import rp from 'request-promise';
import config from './../../config/env/index.js';
// import dotenv from 'dotenv';

export async function getTest(req, res, next) {
  try {
    // let apiCalls = [
    //   rp({
    //     method: 'GET',
    //     uri: 'https://randommer.io/api/Name',
    //     headers: {
    //       'x-api-key': config.RNADOMMER_API,
    //       'content-type': 'application/json; charset=utf-8'
    //     },
    //     json: true,
    //     qs: {
    //       nameType: 'fullname',
    //       quantity: '50',
    //     },
    //   }),
    //   rp({
    //     method: 'GET',
    //     uri: 'https://randommer.io/api/Number',
    //     headers: {
    //       'x-api-key': config.RNADOMMER_API,
    //       'content-type': 'application/json; charset=utf-8'
    //     },
    //     json: true,
    //     qs: {
    //       min: 1,
    //       max: 100000,
    //     },
    //   }),
    //   rp({
    //     method: 'GET',
    //     uri: 'https://randommer.io/api/Phone/Generate',
    //     headers: {
    //       'x-api-key': config.RNADOMMER_API,
    //       'content-type': 'application/json; charset=utf-8'
    //     },
    //     json: true,
    //     qs: {
    //       Quantity: '50',
    //       CountryCode: 'US',
    //     },
    //   }),
    //   rp({
    //     method: 'GET',
    //     uri: 'https://randommer.io/api/Text/Password',
    //     headers: {
    //       'x-api-key': config.RNADOMMER_API,
    //       'content-type': 'application/json; charset=utf-8'
    //     },
    //     json: true,
    //     qs: {
    //       length: 16,
    //       hasDigits: true,
    //       hasUppercase: true,
    //       hasSpecial: true,
    //     },
    //   }),
    // ];
    // Promise.all(apiCalls)
    //   .then((responses) => {
    //     apiResponse.successResponseWithData(res, '', {
    //       names: responses[0],
    //       random_number: responses[1],
    //       phone_numbers: responses[2],
    //       secure_password: responses[3],
    //     });
    //   });
    // console.log(dotenv.config());
    apiResponse.successResponseWithData(res, '', config);
  } catch (err) {
    apiResponse.ErrorResponse(res,`${err.message} >> ${err.statusCode}`);
  }
}

export async function postTest(req, res, next) {
  try {
    apiResponse.successResponseWithData(res, '', { a: 'anda' });
  } catch (err) {
    next(new APIError(null, apiResponse.API_STATUS.UNPROCESSABLE_ENTITY, true, err));
  }
}
