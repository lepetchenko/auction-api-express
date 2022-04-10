import { Schema, model } from 'mongoose';

import { ITelegramBotUserChatDocument } from '@/interfaces/ITelegramBotUserChat';

const telegramBotUserChatSchema = new Schema<ITelegramBotUserChatDocument>(
  {
    user: {
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

const TelegramBotUserChat = model<ITelegramBotUserChatDocument>('TelegramBotUserChat', telegramBotUserChatSchema);

export default TelegramBotUserChat;
