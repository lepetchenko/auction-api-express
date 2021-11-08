import { NextFunction, Request, Response } from 'express';

import logger from '@/common/logger';

/** Last 'next' param is needed to identify this function as error handler */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (error: any, req: Request, res: Response, next: NextFunction) => {
  /** Process error as Boom instance error (handled and thrown manually from code) */
  if (error.isBoom) {
    const { output: { statusCode }, message } = error;
    logger.warn(`${statusCode} | ${message}`, req);
    return res.status(statusCode).json({ message });
  }

  logger.error(`${500} | ${error.message}`, req);
  /**
   * Process error as unknown error (for example, duplicate key im mongo). It means that we
   * do not know what code thrown this error. In this case it's better to log what happened
   * and hide error message from user (just use some abstract message, like 'Internal sever error'
   * and some abstract error code, like 500)
   */
  return res.status(500).json({ message: 'Internal sever error' });
};
