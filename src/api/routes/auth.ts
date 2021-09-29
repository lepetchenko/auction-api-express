import {
  Router, Request, Response, NextFunction,
} from 'express';
import argon2 from 'argon2';

import UserModel from '../../models/user';

const route = Router();

export default () => {
  route.post(
    '/signup',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { userName, password, email } = req.body;
        const hashedPassword = await argon2.hash(password);
        await UserModel.create({
          userName,
          password: hashedPassword,
          email,
        });

        return res.status(201).json({ user: 'User' });
      } catch (e) {
        return next(e);
      }
    },
  );

  return route;
};
