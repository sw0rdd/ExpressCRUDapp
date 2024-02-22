module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  plugins: [
    'jsdoc'
  ],
  extends: [
    'standard',
    'plugin:jsdoc/recommended'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    "jsdoc/require-returns": "off",
    "jsdoc/require-returns-check": "off"
  },
  ignorePatterns: [
    'build/',
    'doc/',
    'dist/',
    'node_modules/'
  ]
}
