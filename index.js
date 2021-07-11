import parse from './src/parsers.js';
import buildAST from './src/buildAST.js';
import format from './src/formatters/index.js';

const genDiff = (filepath1, filepath2, formatter) => {
  const fileFormat = (path) => path.split('.').pop();
  const file1 = parse(filepath1, fileFormat(filepath1));
  const file2 = parse(filepath2, fileFormat(filepath2));
  const AST = buildAST(file1, file2);
  return format(AST, formatter);
};
export default genDiff;
