import count from './count';

test('file count', () => {
  expect(count('file', 0)).toBe('0 files');
  expect(count('file', 1)).toBe('1 file');
  expect(count('file', 2)).toBe('2 files');
});

test('comment count', () => {
  expect(count('comment', 0)).toBe('0 comments');
  expect(count('comment', 1)).toBe('1 comment');
  expect(count('comment', 2)).toBe('2 comments');
});
