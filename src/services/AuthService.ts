import argon2 from 'argon2';
import { injectable, inject } from 'inversify';
import { Model, LeanDocument } from 'mongoose';

import { IUser, IUserInputDTO } from '@/interfaces/IUser';
import { IAuthService } from '@/interfaces/IAuthService';
import { IMailService } from '@/interfaces/IMailService';
import { IEventBus } from '@/interfaces/IEventBus';
import TYPES from '@/constants/types';
import EVENTS from '@/constants/events';

@injectable()
export default class AuthService implements IAuthService {
  private mailService: IMailService;

  private userModel: Model<any>;

  private eventBus: IEventBus;

  public constructor(
  // eslint-disable-next-line @typescript-eslint/indent
    @inject(TYPES.services.MailService) mailService: IMailService,
    @inject(TYPES.models.UserModel) userModel: Model<any>,
    @inject(TYPES.decorators.EventBus) eventBus: IEventBus,
  ) {
    this.mailService = mailService;
    this.userModel = userModel;
    this.eventBus = eventBus;
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

      this.eventBus.emit(EVENTS.auth.signUp, user);

      return { user };
    } catch (e) {
      // TODO add logger instead of console
      console.error(e);
      throw e;
    }
  };
}
