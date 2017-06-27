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
    info: {
      type: generatedType1,
    },
  }),
});
module.exports = generatedType0;

'use strict';

const {GraphQLObjectType, GraphQLString} = require('graphql');

const generatedType2 = require('./generatedType2');

const generatedType1 = new GraphQLObjectType({
  name: 'GeneratedType1',
  fields: () => ({
    email: {
      type: GraphQLString,
    },
    account: {
      type: generatedType2,
    },
  }),
});
module.exports = generatedType1;

'use strict';

const {GraphQLBoolean, GraphQLObjectType} = require('graphql');

const generatedType2 = new GraphQLObjectType({
  name: 'GeneratedType2',
  fields: () => ({
    verified: {
      type: GraphQLBoolean,
    },
  }),
});
module.exports = generatedType2;
