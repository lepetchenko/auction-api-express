import { Schema, model } from 'mongoose';

import { IRefreshToken } from '@/interfaces/IRefreshToken';

const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

const RefreshToken = model<IRefreshToken>('RefreshToken', refreshTokenSchema);

export default RefreshToken;
