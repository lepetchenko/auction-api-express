import 'reflect-metadata';
import { Container } from 'inversify';

import AuthRoutes from '@/api/routes/AuthRoutes';
import AuctionRoutes from '@/api/routes/AuctionRoutes';

import AuthService from '@/services/AuthService';
import MailService from '@/services/MailService';
import JWTService from '@/services/JWTService';
import TelegramService from '@/services/TelegramService';
import AuctionService from '@/services/AuctionService';

import UserModel from '@/models/user';
import RefreshToken from '@/models/refreshToken';
import TelegramBotUserChat from '@/models/telegramBotUserChat';
import AuctionModel from '@/models/auction';

import { eventBusInstance } from '@/decorators/EventBus';

import { IRoutes } from '@/interfaces/IRoutes';
import { IAuthService } from '@/interfaces/IAuthService';
import { IMailService } from '@/interfaces/IMailService';
import { IJWTService } from '@/interfaces/IJWTService';
import { ITelegramService } from '@/interfaces/ITelegramService';
import { IAuctionService } from '@/interfaces/IAuctionService';
import { IUserModel } from '@/interfaces/IUser';
import { IRefreshTokenModel } from '@/interfaces/IRefreshToken';
import { IEventBus } from '@/interfaces/IEventBus';
import { ITelegramBotUserChatModel } from '@/interfaces/ITelegramBotUserChat';
import { IAuctionModel } from '@/interfaces/IAuction';

import TYPES from '@/constants/types';

const container = new Container();

// Routes
container.bind<IRoutes>(TYPES.routes.AuthRoutes).to(AuthRoutes);
container.bind<IRoutes>(TYPES.routes.AuctionRoutes).to(AuctionRoutes);

// Services
container.bind<IAuthService>(TYPES.services.AuthService).to(AuthService);
container.bind<IMailService>(TYPES.services.MailService).to(MailService);
container.bind<IJWTService>(TYPES.services.JWTService).to(JWTService);
container.bind<ITelegramService>(TYPES.services.TelegramService).to(TelegramService);
container.bind<IAuctionService>(TYPES.services.AuctionService).to(AuctionService);

// Models
container.bind<IUserModel>(TYPES.models.UserModel).toFunction(UserModel);
container.bind<IRefreshTokenModel>(TYPES.models.RefreshToken).toFunction(RefreshToken);
container.bind<ITelegramBotUserChatModel>(TYPES.models.TelegramBotUserChat)
  .toFunction(TelegramBotUserChat);
container.bind<IAuctionModel>(TYPES.models.AuctionModel).toFunction(AuctionModel);

// Decorators
container.bind<IEventBus>(TYPES.decorators.EventBus).toConstantValue(eventBusInstance);

export default container;
