import { IUserDocument } from '@/interfaces/IUser';

export {};

declare global {
  namespace Express {
    interface Request {
      user: IUserDocument
    }
  }
}
