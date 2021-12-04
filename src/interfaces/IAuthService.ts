import { LeanDocument } from 'mongoose';
import { IUser, IUserInputDTO } from '@/interfaces/IUser';

export interface IAuthService {
  signUp(userInputDTO: IUserInputDTO): Promise<{
    user: LeanDocument<IUser>,
    tokens: { access: string, refresh: string },
  }>;
  signIn(userInputDTO: IUserInputDTO): Promise<{
    user: LeanDocument<IUser>,
    tokens: { access: string, refresh: string },
  }>;
}
