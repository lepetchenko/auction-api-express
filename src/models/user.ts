import { Schema, Document, model } from 'mongoose';

import { IUser } from '@/interfaces/IUser';
import { userEmailValidator, userNameValidator, userPasswordValidator } from '@/validation-schemas/userInput';

const userSchema = new Schema(
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

const User = model<IUser & Document>('User', userSchema);

export default User;
