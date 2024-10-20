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
  /**
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   **/
  // await require('./loaders').default({ expressApp: app });

  logger.info("111");
  logger.info({"2222":1111});
  logger.info(["33333"]);
  logger.info(1233,["44444444444"]);
  logger.info("ssasad",{"5555555555555":212});
  logger.info("ssasad",{"6666666":212},{"666666662":212},{"66666663":212});

  application
    .listen(config.port, () => {
      logger.info(`
          ################################################
          #  Server listening on port: ${config.port}    #
          ################################################
        `);
    })
    .on('error', (err) => {
      logger.error(err);
      process.exit(1);
    });
}

startServer(app);
