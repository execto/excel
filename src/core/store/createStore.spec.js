import {createStore} from './createStore';

describe('test', () => {
  test('test inner', () => {
    const store = createStore(() => {}, {});
    expect(store).toBeDefined();
  });
});
