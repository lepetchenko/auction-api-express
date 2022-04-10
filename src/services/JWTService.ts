import { injectable, inject } from 'inversify';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import config from '@/config';
import { IUserDocument } from '@/interfaces/IUser';
import { IJWTService } from '@/interfaces/IJWTService';
import TYPES from '@/constants/types';
import { IRefreshTokenModel } from '@/interfaces/IRefreshToken';

@injectable()
export default class JWTService implements IJWTService {
  public constructor(
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

  public createAndStoreTokens = async ({ _id }: IUserDocument) => {
    const access = this.createAccessToken(_id);
    const refresh = this.createRefreshToken();

    await this.refreshTokenModel.create({
      user: _id,
      token: refresh,
      expiresAt: new Date(Date.now() + config.refreshTokenLifeDuration),
    });

    return {
      access,
      refresh,
    };
  };
}
