'use strict';

const {
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLObjectType,
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
