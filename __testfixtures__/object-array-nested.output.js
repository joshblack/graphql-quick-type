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

const {GraphQLObjectType} = require('graphql');

const generatedType2 = require('./generatedType2');

const generatedType1 = new GraphQLObjectType({
  name: 'GeneratedType1',
  fields: () => ({
    a: {
      type: generatedType2,
    },
  }),
});
module.exports = generatedType1;

'use strict';

const {GraphQLObjectType} = require('graphql');

const generatedType3 = require('./generatedType3');

const generatedType2 = new GraphQLObjectType({
  name: 'GeneratedType2',
  fields: () => ({
    b: {
      type: generatedType3,
    },
  }),
});
module.exports = generatedType2;

'use strict';

const {GraphQLObjectType} = require('graphql');

const generatedType4 = require('./generatedType4');

const generatedType3 = new GraphQLObjectType({
  name: 'GeneratedType3',
  fields: () => ({
    c: {
      type: generatedType4,
    },
  }),
});
module.exports = generatedType3;

'use strict';

const {GraphQLBoolean, GraphQLObjectType} = require('graphql');

const generatedType4 = new GraphQLObjectType({
  name: 'GeneratedType4',
  fields: () => ({
    d: {
      type: GraphQLBoolean,
    },
  }),
});
module.exports = generatedType4;
