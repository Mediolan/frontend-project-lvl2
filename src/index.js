import { Command } from 'commander/esm.mjs';
import genDiff from './genDiff.js';

const program = new Command();

const helpDescription = () => {
  program
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      console.log(genDiff(filepath1, filepath2));
    });

  program.description('Compares two configuration files and shows a difference.');
  program.version('0.0.1', '-V, --vers', 'output the version number');
  program.helpOption('-h, --help', 'output usage information');
  program.option('-f, --format [type]', 'output format');
  program.parse();
};

export default helpDescription;
