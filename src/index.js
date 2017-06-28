'use strict';

const cloneDeep = require('lodash.clonedeep');
const buildModuleGraph = require('./buildModuleGraph');
const convertToAST = require('./convertToAST');
const print = require('./print');
const {addImport, addGraphQLImport} = require('./utilities/addImports');

const {types: t} = require('./types');
const createModule = require('./utilities/createModule');
function enhanceModules(modules) {
  let _id = 0;
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
        }),
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
          ofType: [...types][0],
        });
        return;
      }

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

      // Union Type
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

function quickTypes(input) {
  const modules = enhanceModules(buildModuleGraph(input));
  const files = modules.map(convertToAST).map(print);

  // console.log(JSON.stringify(modules, null, 2));
  return files.join('\n');
}

module.exports = quickTypes;
