/** Application */

const PORT = 3000;
const JWT_SCRECT = 'JB64!#$sv438KJDsrh!@$KJASB';
const JWT_TIMEOUT = 5000;

/** Database */

const MONGODB_URL = 'mongodb://localhost/node-bp';
const MONGODB_DEBUG = false;

/** Integrations */

// raven is morden tool to log errors/exceptions with help of mail and dashboard sentry.io
const RAVEN = {
  RAVEN_ID: 'https://472fb097833a470bab348e404c60de8f@sentry.io/5180553',
  ENABLE_RAVEN_ERROR_LOGGING: true,
};

//randommer for random data 
const RNADOMMER_API = 'a74d8ee4a2a34705a8ebc0acdaa911df';

/** PACKAGES */

// Superpower is related to logging and debug to explore each request and action
const ENABLE_SUPER_POWERS = true;

const MORGAN = {
  // morgan is for request logging in console
  ENABLE_MORGAN: true,
  ENABLE_MORGAN_FILE_LOG: true, // morgan log writing
};

const WINSTON = {
  WINSTON_REQUEST_LOGGING: true,
};

export default {
  PORT,
  JWT_SCRECT,
  JWT_TIMEOUT,
  MONGODB_URL,
  MONGODB_DEBUG,
  RAVEN,
  ENABLE_SUPER_POWERS,
  MORGAN,
  WINSTON
};
