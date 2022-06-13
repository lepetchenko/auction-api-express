import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import config from '@/config';
import { IUserInputDTO } from '@/interfaces/IUser';

const fakeTokensCreator = (user: IUserInputDTO) => ({
  access: jwt.sign(user, config.accessTokenSalt),
  refresh: uuidv4(),
});

export default fakeTokensCreator;
