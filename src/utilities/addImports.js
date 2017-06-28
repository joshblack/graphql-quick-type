'use strict';

const {types: t} = require('../types');

const addImport = (imports, module) => {
  for (let i = 0; i < imports.length; i++) {
    if (imports[i] === module) {
      return [...imports];
    }
  }

  return [...imports, module];
};

exports.addImport = addImport;

const addGraphQLImport = (imports, name) => {
  for (let i = 0; i < imports.length; i++) {
    if (imports[i].name === name) {
      return imports;
    }
  }

  return [
    ...imports,
    {
      name,
      source: 'graphql',
    },
  ];
};

exports.addGraphQLImport = addGraphQLImport;
