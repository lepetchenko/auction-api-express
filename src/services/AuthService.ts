import argon2 from 'argon2';
import { injectable, inject } from 'inversify';

import { IUser, IUserInputDTO } from '@/interfaces/IUser';
import { IAuthService } from '@/interfaces/IAuthService';
import { IMailService } from '@/interfaces/IMailService';
import UserModel from '@/models/user';
import TYPES from '@/types';

@injectable()
export default class AuthService implements IAuthService {
  private mailService: IMailService;

  constructor(@inject(TYPES.MailService) mailService: IMailService) {
    this.mailService = mailService;
  }

  // eslint-disable-next-line class-methods-use-this
  public signUp = async (userInputDTO: IUserInputDTO): Promise<{ user: IUser }> => {
    try {
      const { userName, password, email } = userInputDTO;
      const hashedPassword = await argon2.hash(password);
      const userRecord = await UserModel.create({
        userName,
        password: hashedPassword,
        email,
      });

      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');

      // TODO Just DI test, it's better to use PUB/SUB layer here
      this.mailService.sendWelcomeLetter(user);

      return { user };
    } catch (e) {
      // TODO add logger instead of console
      console.error(e);
      throw e;
    }
  };
}
