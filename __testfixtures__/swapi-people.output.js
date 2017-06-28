'use strict';

const {GraphQLList, GraphQLObjectType, GraphQLString} = require('graphql');

const generatedType0 = new GraphQLObjectType({
  name: 'GeneratedType0',
  fields: () => ({
    name: {
      type: GraphQLString,
    },
    height: {
      type: GraphQLString,
    },
    mass: {
      type: GraphQLString,
    },
    hair_color: {
      type: GraphQLString,
    },
    skin_color: {
      type: GraphQLString,
    },
    eye_color: {
      type: GraphQLString,
    },
    birth_year: {
      type: GraphQLString,
    },
    gender: {
      type: GraphQLString,
    },
    homeworld: {
      type: GraphQLString,
    },
    films: {
      type: new GraphQLList(GraphQLString),
    },
    species: {
      type: new GraphQLList(GraphQLString),
    },
    vehicles: {
      type: new GraphQLList(GraphQLString),
    },
    starships: {
      type: new GraphQLList(GraphQLString),
    },
    created: {
      type: GraphQLString,
    },
    edited: {
      type: GraphQLString,
    },
    url: {
      type: GraphQLString,
    },
  }),
});
module.exports = generatedType0;
