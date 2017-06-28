'use strict';

const t = require('babel-types');

const createGraphQLImportStatement = imports => {
  const importObjectPattern = imports
    .sort((a, b) => {
      return b.name < a.name;
    })
    .map(({name}) => {
      return t.objectProperty(
        t.identifier(name),
        t.identifier(name),
        false,
        true
      );
    });
  return t.variableDeclaration('const', [
    t.variableDeclarator(
      t.objectPattern(importObjectPattern),
      t.callExpression(t.identifier('require'), [t.stringLiteral('graphql')])
    ),
  ]);
};

const createCustomImportStatement = m => {
  return t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier(m.info.name),
      t.callExpression(t.identifier('require'), [
        t.stringLiteral(`./${m.info.name}`),
      ])
    ),
  ]);
};

const createImportStatements = imports => {
  const graphQLImports = imports.filter(({source}) => source === 'graphql');
  const customImports = imports
    .filter(({id}) => id)
    .map(createCustomImportStatement);

  return [createGraphQLImportStatement(graphQLImports), ...customImports];
};

module.exports = createImportStatements;
