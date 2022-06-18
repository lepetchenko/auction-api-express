import { IAuctionDocument, IAuctionDTO } from '@/interfaces/IAuction';
import { IUserDocument } from '@/interfaces/IUser';

export interface IAuctionController {
  createAuction(auctionDTO: IAuctionDTO, user: IUserDocument): Promise<IAuctionDocument>;
  getAuction(id: string): Promise<IAuctionDocument>;
  putAuction(id: string, auctionDTO: IAuctionDTO): Promise<IAuctionDocument>;
  deleteAuction(id: string): void;
  manualStart(id: string): Promise<IAuctionDocument>;
}
