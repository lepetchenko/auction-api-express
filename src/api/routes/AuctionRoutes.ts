import { Router, Request, Response } from 'express';
import { injectable, inject } from 'inversify';

import TYPES from '@/constants/types';
import { IRoutes } from '@/interfaces/IRoutes';
import validate from '@/api/middlewares/validate';
import { errorWrap } from '@/common/utils';
import { IAuctionController } from '@/interfaces/IAuctionController';
import { auctionDataSchema, entityIdSchema } from '@/validation/schemas';

@injectable()
class AuthRoutes implements IRoutes {
  public router: Router = Router();

  constructor(
    @inject(TYPES.controllers.AuctionController) private auctionController: IAuctionController,
  ) {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create
    this.router.post(
      '/',
      validate(auctionDataSchema),
      errorWrap(this.createAuction),
    );

    // Read
    this.router.get(
      '/:id',
      validate(entityIdSchema, 'params'),
      errorWrap(this.getAuction),
    );

    // Update
    this.router.put(
      '/:id',
      validate(auctionDataSchema),
      validate(entityIdSchema, 'params'),
      errorWrap(this.putAuction),
    );

    // Delete
    this.router.delete(
      '/:id',
      validate(entityIdSchema, 'params'),
      errorWrap(this.deleteAuction),
    );
    // TODO add 'manualStart' handler
  }

  createAuction = async (req: Request, res: Response) => {
    const auction = await this.auctionController.createAuction(req.body);

    res.status(201).json(auction);
  };

  getAuction = async (req: Request, res: Response) => {
    const auction = await this.auctionController.getAuction(req.params.id);

    res.status(200).json(auction);
  };

  putAuction = async (req: Request, res: Response) => {
    const auction = await this.auctionController.putAuction(req.params.id, req.body);

    res.status(200).json(auction);
  };

  deleteAuction = async (req: Request, res: Response) => {
    await this.auctionController.deleteAuction(req.params.id);

    res.status(204).json({});
  };

  manualStart = async (req: Request, res: Response) => {
    const auction = await this.auctionController.manualStart(req.params.id);

    res.status(200).json(auction);
  };
}

export default AuthRoutes;
