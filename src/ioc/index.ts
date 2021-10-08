import { Container } from 'inversify';
import { Model } from 'mongoose';

import AuthService from '@/services/AuthService';
import MailService from '@/services/MailService';
import UserModel from '@/models/user';
import { IAuthService } from '@/interfaces/IAuthService';
import { IMailService } from '@/interfaces/IMailService';
import TYPES from '@/types';

const container = new Container();
container.bind<IAuthService>(TYPES.AuthService).to(AuthService);
container.bind<IMailService>(TYPES.MailService).to(MailService);
container.bind<Model<any>>(TYPES.UserModel).toFunction(UserModel);

export default container;
