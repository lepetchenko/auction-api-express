import 'reflect-metadata';
import { Container } from 'inversify';

import AuthService from '@/services/AuthService';
import MailService from '@/services/MailService';
import JWTService from '@/services/JWTService';
import TelegramService from '@/services/TelegramService';

import UserModel from '@/models/user';
import RefreshToken from '@/models/refreshToken';
import TelegramBotUserChat from '@/models/telegramBotUserChat';

import { eventBusInstance } from '@/decorators/EventBus';

import { IAuthService } from '@/interfaces/IAuthService';
import { IMailService } from '@/interfaces/IMailService';
import { IJWTService } from '@/interfaces/IJWTService';
import { IUserModel } from '@/interfaces/IUser';
import { IRefreshTokenModel } from '@/interfaces/IRefreshToken';
import { IEventBus } from '@/interfaces/IEventBus';
import { ITelegramBotUserChatModel } from '@/interfaces/ITelegramBotUserChat';
import { ITelegramService } from '@/interfaces/ITelegramService';

import TYPES from '@/constants/types';

const container = new Container();

// Services
container.bind<IAuthService>(TYPES.services.AuthService).to(AuthService);
container.bind<IMailService>(TYPES.services.MailService).to(MailService);
container.bind<IJWTService>(TYPES.services.JWTService).to(JWTService);
container.bind<ITelegramService>(TYPES.services.TelegramService).to(TelegramService);

// Models
container.bind<IUserModel>(TYPES.models.UserModel).toFunction(UserModel);
container.bind<IRefreshTokenModel>(TYPES.models.RefreshToken).toFunction(RefreshToken);
container.bind<ITelegramBotUserChatModel>(TYPES.models.TelegramBotUserChat)
  .toFunction(TelegramBotUserChat);

// Decorators
container.bind<IEventBus>(TYPES.decorators.EventBus).toConstantValue(eventBusInstance);

export default container;
