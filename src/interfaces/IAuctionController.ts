import { IAuctionDocument } from '@/interfaces/IAuction';

export interface IAuctionController {
  createAuction(auctionDTO: any): Promise<IAuctionDocument>;
  getAuction(id: string): Promise<IAuctionDocument>;
  putAuction(id: string, auctionDTO: any): Promise<IAuctionDocument>;
  deleteAuction(id: string): void;
  manualStart(id: string): Promise<IAuctionDocument>;
}
