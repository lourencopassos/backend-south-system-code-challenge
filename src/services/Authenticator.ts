import * as jwt from 'jsonwebtoken';
import { UserRole } from '../model/User';

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

  public getData(token: string): AuthenticationData {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = {
      role: payload.role,
    };
    return result;
  }
}

export interface AuthenticationData {
  role: UserRole;
}
