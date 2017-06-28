'use strict';

const {GraphQLList, GraphQLObjectType} = require('graphql');

const generatedType4 = require('./generatedType4');

const generatedType0 = new GraphQLObjectType({
  name: 'GeneratedType0',
  fields: () => ({
    union: {
      type: new GraphQLList(generatedType4),
    },
  }),
});
module.exports = generatedType0;

'use strict';

const {GraphQLInt, GraphQLObjectType} = require('graphql');

const generatedType1 = new GraphQLObjectType({
  name: 'GeneratedType1',
  fields: () => ({
    a: {
      type: GraphQLInt,
    },
  }),
});
module.exports = generatedType1;

'use strict';

const {GraphQLObjectType, GraphQLString} = require('graphql');

const generatedType2 = new GraphQLObjectType({
  name: 'GeneratedType2',
  fields: () => ({
    b: {
      type: GraphQLString,
    },
  }),
});
module.exports = generatedType2;

'use strict';

const {GraphQLBoolean, GraphQLObjectType} = require('graphql');

const generatedType3 = new GraphQLObjectType({
  name: 'GeneratedType3',
  fields: () => ({
    c: {
      type: GraphQLBoolean,
    },
  }),
});
module.exports = generatedType3;

'use strict';

const {GraphQLUnionType} = require('graphql');

const generatedType1 = require('./generatedType1');

const generatedType2 = require('./generatedType2');

const generatedType3 = require('./generatedType3');

const generatedType4 = new GraphQLUnionType({
  name: 'GeneratedType4',
  types: [generatedType1, generatedType2, generatedType3],

  resolveType(value) {
    if (value instanceof generatedType1) {
      return generatedType1;
    }

    if (value instanceof generatedType2) {
      return generatedType2;
    }

    if (value instanceof generatedType3) {
      return generatedType3;
    }
  },
});
module.exports = generatedType4;
