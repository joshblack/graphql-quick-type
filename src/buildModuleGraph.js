'use strict';

const invariant = require('fbjs/lib/invariant');
const areEqual = require('fbjs/lib/areEqual');
// const traverse = require('./traverse');
const inferType = require('./inferType');
const {types: t, isPrimitiveType} = require('./types');
const prettyFormat = require('pretty-format');

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

function traverse(node, visitor, context) {
  const {children, type, fields} = node;

  if (visitor[type]) {
    visitor[type](node, context || node);
  }

  if (type === t.GraphQLObjectType) {
    fields.forEach(field => {
      traverse(field, visitor, node);
    });
  }

  if (type === t.GraphQLList) {
    children.forEach(child => {
      traverse(child, visitor, node);
    });
  }
}

const addImport = (imports, module) => {
  for (let i = 0; i < imports.length; i++) {
    if (imports[i] === module) {
      return [...imports];
    }
  }

  return [...imports, module];
};

function buildModuleGraph(input) {
  const root = inferType(input);
  const moduleMap = {};
  const nodeMap = new WeakMap();
  let _id = 0;
  let parentNode = null;

  traverse(root, {
    [t.GraphQLObjectType](node, context) {
      const id = _id++;

      // Start by grabbing our primitive GraphQL imports, like GraphQLString.
      const allGraphQLImports = node.fields
        .filter(({type}) => type !== t.GraphQLObjectType)
        .map(({type}) => type);

      // Make sure we're not grabbing duplicate imports
      const imports = [...new Set(allGraphQLImports)].map(name => ({
        name,
        source: 'graphql',
      }));

      // Manually push GraphQLObjectType in our imports list since we use it
      // for the module definition itself.
      imports.push({
        name: t.GraphQLObjectType,
        source: 'graphql',
      });

      moduleMap[id] = {
        id,
        parent: parentNode,
        imports,
        exports: {
          default: node,
        },
      };

      nodeMap.set(node, moduleMap[id]);

      const parentModule = nodeMap.get(parentNode);

      if (parentModule) {
        parentModule.imports = addImport(parentModule.imports, moduleMap[id]);
      }

      if (!areEqual(parentNode, context)) {
        parentNode = context;
      }
    },
    [t.GraphQLList](node, context) {
      const {children} = node;
      const types = new Set(children.map(({type}) => type));
      const [field] = parentNode.fields
        .map((field, i) => ({field, index: i}))
        .filter(({field}) => areEqual(node, field));

      // Default to GraphQLString
      if (types.size === 0) {
        parentNode.fields[field.index] = Object.assign({}, node, {
          ofType: t.GraphQLString,
        });
        return;
      }

      // Homogenous
      if (types.size === 1) {
        parentNode.fields[field.index] = Object.assign({}, node, {
          ofType: [...types][0],
        });
        return;
      }

      // Union Type
      const id = _id++;
      moduleMap[id] = {
        id,
        parent: parentNode,
        exports: {
          default: {
            type: t.GraphQLUnionType,
            types: [...types],
          },
        },
      };

      nodeMap.set(node, moduleMap[id]);

      invariant(
        parentNode.type === t.GraphQLObjectType,
        'Expected the Parent Node type to always be a GraphQLObjectType',
      );

      parentNode.fields[field.index] = Object.assign({}, node, {
        ofType: moduleMap[id],
      });

      const parentModule = nodeMap.get(parentNode);
      parentModule.imports = addImport(parentModule.imports, moduleMap[id]);

      if (!areEqual(parentNode, context)) {
        parentNode = context;
      }
    },
  });

  // console.log(prettyFormat(moduleMap));

  console.log(moduleMap[0].imports);

  // const modules = traverse()(type)
  // .filter(({tree}) => tree.type === t.GraphQLObjectType)
  // .reduce((acc, m) => {
  // return Object.assign({}, acc, {
  // [m.id]: normalizeModule(m),
  // });
  // }, {});

  // Object.keys(modules).forEach(id => {
  // const m = modules[id];
  // const parentModule = modules[m.parentId];

  // delete modules[id].parentId;

  // // We're at the root of the tree, nothing that we can do here so we'll
  // // just normalize the structure.
  // if (parentModule === undefined) {
  // return;
  // }

  // // Look through the parent module for nested types that are equivalent
  // // to the current module we're working with.
  // const fields = parentModule.exports.default.fields
  // .map((field, i) => ({field, index: i}))
  // .filter(({field}) => areEqual(field, m.exports.default));

  // fields.forEach(({field, index}) => {
  // parentModule.exports.default.fields[index] = m;

  // if (parentModule.imports.indexOf(m.id) === -1) {
  // parentModule.imports.push(m);
  // }
  // });
  // });

  // return Object.keys(modules).map(id => modules[id]).map((m) => {
  // const listFields = m.exports.default.fields.filter((field) => {
  // return field.type === t.GraphQLList;
  // });

  // if (listFields.length) {
  // console.log(m);
  // }

  // listFields.forEach((listField) => {
  // const homogeneous = listField.children.reduce((acc, field, i, arr) => {
  // if (!acc) {
  // return acc;
  // }
  // return areEqual(field, arr[i - 1]);
  // });

  // listField.info = {
  // homogeneous,
  // listType: listField.children[0],
  // };
  // });

  // if (listFields.length) {
  // if (!m.imports.find(({ name }) => name === t.GraphQLList)) {
  // m.imports.push({
  // name: t.GraphQLList,
  // source: 'graphql',
  // });
  // }
  // }

  // return m;
  // });
}

module.exports = buildModuleGraph;
