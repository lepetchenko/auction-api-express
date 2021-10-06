import { injectable } from 'inversify';
import { IUser } from '@/interfaces/IUser';
import { IMailService } from '@/interfaces/IMailService';

@injectable()
export default class MailService implements IMailService {
  sendWelcomeLetter = (user: IUser) => {
    console.log('mail sent!', user);
    return 'success';
  };
}
