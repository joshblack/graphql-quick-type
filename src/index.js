'use strict';

const buildModuleGraph = require('./buildModuleGraph');
const convertToAST = require('./convertToAST');
const print = require('./print');

function quickTypes(input) {
  const modules = buildModuleGraph(input);
  const files = modules.map(convertToAST).map(print);

  return files.join('\n');
}

module.exports = quickTypes;
