const configs = require('./config/env/index.js');
const config = {
  mongodb: {
    url: config.DB[config.DB_DRIVER].URL,
    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true, // removes a deprecating warning when connecting
    },
  },
  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog',
};

module.exports = config;