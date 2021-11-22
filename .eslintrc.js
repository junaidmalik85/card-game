module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true
  },
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint"
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2021
  },
  ignorePatterns: ['src/test/*'],
  rules: {
    allowEmptyReject: 0,
    'no-return-assign': 0,
    'node/no-deprecated-api': 0,
    'no-useless-escape': 0,
    'no-undef': 1,
    'no-unused-expressions': 0,
    'no-throw-literal': 0,
    'new-cap': 0
  }
}
