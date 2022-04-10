import { IUserDocument } from '@/interfaces/IUser';

export interface IJWTService {
  createAccessToken(userId: number): string;
  createRefreshToken(): string;
  createAndStoreTokens(user: IUserDocument): Promise<{ access: string, refresh: string }>;
}
