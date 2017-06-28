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

const {GraphQLObjectType, GraphQLString} = require('graphql');

const generatedType1 = new GraphQLObjectType({
  name: 'GeneratedType1',
  fields: () => ({
    title: {
      type: GraphQLString,
    },
  }),
});
module.exports = generatedType1;
