import { IUserDocument, IUserInputDTO } from '@/interfaces/IUser';

export interface IAuthController {
  signUp(userInputDTO: IUserInputDTO): Promise<{
    user: IUserDocument,
    tokens: { access: string, refresh: string },
  }>;
  signIn(userInputDTO: IUserInputDTO): Promise<{
    user: IUserDocument,
    tokens: { access: string, refresh: string },
  }>;
}
