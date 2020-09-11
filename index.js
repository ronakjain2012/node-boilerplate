const express = require('express');
const chalk = require('chalk');
const Heart = require('./config/heart.js');
const Routes = require('./routes/index.js');
const config = require('./config/env/index.js');
const { networkInterfaces } = require('os');
require('./config/db/mongo.js');
require('./utils/globalHelpers.js');
const nets = networkInterfaces();
const app = express();
Heart(app);

app.use('/', Routes);
const results = {};
for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        if (net.family === 'IPv4') {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}

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
    MongoDB: ${config.DB_MONGODB_URL} 🍀
    
    ${Object.keys(results).map(t => {
      results[t] = results[t].map(e=> `🍕 App Running On http://${e}:${config.PORT}/\n    `);
      return results[t].join();
    }).join('')}`
    ),
    );
  }
});

module.exports = app;
