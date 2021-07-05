import _ from 'lodash';

const buildAST = (obj1, obj2) => {
  const allKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  return allKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return { key: `${key}`, newValue: obj2[key], type: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { key: `${key}`, oldValue: obj1[key], type: 'deleted' };
    }
    if ((typeof obj1[key] === 'object' && obj1[key] !== null) && (typeof obj2[key] === 'object' && obj2[key] !== null)) {
      return { key: `${key}`, type: 'nested', children: buildAST(obj1[key], obj2[key]) };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key: `${key}`, key2: `${key}`, oldValue: obj1[key], newValue: obj2[key], type: 'changed',
      };
    }
    return { key: `${key}`, value: obj1[key], type: 'notModified' };
  });
};

export default buildAST;
