import mongoose from 'mongoose';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import assert from 'assert';

import App from '@/App';

let mongoServer: MongoMemoryServer;

beforeEach(async () => {
  await mongoose.disconnect();
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

const routePrefix = '/auth';

describe('/auth routes', () => {
  const { app } = new App();

  const agent = request(app);

  const user = {
    userName: 'John',
    password: 'pass',
    email: 'john@gmail.com',
  };

  it(`POST ${routePrefix}/signup should create (register) user`, (done) => {
    agent
      .post(`${routePrefix}/signup`)
      .send(user)
      .expect(201)
      .then((response) => {
        const { user: resUser } = response.body;
        assert.equal(resUser.userName, user.userName);
        assert.equal(resUser.email, user.email);
        /** We should remove encrypted password from response */
        assert.equal(resUser.password, undefined);
        done();
      })
      .catch((err) => done(err));
  });

  it(`POST ${routePrefix}/signup with wrong data should return 422 status`, (done) => {
    agent
      .post(`${routePrefix}/signup`)
      .send({ ...user, userName: '' })
      .expect(422, done);
  });
});
