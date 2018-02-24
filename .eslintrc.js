// https://eslint.org/docs/user-guide/configuring

module.exports = {
  extends: 'standard',
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      module: true
    }
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  globals: {
    console: true,
    WeixinJSBridge: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'eslint:recommended',
  // required to lint *.vue files
  plugins: ['import', 'html'],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    indent: ['error', 'tab'],
    quotes: ['error', 'single'],
    semi: ['error', 'always', { omitLastInOneLineBlock: true }],
    'no-multiple-empty-lines': ['error', { max: 3, maxBOF: 1 }],
    'key-spacing': ["error", { "beforeColon": false }]
  },
  settings: {
    'import/extensions': ['.js', '.vue']
  }
};
