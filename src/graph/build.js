'use strict';

const areEqual = require('fbjs/lib/areEqual');
const traverse = require('../traverse');
const inferType = require('../infer/type');
const {types: t, isPrimitiveType} = require('../types');
const createModule = require('./utilities/createModule');
const {addImport} = require('./utilities/addImports');

function build(input) {
  const root = inferType(input);
  const moduleMap = {};
  const nodeMap = new WeakMap();

  traverse(root, {
    [t.GraphQLObjectType](node, context) {
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

        parentModule.imports = addImport(parentModule.imports, newModule);

        parentModule.exports.default.fields[
          field.index
        ] = Object.assign({}, field.field, {
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
  });

  return Object.keys(moduleMap).map(key => moduleMap[key]);
}

module.exports = build;
