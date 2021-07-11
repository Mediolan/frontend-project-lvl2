const stylish = (tree) => {
  const indent = (depth, prefix = 0, spacesCount = 4) => ' '.repeat(depth * spacesCount - prefix);

  const iter = (value, depth) => {
    if (typeof value !== 'object' || value === null) {
      return `${value}`;
    }

    const lines = Object
      .entries(value)
      .map(([key, val]) => `${indent(depth)}${key}: ${iter(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${indent(depth - 1)}}`,
    ].join('\n');
  };

  const stringify = (notFormattedTree, depth = 1) => {
    const mapping = {
      nested: (node) => `${indent(depth, 2)}  ${node.key}: ${stringify(node.children, depth + 1)}`,
      deleted: (node) => `${indent(depth, 2)}- ${node.key}: ${iter(node.oldValue, depth + 1)}`,
      added: (node) => `${indent(depth, 2)}+ ${node.key}: ${iter(node.newValue, depth + 1)}`,
      changed: (node) => [`${indent(depth, 2)}- ${node.key}: ${iter(node.oldValue, depth + 1)}`, `${indent(depth, 2)}+ ${node.key}: ${iter(node.newValue, depth + 1)}`].join('\n'),
      notModified: (node) => `${indent(depth)}${node.key}: ${iter(node.value, depth + 1)}`,
    };
    const diff = notFormattedTree.map((node) => mapping[node.type](node));

    return [
      '{',
      ...diff,
      `${indent(depth - 1)}}`,
    ].join('\n');
  };
  return stringify(tree);
};

export default stylish;
