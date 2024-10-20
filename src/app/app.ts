import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import router from './routes/routes';
import { errorConverter, errorHandler } from './middlewares/error';
import xss from 'xss-clean';
import config from '@/config';
import path from 'path';

const app = express();

app.get('/status', (req, res) => {
  res.status(200).send('OK').end();
});
app.head('/status', (req, res) => {
  res.status(200).send('OK').end();
});

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

app.use(express.static(path.join(config.root, '/storage/public')));
app.set('views', config.root + '/src/app/public/views');

app.use('/', router);

if (config.env === 'development') {
  function print(path, layer) {
    if (layer.route) {
      layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))));
    } else if (layer.name === 'router' && layer.handle.stack) {
      layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))));
    } else if (layer.method) {
      console.log('%s /%s', layer.method.toUpperCase(), path.concat(split(layer.regexp)).filter(Boolean).join('/'));
    }
  }
  function split(thing) {
    if (typeof thing === 'string') {
      return thing.split('/');
    } else if (thing.fast_slash) {
      return '';
    } else {
      var match = thing
        .toString()
        .replace('\\/?', '')
        .replace('(?=\\/|$)', '$')
        .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
      return match ? match[1].replace(/\\(.)/g, '$1').split('/') : '<complex:' + thing.toString() + '>';
    }
  }

  app._router.stack.forEach(print.bind(null, []));
}

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

/// error handlers
app.use((err, req, res, next) => {
  /**
   * Handle 401 thrown by express-jwt library
   */
  if (err.name === 'UnauthorizedError') {
    return res.status(err.status).send({ message: err.message }).end();
  }
  return next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
    },
  });
});

export default app;
