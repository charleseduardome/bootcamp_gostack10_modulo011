import request from 'supertest';
import bcrypy from 'bcryptjs';
import app from '../../src/app';

import User from '../../src/app/models/User';
import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('sould encrypt user password when new user created', async () => {
    const user = await User.create({
      name: 'Charles Eduardo',
      email: 'charles@gmail.com',
      password: '123456',
    });

    const compareHash = await bcrypy.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('sould be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Charles Eduardo',
        email: 'charles@gmail.com',
        password: '123456',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('shuld not be able to register with duplicated email', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Charles Eduardo',
        email: 'charles@gmail.com',
        password: '123456',
      });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'Charles Eduardo',
        email: 'charles@gmail.com',
        password: '123456',
      });

    expect(response.status).toBe(400);
  });
});
