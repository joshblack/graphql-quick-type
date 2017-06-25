'use strict';

const {types: t} = require('./types');

function inferPrimitiveType(input) {
  if (typeof input === 'string') {
    return t.GraphQLString;
  }

  if (typeof input === 'number') {
    // Will fail for floats like 1.0
    if (parseInt(input, 10) === input) {
      return t.GraphQLInt;
    }
    return t.GraphQLFloat;
  }

  if (typeof input === 'boolean') {
    return t.GraphQLBoolean;
  }

  if (Array.isArray(input)) {
    return t.GraphQLList;
  }

  if (typeof input === 'object') {
    return t.GraphQLObjectType;
  }

  throw new Error('Cannot parse type of given input');
}

module.exports = inferPrimitiveType;
