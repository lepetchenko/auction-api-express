import { Response } from 'express';
import { boomify } from '@hapi/boom';

import { mockResponse, mockRequest } from '@/tests/mocks/express';
import handleError from '@/api/middlewares/handleError';

const boomError = boomify(new Error(), { message: 'boom error', statusCode: 404 });

describe('handleError middleware test', () => {
  it('should 500 if unknown error', () => {
    expect.hasAssertions();

    // Arrange
    const req = mockRequest();
    const res = mockResponse();
    const mockError = new Error();

    // Act
    handleError(mockError, req, res as Response, jest.fn());

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal sever error' });
  });

  it('should pass code and message from Boom error', () => {
    expect.hasAssertions();

    // Arrange
    const req = mockRequest();
    const res = mockResponse();

    // Act
    handleError(boomError, req, res as Response, jest.fn());

    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'boom error' });
  });
});
