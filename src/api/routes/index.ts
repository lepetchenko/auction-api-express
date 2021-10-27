import { Router } from 'express';

import AuthRoutes from './AuthRoutes';

const routesArray = [
  { pathPrefix: '/auth', routesStack: new AuthRoutes() },
];

export default () => {
  const app = Router();
  routesArray.forEach(({ pathPrefix, routesStack }) => app.use(pathPrefix, routesStack.router));

  return app;
};
