import { LeanDocument } from 'mongoose';
import { IAuction } from '@/interfaces/IAuction';

export interface IAuctionService {
  createAuction(auctionDTO: any): Promise<LeanDocument<IAuction>>;
  getAuction(id: string): Promise<LeanDocument<IAuction>>;
  patchAuction(id: string, auctionDTO: any): Promise<LeanDocument<IAuction>>;
  deleteAuction(id: string): void;
  manualStart(id: string): Promise<LeanDocument<IAuction>>;
}
