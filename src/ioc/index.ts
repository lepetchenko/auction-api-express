import 'reflect-metadata';
import { Container } from 'inversify';
import { Model } from 'mongoose';

import AuthService from '@/services/AuthService';
import UserModel from '@/models/user';
import { eventBusInstance } from '@/decorators/EventBus';
import { IAuthService } from '@/interfaces/IAuthService';
import { IEventBus } from '@/interfaces/IEventBus';
import TYPES from '@/constants/types';

const container = new Container();
container.bind<IAuthService>(TYPES.services.AuthService).to(AuthService);
container.bind<Model<any>>(TYPES.models.UserModel).toFunction(UserModel);
container.bind<IEventBus>(TYPES.decorators.EventBus).toConstantValue(eventBusInstance);

export default container;
