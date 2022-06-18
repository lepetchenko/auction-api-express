import type { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { unauthorized } from '@hapi/boom';

import container from '@/ioc';
import TYPES from '@/constants/types';
import { IUserModel } from '@/interfaces/IUser';
import config from '@/config';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userModel = container.get<IUserModel>(TYPES.models.UserModel);
    const { authorization } = req.headers;
    if (!authorization) {
      return next();
    }

    const { userId } = jwt.verify(authorization, config.accessTokenSalt) as JwtPayload;
    const user = await userModel.findOne({ _id: userId });

    if (!user) {
      return next(unauthorized('Invalid token (no user associated with provided jwt)'));
    }

    req.user = user;

    return next();
  } catch (e: any) {
    switch (e.message) {
      case 'jwt malformed':
        next(unauthorized('Invalid token'));
        break;
      case 'jwt expired':
        next(unauthorized('Expired token'));
        break;
      default:
        next(e);
        break;
    }

    return null;
  }
};
