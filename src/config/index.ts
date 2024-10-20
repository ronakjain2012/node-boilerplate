import { envConfig } from './envSchema';
import Joi from 'joi';

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(envConfig);

if (error) {
  throw new Error(`❗ Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  appName: 'Node BP',
  logs: {
    level: 'info',
  },
  detetime: {
    default: "YYYY-MM-DD HH:mm:ss",
    shortDate: 'YY-MM-DD',
    longDate: 'YYYY-MM-DD',
    shortTime: 'HH:mm',
    longTime: 'HH:mm:ss',
    humanLongTime: "hh:mm:ss A",
    humanShortTime: "hh:mm A",
    longDataTime: "YYYY-MM-DD HH:mm:ss",
    shortDataTime: "YY-MM-DD hh:mm"
  }

};
