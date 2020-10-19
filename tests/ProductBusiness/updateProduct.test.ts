import { ProductBusiness } from '../../src/business/ProductBusiness';
import {
  ProductCategory,
  ProductInputDTO,
  ProductEditDTO,
} from '../../src/model/Product';
import { UserRole } from '../../src/model/User';

describe('Testing product update in business layer', () => {
  let productDatabase = {
    updateProduct: jest.fn((product: ProductEditDTO) => {}),
  };
  test('It should return an error when you try to update a product category', async () => {
    try {
      const product: ProductEditDTO = {
        category: 'category' as ProductCategory,
      };
      const productBusiness = new ProductBusiness();
      await productBusiness.updateProductCategory(
        product.category as ProductCategory,
        'id'
      );
    } catch (error) {
      expect(error.errorCode).toBe(422);
      expect(error.message).toEqual(
        'Invalid Product category. Category supported: electronic, toy or apparel'
      );
    }
  });
  test('It should return an error when you try to update a product price with a string parameter', async () => {
    try {
      const product: ProductEditDTO = {
        price: ('price' as unknown) as number,
      };
      const productBusiness = new ProductBusiness();
      await productBusiness.updateProductPrice(product.price as number, 'id');
    } catch (error) {
      expect(error.errorCode).toBe(422);
      expect(error.message).toEqual('Price and category must be numbers');
    }
  });
  test('It should return an error when you try to update a product quantity with a negative value', async () => {
    try {
      const product: ProductEditDTO = {
        quantity: -1 as number,
      };
      const productBusiness = new ProductBusiness();
      await productBusiness.updateProductQuantity(
        product.quantity as number,
        'id'
      );
    } catch (error) {
      expect(error.errorCode).toBe(422);
      expect(error.message).toEqual('Quantity can not be negative value');
    }
  });
});
