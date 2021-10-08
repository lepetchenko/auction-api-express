import argon2 from 'argon2';
import { injectable, inject } from 'inversify';
import { Model, LeanDocument } from 'mongoose';

import { IUser, IUserInputDTO } from '@/interfaces/IUser';
import { IAuthService } from '@/interfaces/IAuthService';
import { IMailService } from '@/interfaces/IMailService';
import TYPES from '@/types';

@injectable()
export default class AuthService implements IAuthService {
  private mailService: IMailService;

  private userModel: Model<any>;

  public constructor(
  // eslint-disable-next-line @typescript-eslint/indent
    @inject(TYPES.MailService) mailService: IMailService,
    @inject(TYPES.UserModel) userModel: Model<any>,
  ) {
    this.mailService = mailService;
    this.userModel = userModel;
  }

  public signUp = async (
    userInputDTO: IUserInputDTO,
  ): Promise<{ user: IUser & LeanDocument<any> }> => {
    try {
      const { userName, password, email } = userInputDTO;
      const hashedPassword = await argon2.hash(password);
      const userRecord = await this.userModel.create({
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
