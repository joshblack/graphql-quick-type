'use strict';

const t = require('babel-types');
const {types: gt} = require('../../types');
const capitalizeWord = require('../utilities/capitalizeWord');

const createGraphQLUnionType = object => {
  const {info: {name}, exports} = object;
  const types = exports.default.types.map(type => {
    if (typeof type === 'string') {
      return type;
    }
    return type.info.name;
  });
  const typeChecks = types.map(type => {
    return t.ifStatement(
      t.binaryExpression(
        'instanceof',
        t.identifier('value'),
        t.identifier(type)
      ),
      t.blockStatement([t.returnStatement(t.identifier(type))])
    );
  });
  const typeDefinition = t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier(name),
      t.newExpression(t.identifier(gt.GraphQLUnionType), [
        t.objectExpression([
          t.objectProperty(
            t.identifier('name'),
            t.stringLiteral(capitalizeWord(name)),
            false,
            false
          ),
          t.objectProperty(
            t.identifier('types'),
            t.arrayExpression([...types.map(type => t.identifier(type))])
          ),
          t.objectMethod(
            'method',
            t.identifier('resolveType'),
            [t.identifier('value')],
            t.blockStatement(typeChecks)
          ),
        ]),
      ])
    ),
  ]);

  return typeDefinition;
};

module.exports = createGraphQLUnionType;
