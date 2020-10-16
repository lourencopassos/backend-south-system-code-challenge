import { Authenticator } from '../services/Authenticator';
import { ProductDatabase } from '../data/ProductDatabase';
import { ProductInputDTO } from '../model/Product';

export class ProductBusiness {
  async createProduct(product: ProductInputDTO) {
    const productDatabase = new ProductDatabase();

    if (!product.name || !product.category || !product.price) {
      throw new Error('Product name,price and category are mandatory fields');
    }

    const newProduct = await productDatabase.createProduct(
      product.name,
      product.category,
      product.price
    );

    return newProduct;
  }
}
