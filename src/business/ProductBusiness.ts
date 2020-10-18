import { Authenticator } from '../services/Authenticator';
import { ProductDatabase } from '../data/ProductDatabase';
import {
  ProductCategory,
  ProductEditDTO,
  ProductInputDTO,
} from '../model/Product';
import { InvalidParameterError } from '../errors/InvalidParameterError';
export class ProductBusiness {
  async createProduct(product: ProductInputDTO) {
    const productDatabase = new ProductDatabase();

    if (!product.name || !product.category || !product.price) {
      throw new InvalidParameterError(
        'Product name,price and category are mandatory fields'
      );
    }

    if (product.quantity < 0) {
      throw new InvalidParameterError(
        'Product quantity must over or equal zero'
      );
    }

    if (product.price < 0) {
      throw new InvalidParameterError('Product price must over zero');
    }

    if (isNaN(product.price)) {
      throw new InvalidParameterError('Price and category must be numbers');
    }

    if (isNaN(product.quantity)) {
      throw new InvalidParameterError('Price and category must be numbers');
    }

    if (product.name.length < 2) {
      throw new InvalidParameterError(
        'Product name,price and category are mandatory fields'
      );
    }

    if (
      product.category !== ProductCategory.ELECTRONIC &&
      product.category !== ProductCategory.TOY &&
      product.category !== ProductCategory.APPAREL
    ) {
      throw new InvalidParameterError(
        'Invalid Product category. Category supported: electronic, toy or apparel'
      );
    }

    const newProduct = await productDatabase.createProduct(
      product.name,
      product.category,
      product.price,
      product.quantity
    );
  }

  async updateProductCategory(category: ProductCategory, id: string) {
    if (
      category !== ProductCategory.ELECTRONIC &&
      category !== ProductCategory.TOY &&
      category !== ProductCategory.APPAREL
    ) {
      throw new InvalidParameterError(
        'Invalid Product category. Category supported: electronic, toy or apparel'
      );
    }
    const productDatabase = new ProductDatabase();
    await productDatabase.editProductCategory(category, id);
  }

  async updateProductName(name: string, id: string) {
    const productDatabase = new ProductDatabase();
    await productDatabase.editProductName(name, id);
  }

  async updateProductPrice(price: number, id: string) {
    const productDatabase = new ProductDatabase();
    if (isNaN(price)) {
      throw new InvalidParameterError('Price and category must be numbers');
    }
    if (price <= 0) {
      throw new InvalidParameterError('Price must be at least 1');
    }
    await productDatabase.editProductPrice(price, id);
  }

  async updateProductQuantity(quantity: number, id: string) {
    const productDatabase = new ProductDatabase();
    if (isNaN(quantity)) {
      throw new InvalidParameterError('Price and category must be numbers');
    }
    if (quantity < 0) {
      throw new InvalidParameterError('Quantity can not be negative value');
    }
    await productDatabase.editProductQuantity(quantity, id);
  }

  async getAllProducts(skip: number, limit: number) {
    const productDatabase = new ProductDatabase();
    const products = await productDatabase.getAllProducts(skip, limit);
    return products;
  }

  async getAllAvailableProducts(skip: number, limit: number) {
    const productDatabase = new ProductDatabase();
    const products = await productDatabase.getAvailableProducts(skip, limit);
    return products;
  }

  async getProductByName(name: string, limit: number, skip: number) {
    if (!name) {
      throw new InvalidParameterError('Check product name');
    }
    const productDatabase = new ProductDatabase();
    const product = await productDatabase.getProductByName(name, limit, skip);
    return product;
  }

  async getProductById(id: string) {
    if (!id) {
      throw new InvalidParameterError('Check product id');
    }
    const productDatabase = new ProductDatabase();
    const product = await productDatabase.getProductById(id);
    return product;
  }
}
