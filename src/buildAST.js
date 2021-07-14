import _ from 'lodash';

const buildAST = (obj1, obj2) => {
  const allKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  return allKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return { key: `${key}`, type: 'added', newValue: obj2[key] };
    }
    if (!_.has(obj2, key)) {
      return { key: `${key}`, type: 'deleted', oldValue: obj1[key] };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return { key: `${key}`, type: 'nested', children: buildAST(obj1[key], obj2[key]) };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        key: `${key}`, type: 'changed', oldValue: obj1[key], newValue: obj2[key],
      };
    }
    return { key: `${key}`, type: 'notModified', value: obj1[key] };
  });
};

export default buildAST;
