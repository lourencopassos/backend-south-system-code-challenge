import { ProductBusiness } from '../../src/business/ProductBusiness';
import { ProductDatabase } from '../../src/data/ProductDatabase';
import { ProductCategory, ProductInputDTO } from '../../src/model/Product';

describe('Testing product creation in business layer', () => {
  let productDatabase = {
    createProduct: jest.fn((prodcut: ProductInputDTO) => {}),
  };

  test("It should return an error, when there's no product name provided", async () => {
    try {
      const product: ProductInputDTO = {
        name: '',
        price: 10,
        quantity: 2,
        category: ProductCategory.ELECTRONIC,
      };
      const productBusiness = new ProductBusiness();
      await productBusiness.createProduct(product);
    } catch (error) {
      expect(error.errorCode).toBe(422);
      expect(error.message).toEqual(
        'Product name,price and category are mandatory fields'
      );
    }
  });

  test('It should return an error, when the product quantity provided is a negative number', async () => {
    try {
      const product: ProductInputDTO = {
        name: 'Product',
        price: 10,
        quantity: -100,
        category: ProductCategory.ELECTRONIC,
      };

      const productBusiness = new ProductBusiness();
      await productBusiness.createProduct(product);
    } catch (error) {
      expect(error.errorCode).toBe(422);
      expect(error.message).toEqual('Product quantity must over or equal zero');
    }
  });

  test('It should return an error, when the product price provided is zero', async () => {
    try {
      const product: ProductInputDTO = {
        name: 'Product',
        price: 0,
        quantity: 1,
        category: ProductCategory.ELECTRONIC,
      };

      const productBusiness = new ProductBusiness();
      await productBusiness.createProduct(product);
    } catch (error) {
      expect(error.errorCode).toBe(422);
      expect(error.message).toEqual(
        'Product name,price and category are mandatory fields'
      );
    }
  });
  test('It should return an error, when the product price provided is negative', async () => {
    try {
      const product: ProductInputDTO = {
        name: 'Product',
        price: -5,
        quantity: 1,
        category: ProductCategory.ELECTRONIC,
      };

      const productBusiness = new ProductBusiness();
      await productBusiness.createProduct(product);
    } catch (error) {
      expect(error.errorCode).toBe(422);
      expect(error.message).toEqual('Product price must over zero');
    }
  });
  test('It should call the database service after receiving the product inputs', async () => {
    try {
      const product: ProductInputDTO = {
        name: 'Product',
        price: 1,
        quantity: 1,
        category: ProductCategory.ELECTRONIC,
      };
      const productBusiness = new ProductBusiness();
      await productBusiness.createProduct(product);
      expect(productDatabase.createProduct).toBeCalledWith(product);
    } catch (error) {}
  });
});
