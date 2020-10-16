import { ProductCategory, ProductModel } from '../model/Product';
import { BaseDatabase } from './BaseDatabase';

export class ProductDatabase extends BaseDatabase {
  public createProduct = async (
    name: string,
    category: ProductCategory,
    price: number
  ) => {
    try {
      const newProduct = await this.getConnection();
      new ProductModel({
        name,
        category,
        price,
      }).save();
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
