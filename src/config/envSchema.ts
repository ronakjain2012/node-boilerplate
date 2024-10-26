import envSchema from "env-schema"
import dotenv from "dotenv";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export const envConfigSchema = {
    type: 'object',
    properties: {
      NODE_ENV: {
        type: "string",
      },
      PORT: {
        type: "number",
      },

      APP_NAME: {
        type: "string",
        default: "By - Ronak Bokaria",
      },
      APP_AXIOS_AGENT:{
        type: "string",
        default: "@ronakjain2012",
      },
      APP_AXIOS_API_LOG: {
        type: "boolean",
        default: false,
      },

      TELEGRAM_SERVICE_FLAG: {
        type: "boolean",
        default: false,
      },
      TELEGRAM_BOT_TOKEN: {
        type: "string",
      },
      TELEGRAM_DEFAULT_UPDATE_CHAT_ID: {
        type: "string",
      },
      TELEGRAM_DEFAULT_ERROR_CHAT_ID: {
        type: "string",
      },

      ZULIP_SERVICE_FLAG: {
        type: "boolean",
        default: false,
      },
      ZULIP_SERVICE_URL: {
        type: "string",
      },
      ZULIP_BOT_TOKEN_USERNAME: {
        type: "string",
      },
      ZULIP_BOT_TOKEN_PASSWORD: {
        type: "string",
      },
      ZULIP_DEFAULT_UPDATE_CHAT_ID: {
        type: "string",
      },
      ZULIP_DEFAULT_ERROR_CHAT_ID: {
        type: "string",
      },

    },
    required: ["APP_NAME"]
  }

  export const envConfig = envSchema({
    schema: envConfigSchema,
    env: true,
    dotenv: true
  });