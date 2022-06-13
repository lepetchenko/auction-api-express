import { IUserDocument } from '@/interfaces/IUser';

export interface ITokens { access: string, refresh: string }

export interface IJWTService {
  createAccessToken(userId: number): string;
  createRefreshToken(): string;
  createAndStoreTokens(user: IUserDocument): Promise<ITokens>;
}
