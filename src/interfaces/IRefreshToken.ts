import { Model, Document } from 'mongoose';

export interface IRefreshToken extends Document {
  _id: string;
  userId: string;
  token: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRefreshTokenModel extends Model<IRefreshToken> {}
