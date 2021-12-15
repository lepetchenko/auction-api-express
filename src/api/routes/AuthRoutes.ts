import { Router, Request, Response } from 'express';

import container from '@/ioc';
import TYPES from '@/constants/types';
import { IAuthService } from '@/interfaces/IAuthService';
import { IRoutes } from '@/interfaces/IRoutes';
import validate from '@/api/middlewares/validate';
import { userSignInScheme, userSignUpScheme } from '@/validation/schemas';
import { errorWrap } from '@/common/utils';

class AuthRoutes implements IRoutes {
  public router: Router = Router();

  private authService = container.get<IAuthService>(TYPES.services.AuthService);

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes(): void {
    this.router.post('/signup', validate(userSignUpScheme), errorWrap(this.signup));
    this.router.post('/signin', validate(userSignInScheme), errorWrap(this.signin));
  }

  signup = async (req: Request, res: Response) => {
    const { user, tokens } = await this.authService.signUp(req.body);

    res.status(201).json({ user, tokens });
  };

  signin = async (req: Request, res: Response) => {
    const { user, tokens } = await this.authService.signIn(req.body);

    res.status(200).json({ user, tokens });
  };
}

export default AuthRoutes;
