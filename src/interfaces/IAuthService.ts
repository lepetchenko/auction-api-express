import { IUser, IUserInputDTO } from '@/interfaces/IUser';

export interface IAuthService {
  signUp(userInputDTO: IUserInputDTO): Promise<{ user: IUser }>;
}
