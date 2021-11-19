import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import faker from 'faker';
import httpMocks from 'node-mocks-http';

import container from '@/ioc';
import TYPES from '@/constants/types';
import AuthRoutes from './AuthRoutes';
import config from '@/config';

jest.mock('express', () => ({
  Router: jest.fn().mockReturnValue({
    post: jest.fn(),
  }),
}));

describe('auth routes test', () => {
  it('should call Router() and intializeRoutes() immediately after instance creation', () => {
    expect.hasAssertions();

    // Arrange
    jest.spyOn(AuthRoutes.prototype, 'intializeRoutes');

    // Act
    const authRoutes = new AuthRoutes();

    // Assert
    expect(Router).toHaveBeenCalledTimes(1);
    expect(authRoutes.intializeRoutes).toHaveBeenCalledTimes(1);
  });

  describe('test AuthService.signUp() method', () => {
    it('should call AuthService.signUp() and return user', async () => {
      expect.hasAssertions();

      // Arrange
      const user = {
        userName: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email().toLowerCase(),
      };
      const tokens = {
        access: jwt.sign(user, config.accessTokenSalt),
        refresh: uuidv4(),
      };
      const authServiceMock = { signUp: jest.fn().mockReturnValue({ user, tokens }) };
      const { req, res } = httpMocks.createMocks({ body: user });
      container.rebind(TYPES.services.AuthService).toConstantValue(authServiceMock);
      const authRoutes = new AuthRoutes();

      // Act
      await authRoutes.signup(req, res);

      // Assert
      const data = res._getJSONData();
      expect(authServiceMock.signUp).toHaveBeenCalledWith(req.body);
      expect(res.statusCode).toBe(201);
      expect(data).toStrictEqual({ user, tokens });
    });
  });
});
