import request from 'supertest';
import jwt from 'jsonwebtoken';
import { validate as uuidValidate } from 'uuid';

import { connect, disconnect } from '@/tests/setup/mongoose';
import App from '@/App';
import config from '@/config';
import UserModel from '@/models/user';
import { IUserInputDTO } from '@/interfaces/IUser';
import fakeUserCreator from '@/tests/mocks/fakeUserCreator';

const routePrefix = '/auth';
const signupRoute = `${routePrefix}/signup`;
const signinRoute = `${routePrefix}/signin`;

let user: IUserInputDTO;

describe(`${routePrefix} routes`, () => {
  beforeEach(async () => {
    await connect();
    user = fakeUserCreator();
  });

  afterEach(async () => {
    await disconnect();
  });

  const { app } = App;

  describe(`${signupRoute} routes`, () => {
    it(`POST ${signupRoute} should create (register) user`, async () => {
      expect.hasAssertions();

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
      /** Empty userName is not acceptable */
      user.userName = '';

      // Act
      const response = await request(app)
        .post(signupRoute)
        .send(user)
        .expect(422);

      // Assert
      expect(response.body).toStrictEqual({ message: '\'userName\' is not allowed to be empty' });
    });
  });

  describe(`${signinRoute} routes`, () => {
    it(`POST ${signinRoute} should authenticate user (by email and password)`, async () => {
      expect.hasAssertions();

      // Arrange
      /** Insert user that will be used below */
      await UserModel.create(user);
      delete user.userName;

      // Act
      const response = await request(app)
        .post(signinRoute)
        .send(user)
        .expect(200);

      // Assert
      const { user: resUser, tokens: { access, refresh } } = response.body;
      expect(resUser.email).toBe(user.email);
      /** Encrypted password should be removed from response */
      expect(resUser.password).toBeUndefined();
      expect(jwt.verify(access, config.accessTokenSalt)).toBeTruthy();
      /** Should be valid uuid */
      expect(uuidValidate(refresh)).toBeTruthy();
    });

    it(`POST ${signinRoute} with wrong data should return 422 status`, async () => {
      expect.hasAssertions();

      // Arrange
      /** Empty userName is not acceptable */
      user.userName = '';

      // Act
      const response = await request(app)
        .post(signupRoute)
        .send(user)
        .expect(422);

      // Assert
      expect(response.body).toStrictEqual({ message: '\'userName\' is not allowed to be empty' });
    });

    it(`POST ${signinRoute} with data that doesn't correspond to any user should return 401 status`, async () => {
      expect.hasAssertions();

      // Arrange
      delete user.userName;

      // Act
      const response = await request(app)
        .post(signinRoute)
        .send(user)
        .expect(401);

      // Assert
      expect(response.statusCode).toBe(401);
      expect(response.unauthorized).toBeTruthy();
    });
  });
});
