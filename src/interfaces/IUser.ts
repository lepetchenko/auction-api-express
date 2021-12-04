import { Model, Document, LeanDocument } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  userName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserInputDTO {
  userName?: string;
  email?: string;
  password: string;
}

export interface IUserModel extends Model<IUser> {
  signUp(userInput: IUserInputDTO): Promise<LeanDocument<IUser>>,
  signIn(userInput: IUserInputDTO): Promise<LeanDocument<IUser>>,
}
