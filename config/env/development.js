module.exports = {
  AUTH: {
    JWT_SECRET: 'JB64!#$sv438KJDsrh!@$KJASB',
    JWT_TIMEOUT: 5000,
  },

  LOGGING: {
    /* morgan is for request logging in console */
    MORGAN_ENABLED: false,
    MORGAN_FILE_LOGGING: false,
  },

  DB: {
    DB_DRIVER: 'MONGODB', // MONGODB, MYSQL
    MONGODB: {
      URL: 'mongodb://localhost:27017/theboilerplate',
      DEBUG: false,
      USERNAME: '',
      PASSWORD: '',
    }
  },

  REDIS: {
    ENABLE: false,
    PORT: '',
    URL: '',
    REDIS_API_CACHE: true, // API Response Caching 
  },

  /* raven is morden tool to log errors/exceptions with help of mail and dashboard sentry.io */
  SANTRY: {
    RAVEN_ENABLED: false,
    RAVEN_ID: ''
  },
};