import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const format = (tree, formatter) => {
  const map = {
    stylish: stylish(tree),
    plain: plain(tree),
    json: json(tree),
  };
  return map[formatter];
};

export default format;
