import { Command } from 'commander/esm.mjs';

const program = new Command();

const helpDescription = () => {
  program.version('0.0.1', '-v, --vers', 'output the current version');
  program.parse();
};

export default helpDescription;
