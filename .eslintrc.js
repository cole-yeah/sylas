const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  extends: ['react-app', 'prettier'],
  parser: 'babel-eslint',
  plugins: ['react', 'jsx-a11y', 'prettier'],
  rules: {
    'no-unused-vars': 'warn',
    'no-unused-expressions': 'warn',
    'prettier/prettier': ['error', prettierOptions],
  },
  overrides: [
    {
      files: ['**/*.js?(x)'],
      rules: { 'prettier/prettier': ['warn', prettierOptions] },
    },
  ],
};
