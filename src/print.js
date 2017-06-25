'use strict';

const {transformFromAst} = require('babel-core');
const generate = require('babel-generator').default;
const prettier = require('prettier');

function print(inputAST) {
  const {ast} = transformFromAst(inputAST, null, {
    plugins: ['transform-strict-mode'],
  });
  const {code} = generate(ast);
  return prettier.format(code, {
    trailingComma: 'all',
    singleQuote: true,
  });
}

module.exports = print;
