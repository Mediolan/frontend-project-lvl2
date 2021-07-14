import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const mapping = {
  stylish: (node) => stylish(node),
  plain: (node) => plain(node),
  json: (node) => json(node),
};

const format = (tree, formatter) => mapping[formatter](tree);

export default format;
