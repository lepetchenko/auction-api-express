import 'reflect-metadata';
import { Container } from 'inversify';

import AuthRoutes from '@/api/routes/AuthRoutes';
import AuctionRoutes from '@/api/routes/AuctionRoutes';

import Auth from '@/controllers/Auth';
import MailService from '@/services/MailService';
import JWTService from '@/services/JWTService';
import TelegramService from '@/services/TelegramService';
import Auction from '@/controllers/Auction';

import UserModel from '@/models/user';
import RefreshToken from '@/models/refreshToken';
import TelegramBotUserChat from '@/models/telegramBotUserChat';
import AuctionModel from '@/models/auction';

import { eventBusInstance } from '@/decorators/EventBus';

import { IRoutes } from '@/interfaces/IRoutes';
import { IAuthController } from '@/interfaces/IAuthController';
import { IMailService } from '@/interfaces/IMailService';
import { IJWTService } from '@/interfaces/IJWTService';
import { ITelegramService } from '@/interfaces/ITelegramService';
import { IAuctionController } from '@/interfaces/IAuctionController';
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

// Controllers
container.bind<IAuctionController>(TYPES.controllers.AuctionController).to(Auction);
container.bind<IAuthController>(TYPES.controllers.AuthController).to(Auth);

// Services
container.bind<IMailService>(TYPES.services.MailService).to(MailService);
container.bind<IJWTService>(TYPES.services.JWTService).to(JWTService);
container.bind<ITelegramService>(TYPES.services.TelegramService).to(TelegramService);

// Models
container.bind<IUserModel>(TYPES.models.UserModel).toFunction(UserModel);
container.bind<IRefreshTokenModel>(TYPES.models.RefreshToken).toFunction(RefreshToken);
container.bind<ITelegramBotUserChatModel>(TYPES.models.TelegramBotUserChat)
  .toFunction(TelegramBotUserChat);
container.bind<IAuctionModel>(TYPES.models.AuctionModel).toFunction(AuctionModel);

// Decorators
container.bind<IEventBus>(TYPES.decorators.EventBus).toConstantValue(eventBusInstance);

export default container;
