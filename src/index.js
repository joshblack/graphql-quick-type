'use strict';

const {build, decorate} = require('./graph');
const convertToAST = require('./ast');
const print = require('./print');

/**
 * `quickTypes` runs as a series of stages, namely:
 *   1) Infer the GraphQL-related types from a given JSON response
 *   2) Build the initial module graph, where each module is a GraphQLObjectType
 *   3) After the first pass at building the module graph, decorate the
 *      existing graph with information we might not have had in the first
 *      pass. For example, information about GraphQLList's
 *   4) After we've filled out all the information we can for our modules,
 *      convert each one to it's AST representation
 *   5) Print each AST representation of a module
 */
function quickTypes(input) {
  const modules = decorate(build(input));
  const files = modules.map(convertToAST).map(print);

  return files.join('\n');
}

module.exports = quickTypes;
