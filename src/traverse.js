'use strict';

const {types: t} = require('./types');

function traverse(node, visitor, context) {
  const {type} = node;
  const currentContext = {
    node,
    parent: context,
  };

  if (visitor[type]) {
    visitor[type](node, currentContext);
  }

  if (type === t.GraphQLObjectType) {
    node.fields.forEach(field => {
      traverse(field, visitor, currentContext);
    });
  }

  if (type === t.GraphQLList) {
    node.children.forEach(child => {
      traverse(child, visitor, currentContext);
    });
  }
}

module.exports = traverse;
