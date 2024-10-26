import { envConfig } from './envSchema';
import Joi from 'joi';
import path from 'path';
const _dirname = path.resolve();
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
  root:_dirname,
  logs: {
    level: 'info',
  },
  app:{
    agent: envVars.APP_AXIOS_AGENT,
    externalApiLog: envVars.APP_AXIOS_API_LOG,
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
  },
  telegram: {
    serviceFlag: envVars.TELEGRAM_SERVICE_FLAG,
    botToken: envVars.TELEGRAM_BOT_TOKEN,
    defaultUpdateChatId: envVars.TELEGRAM_DEFAULT_UPDATE_CHAT_ID,
    defaultErrorChatId: envVars.TELEGRAM_DEFAULT_ERROR_CHAT_ID
  },
  zulip: {
    serviceFlag: envVars.ZULIP_SERVICE_FLAG,
    url: envVars.ZULIP_SERVICE_URL,
    botTokenUsername: envVars.ZULIP_BOT_TOKEN_USERNAME,
    botTokenPassword: envVars.ZULIP_BOT_TOKEN_PASSWORD,
    defaultUpdateChatId: envVars.ZULIP_DEFAULT_UPDATE_CHAT_ID,
    defaultErrorChatId: envVars.ZULIP_DEFAULT_ERROR_CHAT_ID
  },
};
