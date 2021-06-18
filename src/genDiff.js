import { readFileSync } from 'fs';

const makeObject = (pathToFile) => JSON.parse((readFileSync(pathToFile, 'utf8')));

const genDiff = (filepath1, filepath2) => {
  const file1 = makeObject(filepath1);
  const file2 = makeObject(filepath2);
  const keys = Object.keys(file1).concat(Object.keys(file2));
  const filteredKeys = keys
    .filter((key, index) => keys.indexOf(key) === index)
    .map((key) => {
      if (file1[key] === file2[key]) {
        return `  ${key}: ${file2[key]}`;
      } if (!file2.hasOwnProperty(key)) {
        return `- ${key}: ${file1[key]}`;
      } if (!file1.hasOwnProperty(key)) {
        return `+ ${key}: ${file2[key]}`;
      } if (file1[key] !== file2[key]) {
        const diff = [`- ${key}: ${file1[key]}`, `+ ${key}: ${file2[key]}`];
        return diff;
      }
    }, []);

  return filteredKeys.flat().join('\n   ');
};

export { makeObject, genDiff };
