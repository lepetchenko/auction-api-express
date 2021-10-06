import { IUser } from '@/interfaces/IUser';

export interface IMailService {
  sendWelcomeLetter(user: IUser): string;
}
