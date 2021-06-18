import { readFileSync } from 'fs';

const file1 = JSON.parse((readFileSync('src/file1.json', 'utf8')));
console.log(file1);
