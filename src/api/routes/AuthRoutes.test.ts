import httpMocks from 'node-mocks-http';

import container from '@/ioc';
import TYPES from '@/constants/types';
import { IAuthRoutes } from '@/interfaces/IAuthRoutes';
import { IUserInputDTO } from '@/interfaces/IUser';
import { ITokens } from '@/interfaces/IJWTService';
import { IAuthController } from '@/interfaces/IAuthController';
import authControllerMockCreator from '@/tests/mocks/authControllerMockCreator';
import fakeUserCreator from '@/tests/mocks/fakeUserCreator';
import fakeTokensCreator from '@/tests/mocks/fakeTokensCreator';

let user: IUserInputDTO;
let tokens: ITokens;
let authControllerMock: jest.Mocked<IAuthController>;

describe('auth routes test', () => {
  beforeEach(() => {
    user = fakeUserCreator();
    tokens = fakeTokensCreator(user);

    authControllerMock = authControllerMockCreator({ user, tokens });
    container.rebind(TYPES.controllers.AuthController).toConstantValue(authControllerMock);
  });

  describe('test AuthController.signUp() method', () => {
    it('should call AuthController.signUp() and return user', async () => {
      expect.hasAssertions();

      // Arrange
      const { req, res } = httpMocks.createMocks({ body: user });
      const authRoutes = container.get<IAuthRoutes>(TYPES.routes.AuthRoutes);

      // Act
      await authRoutes.signup(req, res);

      // Assert
      const data = res._getJSONData();
      expect(authControllerMock.signUp).toHaveBeenCalledWith(req.body);
      expect(res.statusCode).toBe(201);
      expect(data).toStrictEqual({ user, tokens });
    });
  });

  describe('test AuthController.signIn() method', () => {
    it('should call AuthController.signIn() and return user', async () => {
      expect.hasAssertions();

      // Arrange
      const { req, res } = httpMocks.createMocks({ body: user });
      const authRoutes = container.get<IAuthRoutes>(TYPES.routes.AuthRoutes);

      // Act
      await authRoutes.signin(req, res);

      // Assert
      const data = res._getJSONData();
      expect(authControllerMock.signIn).toHaveBeenCalledWith(req.body);
      expect(res.statusCode).toBe(200);
      expect(data).toStrictEqual({ user, tokens });
    });
  });
});
