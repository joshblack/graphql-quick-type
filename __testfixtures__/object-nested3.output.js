'use strict';

const {GraphQLObjectType} = require('graphql');

const generatedType1 = require('./generatedType1');

const generatedType0 = new GraphQLObjectType({
  name: 'GeneratedType0',
  fields: () => ({
    a: {
      type: generatedType1,
    },
  }),
});
module.exports = generatedType0;

'use strict';

const {GraphQLBoolean, GraphQLObjectType} = require('graphql');

const generatedType2 = require('./generatedType2');

const generatedType1 = new GraphQLObjectType({
  name: 'GeneratedType1',
  fields: () => ({
    boolean: {
      type: GraphQLBoolean,
    },
    b: {
      type: generatedType2,
    },
  }),
});
module.exports = generatedType1;

'use strict';

const {GraphQLObjectType, GraphQLString} = require('graphql');

const generatedType3 = require('./generatedType3');

const generatedType2 = new GraphQLObjectType({
  name: 'GeneratedType2',
  fields: () => ({
    string: {
      type: GraphQLString,
    },
    c: {
      type: generatedType3,
    },
  }),
});
module.exports = generatedType2;

'use strict';

const {GraphQLInt, GraphQLObjectType} = require('graphql');

const generatedType4 = require('./generatedType4');

const generatedType3 = new GraphQLObjectType({
  name: 'GeneratedType3',
  fields: () => ({
    integer: {
      type: GraphQLInt,
    },
    d: {
      type: generatedType4,
    },
  }),
});
module.exports = generatedType3;

'use strict';

const {GraphQLFloat, GraphQLObjectType} = require('graphql');

const generatedType5 = require('./generatedType5');

const generatedType4 = new GraphQLObjectType({
  name: 'GeneratedType4',
  fields: () => ({
    float: {
      type: GraphQLFloat,
    },
    e: {
      type: generatedType5,
    },
  }),
});
module.exports = generatedType4;

'use strict';

const {GraphQLList, GraphQLObjectType} = require('graphql');

const generatedType6 = require('./generatedType6');

const generatedType5 = new GraphQLObjectType({
  name: 'GeneratedType5',
  fields: () => ({
    simplelist: {
      type: new GraphQLList(GraphQLInt),
    },
    f: {
      type: generatedType6,
    },
  }),
});
module.exports = generatedType5;

'use strict';

const {GraphQLList, GraphQLObjectType} = require('graphql');

const generatedType7 = require('./generatedType7');

const generatedType6 = new GraphQLObjectType({
  name: 'GeneratedType6',
  fields: () => ({
    unionlist: {
      type: new GraphQLList(generatedType7),
    },
  }),
});
module.exports = generatedType6;

'use strict';

const {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLString,
  GraphQLUnionType,
} = require('graphql');

const generatedType7 = new GraphQLUnionType({
  name: 'GeneratedType7',
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
module.exports = generatedType7;
