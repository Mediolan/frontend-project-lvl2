const stylish = (tree, spacesCount = 2, replacer = ' ') => {
  const stringify = (value, depth) => {
    if (typeof value !== 'object' || value === null) {
      return `${value}`;
    }

    const indentSize = depth + spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - 4);
    const lines = Object
      .entries(value)
      .map(([key, val]) => `${currentIndent}${key}: ${stringify(val, depth + 4)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  const formattedTree = tree.map((branch) => {
    if (branch.type === 'nested') {
      return `${replacer.repeat(spacesCount + 2)}${branch.key}: ${stylish(branch.children, spacesCount + 4)}`;
    }
    if (branch.type === 'deleted') {
      return `${replacer.repeat(spacesCount)}- ${branch.key}: ${stringify(branch.oldValue, 6)}`;
    }
    if (branch.type === 'added') {
      return `${replacer.repeat(spacesCount)}+ ${branch.key}: ${stringify(branch.newValue, 6)}`;
    }
    if (branch.type === 'changed') {
      return [`${replacer.repeat(spacesCount)}- ${branch.key}: ${stringify(branch.oldValue, 6)}`, `${replacer.repeat(spacesCount)}+ ${branch.key2}: ${stringify(branch.newValue, 6)}`].join('\n');
    }
    return `${replacer.repeat(spacesCount)}  ${branch.key}: ${stringify(branch.value, 6)}`;
  });

  return [
    '{',
    ...formattedTree,
    `${replacer.repeat(spacesCount - 2)}}`,
  ].join('\n');
};

export default stylish;
