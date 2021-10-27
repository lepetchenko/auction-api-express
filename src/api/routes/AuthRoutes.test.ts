import { Router, Response } from 'express';

import { mockResponse, mockRequest } from '@/tests/mocks/express';
import container from '@/ioc';
import TYPES from '@/constants/types';
import AuthRoutes from './AuthRoutes';

jest.mock('express', () => ({
  Router: jest.fn().mockReturnValue({
    post: jest.fn(),
  }),
}));

describe('AuthRoutes test', () => {
  it('should call Router() and intializeRoutes() immediately after instance creation', () => {
    jest.spyOn(AuthRoutes.prototype, 'intializeRoutes');
    const authRoutes = new AuthRoutes();
    expect(Router).toHaveBeenCalledTimes(1);
    expect(authRoutes.intializeRoutes).toBeCalledTimes(1);
  });

  it('should call AuthSercive.signUp() and return user', async () => {
    const user = { userName: 'John', email: 'test@test.com', password: 'pass' };
    const authServiceMock = { signUp: jest.fn().mockReturnValue({ user }) };
    const req = mockRequest({ body: user });
    const res = mockResponse();
    container.rebind(TYPES.services.AuthService).toConstantValue(authServiceMock);
    const authRoutes = new AuthRoutes();
    await authRoutes.signup(req, res as Response);
    expect(authServiceMock.signUp).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ user });
  });
});
