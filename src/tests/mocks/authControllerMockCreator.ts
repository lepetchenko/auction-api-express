import { IUserInputDTO } from '@/interfaces/IUser';
import { ITokens } from '@/interfaces/IJWTService';
import { IAuthController } from '@/interfaces/IAuthController';

const authControllerMockCreator = (
  { user, tokens }: { user: IUserInputDTO, tokens: ITokens },
): jest.Mocked<IAuthController> => ({
  signUp: jest.fn().mockReturnValue({ user, tokens }),
  signIn: jest.fn().mockReturnValue({ user, tokens }),
});

export default authControllerMockCreator;
