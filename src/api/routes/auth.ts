import {
  Router, Request, Response, NextFunction,
} from 'express';

const route = Router();

export default () => {
  route.post(
    '/signup',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        return res.status(201).json({ user: 'User' });
      } catch (e) {
        return next(e);
      }
    },
  );

  return route;
};
