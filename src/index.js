'use strict';

const print = require('./print');
const traverse = require('./traverse');
const inferType = require('./inferType');
const convertToAST = require('./convertToAST');
const { types: t } = require('./types');

function quickTypes(input) {
  const types = inferType(input);
  const traversal = traverse()(types).filter((type) => {
    if (type.tree.type === t.GraphQLObjectType) {
      return true;
    }

    return false;
  }).map((type) => {
    const imports = type.tree.fields.map((field) => field.type);
    imports.push(type.tree.type);

    return Object.assign({}, type, {
      imports: imports.reduce((acc, identifier) => {
        if (acc.indexOf(identifier) !== -1) {
          return acc;
        }

        return acc.concat(identifier);
      }, []),
    });
  });
  const files = traversal.map(convertToAST).map(print);

  return files.join('\n');
}

module.exports = quickTypes;
