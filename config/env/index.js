/**
 * Module dependencies.
 */
import {
  ENV_DEVELOPMENT,
  ENV_INTEGRATION,
  ENV_STAGING,
  ENV_PRODUCTION,
} from './../const/const.js';
import dotenv from 'dotenv';
import path from 'path';
import __default from './default.js';
import development from './development.js';
import integration from './integration.js';
import staging from './staging.js';
import production from './production.js';
import fs from 'fs';
const __dirname = path.resolve();

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
  let configDefault = {};
  configDefault.ENV = env;
  configDefault.ROOT_DIR = path.join(__dirname, '');
  let fromEnv = dotenv.parse(fs.readFileSync('.env'));
  let settings = {
    ...__default, ...configDefault, ...envConfig(env)
  };
  for(var item in fromEnv){
    settings[item] = fromEnv[item];
  }
  return settings;
}

export default withDefault();
