import { injectable, inject } from 'inversify';

import TYPES from '@/constants/types';
import EVENTS from '@/constants/events';
import { IAuctionController } from '@/interfaces/IAuctionController';
import { IAuctionModel, IAuctionDocument } from '@/interfaces/IAuction';
import { IEventBus } from '@/interfaces/IEventBus';
import CommonController from './CommonController';

@injectable()
export default class Auction extends CommonController implements IAuctionController {
  public constructor(
    @inject(TYPES.models.AuctionModel) private readonly auctionModel: IAuctionModel,
    @inject(TYPES.decorators.EventBus) private readonly eventBus: IEventBus,
  ) {
    super();
    this.auctionModel = auctionModel;
    this.eventBus = eventBus;
  }

  public createAuction = async (auctionDTO: any) => this.auctionModel.create(auctionDTO);

  public getAuction = async (id: string) => {
    const auction = await this.checkEntityExistence<IAuctionDocument>(this.auctionModel, id);

    return auction;
  };

  public putAuction = async (id: string, auctionDTO: any) => {
    const auction = await this.checkEntityExistence<IAuctionDocument>(this.auctionModel, id);

    await auction.overwrite({ ...auction, ...auctionDTO });
    const updatedAuction = await auction.save();

    this.eventBus.emit(EVENTS.auction.update, updatedAuction);

    return updatedAuction;
  };

  public deleteAuction = async (id: string) => {
    const auction = await this.checkEntityExistence<IAuctionDocument>(this.auctionModel, id);

    await auction.remove();

    return;
  };

  public manualStart = async (id: string) => {
    const auction = await this.checkEntityExistence<IAuctionDocument>(this.auctionModel, id);

    await auction.overwrite({ ...auction, startedAt: new Date() });
    const updatedAuction = await auction.save();

    this.eventBus.emit(EVENTS.auction.start, updatedAuction);

    return updatedAuction;
  };
}
