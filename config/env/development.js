/* Application */
const PORT = 3000;
const JWT_SCRECT = 'JB64!#$sv438KJDsrh!@$KJASB';
const JWT_TIMEOUT = 5000;

/* Database */
const MONGODB_URL = 'mongodb://localhost/node-bp';
const MONGODB_DEBUG = false;

/* Integrations */
const RAVEN_ID = 'https://472fb097833a470bab348e404c60de8f@sentry.io/5180553';

export { PORT, JWT_SCRECT, JWT_TIMEOUT, MONGODB_URL, MONGODB_DEBUG, RAVEN_ID };
