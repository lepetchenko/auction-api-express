import { Types, Model, Document } from 'mongoose';

// eslint-disable-next-line import/no-cycle
import { IUserDocument } from '@/interfaces/IUser';

export interface IAuctionBaseDocument extends Document {
  user: Types.ObjectId | Record<string, unknown>;
  title: string;
  description: string;
  scheduledStart: string;
  startedAt: Date;
  initialPrice: number;
  actualPrice: number;
  bidStep: number;
}

export interface IAuctionDocument extends IAuctionBaseDocument {
  user: IUserDocument['_id'];
}

export interface IAuctionPopulatedDocument extends IAuctionBaseDocument {
  user: IUserDocument;
}

export interface IAuctionModel extends Model<IAuctionDocument> {}
