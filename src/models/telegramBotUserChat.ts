import { Schema, model } from 'mongoose';

import { IRefreshToken } from '@/interfaces/IRefreshToken';
import { ITelegramBotUserChat } from '@/interfaces/ITelegramBotUserChat';

const telegramBotUserChatSchema = new Schema<IRefreshToken>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    chatId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const TelegramBotUserChat = model<ITelegramBotUserChat>('TelegramBotUserChat', telegramBotUserChatSchema);

export default TelegramBotUserChat;
