'use strict';

const inferType = require('../inferType');

describe('inferType', () => {
  it('should infer the types in a simple object', () => {
    const object = {
      integer: 1,
      float: 2.3,
      string: 'a',
      boolean: true,
    };
    expect(inferType(object)).toEqual({
      type: 'GraphQLObjectType',
      fields: [
        {
          name: 'integer',
          type: 'GraphQLInt',
        },
        {
          name: 'float',
          type: 'GraphQLFloat',
        },
        {
          name: 'string',
          type: 'GraphQLString',
        },
        {
          name: 'boolean',
          type: 'GraphQLBoolean',
        },
      ],
    });
  });

  it('should infer the types in an array', () => {
    const array = [{foo: 'bar'}, {foo: 'baz'}];
    expect(inferType(array)).toEqual({
      type: 'GraphQLList',
      children: [
        {
          type: 'GraphQLObjectType',
          fields: [
            {
              name: 'foo',
              type: 'GraphQLString',
            },
          ],
        },
        {
          type: 'GraphQLObjectType',
          fields: [
            {
              name: 'foo',
              type: 'GraphQLString',
            },
          ],
        },
      ],
    });
  });

  it('should infer the types in a object with an array field', () => {
    const object = {
      a: [{b: 'b'}],
    };
    expect(inferType(object)).toEqual({
      type: 'GraphQLObjectType',
      fields: [
        {
          name: 'a',
          type: 'GraphQLList',
          children: [
            {
              type: 'GraphQLObjectType',
              fields: [
                {
                  name: 'b',
                  type: 'GraphQLString',
                },
              ],
            },
          ],
        },
      ],
    });
  });
});
