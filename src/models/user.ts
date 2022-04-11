import { Schema, model } from 'mongoose';
import { badData, unauthorized } from '@hapi/boom';
import argon2 from 'argon2';

import { IUserDocument, IUserModel, IUserInputDTO } from '@/interfaces/IUser';

const userSchema = new Schema<IUserDocument, IUserModel>(
  {
    auctions: [{
      type: Schema.Types.ObjectId,
      ref: 'Auction',
      required: true,
    }],
    userName: {
      type: String,
      index: true,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

userSchema.statics = {
  async signUp(userInput: IUserInputDTO): Promise<IUserDocument> {
    const throwError = (field: string) => {
      throw badData(`User with this ${field} already exists`);
    };

    const { userName, email } = userInput;

    const userWithSameUserName = await this.findOne({ userName });
    if (userWithSameUserName) { throwError('user name'); }

    const userWithSameEmail = await this.findOne({ email });
    if (userWithSameEmail) { throwError('email'); }

    const userRecord = await this.create(userInput);
    const user = userRecord.toObject<IUserDocument>();
    Reflect.deleteProperty(user, 'password');

    return user;
  },
  async signIn(userInput: IUserInputDTO): Promise<IUserDocument> {
    const throwError = () => {
      throw unauthorized('Invalid user Name or Password.');
    };

    const { email, password } = userInput;
    const userRecord = await this.findOne({ email });

    if (!userRecord) { return throwError(); }

    const isPasswordValid = await argon2.verify(userRecord.password, password);

    if (!isPasswordValid) { return throwError(); }

    const user = userRecord.toObject<IUserDocument>();
    Reflect.deleteProperty(user, 'password');

    return user;
  },
};

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await argon2.hash(this.password);
  }
});

const User = model<IUserDocument, IUserModel>('User', userSchema);

export default User;
