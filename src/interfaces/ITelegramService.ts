import { LeanDocument } from 'mongoose';
import { IUser } from '@/interfaces/IUser';

export interface ITelegramService {
  signInWarn(user: LeanDocument<IUser>): void;
}
