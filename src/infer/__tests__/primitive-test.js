'use strict';

const inferPrimitiveType = require('../primitive');

describe('inferPrimitiveType', () => {
  it('should parse a string', () => {
    expect(inferPrimitiveType('a')).toBe('GraphQLString');
  });

  it('should parse an integer', () => {
    expect(inferPrimitiveType(1)).toBe('GraphQLInt');
  });

  it('should parse a float', () => {
    expect(inferPrimitiveType(2.3)).toBe('GraphQLFloat');
  });

  it('should parse a boolean', () => {
    expect(inferPrimitiveType(true)).toBe('GraphQLBoolean');
    expect(inferPrimitiveType(false)).toBe('GraphQLBoolean');
  });

  it('should parse an array', () => {
    expect(inferPrimitiveType([])).toBe('GraphQLList');
  });

  it('should parse an object', () => {
    expect(inferPrimitiveType({})).toBe('GraphQLObjectType');
  });
});
