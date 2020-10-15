import { UserInputDTO, LoginInputDTO } from '../model/User';
import { UserDatabase } from '../data/UserDatabase';
import { HashManager } from '../services/HashManager';
import { Authenticator } from '../services/Authenticator';

export class UserBusiness {
  async createUser(user: UserInputDTO) {
    const userDatabase = new UserDatabase();
    if (!user.username || !user.password || !user.role) {
      throw new Error('Username,password and role are mandatory fields');
    }
    await userDatabase.createUser(user.username, user.password, user.role);
  }

  async getUserByEmail(user: LoginInputDTO) {}
}
