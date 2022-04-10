import { Schema, model } from 'mongoose';

import { IRefreshTokenDocument } from '@/interfaces/IRefreshToken';

const refreshTokenSchema = new Schema<IRefreshTokenDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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

const RefreshToken = model<IRefreshTokenDocument>('RefreshToken', refreshTokenSchema);

export default RefreshToken;
