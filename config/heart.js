import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import passport from 'passport';
import expressWinston from 'express-winston';
import methodOverride from 'method-override';
import helmet from 'helmet';
import cors from 'cors';
import expressStatusMonitor from 'express-status-monitor';
import winston from 'winston';
import rfs from 'rotating-file-stream';
import path from 'path';
import config from './env/index.js';

export default (app) => {
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(passport.initialize());
  app.use(helmet());
  app.use(cors());
  app.use(expressStatusMonitor());
  app.use(methodOverride());
  if (config.ENABLE_SUPER_POWERS) {
    if (config.MORGAN.ENABLE_MORGAN) {
      let accessLogStream = null;
      if (config.MORGAN.ENABLE_MORGAN_FILE_LOG) {
        accessLogStream = rfs.createStream('access.log', {
          interval: '1d', // rotate daily
          path: path.join(config.ROOT_DIR + '/storage/logs', 'morgan'),
        });
        app.use(morgan('combined', { stream: accessLogStream }));
      } else {
        app.use(morgan('combined', {}));
      }
    }
    if (config.WINSTON.WINSTON_REQUEST_LOGGING) {
      app.use(
        expressWinston.logger({
          transports: [new winston.transports.Console()],
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.json(),
          ),
          colorize: true,
          meta: true,
          msg:
            'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
          colorStatus: true,
        }),
      );
    }
  }
};
