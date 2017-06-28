'use strict';

const capitalizeWord = word => {
  return word[0].toUpperCase() + word.slice(1);
};

module.exports = capitalizeWord;
