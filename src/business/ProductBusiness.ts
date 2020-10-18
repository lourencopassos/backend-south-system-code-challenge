import { Authenticator } from '../services/Authenticator';
import { ProductDatabase } from '../data/ProductDatabase';
import {
  ProductCategory,
  ProductEditDTO,
  ProductInputDTO,
} from '../model/Product';

export class ProductBusiness {
  async createProduct(product: ProductInputDTO) {
    const productDatabase = new ProductDatabase();

    if (
      !product.name ||
      !product.category ||
      !product.price ||
      product.price < -1
    ) {
      throw new Error('Product name,price and category are mandatory fields');
    }

    if (product.name.length < 2) {
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
      throw new Error(
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
    await productDatabase.editProductPrice(price, id);
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

  async getProductByName(name: string) {
    if (!name) {
      throw new Error('Check product name');
    }
    const productDatabase = new ProductDatabase();
    const product = await productDatabase.getProductByName(name);
    return product;
  }

  async getProductById(id: string) {
    if (!id) {
      throw new Error('Check product id');
    }
    const productDatabase = new ProductDatabase();
    const product = await productDatabase.getProductById(id);
    return product;
  }
}
