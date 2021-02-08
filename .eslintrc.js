module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/essential'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'space-before-function-paren': 0,
    'space-in-parens': 0,
    'eqeqeq': 0,
    'object-property-newline': 0,
    'generator-star-spacing': 0,
    'quotes': ['off', 'single'],
    'object-curly-spacing': 0,
    'comma-dangle': ['error', 'never'],
  },
  globals: {
    $nuxt: true
  }
}
