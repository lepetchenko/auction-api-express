import { IUser } from '@/interfaces/IUser';

export interface IJWTService {
  createAccessToken(userId: number): string;
  createRefreshToken(): string;
  createAndStoreTokens(user: IUser): Promise<{ access: string, refresh: string }>;
}
