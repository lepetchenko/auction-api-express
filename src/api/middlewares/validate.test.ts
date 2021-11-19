import Joi from 'joi';
import { Boom } from '@hapi/boom';
import faker from 'faker';
import httpMocks from 'node-mocks-http';

import validate from '@/api/middlewares/validate';

const validationSchema = Joi.object({
  userName: Joi.string().required(),
});

describe('validate middleware test', () => {
  it('should once call next callback if validation is passed', () => {
    expect.hasAssertions();

    // Arrange
    const { req, res } = httpMocks.createMocks({ body: { userName: faker.internet.userName() } });
    const nextFunc = jest.fn();

    // Act
    validate(validationSchema, 'body')(req, res, nextFunc);

    // Assert
    expect(nextFunc).toHaveBeenCalledTimes(1);
  });

  it('should throw Boom error if body is empty', () => {
    expect.hasAssertions();

    // Arrange
    const { req, res } = httpMocks.createMocks();
    const nextFunc = jest.fn();

    // Act
    const toValidate = () => validate(validationSchema, 'body')(req, res, nextFunc);

    // Assert
    expect(toValidate).toThrow(Boom);
    expect(toValidate).toThrow('"userName" is required');
  });

  it('should throw Boom error if body does not correspond to validation schema', () => {
    expect.hasAssertions();

    // Arrange
    const { req, res } = httpMocks.createMocks({ body: { userName: '' } });
    const nextFunc = jest.fn();

    // Act
    const toValidate = () => validate(validationSchema, 'body')(req, res, nextFunc);

    // Assert
    expect(toValidate).toThrow(Boom);
    expect(toValidate).toThrow('"userName" is not allowed to be empty');
  });
});
