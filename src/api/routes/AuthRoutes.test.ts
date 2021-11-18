import { Router, Response } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { mockResponse, mockRequest } from '@/tests/mocks/express';
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
    jest.spyOn(AuthRoutes.prototype, 'intializeRoutes');
    const authRoutes = new AuthRoutes();
    expect(Router).toHaveBeenCalledTimes(1);
    expect(authRoutes.intializeRoutes).toHaveBeenCalledTimes(1);
  });

  it('should call AuthSercive.signUp() and return user', async () => {
    expect.hasAssertions();
    const user = { userName: 'John', email: 'test@test.com', password: 'pass' };
    const tokens = {
      access: jwt.sign(user, config.accessTokenSalt),
      refresh: uuidv4(),
    };
    const authServiceMock = { signUp: jest.fn().mockReturnValue({ user, tokens }) };
    const req = mockRequest({ body: user });
    const res = mockResponse();
    container.rebind(TYPES.services.AuthService).toConstantValue(authServiceMock);
    const authRoutes = new AuthRoutes();
    await authRoutes.signup(req, res as Response);
    expect(authServiceMock.signUp).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ user, tokens }));
  });
});
