'use strict';

const cloneDeep = require('lodash.clonedeep');
const {types: t} = require('../types');
const createModule = require('./utilities/createModule');
const {addImport, addGraphQLImport} = require('./utilities/addImports');

/**
 * After building up our initial Module Graph, the next step is to visit a
 * specific subset of fields and add information to them.
 *
 * In this case, we're just working with GraphQLList types and trying to figure
 * out if the list is all the same type, or is a union of different types.
 */
function decorate(modules) {
  const moduleMap = cloneDeep(modules).reduce((acc, m) => {
    return Object.assign({}, acc, {
      [m.id]: m,
    });
  }, {});

  Object.keys(moduleMap).forEach(key => {
    const m = moduleMap[key];
    const {fields} = m.exports.default;
    const listFields = fields
      .map((field, i) => ({field, index: i}))
      .filter(({field}) => field.type === t.GraphQLList);

    if (listFields.length === 0) {
      return;
    }

    listFields.forEach(({field: list, index}) => {
      const {children} = list;
      const types = new Set(
        children.map(child => {
          if (child.type) {
            return child.type;
          }

          return child;
        })
      );

      // Default to GraphQLString
      if (types.size === 0) {
        m.imports = addGraphQLImport(m.imports, t.GraphQLString);
        m.exports.default.fields[index] = Object.assign({}, list, {
          ofType: t.GraphQLString,
        });
        return;
      }

      // Homogenous
      if (types.size === 1) {
        const type = [...types][0];
        m.imports = addImport(m.imports, type);
        m.exports.default.fields[index] = Object.assign({}, list, {
          ofType: type,
        });
        return;
      }

      // Union Type
      const imports = [...types].map(type => {
        // GraphQL Import
        if (typeof type === 'string') {
          return {
            name: type,
            source: 'graphql',
          };
        }

        // Module
        return type;
      });

      const unionModule = createModule({
        imports: imports.concat({
          name: 'GraphQLUnionType',
          source: 'graphql',
        }),
        exports: {
          default: {
            type: t.GraphQLUnionType,
            types: [...types],
          },
        },
      });
      moduleMap[unionModule.id] = unionModule;

      m.exports.default.fields[index] = Object.assign({}, list, {
        ofType: unionModule,
      });

      m.imports = addImport(m.imports, unionModule);
    });
  });

  return Object.keys(moduleMap).map(key => moduleMap[key]);
}

module.exports = decorate;
