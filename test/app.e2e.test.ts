import request from 'supertest';
import app from '../src/app';

describe('app', () => {
  it('/health', () => {
    request(app)
      .get('/health')
      .expect(200)
      .end((error: Error) => {
        if (error) throw error;
      });
  });
});
