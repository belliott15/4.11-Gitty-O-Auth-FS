const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/github');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/ should redirect to the gihub OAuth login page', async () => {
    const res = await request(app).get('/api/v1/github/login');

    expect(res.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/callback/i
    );
  });

  it('/ should login and redirect users to /api/v1/github/dashboard', async () => {
    const res = await request.agent(app)
      .get('/api/vq/github/callback')
      .redirects(1);

    expect(res.body).toEqual({
      id: expect.any(String), 
      login: 'Billy Bucherson', 
      avatar_url: 'https://www.placecage.com/gif/200/200',
      email: 'billy@bucherson.gov',
      iat: expect.any(Number), 
      exp: expect.any(Number),
    });
  });

  afterAll(() => {
    pool.end();
  });
});
