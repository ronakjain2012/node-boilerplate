/**
 * Error handler for api routes
 */

import Raven from 'raven';
import PrettyError from 'pretty-error';
import config from './../../config/env/index.js';
import APIError, { RequiredError } from './error.js';

export default function logErrorService(err, req, res, next) {
  if (!err) {
    return new APIError(
      'Logging Issue!!',
      apiResponse.API_STATUS.UNPROCESSABLE_ENTITY,
      true,
    );
  }

  if (config.RAVEN_ENABLED) {
    Raven.config(config.RAVEN_ID, {
      release: `${config.APP.NAME}@${config.APP.RELESE_VERSION}`,
      environment: `${config.ENV}`,
      name: `${config.APP.NAME}`,
      sendTimeout: 5,
      sampleRate: 1,
    }).install();
    Raven.captureException(err);
    const pe = new PrettyError();
    pe.skipNodeFiles();
    pe.skipPackage('express');
    console.log(pe.render(err));
  }

  const error = {
    message: err.message || 'Internal Server Error.',
  };

  if (err.errors) {
    error.errors = {};
    const { errors } = err;
    if (Array.isArray(errors)) {
      error.errors = RequiredError.makePretty(errors);
    } else {
      Object.keys(errors).forEach((key) => {
        error.errors[key] = errors[key].message;
      });
    }
  }

  res.status(err.status || apiResponse.API_STATUS.UNPROCESSABLE_ENTITY).json(error);
  return next();
}
