import getLineCount from './getLineCount';

const line1Text = '';

const line2Text = 'aaa\nbbb';

const line3Text = `aaa
bbb
ccc`;

test('getLineCount', () => {
  expect(getLineCount(line1Text)).toBe(1);
  expect(getLineCount(line2Text)).toBe(2);
  expect(getLineCount(line3Text)).toBe(3);
});
