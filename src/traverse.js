'use strict';

const { types: t } = require('./types');

module.exports = () => {
  let _id = 0;
  return function traverse(tree, parentId) {
    const visited = [];
    const id = _id++;
    const node = {
      id,
      parentId,
      tree,
    };

    visited.push(node);

    if (tree.type === t.GraphQLObjectType) {
      tree.fields.forEach((field) => {
        visited.push(...traverse(field, id));
      });
    }

    if (tree.type === t.GraphQLList) {
      tree.children.forEach((child) => {
        visited.push(...traverse(child, id));
      });
    }

    return visited;
  }
};
