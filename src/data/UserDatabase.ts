import { BaseDatabase } from './BaseDatabase';
import { UserModel, UserRole } from '../model/User';

export class UserDatabase extends BaseDatabase {
  public createUser = async (
    username: string,
    password: string,
    role: UserRole
  ) => {
    try {
      await this.getConnection();
      new UserModel({
        username: username,
        password: password,
        role: role,
      }).save();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  public async getUserByUsername(username: string): Promise<any> {
    await this.getConnection();
    const result = await UserModel.findOne({ username });
    return result;
  }
}
