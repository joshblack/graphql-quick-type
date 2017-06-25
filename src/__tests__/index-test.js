'use strict';

const fs = require('fs');
const path = require('path');

const TEST_FIXTURES_DIR = path.resolve(__dirname, '../__testfixtures__');
const files = fs.readdirSync(TEST_FIXTURES_DIR);
const pairedFiles = files.reduce((acc, file) => {
  const [prefix] = file.split('.');
  if (acc[prefix]) {
    return Object.assign({}, acc, {
      [prefix]: acc[prefix].concat(`${TEST_FIXTURES_DIR}/${file}`),
    });
  }

  return Object.assign({}, acc, {
    [prefix]: [`${TEST_FIXTURES_DIR}/${file}`]
  });
}, {});

describe('quickTypes', () => {
  let quickTypes;

  it('should work', () => {
    Object.keys(pairedFiles).forEach((key) => {
      const pair = pairedFiles[key];
      const input = fs.readFileSync(pair[0], 'utf8');
      const output = fs.readFileSync(pair[1], 'utf8');

      quickTypes = require('../');

      // quickTypes({
        // id: 1,
        // name: 'Jane Doe',
        // // friends: [
          // // {
            // // id: '2',
            // // name: 'John Doe',
            // // friends: [],
          // // },
        // // ],
      // })
      expect(quickTypes(JSON.parse(input))).toBe(output);
    });
  });
});
