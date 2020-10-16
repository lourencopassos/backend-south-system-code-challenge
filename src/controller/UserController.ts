import { Request, Response } from 'express';
import {
  UserInputDTO,
  LoginInputDTO,
  UserRole,
  UserModel,
} from '../model/User';
import { UserBusiness } from '../business/UserBusiness';
import { Authenticator } from '../services/Authenticator';

export class UserController {
  async signup(req: Request, res: Response) {
    try {
      const input: UserInputDTO = {
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
      };

      const { username } = req.body;

      const userBusiness = new UserBusiness();
      const newUser = await userBusiness.createUser(input);

      const authenticator = new Authenticator();
      const token = authenticator.generateToken(input.role as UserRole);

      if (await UserModel.findOne({ username })) {
        return res.status(400).send('Username already choosen  ');
      }

      res.status(201).send({ token });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const loginData: LoginInputDTO = {
        username: req.body.username,
        password: req.body.password,
      };
      const { username } = req.body;

      const user = await UserModel.findOne({ username });

      if (!user) {
        return res.status(404).send("User doesn't exist");
      }

      const userBusiness = new UserBusiness();
      const token = await userBusiness.getUserByUsername(loginData);

      res.status(202).send({ token });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
}
