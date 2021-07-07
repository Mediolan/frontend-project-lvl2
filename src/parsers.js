import { readFileSync } from 'fs';
import path from 'path';
import pkg from 'js-yaml';

const { load } = pkg;

const makeObject = (pathToFile) => {
  if (path.extname(pathToFile) === '.yml' || path.extname(pathToFile) === '.yaml') {
    return load(readFileSync(pathToFile, 'utf8'));
  }

  return JSON.parse((readFileSync(pathToFile, 'utf8')));
};

export default makeObject;
