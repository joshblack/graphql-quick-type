'use strict';

const {GraphQLObjectType, GraphQLString} = require('graphql');

const generatedType1 = new GraphQLObjectType({
  name: 'GeneratedType1',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
  }),
});
module.exports = generatedType1;
