import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import genDiff from '../index.js';
import parse from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff', () => {
  test('stylish', () => {
    expect(genDiff(getFixturePath('file5.json'), getFixturePath('file6.json'))).toBe(readFile('expected_file1.txt'));
  });
  test('plain', () => {
    expect(genDiff(getFixturePath('file7.yml'), getFixturePath('file8.yaml'), 'plain')).toBe(readFile('expected_file2.txt'));
  });
  test('json', () => {
    expect(genDiff(getFixturePath('file7.yml'), getFixturePath('file8.yaml'), 'json')).toBe(readFile('expected_file3.json'));
  });
  test('jsonValidation', () => {
    const data = genDiff(getFixturePath('file7.yml'), getFixturePath('file8.yaml'), 'json');
    expect(() => JSON.parse(data)).not.toThrow();
  });
});

test('parse', () => {
  const expected = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  expect(parse(readFile('file1.json'), 'yml')).toStrictEqual(expected);
});
