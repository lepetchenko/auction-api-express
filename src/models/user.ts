import { Schema, model } from 'mongoose';
import { badData } from '@hapi/boom';
import argon2 from 'argon2';

import { IUser, IUserModel, IUserInputDTO } from '@/interfaces/IUser';
import { userEmailValidator, userNameValidator, userPasswordValidator } from '@/validation-schemas/userInput';

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
        (email: string) => !userEmailValidator.validate(email).error,
        'Please enter a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      validate: [
        (email: string) => !userPasswordValidator.validate(email).error,
        'Please enter a valid password',
      ],
    },
  },
  { timestamps: true },
);

userSchema.statics = {
  async checkAndCreate(userInput: IUserInputDTO) {
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
};

const User = model<IUser, IUserModel>('User', userSchema);

export default User;
