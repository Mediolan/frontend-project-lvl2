#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import genDiff from '../index.js';

const program = new Command();

program
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    const diff = genDiff(filepath1, filepath2, options.format);
    console.log(diff);
  })
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --vers', 'output the version number')
  .helpOption('-h, --help', 'output usage information');

program.parse();
