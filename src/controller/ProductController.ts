import { Request, Response } from 'express';
import {
  ProductCategory,
  ProductModel,
  ProductInputDTO,
} from '../model/Product';
import { ProductBusiness } from '../business/ProductBusiness';
import { Authenticator } from '../services/Authenticator';

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
        return res.status(401).send('Unauthorized   ');
      }

      const role = authenticator.getData(token);
      console.log(role);

      const { name } = req.body;
      if (await ProductModel.findOne({ name })) {
        return res.status(400).send('Product already exists');
      }
      const productBusiness = new ProductBusiness();
      const newProduct = await productBusiness.createProduct(input);
    } catch (error) {}
  }
}
