import 'reflect-metadata';
import { Container } from 'inversify';

import AuthService from '@/services/AuthService';
import JWTService from '@/services/JWTService';
import UserModel from '@/models/user';
import RefreshToken from '@/models/refreshToken';
import { eventBusInstance } from '@/decorators/EventBus';
import { IAuthService } from '@/interfaces/IAuthService';
import { IJWTService } from '@/interfaces/IJWTService';
import { IUserModel } from '@/interfaces/IUser';
import { IRefreshTokenModel } from '@/interfaces/IRefreshToken';
import { IEventBus } from '@/interfaces/IEventBus';
import TYPES from '@/constants/types';

const container = new Container();

// Services
container.bind<IAuthService>(TYPES.services.AuthService).to(AuthService);
container.bind<IJWTService>(TYPES.services.JWTService).to(JWTService);

// Models
container.bind<IUserModel>(TYPES.models.UserModel).toFunction(UserModel);
container.bind<IRefreshTokenModel>(TYPES.models.RefreshToken).toFunction(RefreshToken);

// Decorators
container.bind<IEventBus>(TYPES.decorators.EventBus).toConstantValue(eventBusInstance);

export default container;
