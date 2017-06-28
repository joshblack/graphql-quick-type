#!/usr/bin/env node

const chalk = require('chalk');
const commander = require('commander');
const packageJson = require('../package.json');
const quickTypes = require('../src');

let rawInput;

const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<json-response>')
  .usage(`${chalk.green('<json-response>')}`)
  .action(input => {
    rawInput = input;
  })
  .parse(process.argv)

if (!rawInput) {
  const exampleInput = JSON.stringify({ foo: 'bar' });

  console.error('Please specify the JSON input string:');
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green('<json-input>')}`
  );
  console.log();
  console.log('For example:');
  console.log(`  ${chalk.cyan(program.name())} '${chalk.green(exampleInput)}'`);
  console.log();
  process.exit(1);
}

try {
  const input = JSON.parse(rawInput);
  console.log(quickTypes(input));
} catch (error) {
  console.error('Looks like the JSON value you gave us could not be parsed');
  console.error('Here is the full error:');
  console.error(error);
  console.log('If you believe this is something wrong with `graph-quick-type` feel free to report an issue!');
}
