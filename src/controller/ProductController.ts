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
        quantity: req.body.quantity,
      };

      const authenticator = new Authenticator();
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).send('Unauthorized, check token');
      }

      const role = authenticator.getData(token);

      if (role !== UserRole.MANAGER) {
        return res
          .status(403)
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
          .status(403)
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

  async updateProduct(req: Request, res: Response) {
    try {
      const authenticator = new Authenticator();
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).send('Unauthorized, check token');
      }

      const role = authenticator.getData(token);

      if (role !== UserRole.MANAGER) {
        return res
          .status(403)
          .send(
            'Unauthorized, only manager has permission to delete products '
          );
      }
      const id = req.params.id;

      const isObjectIdValid = validateId(id);

      if (!isObjectIdValid) {
        return res.status(400).send('Id is not a valid database Object Id');
      }

      const product = await ProductModel.findById(id).exec();
      if (!product) {
        return res.status(404).send("Product doesn't exist, check id provided");
      }

      if (req.body.category) {
        const productBusiness = new ProductBusiness();
        await productBusiness.updateProductCategory(req.body.category, id);
      }

      if (req.body.price) {
        const productBusiness = new ProductBusiness();
        await productBusiness.updateProductPrice(req.body.price, id);
      }

      if (req.body.name) {
        const productBusiness = new ProductBusiness();
        await productBusiness.updateProductName(req.body.name, id);
      }

      res.status(200).send('Product update sucess');
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async getAllProducts(req: Request, res: Response) {
    try {
      const authenticator = new Authenticator();
      const token = req.headers.authorization;
      const limit = Number(req.query.limit);
      const skip = Number(req.query.skip);

      if (!token) {
        return res.status(401).send('Unauthorized, check token');
      }

      const role = authenticator.getData(token);

      if (role !== UserRole.MANAGER) {
        return res
          .status(403)
          .send(
            'Unauthorized, only manager has permission to delete products '
          );
      }
      const productBusiness = new ProductBusiness();
      const products = await productBusiness.getAllProducts(skip, limit);
      res.status(200).send({ products: products, total: products.length });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async getAvailableProducts(req: Request, res: Response) {
    try {
      const authenticator = new Authenticator();
      const token = req.headers.authorization;
      const limit = Number(req.query.limit);
      const skip = Number(req.query.skip);

      if (!token) {
        return res.status(401).send('Unauthorized, check token');
      }

      const role = authenticator.getData(token);

      if (role !== UserRole.MANAGER) {
        return res
          .status(403)
          .send(
            'Unauthorized, only manager has permission to delete products '
          );
      }
      const productBusiness = new ProductBusiness();
      const products = await productBusiness.getAllAvailableProducts(
        skip,
        limit
      );
      res.status(200).send({ products: products, total: products.length });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  async getProductByName(req: Request, res: Response) {
    try {
      const authenticator = new Authenticator();
      const token = req.headers.authorization;

      const productName = req.query.name as string;

      if (!token) {
        return res.status(401).send('Unauthorized, check token');
      }

      const role = authenticator.getData(token);

      if (role !== UserRole.MANAGER) {
        return res
          .status(403)
          .send(
            'Unauthorized, only manager has permission to delete products '
          );
      }

      const productBusiness = new ProductBusiness();
      const product = await productBusiness.getProductByName(productName);
      res.status(200).send(product);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
}
