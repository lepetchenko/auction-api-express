import {
  Router, Request, Response,
} from 'express';

import container from '@/ioc';
import TYPES from '@/types';
import { IAuthService } from '@/interfaces/IAuthService';
import { IRoutes } from '@/interfaces/IRoutes';

class AuthRoutes implements IRoutes {
  public router = Router();

  private authService = container.get<IAuthService>(TYPES.AuthService);

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes = (): void => {
    this.router.post('/signup', this.signup);
  };

  private signup = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { user } = await this.authService.signUp(req.body);

      return res.status(201).json({ user });
    } catch (error) {
      return res.status(400).json({ message: 'Something went wrong.' });
    }
  };
}

export default new AuthRoutes().router;
