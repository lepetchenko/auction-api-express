import argon2 from 'argon2';

import { IUser, IUserInputDTO } from '@/interfaces/IUser';
import UserModel from '@/models/user';

export default class AuthService {
  // eslint-disable-next-line class-methods-use-this
  public async signUp(userInputDTO: IUserInputDTO): Promise<{ user: IUser }> {
    try {
      const { userName, password, email } = userInputDTO;
      const hashedPassword = await argon2.hash(password);
      const userRecord = await UserModel.create({
        userName,
        password: hashedPassword,
        email,
      });

      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');

      return { user };
    } catch (e) {
      // TODO add logger instead of console
      console.error(e);
      throw e;
    }
  }
}
