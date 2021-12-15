import { Schema, model, LeanDocument } from 'mongoose';
import { badData, unauthorized } from '@hapi/boom';
import argon2 from 'argon2';

import { IUser, IUserModel, IUserInputDTO } from '@/interfaces/IUser';
import {
  userName as userNameValidator,
  email as emailValidator,
  password as passwordValidator,
} from '@/validation/valuesValidators';

const userSchema = new Schema<IUser, IUserModel>(
  {
    userName: {
      type: String,
      required: [true, 'Please enter a user name'],
      index: true,
      unique: true,
      validate: [
        (userName: string) => !userNameValidator.validate(userName).error,
        'Please enter a valid user name',
      ],
    },
    email: {
      type: String,
      required: [true, 'Please enter an email name'],
      lowercase: true,
      unique: true,
      index: true,
      validate: [
        (email: string) => !emailValidator.validate(email).error,
        'Please enter a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      validate: [
        (email: string) => !passwordValidator.validate(email).error,
        'Please enter a valid password',
      ],
    },
  },
  { timestamps: true },
);

userSchema.statics = {
  async signUp(userInput: IUserInputDTO): Promise<LeanDocument<IUser>> {
    const throwError = (field: string) => {
      throw badData(`User with this ${field} already exists`);
    };

    const { userName, email, password } = userInput;

    const userWithSameUserName = await this.findOne({ userName });
    if (userWithSameUserName) { throwError('user name'); }

    const userWithSameEmail = await this.findOne({ email });
    if (userWithSameEmail) { throwError('email'); }

    const hashedPassword = await argon2.hash(password);
    const userRecord = await this.create({ ...userInput, password: hashedPassword });
    const user = userRecord.toObject();
    Reflect.deleteProperty(user, 'password');

    return user;
  },
  async signIn(userInput: IUserInputDTO): Promise<LeanDocument<IUser>> {
    const throwError = () => {
      throw unauthorized('Invalid user Name or Password.');
    };

    const { email, password } = userInput;
    const userRecord = await this.findOne({ email });

    if (!userRecord) { return throwError(); }

    const isPasswordValid = await argon2.verify(userRecord.password, password);

    if (!isPasswordValid) { return throwError(); }

    const user = userRecord.toObject();
    Reflect.deleteProperty(user, 'password');

    return user;
  },
};

const User = model<IUser, IUserModel>('User', userSchema);

export default User;
