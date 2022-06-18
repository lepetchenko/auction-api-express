import httpMocks from 'node-mocks-http';
import { unauthorized } from '@hapi/boom';

import attachUser from '@/api/middlewares/attachUser';
import fakeUserCreator from '@/tests/mocks/fakeUserCreator';
import fakeTokensCreator from '@/tests/mocks/fakeTokensCreator';
import modelMockCreator from '@/tests/mocks/modelMockCreator';
import container from '@/ioc';
import TYPES from '@/constants/types';

let nextFn: jest.Mock;

describe('attachUser middleware test', () => {
  beforeEach(() => {
    nextFn = jest.fn();
  });

  it('should attach user to req and once call next callback if user was found', async () => {
    expect.hasAssertions();

    // Arrange
    const user = fakeUserCreator();
    const tokens = fakeTokensCreator(user);
    const fakeModel = modelMockCreator({ methodName: 'findOne', returnValue: user });
    container.rebind(TYPES.models.UserModel).toConstantValue(fakeModel);

    const { req, res } = httpMocks.createMocks({
      headers: {
        Authorization: tokens.access,
      },
    });

    // Act
    await attachUser(req, res, nextFn);

    // Assert
    expect(req.user).toStrictEqual(user);
    expect(nextFn).toHaveBeenCalledTimes(1);
  });

  it('should call next() without any params if token not provided', async () => {
    expect.hasAssertions();

    // Arrange
    const { req, res } = httpMocks.createMocks({});

    // Act
    await attachUser(req, res, nextFn);

    // Assert
    expect(nextFn).toHaveBeenCalledTimes(1);
  });

  it('should call next() with error if token is invalid', async () => {
    expect.hasAssertions();

    // Arrange
    const { req, res } = httpMocks.createMocks({
      headers: {
        Authorization: 'invalid',
      },
    });

    // Act
    await attachUser(req, res, nextFn);

    // Assert
    expect(nextFn).toHaveBeenCalledTimes(1);
    expect(nextFn).toHaveBeenCalledWith(unauthorized('Invalid token'));
  });

  it('should call next() with error if token is expired', async () => {
    expect.hasAssertions();

    // Arrange
    const user = fakeUserCreator();
    const tokens = fakeTokensCreator(user, { expiresIn: -1 });
    const { req, res } = httpMocks.createMocks({
      headers: {
        Authorization: tokens.access,
      },
    });

    // Act
    await attachUser(req, res, nextFn);

    // Assert
    expect(nextFn).toHaveBeenCalledTimes(1);
    expect(nextFn).toHaveBeenCalledWith(unauthorized('Expired token'));
  });

  it('should call next() with unknown error that was thrown by other service', async () => {
    expect.hasAssertions();

    // Arrange
    const user = fakeUserCreator();
    const tokens = fakeTokensCreator(user);
    const error = new Error('unexpected error');
    const fakeModel = modelMockCreator({
      methodName: 'findOne',
      method: () => { throw error; },
    });
    container.rebind(TYPES.models.UserModel).toConstantValue(fakeModel);

    const { req, res } = httpMocks.createMocks({
      headers: {
        Authorization: tokens.access,
      },
    });

    // Act
    await attachUser(req, res, nextFn);

    // Assert
    expect(nextFn).toHaveBeenCalledTimes(1);
    expect(nextFn).toHaveBeenCalledWith(error);
  });
});
