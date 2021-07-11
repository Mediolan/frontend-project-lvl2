import { readFileSync } from 'fs';
import pkg from 'js-yaml';

const { load } = pkg;

const parse = (pathToFile, format) => {
  const contents = readFileSync(pathToFile, 'utf8');
  const mapping = {
    yml: (file) => load(file),
    yaml: (file) => load(file),
    json: (file) => JSON.parse(file),
  };

  return mapping[format](contents);
};

export default parse;
