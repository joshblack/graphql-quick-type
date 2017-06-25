'use strict';

const {types: t, isPrimitiveType} = require('../types');
const areEqual = require('fbjs/lib/areEqual');
const traverse = require('../traverse');
const inferType = require('../inferType');
const buildModuleGraph = require('../buildModuleGraph');

const input = {
  id: 'a',
  name: 'Jane Doe',
  info: {
    verified: true,
  },
};

describe('buildModuleGraph', () => {
  it('should work', () => {
    expect(buildModuleGraph(input)).toMatchSnapshot();
  });
});
