'use strict';

const {GraphQLObjectType, GraphQLString} = require('graphql');

const generatedType3 = require('./generatedType3');

const generatedType0 = new GraphQLObjectType({
  name: 'GeneratedType0',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    info: {
      type: generatedType3,
    },
  }),
});
module.exports = generatedType0;

'use strict';

const {GraphQLBoolean, GraphQLObjectType} = require('graphql');

const generatedType3 = new GraphQLObjectType({
  name: 'GeneratedType3',
  fields: () => ({
    verified: {
      type: GraphQLBoolean,
    },
  }),
});
module.exports = generatedType3;
