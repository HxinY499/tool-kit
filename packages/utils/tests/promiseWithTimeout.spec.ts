import { promiseWithTimeout } from '..';
import { test, expect } from 'vitest';

test('如果promise在timeout之前解决，应以正确的值resolve', async () => {
  const result = promiseWithTimeout(
    new Promise<string>(r => setTimeout(() => r('success'), 100)),
    500
  );
  expect(result).resolves.toBe('success');
});

test('如果promise在timeout之前没有解决，则reject', async () => {
  const resultWithError = promiseWithTimeout(
    new Promise(r => setTimeout(() => r('too late'), 1000)),
    100,
    new Error('Timeout')
  );
  expect(resultWithError).rejects.toThrow('Timeout');
  expect(resultWithError).rejects.not.toBe('Timeout');

  const resultWithString = promiseWithTimeout(
    new Promise(r => setTimeout(() => r('too late'), 1000)),
    100,
    'TimeoutString'
  );
  expect(resultWithString).rejects.toBe('TimeoutString');
});
