import faker from 'faker';

const fakeUserCreator = () => ({
  userName: faker.internet.userName(),
  password: faker.internet.password(),
  email: faker.internet.email().toLowerCase(),
});

export default fakeUserCreator;
