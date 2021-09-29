import {
  Router, Request, Response, NextFunction,
} from 'express';

import AuthService from '@/services/auth';

const route = Router();

export default () => {
  route.post(
    '/signup',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const AuthServiceInstance = new AuthService();
        const { user } = await AuthServiceInstance.signUp(req.body);

        return res.status(201).json({ user });
      } catch (e) {
        return next(e);
      }
    },
  );

  return route;
};
