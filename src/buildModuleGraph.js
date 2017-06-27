'use strict';

const invariant = require('fbjs/lib/invariant');
const areEqual = require('fbjs/lib/areEqual');
// const traverse = require('./traverse');
const inferType = require('./inferType');
const {types: t, isPrimitiveType} = require('./types');
const prettyFormat = require('pretty-format');

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

const createModule = ({id, parent, imports, exports}) => ({
  id,
  // parent,
  imports,
  exports,
  info: {
    name: `generatedType${id}`,
  },
});

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
  let _id = 0;
  // let parentNode;

  traverse(root, {
    [t.GraphQLObjectType](node, context) {
      const id = _id++;
      const parentModule = nodeMap.get(context);

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

      moduleMap[id] = createModule({
        id,
        // parent: parentNode,
        imports,
        exports: {
          default: node,
        },
      });

      nodeMap.set(node, moduleMap[id]);

      if (parentModule) {
        const {field, index} = findFieldMatch(node, parentModule);

        parentModule.imports = addImport(parentModule.imports, moduleMap[id]);

        parentModule.exports.default.fields[index] = Object.assign({}, field, {
          type: moduleMap[id].info.name,
        });
      }
    },
    [t.GraphQLList](node, context) {
      const parentModule = nodeMap.get(context);

      if (context === undefined) {
        return;
      }

      if (parentModule === undefined) {
        return;
      }

      const {children} = node;
      const types = new Set(children.map(({type}) => type));
      const {field, index} = findFieldMatch(node, parentModule);

      // Default to GraphQLString
      if (types.size === 0) {
        parentModule.exports.default.fields[index] = Object.assign({}, node, {
          ofType: t.GraphQLString,
        });
        return;
      }

      // Homogenous
      if (types.size === 1) {
        parentModule.exports.default.fields[index] = Object.assign({}, node, {
          ofType: [...types][0],
        });
        return;
      }

      // Union Type
      const id = _id++;
      moduleMap[id] = createModule({
        id,
        // parent: parentNode,
        imports: [...types, 'GraphQLUnionType'].map(name => ({
          name,
          source: 'graphql',
        })),
        exports: {
          default: {
            type: t.GraphQLUnionType,
            types: [...types],
          },
        },
      });

      nodeMap.set(node, moduleMap[id]);

      invariant(
        parentModule.exports.default.type === t.GraphQLObjectType,
        'Expected the Parent Node type to always be a GraphQLObjectType',
      );

      parentModule.exports.default.fields[index] = Object.assign({}, node, {
        ofType: moduleMap[id],
      });

      parentModule.imports = addImport(parentModule.imports, moduleMap[id]);
    },
  });

  return Object.keys(moduleMap).map(key => moduleMap[key]);
}

module.exports = buildModuleGraph;
