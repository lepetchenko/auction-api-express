import { injectable, inject } from 'inversify';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { LeanDocument } from 'mongoose';

import config from '@/config';
import { IUser } from '@/interfaces/IUser';
import { IJWTService } from '@/interfaces/IJWTService';
import TYPES from '@/constants/types';
import { IRefreshTokenModel } from '@/interfaces/IRefreshToken';

@injectable()
export default class JWTService implements IJWTService {
  public constructor(
  // eslint-disable-next-line @typescript-eslint/indent
    @inject(TYPES.models.RefreshToken) private refreshTokenModel: IRefreshTokenModel,
  ) {
    this.refreshTokenModel = refreshTokenModel;
  }

  public createAccessToken = (userId: number): string => jwt.sign(
    { userId },
    config.accessTokenSalt,
    { expiresIn: config.accessTokenLifeDuration },
  );

  public createRefreshToken = (): string => uuidv4();

  public createAndStoreTokens = async ({ id }: LeanDocument<IUser>) => {
    const access = this.createAccessToken(id);
    const refresh = this.createRefreshToken();

    await this.refreshTokenModel.create({
      userId: id,
      token: refresh,
      expiresAt: new Date(Date.now() + config.refreshTokenLifeDuration),
    });

    return {
      access,
      refresh,
    };
  };
}
