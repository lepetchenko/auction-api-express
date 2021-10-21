import { injectable } from 'inversify';

import { IMailService } from '@/interfaces/IMailService';
import { subscribe } from '@/decorators/EventBus';
import EVENTS from '@/constants/events';

@injectable()
export default class MailService implements IMailService {
  @subscribe(EVENTS.auth.signUp)
  // eslint-disable-next-line class-methods-use-this
  sendWelcomeLetter() {
    return 'success';
  }
}
