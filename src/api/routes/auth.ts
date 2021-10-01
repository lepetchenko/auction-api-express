import {
  Router, Request, Response,
} from 'express';

import AuthService from '@/services/auth';
import { IRoutes } from '@/interfaces/IRoutes';

class AuthRoutes implements IRoutes {
  public router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes = (): void => {
    this.router.post('/signup', this.signup);
  };

  private signup = async (req: Request, res: Response): Promise<Response> => {
    try {
      const AuthServiceInstance = new AuthService();
      const { user } = await AuthServiceInstance.signUp(req.body);

      return res.status(201).json({ user });
    } catch (error) {
      return res.status(400).json({ message: 'Something went wrong.' });
    }
  };
}

export default new AuthRoutes().router;
