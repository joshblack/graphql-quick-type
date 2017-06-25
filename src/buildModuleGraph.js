'use strict';

const areEqual = require('fbjs/lib/areEqual');
const traverse = require('./traverse');
const inferType = require('./inferType');
const {types: t, isPrimitiveType} = require('./types');

// {
// id: 0,
// name: string,
// // Directed Edges, essentially. These are dependencies.
// // So this module, A, depends on imports B, C. Visually: A -> B,C
// imports: [],
// // The tree that will be constructed
// exports: {},
// }

const normalizeModule = m => {
  const imports = m.tree.fields
    .filter(field => {
      return isPrimitiveType(field.type);
    })
    .reduce(
      (acc, field) => {
        if (acc.find(e => e.name === field.type)) {
          return acc;
        }

        return acc.concat({
          name: field.type,
          source: 'graphql',
        });
      },
      [{name: t.GraphQLObjectType, source: 'graphql'}],
    );

  return {
    id: m.id,
    name: `generatedType${m.id}`,
    parentId: m.parentId,
    imports,
    exports: {
      default: m.tree,
    },
  };
};

function buildModuleGraph(input) {
  const type = inferType(input);
  const modules = traverse()(type)
    .filter(({tree}) => tree.type === t.GraphQLObjectType)
    .reduce((acc, m) => {
      return Object.assign({}, acc, {
        [m.id]: normalizeModule(m),
      });
    }, {});

  Object.keys(modules).forEach(id => {
    const m = modules[id];
    const parentModule = modules[m.parentId];

    delete modules[id].parentId;

    // We're at the root of the tree, nothing that we can do here so we'll
    // just normalize the structure.
    if (parentModule === undefined) {
      return;
    }

    // Look through the parent module for nested types that are equivalent
    // to the current module we're working with.
    const fields = parentModule.exports.default.fields
      .map((field, i) => ({field, index: i}))
      .filter(({field}) => areEqual(field, m.exports.default));

    fields.forEach(({field, index}) => {
      parentModule.exports.default.fields[index] = m;

      if (parentModule.imports.indexOf(m.id) === -1) {
        parentModule.imports.push(m);
      }
    });
  });

  return Object.keys(modules).map(id => modules[id]);
}

module.exports = buildModuleGraph;
