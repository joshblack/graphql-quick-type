'use strict';

const {GraphQLString, GraphQLObjectType} = require('graphql');

const generatedType1 = new GraphQLObjectType({
  name: 'GeneratedType1',
  fields: () => ({
    foo: {
      type: GraphQLString,
    },
  }),
});
module.exports = generatedType1;

'use strict';

const {GraphQLString, GraphQLObjectType} = require('graphql');

const generatedType3 = new GraphQLObjectType({
  name: 'GeneratedType3',
  fields: () => ({
    bar: {
      type: GraphQLString,
    },
  }),
});
module.exports = generatedType3;
