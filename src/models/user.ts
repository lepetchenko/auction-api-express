import { Schema, Document, model } from 'mongoose';
import Joi from 'joi';

import { IUser } from '@/interfaces/IUser';

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, 'Please enter a user name'],
      index: true,
      unique: true,
      validate: [
        (userName: string) => !Joi.string().min(3).max(30).required()
          .validate(userName).error,
        'Please fill a valid user name',
      ],
    },
    email: {
      type: String,
      required: [true, 'Please enter an email name'],
      lowercase: true,
      unique: true,
      index: true,
      validate: [
        (email: string) => !Joi.string().email().required()
          .validate(email).error,
        'Please fill a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
    },
  },
  { timestamps: true },
);

const User = model<IUser & Document>('User', userSchema);

export default User;
