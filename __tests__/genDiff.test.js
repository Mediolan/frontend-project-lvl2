import { fileURLToPath } from 'url';
import fs from 'fs';
import path, { dirname } from 'path';
import genDiff from '../index.js';
import makeObject from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff', () => {
  expect(genDiff('__fixtures__/file5.json', '__fixtures__/file6.json')).toBe(readFile('expected_file1.txt'));
  expect(genDiff('__fixtures__/file7.yml', '__fixtures__/file8.yaml', 'plain')).toBe(readFile('expected_file2.txt'));
});

const data = genDiff('__fixtures__/file7.yml', '__fixtures__/file8.yaml', 'json');

test('genDiff2', () => {
  expect(() => JSON.parse(data)).not.toThrow();
});

const expected = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

test('makeObject', () => {
  expect(makeObject('__fixtures__/file1.json')).toStrictEqual(expected);
});
