'use strict';

const {GraphQLList, GraphQLObjectType} = require('graphql');

const generatedType8 = require('./generatedType8');

const generatedType0 = new GraphQLObjectType({
  name: 'GeneratedType0',
  fields: () => ({
    a: {
      type: new GraphQLList(generatedType8),
    },
  }),
});
module.exports = generatedType0;

'use strict';

const {GraphQLObjectType} = require('graphql');

const generatedType2 = require('./generatedType2');

const generatedType1 = new GraphQLObjectType({
  name: 'GeneratedType1',
  fields: () => ({
    b: {
      type: generatedType2,
    },
  }),
});
module.exports = generatedType1;

'use strict';

const {GraphQLList, GraphQLObjectType} = require('graphql');

const generatedType3 = require('./generatedType3');

const generatedType2 = new GraphQLObjectType({
  name: 'GeneratedType2',
  fields: () => ({
    c: {
      type: new GraphQLList(generatedType3),
    },
  }),
});
module.exports = generatedType2;

'use strict';

const {GraphQLBoolean, GraphQLObjectType} = require('graphql');

const generatedType3 = new GraphQLObjectType({
  name: 'GeneratedType3',
  fields: () => ({
    d: {
      type: GraphQLBoolean,
    },
  }),
});
module.exports = generatedType3;

'use strict';

const {GraphQLList, GraphQLObjectType} = require('graphql');

const generatedType4 = new GraphQLObjectType({
  name: 'GeneratedType4',
  fields: () => ({
    e: {
      type: new GraphQLList(GraphQLString),
    },
  }),
});
module.exports = generatedType4;

'use strict';

const {GraphQLObjectType} = require('graphql');

const generatedType6 = require('./generatedType6');

const generatedType5 = new GraphQLObjectType({
  name: 'GeneratedType5',
  fields: () => ({
    i: {
      type: generatedType6,
    },
  }),
});
module.exports = generatedType5;

'use strict';

const {GraphQLObjectType} = require('graphql');

const generatedType7 = require('./generatedType7');

const generatedType6 = new GraphQLObjectType({
  name: 'GeneratedType6',
  fields: () => ({
    j: {
      type: generatedType7,
    },
  }),
});
module.exports = generatedType6;

'use strict';

const {GraphQLList, GraphQLObjectType} = require('graphql');

const generatedType7 = new GraphQLObjectType({
  name: 'GeneratedType7',
  fields: () => ({
    k: {
      type: new GraphQLList(GraphQLString),
    },
  }),
});
module.exports = generatedType7;

'use strict';

const {GraphQLUnionType} = require('graphql');

const generatedType1 = require('./generatedType1');

const generatedType4 = require('./generatedType4');

const generatedType5 = require('./generatedType5');

const generatedType8 = new GraphQLUnionType({
  name: 'GeneratedType8',
  types: [generatedType1, generatedType4, generatedType5],

  resolveType(value) {
    if (value instanceof generatedType1) {
      return generatedType1;
    }

    if (value instanceof generatedType4) {
      return generatedType4;
    }

    if (value instanceof generatedType5) {
      return generatedType5;
    }
  },
});
module.exports = generatedType8;
