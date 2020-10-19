import { ProductCategory, ProductInputDTO } from '../../src/model/Product';
import request from 'supertest';
import { server } from '../../src/index';
import { Authenticator } from '../../src/services/Authenticator';
import { UserRole } from '../../src/model/User';

describe('Testing product creation in controller layer', () => {
  afterEach(async () => {
    await server.close();
  });
  test('It should return an error when there is no authorization token', async () => {
    const productMock: ProductInputDTO = {
      name: 'Product',
      price: 10.5,
      category: ProductCategory.TOY,
      quantity: 1,
    };

    const { body } = await request(server)
      .post(`/product/create`)
      .expect(401)
      .send(productMock);
    expect(body.error).toBe('Unauthorized check token');
  });

  test('It should return an error when token is not valid', async () => {
    const productMock: ProductInputDTO = {
      name: 'Product',
      price: 10.5,
      category: ProductCategory.TOY,
      quantity: 1,
    };

    const { body } = await request(server)
      .post(`/product/create`)
      .expect(400)
      .set('Authorization', 'Invalid Token')
      .send(productMock);
    expect(body.error).toBe('jwt malformed');
  });

  test('It should return an error when token is expired', async () => {
    const productMock: ProductInputDTO = {
      name: 'Product',
      price: 10.5,
      category: ProductCategory.TOY,
      quantity: 1,
    };

    const { body } = await request(server)
      .post(`/product/create`)
      .expect(400)
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoibWFuYWdlciIsImlhdCI6MTYwMjk2NzE1MCwiZXhwIjoxNjAyOTcyNTUwfQ.fkeb9kuJZtzen7wb_KG4ULteWHn6uoynrV2HMHvt__A'
      )
      .send(productMock);
    expect(body.error).toBe('jwt expired');
  });

  test('It should return an error when user role is not manager', async () => {
    const productMock: ProductInputDTO = {
      name: 'Product',
      price: 10.5,
      category: ProductCategory.TOY,
      quantity: 1,
    };

    const authenticator = new Authenticator();
    const token = await authenticator.generateToken(UserRole.CLIENT);
    const { body } = await request(server)
      .post(`/product/create`)
      .expect(403)
      .set('Authorization', token)
      .send(productMock);
    expect(body.error).toBe(
      'Unauthorized, only manager has permission to create products '
    );
  });

  test('It should return an error when manager its trying to create a product already registered', async () => {
    const productMock: ProductInputDTO = {
      name: 'Product',
      price: 10.5,
      category: ProductCategory.TOY,
      quantity: 1,
    };

    const authenticator = new Authenticator();
    const token = await authenticator.generateToken(UserRole.CLIENT);
    const { body } = await request(server)
      .post(`/product/create`)
      .expect(403)
      .set('Authorization', token)
      .send(productMock);
    expect(body.error).toBe(
      'Unauthorized, only manager has permission to create products '
    );
  });
});
