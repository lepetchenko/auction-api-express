import { Request, Response } from 'express';

import { IRoutes } from './IRoutes';

export interface IAuthRoutes extends IRoutes {
  signup: (req: Request, res: Response) => void,
  signin: (req: Request, res: Response) => void,
}
