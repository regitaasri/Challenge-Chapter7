const request = require('supertest');
const app = require('../../../../app');
const {Car} = require('../../../../app/models');

describe('GET /v1/cars/:id', () => {
  const mockCar = {
    name: 'string',
    price: 0,
    image: 'string',
    size: 'string',
  };
  let car;

  beforeAll(async () => {
    car = await Car.create(mockCar);
    return car;
  });

  it('should response code 200 and return car data.', async () => {
    return request(app)
        .get('/v1/cars/' + car.id)
        .set('authorization', 'Bearer')
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.body).toMatchObject(mockCar);
        });
  });
});