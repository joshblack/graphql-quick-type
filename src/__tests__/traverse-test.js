'use strict';

const {types: t} = require('../types');
const traverse = require('../traverse');
const inferType = require('../inferType');

const complexObject = {
  id: 'a',
  name: 'Jane Doe',
  friends: [
    {
      name: 'John Doe',
    },
  ],
};

describe('traverse', () => {
  let root;

  beforeEach(() => {
    root = inferType(complexObject);
  });

  it('should invoke visitors with a node when visited', () => {
    const visitors = {
      [t.GraphQLObjectType]: jest.fn(),
      [t.GraphQLList]: jest.fn(),
    };
    traverse(root, visitors);

    expect(visitors[t.GraphQLObjectType]).toHaveBeenCalledTimes(2);
    expect(visitors[t.GraphQLList]).toHaveBeenCalledTimes(1);
  });

  it('should keep the parent chain in context', () => {
    const nestedObject = {
      a: {
        b: {
          c: {
            d: {
              e: true,
            },
          },
        },
      },
    };
    const root = inferType(nestedObject);
    const visitors = {
      [t.GraphQLObjectType]: jest.fn(),
      [t.GraphQLList]: jest.fn(),
    };
    traverse(root, visitors);
    const objectType = visitors[t.GraphQLObjectType];
    const [node, context] = objectType.mock.calls[
      objectType.mock.calls.length - 1
    ];

    expect(node.name).toBe('d');
    expect(context.node.name).toBe('d');
    expect(context.parent.node.name).toBe('c');
    expect(context.parent.parent.node.name).toBe('b');
    expect(context.parent.parent.parent.node.name).toBe('a');
  });
});
