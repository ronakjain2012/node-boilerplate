const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const passport = require('passport');
const helmet = require('helmet');
const cors = require('cors');
const expressStatusMonitor = require('express-status-monitor');
const rfs = require('rotating-file-stream');
const path = require('path');
const config = require('./env/index.js');
const WebRoutes = require('./../routes/web.js');


module.exports = (app) => {
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(passport.initialize());
  app.use(helmet());
  app.use(cors());
  app.use(expressStatusMonitor());
  app.use(express.static(path.join(config.ROOT_DIR, 'public')));
  app.set('views', config.ROOT_DIR + '/public/views');

  app.set('view engine', 'pug');
  app.use('/',WebRoutes);
 
  if (config.ENABLE_SUPER_POWERS) {
    if (config.MORGAN_ENABLED) {
      let accessLogStream = null;
      if (config.MORGAN_FILE_LOGGING) {
        accessLogStream = rfs.createStream('access.log', {
          interval: '1d', // rotate daily
          path: path.join(config.ROOT_DIR + '/storage/logs', 'morgan'),
        });
        app.use(morgan('combined', { stream: accessLogStream }));
      } else {
        app.use(morgan('combined', {}));
      }
    }
    // if (config.WINSTON_ENABLED) {
    //   app.use(
    //     expressWinston.logger({
    //       transports: [new winston.transports.Console()],
    //       format: winston.format.combine(
    //         winston.format.colorize(),
    //         winston.format.cli() ,
    //       ),
    //       colorize: true,
    //       meta: true,
    //       msg: '{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    //       colorStatus: true,
    //       expressFormat: false,
    //     }),
    //   );
    // }
  }
};
