module.exports = {
  /** Application */
  APP: {
    NAME: process.env.APP_NAME || 'node-boilerplate',
    RELESE_VERSION: process.env.RELESE_VERSION || '0.0.2',
    LOGO: process.env.LOGO || 'https://i.ibb.co/vPRZSFQ/ronak.png',
    DEFAULT_LANGUAGE: process.env.DEFAULT_LANGUAGE || 'en',
    COPYRIGHT: process.env.COPYRIGHT || 'Made with Love in India',
    PORT: process.env.PORT || 3000, // Port for server
  },

  AUTH: {
    JWT_SECRET: process.env.JWT_SECRET || 'JB64!#$sv438KJDsrh!@$KJASB',
    JWT_TIMEOUT: process.env.JWT_TIMEOUT || 5000,
  },

  LOGGING: {
    /* morgan is for request logging in console */
    MORGAN_ENABLED: process.env.REQUEST_LOGGING ==='true',
    MORGAN_FILE_LOGGING: process.env.REQUEST_FILE_LOGGING ==='true',
  },

  DB: {
    DB_DRIVER: process.env.DB_DRIVER || 'MONGODB', // MONGODB, MYSQL
    MONGODB: {
      URL: process.env.DB_URL || 'mongodb://localhost:27017/theboilerplate',
      DEBUG: process.env.DB_DEBUG ==='true',
      USERNAME: process.env.DB_USERNAME || '',
      PASSWORD: process.env.DB_PASSWORD || '',
    }
  },

  REDIS: {
    ENABLE: process.env.REDIS_ENABLED ==='true',
    PORT: process.env.REDIS_PORT || '',
    URL: process.env.REDIS_URL || '',
    REDIS_API_CACHE: process.env.REDIS_API_CACHE ==='true', // API Response Caching 
  },

  /* raven is morden tool to log errors/exceptions with help of mail and dashboard sentry.io */
  SANTRY: {
    RAVEN_ENABLED: process.env.SANTRY_RAVEN_ENABLED==='true',
    RAVEN_ID: process.env.SANTRY_RAVEN_ID || ''
  },

};