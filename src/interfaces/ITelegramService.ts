import { IUserDocument } from '@/interfaces/IUser';

export interface ITelegramService {
  signInWarn(user: IUserDocument): void;
}
