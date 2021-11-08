import winston from 'winston';

import config from '@/config';

/**
 * Just very primitive logs
 * TODO use Kibana in future
 */
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MMM-DD HH:mm:ss',
    }),
    winston.format.printf((info) => (
      `${info.level} | ${[info.timestamp]} | ${info.method} | ${info.originalUrl} | ${info.message}`
    )),
  ),
  silent: config.nodeEnv === 'test',
});

export default logger;
