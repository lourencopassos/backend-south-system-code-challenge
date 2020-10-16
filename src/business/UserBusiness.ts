import {
  UserInputDTO,
  LoginInputDTO,
  UserRole,
  stringToRole,
  UserSchema,
} from '../model/User';
import { UserDatabase } from '../data/UserDatabase';
import { HashManager } from '../services/HashManager';
import { Authenticator } from '../services/Authenticator';

export class UserBusiness {
  async createUser(user: UserInputDTO) {
    const userDatabase = new UserDatabase();
    if (!user.username || !user.password || !user.role) {
      throw new Error('Username,password and role are mandatory fields');
    }

    if (user.role !== UserRole.CLIENT && user.role !== UserRole.MANAGER) {
      throw new Error('Invalid Role. Roles supported: client or manager');
    }

    const newUser = await userDatabase.createUser(
      user.username,
      user.password,
      user.role
    );

    return newUser;
  }

  async getUserByUsername(user: LoginInputDTO) {
    const userDatabase = new UserDatabase();
    const userFromDb = await userDatabase.getUserByUsername(user.username);

    const hashManager = new HashManager();
    const hashCompare = await hashManager.compare(
      user.password,
      userFromDb.password
    );

    const authenticator = new Authenticator();
    const token = authenticator.generateToken(userFromDb.role);

    if (!hashCompare) {
      throw new Error('Invalid Password!');
    }

    return token;
  }
}
