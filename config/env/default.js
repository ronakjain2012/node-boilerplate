/** Application */

const PORT = 3000;
const JWT_SECRET = 'JB64!#$sv438KJDsrh!@$KJASB';
const JWT_TIMEOUT = 5000;
const APP = {
  NAME: 'shopie',
  RELESE_VERSION: '0.0.1',
  LOGO: '',
  DEFAULT_LANGUAGE: 'EN',
  COPYRIGHT: 'shopie © 2020-2021', 
};

/** Database */

const MONGODB_URL = 'mongodb+srv://loppy:loppy_qw12@node-vue-shop.om6wd.gcp.mongodb.net/shopie?retryWrites=true&w=majority';
const MONGODB_DEBUG = false;

/** Integrations */

// raven is morden tool to log errors/exceptions with help of mail and dashboard sentry.io
const RAVEN = {
  RAVEN_ID: '',
  ENABLE_RAVEN_ERROR_LOGGING: false,
};

//randommer for random data 
const RNADOMMER_API = '';

/** PACKAGES */

// Superpower is related to logging and debug to explore each request and action
const ENABLE_SUPER_POWERS = false;

const MORGAN = {
  // morgan is for request logging in console
  ENABLE_MORGAN: false,
  ENABLE_MORGAN_FILE_LOG: false, // morgan log writing
};

const WINSTON = {
  WINSTON_REQUEST_LOGGING: false,
};

export default {
  PORT,
  JWT_SECRET,
  JWT_TIMEOUT,
  MONGODB_URL,
  MONGODB_DEBUG,
  RAVEN,
  ENABLE_SUPER_POWERS,
  MORGAN,
  WINSTON,
  RNADOMMER_API,
  APP
};
