const request = require('supertest');
const app = require('../../../../app');
const {Car} = require('../../../../app/models');
const admin = require('../../../../config/admin');

describe('PUT /v1/cars/:id', () => {
  const mockCar = {
    name: 'string',
    price: 0,
    image: 'string',
    size: 'string',
  };
  const adminLogin = {
    email: admin.email,
    password: admin.password,
  };
  let token;
  let car;

  beforeAll(async () => {
    car = await Car.create(mockCar);
    const res = await request(app)
        .post('/v1/auth/login')
        .set('authorization', 'Bearer')
        .send(adminLogin);
    token = res.body.accessToken;
    return car;
  });

  it('response code 200 and return updated data.', async () => {
    return request(app)
        .put('/v1/cars/' + car.id)
        .set('authorization', 'Bearer' + token)
        .send(mockCar)
        .then((res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body).toMatchObject(mockCar);
        });
  });

  it('response code 200 and return updated data.', async () => {
    return request(app)
        .put('/v1/cars/' + 9999999)
        .set('authorization', 'Bearer' + token)
        .send({})
        .then((res) => {
          expect(res.statusCode).toBe(422);
          expect(res.body).toHaveProperty('error');
        });
  });
});