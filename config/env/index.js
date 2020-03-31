/* eslint-disable no-console */
'use strict';

/**
 * Module dependencies.
 */
import chalk from 'chalk';
import {
  ENV_DEVELOPMENT,
  ENV_INTEGRATION,
  ENV_STAGING,
  ENV_PRODUCTION,
} from './../const/const';

require('dotenv').config();

const path = require('path');
const __default = require('./default');
const development = require('./development');
const integration = require('./integration');
const staging = require('./staging');
const production = require('./production');

function envConfig(env) {
  switch (env) {
    case ENV_DEVELOPMENT:
      return development;
    case ENV_INTEGRATION:
      return integration;
    case ENV_STAGING:
      return staging;
    case ENV_PRODUCTION:
      return production;
    default:
      return production;
  }
}

function withDefault() {
  const env = process.env.NODE_ENV || ENV_DEVELOPMENT;
  __default.ENV = env;
  __default.ROOT_DIR = path.join(__dirname, '../../');
  console.log(
    chalk.green.bold(`
    Application Env is ${env} 🏜
    Served from ${__default.ROOT_DIR} 🚄
    `),
  );
  return Object.assign({}, envConfig(env), __default);
}

export default withDefault();
