import { Request, Response } from 'express';
import { UserInputDTO, LoginInputDTO } from '../model/User';
import { UserBusiness } from '../business/UserBusiness';
import { BaseDatabase } from '../data/BaseDatabase';

export class UserController {
  async signup(req: Request, res: Response) {
    try {
      //   const input: UserInputDTO = {
      //     username: req.body.username,
      //     password: req.body.password,
      //     role: req.body.role,
      //   };

      res.status(200).send({});
    } catch (error) {
      res.status(400).send({ error: error.message });
    }

    await BaseDatabase.destroyConnection();
  }

  async login(req: Request, res: Response) {
    try {
      res.status(200).send({});
    } catch (error) {
      res.status(400).send({ error: error.message });
    }

    await BaseDatabase.destroyConnection();
  }
}
