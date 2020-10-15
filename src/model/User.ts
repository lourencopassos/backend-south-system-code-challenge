import mongoose, { Schema, Document } from 'mongoose';
import joi from 'joi';
import { HashManager } from '../services/HashManager';

export enum UserRole {
  CLIENT = 'client',
  MANAGER = 'manager',
}

export const UserSchema: Schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: 'Username required',
    lowercase: true,
  },
  password: {
    type: String,
    required: 'Password required',
  },
  role: {
    type: UserRole,
    lowercase: true,
    required: 'User Role required',
  },
});

export interface UserInputDTO {
  password: string;
  username: string;
  role: UserRole;
}

export interface LoginInputDTO {
  email: string;
  password: string;
}

export const stringToRole = (input: string) => {
  switch (input) {
    case 'client':
      return UserRole.CLIENT;
    case 'manager':
      return UserRole.MANAGER;
    default:
      throw new Error('Invalid Role');
  }
};

// export const toUserModel(user: any): typeof UserSchema {
//   return UserSchema(user.username,user.password,stringToRole(user.role))
// }

UserSchema.pre<UserInputDTO & Document>('save', async function (next) {
  const hashManager = new HashManager();
  const hashPassword = await hashManager.hash(this.password);
  this.password = hashPassword;
  next();
});

export const UserModel = mongoose.model('Users', UserSchema);
