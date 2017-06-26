'use strict';

const types = {
  GraphQLBoolean: 'GraphQLBoolean',
  GraphQLString: 'GraphQLString',
  GraphQLInt: 'GraphQLInt',
  GraphQLFloat: 'GraphQLFloat',
  GraphQLList: 'GraphQLList',
  GraphQLObjectType: 'GraphQLObjectType',
  GraphQLUnionType: 'GraphQLUnionType',
};
const primitiveType = new Set([
  types.GraphQLBoolean,
  types.GraphQLString,
  types.GraphQLInt,
  types.GraphQLFloat,
]);

exports.types = types;
exports.isPrimitiveType = function isPrimitiveType(type) {
  return primitiveType.has(type);
};
