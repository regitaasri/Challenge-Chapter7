const request = require('supertest');
const app = require('../../../app');
const admin = require('../../../config/admin');

describe('GET /v1/cars', () => {
  const loginUser = {
    email: admin.email,
    password: admin.password,
  };
  let token;

  beforeAll(async () => {
    const response = await request(app)
        .post('/v1/auth/login')
        .set('authorization', 'Bearer')
        .send(loginUser);
    token = response.body.accessToken;
  });

  it('success car list.', async () => {
    return request(app)
        .get('/v1/cars')
        .set('authorization', 'Bearer' + token)
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body).toHaveProperty('cars');
          expect(response.body).toHaveProperty('meta');
        });
  });
});

describe('POST /v1/cars', () => {
  const loginUser = {
    email: admin.email,
    password: admin.password,
  };
  let token;

  beforeAll(async () => {
    const response = await request(app)
        .post('/v1/auth/login')
        .set('authorization', 'Bearer')
        .send(loginuser);
    token = response.body.accessToken;
  });

  it('success created car.', async () => {
    return request(app)
        .post('/v1/cars')
        .set('authorization', 'Bearer' + token)
        .then((response) => {
          expect(response.statusCode).toBe(201);
          expect(response.body).toHaveProperty('name');
          expect(response.body).toHaveProperty('price');
          expect(response.body).toHaveProperty('size');
        });
  });
});