import { injectable, inject } from 'inversify';

import { IUser, IUserInputDTO, IUserModel } from '@/interfaces/IUser';
import { IAuthService } from '@/interfaces/IAuthService';
import { IMailService } from '@/interfaces/IMailService';
import { IEventBus } from '@/interfaces/IEventBus';
import TYPES from '@/constants/types';
import EVENTS from '@/constants/events';

@injectable()
export default class AuthService implements IAuthService {
  public constructor(
  // eslint-disable-next-line @typescript-eslint/indent
    @inject(TYPES.services.MailService) private mailService: IMailService,
    @inject(TYPES.models.UserModel) private userModel: IUserModel,
    @inject(TYPES.decorators.EventBus) private eventBus: IEventBus,
  ) {
    this.mailService = mailService;
    this.userModel = userModel;
    this.eventBus = eventBus;
  }

  public signUp = async (
    userInputDTO: IUserInputDTO,
  ): Promise<{ user: IUser }> => {
    const { userName, password, email } = userInputDTO;

    const user = await this.userModel.checkAndCreate({
      userName,
      password,
      email,
    });

    this.eventBus.emit(EVENTS.auth.signUp, user);

    return { user };
  };
}
