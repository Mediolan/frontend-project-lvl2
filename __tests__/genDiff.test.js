import genDiff from '../src/genDiff.js';

const expected = `{
     host: hexlet.io
   - timeout: 50
   + timeout: 20
   - proxy: 123.234.53.22
   - follow: false
   + verbose: true
}`;

test('genDiff', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toBe(expected);
});
