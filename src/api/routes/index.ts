import { Router } from 'express';

import container from '@/ioc';
import { IRoutes } from '@/interfaces/IRoutes';
import TYPES from '@/constants/types';

const routesArray = [
  { pathPrefix: '/auth', type: TYPES.routes.AuthRoutes },
];

export default () => {
  const app = Router();
  routesArray.forEach(({ pathPrefix, type }) => app.use(
    pathPrefix,
    (container.get<IRoutes>(type)).router,
  ));

  return app;
};
