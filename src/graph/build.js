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
      // Specific case where we have a GraphQLList as the root node
      // if (context.parent && context.parent.node.type === t.GraphQLList) {
      // if (context.parent.parent === undefined) {
      // console.log('hi');
      // console.log(node);
      // const {type, children, name} = context.parent.node;
      // // console.log(children);
      // const [child] = children
      // .map((child, i) => ({
      // child,
      // index: i,
      // }))
      // .filter(({child}) => {
      // if (child.id === undefined) {
      // return false;
      // }
      // console.log(child.exports.default);
      // console.log(node);
      // console.log('---------------');
      // // return areEqual(
      // // {
      // // type: child.exports.default.type,
      // // fields: child.exports.default.fields,
      // // },
      // // {
      // // type: node.type,
      // // fields: node.fields,
      // // }
      // // );
      // });

      // console.log('-------------------');
      // if (child !== undefined) {
      // return;
      // }
      // }
      // }

      const parentModule = context.parent && nodeMap.get(context.parent.node);

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
              }
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
                }
              );
            });

          if (child !== undefined && child.index !== undefined) {
            children[child.index] = newModule;
          }
        }
      }
    },
    [t.GraphQLList](node, context) {
      // Dedupe any items in the list
      const dedupedChildren = node.children.reduce((acc, child) => {
        const match = acc.filter(m => areEqual(m, child));
        if (match.length === 0) {
          return acc.concat(child);
        }

        return acc;
      }, []);

      node.children = dedupedChildren;
    },
  });

  return Object.keys(moduleMap).map(key => moduleMap[key]);
}

module.exports = build;
