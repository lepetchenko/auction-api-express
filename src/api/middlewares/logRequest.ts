import { NextFunction, Request, Response } from 'express';

import logger from '@/common/logger';

export default (req: Request, res: Response, next: NextFunction) => {
  logger.info('HTTP REQUEST', req);
  next();
};
