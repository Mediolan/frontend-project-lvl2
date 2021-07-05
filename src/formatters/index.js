import stylish from './stylish.js';
import plain from './plain.js';

const selectFormatter = (format) => {
  if (format === 'plain') {
    return plain;
  }
  return stylish;
};

export default selectFormatter;
