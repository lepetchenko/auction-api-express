import { Router, Request, Response } from 'express';

import container from '@/ioc';
import TYPES from '@/constants/types';
import { IAuthService } from '@/interfaces/IAuthService';
import { IRoutes } from '@/interfaces/IRoutes';
import validate from '@/api/middlewares/validate';
import userInput from '@/validation-schemas/userInput';
import { errorWrap } from '@/common/utils';

class AuthRoutes implements IRoutes {
  public router: Router = Router();

  private authService = container.get<IAuthService>(TYPES.services.AuthService);

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes = (): void => {
    this.router.post('/signup', validate(userInput), errorWrap(this.signup));
  };

  private signup = async (req: Request, res: Response): Promise<Response> => {
    const { user } = await this.authService.signUp(req.body);

    return res.status(201).json({ user });
  };
}

export default new AuthRoutes().router;
