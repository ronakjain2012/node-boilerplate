/**
 * Error handler for api routes
 */

import Raven from 'raven';
import PrettyError from 'pretty-error';
import HTTPStatus from 'http-status';

import config from './../../config/env/index.js';
import APIError, { RequiredError } from './error.js';

export default function logErrorService(err, req, res, next) {
  if (!err) {
    return new APIError(
      'Error with the server!',
      HTTPStatus.INTERNAL_SERVER_ERROR,
      true,
    );
  }

  if (config.RAVEN.ENABLE_RAVEN_ERROR_LOGGING) {
    Raven.config(config.RAVEN.RAVEN_ID, {
      release: `${config.APP.NAME}@${config.APP.RELESE_VERSION}`,
      environment: `${config.ENV}`,
      name: `${config.APP.NAME}`,
      sendTimeout: 5,
      sampleRate: 1,
    }).install();
    Raven.captureException(err);
  }

  if (config.RAVEN.ENABLE_RAVEN_ERROR_LOGGING) {
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

  res.status(err.status || HTTPStatus.INTERNAL_SERVER_ERROR).json(error);

  return next();
}
