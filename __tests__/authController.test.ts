import request from 'supertest';
import app from '../src/server';

describe('User Registration', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: ' Test User',
      email: 'testuser@example.com',
      password: 'Password123',
    });

    expect(res.statusCode).toEqual(201);
  });

  it('should not register with invalid email', async () => {
    const res = await request(app).post('/api/auth.register').send({
      name: ' Test User',
      email: 'dfsdfsdfs',
      password: 'Password123',
    });

    expect(res.statusCode).toEqual(404);
  });
});
