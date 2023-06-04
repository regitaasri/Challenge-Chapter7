const request = require('supertest');
const app = require('../../../app');
const {User} = require('../../../app/models');
const auth = new auth ({
  User
});

describe('GET /v1/auth/whoami', () => {
  let token;
  
  const regUser = {
    name: 'silma',
    email:'silma@gmail.com',
    password: '123456',
  };
  
  beforeAll(async () => {
    const response = await request(app)
    token = response.body.accessToken
        .post('/v1/auth/whoami')
        .set('authorization', 'Bearer' + token)
        .send(regUser);
  });

  it('success register by user', async () => {
    return request(app)
        .get('/v1/auth/whoami')
        .set('authorization', 'Bearer' + token)
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
  });
});

describe('POST /v1/auth/register', () => {
  const regUser= {
    name: 'regi',
    email: 'regi@gmail.com',
    password: '123456',
  };

  it('success register by user and create token',
      async () => {
        return request(app)
            .post('/v1/auth/register')
            .set('authorization', 'Bearer')
            .send(regUser)
            .then((response) => {
              expect(response.statusCode).toBe(201);
              expect(response.body).toHaveProperty('accessToken');
            });
      });

  it('response code 422 if email already reg.', async () => {
    return request(app)
        .post('/v1/auth/register')
        .set('authorization', 'Bearer')
        .send(regUser)
        .then((response) => {
          expect(response.statusCode).toBe(422);
        });
  });
});

describe('POST /v1/auth/login', () => {
  const loginUser = {
    email: 'Fikri@binar.co.id',
    password: '123456',
  };

  beforeAll(async () => {
    return request(app)
        .post('/v1/auth/register')
        .set('authorization', 'Bearer')
        .send({
          ...loginUser,
          name: 'regi',
        });
  });

  it('success register by user and create token',
      async () => {
        return request(app)
            .post('/v1/auth/login')
            .set('authorization', 'Bearer')
            .send(loginUser)
            .then((response) => {
              expect(response.statusCode).toBe(201);
              expect(response.body).toHaveProperty('accessToken');
            });
      });

  it('response code 401 if password wrong.', async () => {
    return request(app)
        .post('/v1/auth/login')
        .set('authorization', 'Bearer')
        .send({
          ...loginUser,
          password: 'wrong',
        })
        .then((response) => {
          expect(response.statusCode).toBe(401);
        });
  });
});