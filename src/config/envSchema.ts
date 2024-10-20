import envSchema from "env-schema"
import dotenv from "dotenv";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export const envConfigSchema = {
    type: 'object',
    properties: {
      APP_NAME: {
        type: "string",
        default: "By - Ronak Bokaria",
      },
      NODE_ENV: {
        type: "string",
      },
      PORT: {
        type: "number",
      }
    },
    required: ["APP_NAME"]
  }

  export const envConfig = envSchema({
    schema: envConfigSchema,
    env: true,
    dotenv: true
  });