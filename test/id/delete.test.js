const request = require('supertest');
const app = require('../../../../app');
const {Car} = require('../../../../app/models');
const admin = require('../../../../config/admin');

describe('DELETE /v1/cars/:id', () => {
  const mockCar = {
    name: 'string',
    price: 0,
    image: 'string',
    size: 'string',
  };
  const adminLoginCred = {
    email: admin.email,
    password: admin.password,
  };
  let token;
  let car;

  beforeAll(async () => {
    car = await Car.create(mockCar);
    const response = await request(app)
        .post('/v1/auth/login')
        .set('authorization', 'Bearer')
        .send(adminLoginCred);
    token = response.body.accessToken;
    return car;
  });

  it('response code 204 if success.', async () => {
    return request(app)
        .delete('/v1/cars/' + car.id)
        .set('authorization', 'Bearer' + token)
        .then((response) => {
          expect(response.statusCode).toBe(204);
        });
  });

  it('response code 404 if car not found.', async () => {
    return request(app)
        .delete('/v1/cars/' + 9999999)
        .set('authorization', 'Bearer' + token)
        .then((response) => {
          expect(response.statusCode).toBe(404);
        });
  });
});