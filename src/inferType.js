'use strict';

const {types: t} = require('./types');
const inferPrimitiveType = require('./inferPrimitiveType');

function inferType(input) {
  if (Array.isArray(input)) {
    return {
      type: t.GraphQLList,
      children: input.map(inferType),
    };
  }

  if (inferPrimitiveType(input) === t.GraphQLObjectType) {
    return {
      type: t.GraphQLObjectType,
      fields: Object.keys(input).map(key => {
        return Object.assign({}, inferType(input[key]), {
          name: key.toLowerCase(),
        });
      }),
    };
  }

  return {
    type: inferPrimitiveType(input),
  };
}

module.exports = inferType;
