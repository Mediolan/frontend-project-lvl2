const plain = (tree) => {
  const stringify = (value) => {
    if (typeof value === 'object' && value !== null) {
      return '[complex value]';
    }
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return value;
  };
  const getPropertyName = (pathToKey) => pathToKey.join('.');

  const mapping = {
    notModified: () => [],
    deleted: (node, path) => `Property '${getPropertyName(path)}' was removed`,
    added: (node, path) => `Property '${getPropertyName(path)}' was added with value: ${stringify(node.newValue)}`,
    changed: (node, path) => `Property '${getPropertyName(path)}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`,
    nested: ({ children }, path, iter) => iter(children, [...path]),
  };

  const buildLines = (node, pathParts = []) => node.flatMap(
    (branch) => mapping[branch.type](branch, [...pathParts, branch.key], buildLines),
  );

  return buildLines(tree).join('\n');
};

export default plain;
