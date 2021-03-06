import path from 'path';
import { readFileSync } from 'fs';
import parse from './src/parsers.js';
import buildAST from './src/buildAST.js';
import format from './src/formatters/index.js';

const determineFormat = (pathToFile) => path.extname(pathToFile).slice(1);

const readFile = (pathToFile) => readFileSync(pathToFile, 'utf8');

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const file1 = parse(readFile(filepath1), determineFormat(filepath1));
  const file2 = parse(readFile(filepath2), determineFormat(filepath2));
  const AST = buildAST(file1, file2);
  return format(AST, formatter);
};
export default genDiff;
