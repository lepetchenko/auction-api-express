import { boomify } from '@hapi/boom';
import httpMocks from 'node-mocks-http';

import handleError from '@/api/middlewares/handleError';

describe('handleError middleware test', () => {
  it('should 500 if unknown error', () => {
    expect.hasAssertions();

    // Arrange
    const mockError = new Error();
    const { req, res } = httpMocks.createMocks();
    const nextFn = jest.fn();

    // Act
    handleError(mockError, req, res, nextFn);

    // Assert
    const data = res._getJSONData();
    expect(res.statusCode).toBe(500);
    expect(data).toStrictEqual({ message: 'Internal sever error' });
  });

  it('should pass code and message from Boom error', () => {
    expect.hasAssertions();

    // Arrange
    const errorMessage = 'boom error';
    const errorStatusCode = 404;
    const boomError = boomify(new Error(), { message: errorMessage, statusCode: errorStatusCode });
    const { req, res } = httpMocks.createMocks();
    const nextFn = jest.fn();

    // Act
    handleError(boomError, req, res, nextFn);

    // Assert
    const data = res._getJSONData();
    expect(res.statusCode).toBe(errorStatusCode);
    expect(data).toStrictEqual({ message: errorMessage });
  });
});
