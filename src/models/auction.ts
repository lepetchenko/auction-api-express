import { Schema, model } from 'mongoose';

import { IAuction } from '@/interfaces/IAuction';

const auctionSchema = new Schema<IAuction>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    scheduledStart: {
      type: Date,
      default: null,
    },
    startedAt: {
      type: Date,
      default: null,
    },
    initialPrice: {
      type: Number,
      required: true,
    },
    actualPrice: {
      type: Number,
      default: 0,
    },
    bidStep: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Auction = model<IAuction>('Auction', auctionSchema);

export default Auction;
