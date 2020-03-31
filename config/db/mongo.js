/* eslint-disable no-console */
import mongoose from 'mongoose';

import chalk from 'chalk';
import config from './../env/index.js';

// Remove the warning with Promise
mongoose.Promise = global.Promise;

// If debug run the mongoose debug options
mongoose.set('debug', config.MONGODB_DEBUG);

// Connect the db with the url provide
// try {
//   mongoose.connect(config.MONGODB_URL);
// } catch (err) {
//   mongoose.createConnection(config.MONGODB_URL);
// }

function connect() {
  mongoose.connection
    .once('open', () =>
      console.log(
        chalk.greenBright.bold(`
    MongoDB is Up ⬆ and Connected ⌚
        `),
      ),
    )
    .on('error', (e) => {
      throw e;
    })
    .on('disconnected', connect);
  try {
    return mongoose.connect(config.MONGODB_URL, {
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    return mongoose.createConnection(config.MONGODB_URL, {
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

connect();
