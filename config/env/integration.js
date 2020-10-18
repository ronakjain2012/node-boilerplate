module.exports = {
  /** Application */  
  APP: {
    NAME: 'shopie',
    RELESE_VERSION: '0.0.1',
    LOGO: '',
    DEFAULT_LANGUAGE: 'EN',
    COPYRIGHT: 'shopie © 2020-2021', 
  },
  ENABLE_SUPER_POWERS : true,
  PORT : 3000,
  JWT_SECRET : 'JB64!#$sv438KJDsrh!@$KJASB',
  JWT_TIMEOUT : 5000,
  /** Redis API Response Caching */
  REDIS_API_CACHE: true,
  /** Database */
  DB_DRIVER : 'mongodb',
  DB_MONGODB_URL : 'mongodb+srv://loppy:loppy_qw12@node-vue-shop.om6wd.gcp.mongodb.net/shopie?retryWrites=true&w=majority',
  DB_MONGODB_DEBUG : false,

  /** Integrations */
  /* randommer for random data */
  RNADOMMER_API:'a74d8ee4a2a34705a8ebc0acdaa911df',
  /* raven is morden tool to log errors/exceptions with help of mail and dashboard sentry.io */
  RAVEN_ENABLED: true,
  RAVEN_ID: 'https://472fb097833a470bab348e404c60de8f@sentry.io/5180553',
  /* morgan is for request logging in console */
  MORGAN_ENABLED : false,
  MORGAN_FILE_LOGGING : true,

};