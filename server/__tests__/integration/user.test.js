import request from 'supertest';
import app from '../../src/app';

describe('User', () => {
  it('sould de able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Charles Eduardo',
        email: 'charles@gmail.com',
        password_hash: '123456',
      });

    expect(response.body).toHaveProperty('id');
  });
});
