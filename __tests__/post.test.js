const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/github');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/ prevents user from seeing posts unless logged in', async () => {
    const res = await request(app).get('/api/v1/posts');

    expect(res.body.length).toEqual({ message: 'Kindly sign in to continue further.', status: 401 });
  });

  



  afterAll(() => {
    pool.end();
  });
});
