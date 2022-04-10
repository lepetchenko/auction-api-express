import { Model, Document, Types } from 'mongoose';

import { IUserDocument } from '@/interfaces/IUser';

export interface IRefreshTokenBaseDocument extends Document {
  user: Types.ObjectId | Record<string, unknown>;
  token: string;
  expiresAt: Date;
}

export interface IRefreshTokenDocument extends IRefreshTokenBaseDocument {
  user: IUserDocument['_id'],
}

export interface IRefreshTokenPopulatedDocument extends IRefreshTokenBaseDocument {
  user: IUserDocument;
}

export interface IRefreshTokenModel extends Model<IRefreshTokenDocument> {}
