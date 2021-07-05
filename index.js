import makeObject from './src/parsers.js';
import buildAST from './src/buildAST.js';
import selectFormatter from './src/formatters/index.js';

const genDiff = (filepath1, filepath2, formatter) => {
  const file1 = makeObject(filepath1);
  const file2 = makeObject(filepath2);
  const AST = buildAST(file1, file2);
  const selectedFormatter = selectFormatter(formatter);
  const formatted = selectedFormatter(AST);
  return formatted;
};
export default genDiff;
