'use strict';

const {GraphQLList, GraphQLObjectType, GraphQLString} = require('graphql');

const generatedType3 = require('./generatedType3');

const generatedType0 = new GraphQLObjectType({
  name: 'GeneratedType0',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    list: {
      type: new GraphQLList(generatedType3),
    },
  }),
});
module.exports = generatedType0;

const {GraphQLBoolean, GraphQLInt, GraphQLString} = require('graphql');

const generatedType3 = new GraphQLUnionType({
  name: 'GeneratedType3',
  types: [GraphQLBoolean, GraphQLInt, GraphQLString],
  resolveType(value) {
    if (value instanceof GraphQLBoolean) {
      return GraphQLBoolean;
    }
    if (value instanceof GraphQLInt) {
      return GraphQLInt;
    }
    if (value instanceof GraphQLString) {
      return GraphQLString;
    }
  },
});
module.exports = generatedType3;
