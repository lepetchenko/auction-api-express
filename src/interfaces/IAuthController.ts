import { IUserDocument, IUserInputDTO } from '@/interfaces/IUser';
import { ITokens } from '@/interfaces/IJWTService';

export type CommonResponse = {
  user: IUserDocument,
  tokens: ITokens,
};

export interface IAuthController {
  signUp(userInputDTO: IUserInputDTO): Promise<CommonResponse>;
  signIn(userInputDTO: IUserInputDTO): Promise<CommonResponse>;
}
