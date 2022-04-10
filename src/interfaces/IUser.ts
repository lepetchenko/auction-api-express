import { Model, Document, Types } from 'mongoose';

// eslint-disable-next-line import/no-cycle
import { IAuctionDocument } from '@/interfaces/IAuction';

export interface IUserBaseDocument extends Document {
  auctions: Array<Types.ObjectId | Record<string, unknown>>
  userName: string;
  email: string;
  password: string;
}

export interface IUserInputDTO {
  userName?: string;
  email?: string;
  password: string;
}

export interface IUserDocument extends IUserBaseDocument {
  auctions: Array<IAuctionDocument['_id']>;
}

export interface IUserPopulatedDocument extends IUserBaseDocument {
  auctions: Array<IAuctionDocument>;
}

export interface IUserModel extends Model<IUserDocument> {
  signUp(userInput: IUserInputDTO): Promise<IUserDocument>,
  signIn(userInput: IUserInputDTO): Promise<IUserDocument>,
}
