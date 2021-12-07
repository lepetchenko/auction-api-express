import dotenv from 'dotenv';

declare const process : {
  env: {
    [key: string]: string,
  }
};

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: parseInt(process.env.PORT, 10),
  databaseURL: process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV || 'development',
  accessTokenSalt: process.env.ACCESS_TOKEN_SALT,
  accessTokenLifeDuration: Number(process.env.ACCESS_TOKEN_LIFE_DURATION) * 1000,
  refreshTokenLifeDuration: Number(process.env.REFRESH_TOKEN_LIFE_DURATION) * 1000,
  tgBotToken: process.env.TG_BOT_TOKEN,
};
