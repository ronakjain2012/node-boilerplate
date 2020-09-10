/* eslint-disable no-console */
const mongoose = require('mongoose');

const chalk = require('chalk');
const config = require('./../env/index.js');

// Remove the warning with Promise
mongoose.Promise = global.Promise;

// If debug run the mongoose debug options
// mongoose.set('debug', config.DB_MONGODB_DEBUG);

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
      console.log(e);
      throw e;
    })
    .on('disconnected', connect);
  try {
    return mongoose.connect(config.DB_MONGODB_URL, {
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  } catch (err) {
    return mongoose.createConnection(config.DB_MONGODB_URL, {
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

connect();
