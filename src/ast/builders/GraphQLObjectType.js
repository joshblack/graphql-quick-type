'use strict';

const t = require('babel-types');
const {types: gt} = require('../../types');
const capitalizeWord = require('../utilities/capitalizeWord');

const getListTypeFor = field => {
  if (typeof field.ofType === 'string') {
    return field.ofType;
  }

  return field.ofType.info.name;
};

const createGraphQLObjectType = object => {
  const {info: {name}, exports} = object;
  const fields = exports.default.fields.map(field => {
    if (field.id) {
      return t.objectProperty(
        t.identifier(field.exports.default.name),
        t.objectExpression([
          t.objectProperty(t.identifier('type'), t.identifier(field.name)),
        ])
      );
    }

    if (field.type === gt.GraphQLList) {
      return t.objectProperty(
        t.identifier(field.name),
        t.objectExpression([
          t.objectProperty(
            t.identifier('type'),
            t.newExpression(t.identifier(gt.GraphQLList), [
              t.identifier(getListTypeFor(field)),
            ])
          ),
        ])
      );
    }

    return t.objectProperty(
      t.identifier(field.name),
      t.objectExpression([
        t.objectProperty(t.identifier('type'), t.identifier(field.type)),
      ])
    );
  });

  const typeDefinition = t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier(name),
      t.newExpression(t.identifier(gt.GraphQLObjectType), [
        t.objectExpression([
          t.objectProperty(
            t.identifier('name'),
            t.stringLiteral(capitalizeWord(name)),
            false,
            false
          ),
          t.objectProperty(
            t.identifier('fields'),
            t.arrowFunctionExpression([], t.objectExpression(fields))
          ),
        ]),
      ])
    ),
  ]);

  return typeDefinition;
};

module.exports = createGraphQLObjectType;
