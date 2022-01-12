import { Model, Document } from 'mongoose';

export interface IAuction extends Document {
  _id: string;
  userId: string;
  title: string;
  description: string;
  scheduledStart: string;
  startedAt: Date;
  initialPrice: number;
  actualPrice: number;
  bidStep: number;
  createdAt: string;
  updatedAt: string;
}

export interface IAuctionModel extends Model<IAuction> {}
