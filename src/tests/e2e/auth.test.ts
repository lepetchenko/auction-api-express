import request from 'supertest';
import jwt from 'jsonwebtoken';
import { validate as uuidValidate } from 'uuid';
import faker from 'faker';

import { connect, disconnect } from '@/tests/setup/mongoose';
import App from '@/App';
import config from '@/config';

const routePrefix = '/auth';
const signupRoute = `${routePrefix}/signup`;

describe(`${routePrefix} routes`, () => {
  beforeEach(connect);

  afterEach(disconnect);

  const { app } = new App();

  describe(`${signupRoute} routes`, () => {
    it(`POST ${signupRoute} should create (register) user`, async () => {
      expect.hasAssertions();

      // Arrange
      const user = {
        userName: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email().toLowerCase(),
      };

      // Act
      const response = await request(app)
        .post(signupRoute)
        .send(user)
        .expect(201);

      // Assert
      const { user: resUser, tokens: { access, refresh } } = response.body;
      expect(resUser.userName).toBe(user.userName);
      expect(resUser.email).toBe(user.email);
      /** Encrypted password should be removed from response */
      expect(resUser.password).toBeUndefined();
      expect(jwt.verify(access, config.accessTokenSalt)).toBeTruthy();
      /** Should be valid uuid */
      expect(uuidValidate(refresh)).toBeTruthy();
    });

    it(`POST ${routePrefix}/signup with wrong data should return 422 status`, async () => {
      expect.hasAssertions();

      // Arrange
      const user = {
        userName: '',
        password: faker.internet.password(),
        email: faker.internet.email(),
      };

      // Act
      const response = await request(app)
        .post(signupRoute)
        .send(user)
        .expect(422);

      // Assert
      expect(response.body).toStrictEqual({ message: '"userName" is not allowed to be empty' });
    });
  });
});
