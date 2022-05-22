const { createMacro } = require('babel-plugin-macros');
let i = 0;
function reactiveFn({ references }) {
  if (references.state) {
    // references.state.forEach(path => stateMacro(stateUpdaters, path));
  }
}
const reactive = createMacro(reactiveFn);
module.exports = {
  reactive,
};
