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
} from './../const/const.js';

// require('dotenv').config();

import path from 'path';
import __default from './default.js';
import development from './development.js';
import integration from './integration.js';
import staging from './staging.js';
import production from './production.js';
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
	let configDefault = __default;
	configDefault.ENV = env;
	configDefault.ROOT_DIR = path.join(__dirname, '');
	console.log(
		chalk.green.bold(`
    Application Env is ${env} 🏜
    Served from ${configDefault.ROOT_DIR} 🚄
    `),
	);
	return Object.assign({}, envConfig(env), configDefault);
}

export default withDefault();
