'use strict';

let _id = 0;

const createModule = ({imports, exports}) => {
  const id = _id++;
  return {
    id,
    imports,
    exports,
    info: {
      name: `generatedType${id}`,
    },
  };
};

module.exports = createModule;
