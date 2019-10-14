/* global it, expect, describe */

import createServer from '../src/createServer';
import request from 'supertest';

const app = createServer();

describe('Backpack with Jest', () => {
  it('Object Rest Spread', () => {
    const hello = { hello: 'world' };
    const other = { ...hello, nice: 'to meet you' };

    expect(other).toEqual({ hello: 'world', nice: 'to meet you' });
  });

  it('HTTP Request', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });
});
