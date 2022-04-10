import { Model, Document } from 'mongoose';
import { IUserDocument } from '@/interfaces/IUser';

export interface ITelegramBotUserChatBaseDocument extends Document {
  user: string;
  chatId: string;
}

export interface ITelegramBotUserChatDocument extends ITelegramBotUserChatBaseDocument {
  user: IUserDocument['_id'];
}

export interface ITelegramBotUserChatPopulatedDocument extends ITelegramBotUserChatBaseDocument {
  user: IUserDocument;
}

export interface ITelegramBotUserChatModel extends Model<ITelegramBotUserChatDocument> {}
