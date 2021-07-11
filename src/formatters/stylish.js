const indent = (depth, prefix = 0, spacesCount = 4) => ' '.repeat(depth * spacesCount - prefix);

const stringify = (content, depth, map) => {
  if (typeof content !== 'object' || content === null) {
    return `${content}`;
  }

  const lines = Object
    .entries(content)
    .map(([key, value]) => map.notModified({ key, value }, depth));

  return [
    '{',
    ...lines,
    `${indent(depth - 1)}}`,
  ].join('\n');
};

const mapping = {
  nested: (node, depth, iter) => `${indent(depth)}${node.key}: ${iter(node.children, depth + 1)}`,
  deleted: (node, depth) => `${indent(depth, 2)}- ${node.key}: ${stringify(node.oldValue, depth + 1, mapping)}`,
  added: (node, depth) => `${indent(depth, 2)}+ ${node.key}: ${stringify(node.newValue, depth + 1, mapping)}`,
  changed: (node, depth) => [`${indent(depth, 2)}- ${node.key}: ${stringify(node.oldValue, depth + 1, mapping)}`,
    `${indent(depth, 2)}+ ${node.key}: ${stringify(node.newValue, depth + 1, mapping)}`].join('\n'),
  notModified: (node, depth) => `${indent(depth)}${node.key}: ${stringify(node.value, depth + 1, mapping)}`,
};

const buildDiff = (node, depth = 1) => {
  const diff = node.flatMap(
    (branch) => mapping[branch.type](branch, depth, buildDiff),
  );
  return [
    '{',
    ...diff,
    `${indent(depth - 1)}}`,
  ].join('\n');
};

const renderStylish = (tree) => buildDiff(tree);

export default renderStylish;
