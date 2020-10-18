import { ProductCategory, ProductModel } from '../model/Product';
import { BaseDatabase } from './BaseDatabase';

export class ProductDatabase extends BaseDatabase {
  public createProduct = async (
    name: string,
    category: ProductCategory,
    price: number,
    quantity: number
  ) => {
    try {
      const newProduct = await this.getConnection();
      new ProductModel({
        name,
        category,
        price,
        quantity,
      }).save();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  public editProductCategory = async (
    category: ProductCategory,
    id: string
  ) => {
    try {
      await this.getConnection();
      await ProductModel.findByIdAndUpdate(id, { category: category }).exec();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  public editProductPrice = async (price: number, id: string) => {
    try {
      await this.getConnection();
      await ProductModel.findByIdAndUpdate(id, { price: price }).exec();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  public editProductName = async (name: string, id: string) => {
    try {
      await this.getConnection();
      await ProductModel.findByIdAndUpdate(id, { name: name }).exec();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  public editProductQuantity = async (quantity: number, id: string) => {
    try {
      await this.getConnection();
      await ProductModel.findByIdAndUpdate(id, { quantity: quantity }).exec();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  public getAllProducts = async (skip: number, limit: number) => {
    try {
      await this.getConnection();

      const products = await ProductModel.find({})
        .skip(skip)
        .limit(limit)
        .exec();
      return products;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  public getAvailableProducts = async (skip: number, limit: number) => {
    try {
      await this.getConnection();
      const products = await ProductModel.find({ quantity: { $gte: 1 } })
        .skip(skip)
        .limit(limit)
        .exec();
      return products;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  public getProductByName = async (
    productName: string,
    limit: number,
    skip: number
  ) => {
    try {
      await this.getConnection();
      const product = await ProductModel.find({
        name: { $regex: `${productName}` },
      })
        .skip(skip)
        .limit(limit)
        .exec();

      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  public getProductById = async (id: string) => {
    try {
      await this.getConnection();
      const product = await ProductModel.findById(id);
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
