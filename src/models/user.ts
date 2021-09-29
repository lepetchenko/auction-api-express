import mongoose from 'mongoose';

import { IUser } from '@/interfaces/IUser';

const User = new mongoose.Schema(
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

export default mongoose.model<IUser & mongoose.Document>('User', User);
