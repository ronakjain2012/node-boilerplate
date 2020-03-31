import express from 'express';
import chalk from 'chalk';
import Heart from './config/heart.js';
import Routes from './routes/index.js';
import config from './config/env/index.js';
import './config/db/mongo.js';

const app = express();

Heart(app);

app.use('/', Routes);

// We need this to make sure we don't run a second instance
  app.listen(config.PORT, err => {
    if (err) {
      console.log(chalk.red('Cannot run!'));
    } else {
      console.log(
        chalk.green.bold(
          `
    Yep this is working 🍺
    App listen on port: ${config.PORT} 🍕
    Env: ${config.ENV} 🦄
      `,
        ),
      );
    }
  });

export default app;