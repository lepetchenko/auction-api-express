import { Model, Document } from 'mongoose';

export interface ITelegramBotUserChat extends Document {
  _id: string;
  userId: string;
  chatId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITelegramBotUserChatModel extends Model<ITelegramBotUserChat> {}
