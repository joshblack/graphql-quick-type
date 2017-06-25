'use strict';

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
} = require('graphql');

const generatedType0 = new GraphQLObjectType({
  name: 'GeneratedType0',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
    float: {
      type: GraphQLFloat,
    },
    verified: {
      type: GraphQLBoolean,
    },
  }),
});
module.exports = generatedType0;
