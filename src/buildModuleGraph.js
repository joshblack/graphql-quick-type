'use strict';

const invariant = require('fbjs/lib/invariant');
const areEqual = require('fbjs/lib/areEqual');
const prettyFormat = require('pretty-format');
const traverse = require('./traverse');
const inferType = require('./inferType');
const {types: t, isPrimitiveType} = require('./types');
const createModule = require('./utilities/createModule');
const {addImport} = require('./utilities/addImports');

const findFieldMatch = (node, parentModule) => {
  const [field] = parentModule.exports.default.fields
    .map((field, i) => ({field, index: i}))
    .filter(({field}) => {
      return areEqual(
        {
          name: field.name,
          type: field.type,
          fields: field.fields,
        },
        {
          name: node.name,
          type: node.type,
          fields: node.fields,
        },
      );
    });

  return field;
};

function buildModuleGraph(input) {
  const root = inferType(input);
  const moduleMap = {};
  const nodeMap = new WeakMap();
  // let _id = 0;

  traverse(root, {
    [t.GraphQLObjectType](node, context) {
      // const id = _id++;
      const parentModule = nodeMap.get(context.parent && context.parent.node);

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

      const newModule = createModule({
        imports,
        exports: {
          default: node,
        },
      });
      moduleMap[newModule.id] = newModule;

      nodeMap.set(node, newModule);

      if (parentModule) {
        const {field, index} = findFieldMatch(node, parentModule);

        parentModule.imports = addImport(parentModule.imports, newModule);

        parentModule.exports.default.fields[index] = Object.assign({}, field, {
          type: newModule.info.name,
        });
      }

      if (context.parent) {
        if (context.parent.node.type === t.GraphQLList) {
          const {type, children, name} = context.parent.node;
          const [child] = children
            .map((child, i) => ({
              child,
              index: i,
            }))
            .filter(({child}) => {
              return areEqual(
                {
                  type: child.type,
                  fields: child.fields,
                },
                {
                  type: node.type,
                  fields: node.fields,
                },
              );
            });

          children[child.index] = newModule;
        }
      }
    },
    // [t.GraphQLList](node, context) {
    // const parentModule = nodeMap.get(
    // context.parent && context.parent.node
    // );

    // // Let's double-check to see if the context or parentModule is undefined.
    // // If this is the case, then we _think_ that we're dealing with a JSON
    // // response that has an array at the top level, e.g. [{ foo: 'bar' }]
    // if (context === undefined) {
    // return;
    // }

    // if (parentModule === undefined) {
    // return;
    // }

    // const {children} = node;
    // const types = new Set(children.map(({type}) => type));
    // const {field, index} = findFieldMatch(node, parentModule);

    // // Default to GraphQLString
    // if (types.size === 0) {
    // parentModule.exports.default.fields[index] = Object.assign({}, node, {
    // ofType: t.GraphQLString,
    // });
    // return;
    // }

    // // Homogenous
    // if (types.size === 1) {
    // parentModule.exports.default.fields[index] = Object.assign({}, node, {
    // ofType: [...types][0],
    // });
    // return;
    // }

    // // Union Type
    // const id = _id++;
    // moduleMap[id] = createModule({
    // id,
    // // parent: parentNode,
    // imports: [...types, 'GraphQLUnionType'].map(name => ({
    // name,
    // source: 'graphql',
    // })),
    // exports: {
    // default: {
    // type: t.GraphQLUnionType,
    // types: [...types],
    // },
    // },
    // });

    // nodeMap.set(node, moduleMap[id]);

    // invariant(
    // parentModule.exports.default.type === t.GraphQLObjectType,
    // 'Expected the Parent Node type to always be a GraphQLObjectType',
    // );

    // parentModule.exports.default.fields[index] = Object.assign({}, node, {
    // ofType: moduleMap[id],
    // });

    // parentModule.imports = addImport(parentModule.imports, moduleMap[id]);
    // },
  });

  return Object.keys(moduleMap).map(key => moduleMap[key]);
}

module.exports = buildModuleGraph;
