import pkg from 'js-yaml';

const { load } = pkg;

const mapping = {
  yml: (file) => load(file),
  yaml: (file) => load(file),
  json: (file) => JSON.parse(file),
};

const parse = (contents, format) => mapping[format](contents);

export default parse;
