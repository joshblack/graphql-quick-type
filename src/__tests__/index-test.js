'use strict';

const fs = require('fs');
const path = require('path');

const TEST_FIXTURES_DIR = path.resolve(__dirname, '../../__testfixtures__');
const files = fs.readdirSync(TEST_FIXTURES_DIR);
const pairedFiles = files.reduce((acc, file) => {
  const [prefix] = file.split('.');
  if (acc[prefix]) {
    return Object.assign({}, acc, {
      [prefix]: acc[prefix].concat(`${TEST_FIXTURES_DIR}/${file}`),
    });
  }

  return Object.assign({}, acc, {
    [prefix]: [`${TEST_FIXTURES_DIR}/${file}`],
  });
}, {});

describe('quickTypes', () => {
  let quickTypes;

  beforeEach(() => {
    jest.resetModuleRegistry();
    quickTypes = require('../');
  });

  Object.keys(pairedFiles)
    // .filter(key => key === 'iheanyi')
    .forEach(key => {
      const pair = pairedFiles[key];
      const input = fs.readFileSync(pair[0], 'utf8');
      const output = fs.readFileSync(pair[1], 'utf8');

      it(`should convert ${path.basename(pair[0])}`, () => {
        expect(quickTypes(JSON.parse(input))).toBe(output);
      });
    });
});
