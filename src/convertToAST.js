'use strict';

const t = require('babel-types');
const generate = require('babel-generator').default;

const capitalizeWord = (word) => {
  return word[0].toUpperCase() + word.slice(1);
};

function convertToAST(object) {
  const { id, tree, imports } = object;
  const name = `generatedType${id}`;
  const importObjectPattern = imports
    .map((namedImport) => {
      return t.objectProperty(
        t.identifier(namedImport),
        t.identifier(namedImport),
        false,
        true
      );
    });
  const importStatements = t.variableDeclaration(
    'const',
    [
      t.variableDeclarator(
        t.objectPattern(importObjectPattern),
        t.callExpression(
          t.identifier('require'),
          [t.stringLiteral('graphql')]
        )
      )
    ]
  );
  const fields = tree.fields.map((field) => {
    return t.objectProperty(
      t.identifier(field.name),
      t.objectExpression([
        t.objectProperty(
          t.identifier('type'),
          t.identifier(field.type),
        )
      ]),
    );
  });

  const typeDefinition = t.variableDeclaration(
    'const',
    [
      t.variableDeclarator(
        t.identifier(name),
        t.newExpression(
          t.identifier('GraphQLObjectType'),
          [
            t.objectExpression([
              t.objectProperty(
                t.identifier('name'),
                t.stringLiteral(capitalizeWord(name)),
                false,
                false
              ),
              t.objectProperty(
                t.identifier('fields'),
                t.arrowFunctionExpression(
                  [],
                  t.objectExpression(fields)
                )
              )
            ])
          ]
        )
      )
    ]
  );

  const exportStatement = t.expressionStatement(
    t.assignmentExpression(
      '=',
      t.memberExpression(
        t.identifier('module'),
        t.identifier('exports')
      ),
      t.identifier(name)
    )
  );

  const program = t.program([
    importStatements,
    typeDefinition,
    exportStatement,
  ]);
  const file = t.file(program);

  return file;
}

module.exports = convertToAST;
