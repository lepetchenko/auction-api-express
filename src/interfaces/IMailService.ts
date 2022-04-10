import { IUserDocument } from '@/interfaces/IUser';

export interface IMailService {
  sendWelcomeLetter(user: IUserDocument): string;
}
