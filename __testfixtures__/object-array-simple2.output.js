'use strict';

const {GraphQLList, GraphQLObjectType, GraphQLString} = require('graphql');

const generatedType1 = require('./generatedType1');

const generatedType0 = new GraphQLObjectType({
  name: 'GeneratedType0',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    list: {
      type: new GraphQLList(generatedType1),
    },
  }),
});
module.exports = generatedType0;

'use strict';

const {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLString,
  GraphQLUnionType,
} = require('graphql');

const generatedType1 = new GraphQLUnionType({
  name: 'GeneratedType1',
  types: [GraphQLInt, GraphQLString, GraphQLBoolean],

  resolveType(value) {
    if (value instanceof GraphQLInt) {
      return GraphQLInt;
    }

    if (value instanceof GraphQLString) {
      return GraphQLString;
    }

    if (value instanceof GraphQLBoolean) {
      return GraphQLBoolean;
    }
  },
});
module.exports = generatedType1;
