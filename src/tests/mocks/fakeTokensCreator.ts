import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import config from '@/config';
import { IUserInputDTO } from '@/interfaces/IUser';

const fakeTokensCreator = (user: IUserInputDTO, options: SignOptions = {}) => ({
  access: jwt.sign(user, config.accessTokenSalt, options),
  refresh: uuidv4(),
});

export default fakeTokensCreator;
