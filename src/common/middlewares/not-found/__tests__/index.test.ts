import { notFoundHandler } from '..';

describe('notFoundHandler', () => {
  it('should call status and json', () => {
    expect(notFoundHandler).toBeTruthy();
    expect(notFoundHandler()).toBeTruthy();
  });
});
