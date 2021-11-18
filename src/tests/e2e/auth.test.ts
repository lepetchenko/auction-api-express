import request from 'supertest';
import jwt from 'jsonwebtoken';
import { validate as uuidValidate } from 'uuid';

import { connect, disconnect } from '@/tests/setup/mongoose';
import App from '@/App';
import config from '@/config';

const routePrefix = '/auth';

describe('/auth routes', () => {
  beforeEach(connect);

  afterEach(disconnect);

  const { app } = new App();

  const agent = request(app);

  const user = {
    userName: 'John',
    password: 'pass',
    email: 'john@gmail.com',
  };

  it(`POST ${routePrefix}/signup should create (register) user`, async () => {
    expect.hasAssertions();
    const response = await agent
      .post(`${routePrefix}/signup`)
      .send(user)
      .expect(201);

    const { user: resUser, tokens: { access, refresh } } = response.body;
    expect(resUser.userName).toBe(user.userName);
    expect(resUser.email).toBe(user.email);
    /** We should remove encrypted password from response */
    expect(resUser.password).toBeUndefined();

    expect(jwt.verify(access, config.accessTokenSalt)).toBeTruthy();
    /** Should be valid uuid */
    expect(uuidValidate(refresh)).toBeTruthy();
  });

  it(`POST ${routePrefix}/signup with wrong data should return 422 status`, async () => {
    expect.hasAssertions();
    const response = await agent
      .post(`${routePrefix}/signup`)
      .send({ ...user, userName: '' })
      .expect(422);

    const { message } = response.body;
    expect(message).toBe('"userName" is not allowed to be empty');
  });
});
