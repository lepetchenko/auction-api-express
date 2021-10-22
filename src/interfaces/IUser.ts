import { Model, Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  userName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserInputDTO {
  userName: string;
  email: string;
  password: string;
}

export interface IUserModel extends Model<IUser> {
  checkAndCreate: Model<IUser>['create'],
}
