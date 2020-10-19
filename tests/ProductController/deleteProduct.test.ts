import { ProductCategory, ProductInputDTO } from '../../src/model/Product';
import request from 'supertest';
import { server } from '../../src/index';
import { Authenticator } from '../../src/services/Authenticator';
import { UserRole } from '../../src/model/User';

describe('Testing product deletion in controller layer', () => {
  afterEach(async () => {
    await server.close();
  });
  const productId = 'mockId';

  test('It should return an error when token is not valid', async () => {
    const { body } = await request(server)
      .delete(`/product/delete/${productId}`)
      .expect(400)
      .set('Authorization', 'Invalid Token');
    expect(body.error).toBe('jwt malformed');
  });

  test('It should return an error when token is expired', async () => {
    const { body } = await request(server)
      .delete(`/product/delete/${productId}`)
      .expect(400)
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoibWFuYWdlciIsImlhdCI6MTYwMjk2NzE1MCwiZXhwIjoxNjAyOTcyNTUwfQ.fkeb9kuJZtzen7wb_KG4ULteWHn6uoynrV2HMHvt__A'
      );
    expect(body.error).toBe('jwt expired');
  });

  test('It should return an error when user role is not manager', async () => {
    const authenticator = new Authenticator();
    const token = await authenticator.generateToken(UserRole.CLIENT);
    const { body } = await request(server)
      .delete(`/product/delete/id:`)
      .expect(403)
      .set('Authorization', token);
    expect(body.error).toBe(
      'Unauthorized, only manager has permission to delete products '
    );
  });

  test('It should return an error when product id it is not valid', async () => {
    const authenticator = new Authenticator();
    const token = await authenticator.generateToken(UserRole.MANAGER);
    const { body } = await request(server)
      .delete(`/product/delete/${productId}`)
      .expect(400)
      .set('Authorization', token);
    expect(body.error).toBe('Id is not a valid database Object Id');
  });

  test('It should return an error when product id provided doest not match any product in database', async () => {
    const realMockId = '5f8b6cc688c7edaaf4aa76b8';

    const authenticator = new Authenticator();
    const token = await authenticator.generateToken(UserRole.MANAGER);
    const { body } = await request(server)
      .delete(`/product/delete/${realMockId}`)
      .expect(404)
      .set('Authorization', token);
    expect(body.error).toBe('Product does not exist, check id provided');
  });
});
