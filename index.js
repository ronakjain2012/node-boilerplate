const express = require('express');
const chalk = require('chalk');
const Heart = require('./config/heart.js');
const Routes = require('./routes/index.js');
const config = require('./config/env/index.js');
require('./config/db/mongo.js');
require('./utils/globalHelpers.js');

const app = express();
Heart(app);

app.use('/', Routes);

// We need this to make sure we don't run a second instance
app.listen(config.PORT, (err) => {
  if (err) {
    console.log(chalk.red('Cannot run!'));
  } else {
    console.log(
      chalk.green.bold(
        `
    🍺🍺🍺🍺🍺🍺🍺🍺🍺🍺🍺🍺🍺🍺🍺🍺🍺🍺🍺🍺🍺🍺🍺🍺🍺🍺
    App listen on port: ${config.PORT} 🍕
    Env: ${config.ENV} 🦄
    SuperPowers: ${config.ENABLE_SUPER_POWERS} 🌪
    Root: ${config.ROOT_DIR} 👶
    MongoDB: ${config.DB_MONGODB_URL} 🍀`),
    );
  }
});

module.exports = app;
