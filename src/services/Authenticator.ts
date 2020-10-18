import * as jwt from 'jsonwebtoken';
import { UserRole, stringToRole } from '../model/User';

export class Authenticator {
  public generateToken(
    input: UserRole,
    expiresIn: string = process.env.ACCESS_TOKEN_EXPIRES_IN!
  ): string {
    const token = jwt.sign(
      {
        role: input,
      },
      process.env.JWT_KEY as string,
      {
        expiresIn,
      }
    );
    return token;
  }

  public getData(token: string): UserRole {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = stringToRole(payload.role);
    return result;
  }
}

export interface AuthenticationData {
  role: UserRole;
}
