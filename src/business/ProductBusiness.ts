import { Authenticator } from '../services/Authenticator';
import { ProductDatabase } from '../data/ProductDatabase';
import { ProductCategory, ProductInputDTO } from '../model/Product';

export class ProductBusiness {
  async createProduct(product: ProductInputDTO) {
    const productDatabase = new ProductDatabase();

    if (!product.name || !product.category || !product.price) {
      throw new Error('Product name,price and category are mandatory fields');
    }

    if (
      product.category !== ProductCategory.ELECTRONIC &&
      product.category !== ProductCategory.TOY &&
      product.category !== ProductCategory.APPAREL
    ) {
      throw new Error(
        'Invalid Product category. Category supported: electronic, toy or apparel'
      );
    }

    const newProduct = await productDatabase.createProduct(
      product.name,
      product.category,
      product.price
    );
  }
}
