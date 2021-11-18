import { Response } from 'express';
import Joi from 'joi';
import { Boom } from '@hapi/boom';
import faker from 'faker';

import { mockResponse, mockRequest } from '@/tests/mocks/express';
import validate from '@/api/middlewares/validate';

const validationSchema = Joi.object({
  userName: Joi.string().required(),
});

describe('validate middleware test', () => {
  it('should once call next callback if validation is passed', () => {
    expect.hasAssertions();

    // Arrange
    const req = mockRequest({ body: { userName: faker.internet.userName() } });
    const res = mockResponse();
    const nextFunc = jest.fn();

    // Act
    validate(validationSchema, 'body')(req, res as Response, nextFunc);

    // Assert
    expect(nextFunc).toHaveBeenCalledTimes(1);
  });

  it('should throw Boom error if body is empty', () => {
    expect.hasAssertions();

    // Arrange
    const req = mockRequest({ body: {} });
    const res = mockResponse();
    const nextFunc = jest.fn();

    // Act
    const toValidate = () => validate(validationSchema, 'body')(req, res as Response, nextFunc);

    // Assert
    expect(toValidate).toThrow(Boom);
    expect(toValidate).toThrow('"userName" is required');
  });

  it('should throw Boom error if body does not correspond to validation schema', () => {
    expect.hasAssertions();

    // Arrange
    const req = mockRequest({ body: { userName: '' } });
    const res = mockResponse();
    const nextFunc = jest.fn();

    // Act
    const toValidate = () => validate(validationSchema, 'body')(req, res as Response, nextFunc);

    // Assert
    expect(toValidate).toThrow(Boom);
    expect(toValidate).toThrow('"userName" is not allowed to be empty');
  });
});
