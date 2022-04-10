import { Schema, model } from 'mongoose';

import { IAuctionDocument, IAuctionModel } from '@/interfaces/IAuction';

const auctionSchema = new Schema<IAuctionDocument, IAuctionModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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

const Auction = model<IAuctionDocument, IAuctionModel>('Auction', auctionSchema);

export default Auction;
