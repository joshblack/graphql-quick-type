'use strict';

const {build, decorate} = require('./graph');
const convertToAST = require('./ast');
const print = require('./print');

function quickTypes(input) {
  const modules = decorate(build(input));
  const files = modules.map(convertToAST).map(print);

  return files.join('\n');
}

module.exports = quickTypes;
