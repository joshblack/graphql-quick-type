'use strict';

const t = require('babel-types');
const {types: gt} = require('../types');
const capitalizeWord = require('./utilities/capitalizeWord');
const createImportStatements = require('./builders/ImportStatements');
const createGraphQLObjectType = require('./builders/GraphQLObjectType');
const createGraphQLUnionType = require('./builders/GraphQLUnionType');

function convertToAST(object) {
  const {id, info: {name}, exports, imports} = object;
  const importStatements = createImportStatements(imports);
  const type = exports.default.type;
  let typeDefinition;

  if (type === gt.GraphQLObjectType) {
    typeDefinition = createGraphQLObjectType(object);
  }

  if (type === gt.GraphQLUnionType) {
    typeDefinition = createGraphQLUnionType(object);
  }

  const exportStatement = t.expressionStatement(
    t.assignmentExpression(
      '=',
      t.memberExpression(t.identifier('module'), t.identifier('exports')),
      t.identifier(name)
    )
  );

  return t.file(
    t.program([...importStatements, typeDefinition, exportStatement])
  );
}

module.exports = convertToAST;
