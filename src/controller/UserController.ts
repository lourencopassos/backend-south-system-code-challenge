import { Request, Response } from 'express';
import {
  UserInputDTO,
  LoginInputDTO,
  UserRole,
  UserModel,
} from '../model/User';
import { UserBusiness } from '../business/UserBusiness';
import { Authenticator } from '../services/Authenticator';
import { UserDatabase } from '../data/UserDatabase';

export class UserController {
  async signup(req: Request, res: Response) {
    try {
      const input: UserInputDTO = {
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
      };

      const userDatabase = new UserDatabase();
      const db = userDatabase.getConnection();

      const userExists = await UserModel.findOne({
        username: req.body.username,
      }).exec();

      if (userExists) {
        return res.status(400).send('Username already choosen  ');
      }

      const userBusiness = new UserBusiness();
      const newUser = await userBusiness.createUser(input);

      const authenticator = new Authenticator();
      const token = authenticator.generateToken(input.role as UserRole);
      res.status(201).send({ token });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const loginData: LoginInputDTO = {
        username: req.body.username,
        password: req.body.password,
      };

      const userDatabase = new UserDatabase();
      const db = userDatabase.getConnection();

      const user = await UserModel.findOne({
        username: req.body.username,
      }).exec();

      if (!user) {
        return res.status(404).send("User doesn't exist");
      }

      const userBusiness = new UserBusiness();
      const token = await userBusiness.getUserByUsername(loginData);

      res.status(200).send({ token });
    } catch (error) {
      res.status(401).send({ error: error.message });
    }
  }
}
