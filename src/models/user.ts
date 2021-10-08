import { Schema, Document, model } from 'mongoose';

import { IUser } from '@/interfaces/IUser';

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, 'Please enter a name'],
      index: true,
    },
    // TODO add validation
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },
    password: String,
  },
  { timestamps: true },
);

const User = model<IUser & Document>('User', userSchema);

export default User;
