import { expect, test } from 'vitest';
import { formatDate } from './date';

test('format date string', () => {
  expect(formatDate(new Date().toISOString())).toBe('20/08/2023');
});
