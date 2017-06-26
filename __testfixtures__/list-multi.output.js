'use strict';

const {GraphQLObjectType, GraphQLString} = require('graphql');

const generatedType0 = new GraphQLObjectType({
  name: 'GeneratedType0',
  fields: () => ({
    foo: {
      type: GraphQLString,
    },
  }),
});
module.exports = generatedType0;

'use strict';

const {GraphQLObjectType, GraphQLString} = require('graphql');

const generatedType1 = new GraphQLObjectType({
  name: 'GeneratedType1',
  fields: () => ({
    bar: {
      type: GraphQLString,
    },
  }),
});
module.exports = generatedType1;
