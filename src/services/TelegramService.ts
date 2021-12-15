import { LeanDocument } from 'mongoose';
import { injectable, inject } from 'inversify';
import TelegramBot from 'node-telegram-bot-api';

import { IUser } from '@/interfaces/IUser';
import { ITelegramService } from '@/interfaces/ITelegramService';
import { ITelegramBotUserChatModel } from '@/interfaces/ITelegramBotUserChat';
import { IEventBus } from '@/interfaces/IEventBus';
import TYPES from '@/constants/types';
import EVENTS from '@/constants/events';
import config from '@/config';

@injectable()
export default class TelegramService implements ITelegramService {
  private bot: TelegramBot;

  constructor(
    @inject(TYPES.models.TelegramBotUserChat) private tgUserChat: ITelegramBotUserChatModel,
    @inject(TYPES.decorators.EventBus) private eventBus: IEventBus,
  ) {
    this.tgUserChat = tgUserChat;
    this.bot = new TelegramBot(config.tgBotToken, { polling: true });

    this.subscribeForAppInternalEvents();
  }

  private subscribeForAppInternalEvents = () => {
    this.eventBus.on(EVENTS.auth.signIn, this.signInWarn);
  };

  signInWarn = async ({ _id, userName }: LeanDocument<IUser>) => {
    const chat = await this.tgUserChat.findOne({ userId: _id });
    if (chat) {
      this.bot.sendMessage(
        chat.chatId,
        `<b>New login.</b> Dear ${userName}, we detected a login into your account.`,
        { parse_mode: 'HTML' },
      );
    }
  };
}
