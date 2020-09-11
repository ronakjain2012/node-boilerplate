/**
 * Module dependencies.
 */
const {
  ENV_DEVELOPMENT,
  ENV_INTEGRATION,
  ENV_STAGING,
  ENV_PRODUCTION,
} = require('./../const/const.js');
const dotenv = require('dotenv');
const path = require('path');
const __default = require('./default.js');
const development = require('./development.js');
const integration = require('./integration.js');
const staging = require('./staging.js');
const production = require('./production.js');
const fs = require('fs');
const _dirname = path.resolve();

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
      console.warn(`\nEnv is not set, check env settings.`);
      return production;
  }
}

function withDefault() {
  const env = process.env.NODE_ENV || ENV_DEVELOPMENT;
  let configDefault = {};
  configDefault.ENV = env;
  configDefault.ROOT_DIR = path.join(_dirname, '');
  let fromEnv = dotenv.parse(fs.readFileSync('.env'));
  let settings = {
    ...__default, ...configDefault, ...envConfig(env)
  };
  for(var item in fromEnv){
    settings[item] = fromEnv[item];
  }
  return settings;
}

module.exports = withDefault();