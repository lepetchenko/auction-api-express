import { Router, Request, Response } from 'express';
import { injectable, inject } from 'inversify';

import TYPES from '@/constants/types';
import { IAuthController } from '@/interfaces/IAuthController';
import { IAuthRoutes } from '@/interfaces/IAuthRoutes';
import validate from '@/api/middlewares/validate';
import { userSignInScheme, userSignUpScheme } from '@/validation/schemas';
import { errorWrap } from '@/common/utils';

@injectable()
class AuthRoutes implements IAuthRoutes {
  public router: Router = Router();

  constructor(
    @inject(TYPES.controllers.AuthController) private authController: IAuthController,
  ) {
    this.intializeRoutes();
  }

  intializeRoutes(): void {
    this.router.post('/signup', validate(userSignUpScheme), errorWrap(this.signup));
    this.router.post('/signin', validate(userSignInScheme), errorWrap(this.signin));
  }

  signup = async (req: Request, res: Response) => {
    const { user, tokens } = await this.authController.signUp(req.body);

    res.status(201).json({ user, tokens });
  };

  signin = async (req: Request, res: Response) => {
    const { user, tokens } = await this.authController.signIn(req.body);

    res.status(200).json({ user, tokens });
  };
}

export default AuthRoutes;
