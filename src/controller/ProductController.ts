import { Request, Response } from 'express';
import {
  ProductCategory,
  ProductModel,
  ProductInputDTO,
} from '../model/Product';
import { ProductBusiness } from '../business/ProductBusiness';
import { Authenticator } from '../services/Authenticator';
import { UserRole } from '../model/User';
import { UserDatabase } from '../data/UserDatabase';
import { validateId } from '../services/ObjectIdValidator';

export class ProductController {
  async createProduct(req: Request, res: Response) {
    try {
      const input: ProductInputDTO = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
      };

      const authenticator = new Authenticator();
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).send('Unauthorized, check token');
      }

      const role = authenticator.getData(token);

      if (role !== UserRole.MANAGER) {
        return res
          .status(401)
          .send(
            'Unauthorized, only manager has permission to create products '
          );
      }

      const userDatabase = new UserDatabase();
      const db = await userDatabase.getConnection();

      const { name } = req.body;
      if (await ProductModel.findOne({ name })) {
        return res.status(400).send('Product already exists');
      }
      const productBusiness = new ProductBusiness();
      await productBusiness.createProduct(input);

      res.status(201).send('Product created sucessfully');
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const authenticator = new Authenticator();
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).send('Unauthorized, check token');
      }

      const role = authenticator.getData(token);

      if (role !== UserRole.MANAGER) {
        return res
          .status(401)
          .send(
            'Unauthorized, only manager has permission to delete products '
          );
      }
      const id = req.params.id;

      const userDatabase = new UserDatabase();
      const db = await userDatabase.getConnection();

      const isObjectIdValid = validateId(id);

      if (!isObjectIdValid) {
        return res.status(400).send('Id is not a valid database Object Id');
      }

      const product = await ProductModel.findById(id).exec();
      if (!product) {
        return res.status(404).send("Product doesn't exist, check id provided");
      }

      await ProductModel.deleteOne({ _id: id }).exec();

      res.status(200).send('Sucess');
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
}
