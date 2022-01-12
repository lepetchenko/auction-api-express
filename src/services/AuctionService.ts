import { injectable, inject } from 'inversify';
import { notFound } from '@hapi/boom';

import TYPES from '@/constants/types';
import EVENTS from '@/constants/events';
import { IAuctionService } from '@/interfaces/IAuctionService';
import { IAuctionModel } from '@/interfaces/IAuction';
import { IEventBus } from '@/interfaces/IEventBus';

@injectable()
export default class AuctionService implements IAuctionService {
  public constructor(
    // eslint-disable-next-line @typescript-eslint/indent
    @inject(TYPES.models.AuctionModel) private auctionModel: IAuctionModel,
    @inject(TYPES.decorators.EventBus) private eventBus: IEventBus,
  ) {
    this.auctionModel = auctionModel;
    this.eventBus = eventBus;
  }

  public createAuction = async (auctionDTO: any) => this.auctionModel.create(auctionDTO);

  public getAuction = async (id: string) => {
    const auction = await this.auctionModel.findOne({ _id: id });

    // TODO add middleware for checking document existence
    if (!auction) {
      throw notFound('Auction not found');
    }

    return auction;
  };

  public patchAuction = async (id: string, auctionDTO: any) => {
    const auction = await this.auctionModel.findOne({ _id: id });

    // TODO add middleware for checking document existence
    if (!auction) {
      throw notFound('Auction not found');
    }

    await auction.overwrite({ ...auction, ...auctionDTO });
    const updatedAuction = await auction.save();

    this.eventBus.emit(EVENTS.auction.update, updatedAuction);

    return updatedAuction;
  };

  public deleteAuction = async (id: string) => {
    const auction = await this.auctionModel.findOne({ _id: id });

    // TODO add middleware for checking document existence
    if (!auction) {
      throw notFound('Auction not found');
    }

    await auction.remove();

    return;
  };

  public manualStart = async (id: string) => {
    const auction = await this.auctionModel.findOne({ _id: id });

    // TODO add middleware for checking document existence
    if (!auction) {
      throw notFound('Auction not found');
    }

    await auction.overwrite({ ...auction, startedAt: new Date() });
    const updatedAuction = await auction.save();

    this.eventBus.emit(EVENTS.auction.start, updatedAuction);

    return updatedAuction;
  };
}
