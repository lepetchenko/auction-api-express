import { injectable, inject } from 'inversify';

import { IUserInputDTO, IUserModel } from '@/interfaces/IUser';
import { IAuthService } from '@/interfaces/IAuthService';
import { IEventBus } from '@/interfaces/IEventBus';
import { IJWTService } from '@/interfaces/IJWTService';
import TYPES from '@/constants/types';
import EVENTS from '@/constants/events';

@injectable()
export default class AuthService implements IAuthService {
  public constructor(
  // eslint-disable-next-line @typescript-eslint/indent
    @inject(TYPES.models.UserModel) private userModel: IUserModel,
    @inject(TYPES.decorators.EventBus) private eventBus: IEventBus,
    @inject(TYPES.services.JWTService) private JWTService: IJWTService,
  ) {
    this.userModel = userModel;
    this.eventBus = eventBus;
    this.JWTService = JWTService;
  }

  public signUp = async (userInputDTO: IUserInputDTO) => {
    const { userName, password, email } = userInputDTO;

    const user = await this.userModel.signUp({
      userName,
      password,
      email,
    });

    this.eventBus.emit(EVENTS.auth.signUp, user);

    const tokens = await this.JWTService.createAndStoreTokens(user);

    return { user, tokens };
  };

  public signIn = async (userInputDTO: IUserInputDTO) => {
    const { userName, password, email } = userInputDTO;

    const user = await this.userModel.signIn({
      userName,
      password,
      email,
    });

    this.eventBus.emit(EVENTS.auth.signIn, user);

    const tokens = await this.JWTService.createAndStoreTokens(user);

    return { user, tokens };
  };
}
