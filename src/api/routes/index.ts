import { Router } from 'express';

import auth from './auth';

export default () => {
  const app = Router();
  app.use('/auth', auth);

  return app;
};
