const plain = (tree) => {
  const iter = (node, acc) => node
    .filter((branch) => branch.type !== 'notModified')
    .flatMap((branch) => {
      if (branch.type === 'nested') {
        return iter(branch.children, [...acc, branch.key]);
      }
      if (branch.type === 'changed') {
        return {
          path: [...acc, branch.key].join('.'), type: branch.type, value1: branch.oldValue, value2: branch.newValue,
        };
      }
      return { path: [...acc, branch.key].join('.'), type: branch.type, value: branch.oldValue || branch.newValue };
    });

  const valueFormation = (value) => {
    if (typeof value === 'boolean' || value === null) {
      return value;
    }
    if (typeof value === 'object') {
      return '[complex value]';
    }
    return `'${value}'`;
  };

  const stringify = (formattedTree) => formattedTree.map((node) => {
    if (node.type === 'deleted') {
      return `Property '${node.path}' was removed`;
    }
    if (node.type === 'added') {
      return `Property '${node.path}' was added with value: ${valueFormation(node.value)}`;
    }
    return `Property '${node.path}' was updated. From ${valueFormation(node.value1)} to ${valueFormation(node.value2)}`;
  });
  const result = stringify(iter(tree, [])).join('\n');

  return result;
};

export default plain;
