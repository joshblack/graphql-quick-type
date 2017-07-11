'use strict';

const {GraphQLObjectType, GraphQLString} = require('graphql');

const generatedType1 = require('./generatedType1');

const generatedType0 = new GraphQLObjectType({
  name: 'GeneratedType0',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    nested: {
      type: generatedType1,
    },
  }),
});
module.exports = generatedType0;

'use strict';

const {GraphQLInt, GraphQLObjectType} = require('graphql');

const generatedType1 = new GraphQLObjectType({
  name: 'GeneratedType1',
  fields: () => ({
    value: {
      type: GraphQLInt,
    },
  }),
});
module.exports = generatedType1;
