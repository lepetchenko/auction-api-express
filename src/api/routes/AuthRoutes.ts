import { Router, Request, Response } from 'express';
import { injectable, inject } from 'inversify';

import TYPES from '@/constants/types';
import { IAuthService } from '@/interfaces/IAuthService';
import { IRoutes } from '@/interfaces/IRoutes';
import validate from '@/api/middlewares/validate';
import { userSignInScheme, userSignUpScheme } from '@/validation/schemas';
import { errorWrap } from '@/common/utils';

@injectable()
class AuthRoutes implements IRoutes {
  public router: Router = Router();

  constructor(
    @inject(TYPES.services.AuthService) private authService: IAuthService,
  ) {
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
