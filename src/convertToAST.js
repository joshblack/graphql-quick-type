'use strict';

const t = require('babel-types');
const {types: gt} = require('./types');
const generate = require('babel-generator').default;

const capitalizeWord = word => {
  return word[0].toUpperCase() + word.slice(1);
};

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
        true,
      );
    });
  return t.variableDeclaration('const', [
    t.variableDeclarator(
      t.objectPattern(importObjectPattern),
      t.callExpression(t.identifier('require'), [t.stringLiteral('graphql')]),
    ),
  ]);
};

const createCustomImportStatement = m => {
  return t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier(m.name),
      t.callExpression(t.identifier('require'), [
        t.stringLiteral(`./${m.name}`),
      ]),
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

function convertToAST(object) {
  const {id, name, exports, imports} = object;
  const importStatements = createImportStatements(imports);
  const fields = exports.default.fields.map(field => {
    if (field.id) {
      return t.objectProperty(
        t.identifier(field.exports.default.name),
        t.objectExpression([
          t.objectProperty(t.identifier('type'), t.identifier(field.name)),
        ]),
      );
    }

    if (field.type === gt.GraphQLList) {
      return t.objectProperty(
        t.identifier(field.name),
        t.objectExpression([
          t.objectProperty(
            t.identifier('type'),
            t.newExpression(t.identifier(gt.GraphQLList), [
              t.identifier(field.info.listType.type),
            ]),
          ),
        ]),
      );
    }

    return t.objectProperty(
      t.identifier(field.name),
      t.objectExpression([
        t.objectProperty(t.identifier('type'), t.identifier(field.type)),
      ]),
    );
  });

  const typeDefinition = t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier(name),
      t.newExpression(t.identifier('GraphQLObjectType'), [
        t.objectExpression([
          t.objectProperty(
            t.identifier('name'),
            t.stringLiteral(capitalizeWord(name)),
            false,
            false,
          ),
          t.objectProperty(
            t.identifier('fields'),
            t.arrowFunctionExpression([], t.objectExpression(fields)),
          ),
        ]),
      ]),
    ),
  ]);

  const exportStatement = t.expressionStatement(
    t.assignmentExpression(
      '=',
      t.memberExpression(t.identifier('module'), t.identifier('exports')),
      t.identifier(name),
    ),
  );

  return t.file(
    t.program([...importStatements, typeDefinition, exportStatement]),
  );
}

module.exports = convertToAST;
