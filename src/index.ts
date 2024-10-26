import config from './config/index';
import logger from './app/services/logger';
import app from "./app/app";

const exitHandler = () => {
  if (0) {
    // server.close(() => {
    //   logger.info('Server closed');
    //   process.exit(1);
    // });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

async function startServer(application) {
  application
    .listen(config.port, () => {
      logger.info(`
      
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
      http://localhost:${config.port}/
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
────────────────────────────────────────      
            ¯\_( ͡❛ ͜ʖ ͡❛)_/¯
        `);
    })
    .on('error', (err) => {
      logger.error(err);
      process.exit(1);
    });
}

startServer(app);
