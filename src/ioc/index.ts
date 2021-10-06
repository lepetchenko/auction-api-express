import { Container } from 'inversify';

import AuthService from '@/services/AuthService';
import MailService from '@/services/MailService';
import { IAuthService } from '@/interfaces/IAuthService';
import { IMailService } from '@/interfaces/IMailService';
import TYPES from '@/types';

const container = new Container();
container.bind<IAuthService>(TYPES.AuthService).to(AuthService);
container.bind<IMailService>(TYPES.MailService).to(MailService);

export default container;
