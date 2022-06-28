const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/github');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET / prevents user from seeing posts unless logged in', async () => {
    const res = await request.agent(app).get('/api/v1/posts');

    expect(res.body).toEqual({ message: 'Kindly sign in to continue further.', status: 401 });
  });

  it('POST / allows a user to post a secret', async () => {
    const agent = request.agent(app);
    await agent
      .get('/api/v1/github/callback?code=42')
      .redirects(1);
    const res = await agent
      .post('/api/v1/posts')
      .send({ description: 'Spicey post' });

    expect(res.body).toEqual({ 
      id: expect.any(String),
      description: 'Spicey post', 
      created_at: expect.any(String)
    });
  });


  afterAll(() => {
    pool.end();
  });
});


