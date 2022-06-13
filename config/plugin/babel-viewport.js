const babelPluginViewport  = ({ types }) => {
  const visitor = {
    Program: {
      exit() {},
      enter() {},
    }
  };
  return {
    name: 'viewport',
    visitor
  }
}

module.exports = babelPluginViewport;