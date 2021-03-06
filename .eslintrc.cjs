module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  plugins: [
    "react",
    "import"
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true
    },
    sourceType: "module"
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/errors"
  ],
  rules: {
    "quotes": ["error", "single", { "avoidEscape": true }],
    "no-unused-vars": ["error", { "args": "none" }],
    "class-methods-use-this": ["error", { "exceptMethods": [
      'render', 'componentDidMount', 'componentWillUnmount'
    ] }],
    "consistent-return": "error",
    "dot-notation": "error",
    "eqeqeq": "error",
    "guard-for-in": "error",
    "no-alert": "error",
    "no-else-return": "error",
    "no-empty-function": "error",
    "no-empty-pattern": "error",
    "no-fallthrough": "error",
    "no-floating-decimal": "error",
    "no-implicit-globals": "error",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "no-loop-func": "error",
    "no-self-compare": "error",
    "no-useless-concat": "error",
    "no-useless-return": "error",
    "wrap-iife": "error",
    "yoda": "error",
    "no-redeclare": "error",
    "no-return-assign": "error",
    "no-script-url": "error",
    "no-new-wrappers": "error",
    "no-param-reassign": "error",
    "no-new": "error",
    "no-multi-spaces": "error",
    "no-multi-str": "error",
    "arrow-parens": "error",
    "arrow-spacing": "error",
    "no-duplicate-imports": "error",
    "no-useless-constructor": "error",
    "no-var": "error",
    "prefer-const": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    "array-bracket-spacing": "error",
    "array-bracket-spacing": ["error", "consistent"],
    "array-bracket-newline": ["error", "consistent"],
    "brace-style": ["error", "stroustrup"],
    "camelcase": "error",
    "array-bracket-spacing": "error",
    "block-spacing": "error",
    "switch-colon-spacing": "error",
    "spaced-comment": "error",
    "space-unary-ops": "error",
    "space-infix-ops": "error",
    "space-in-parens": "error",
    "space-before-function-paren": ["error", "never"],
    "space-before-blocks": "error",
    "semi": "error",
    "semi-style": "error",
    "semi-spacing": "error",
    "comma-dangle": "error",
    "comma-spacing": "error",
    "comma-style": "error",
    "consistent-this": "error",
    "eol-last": "error",
    "computed-property-spacing": "error",
    "func-call-spacing": "error",
    "jsx-quotes": "error",
    "implicit-arrow-linebreak": "error",
    "key-spacing": "error",
    "linebreak-style": "error",
    "lines-between-class-members": "off",
    "max-statements-per-line": "error",
    "new-cap": "error",
    "new-parens": "error",
    "no-array-constructor": "error",
    "no-lonely-if": "error",
    "no-negated-condition": "error",
    "no-nested-ternary": "error",
    "no-new-object": "error",
    "no-trailing-spaces": "error",
    "no-unneeded-ternary": "error",
    "operator-assignment": "error",
    "no-whitespace-before-property": "error",
    "no-multiple-empty-lines": "error",
    "quote-props": ["error", "as-needed"],
    "indent": ["error", 2],
    "max-lines": ["error", 800],
    "max-statements": ["error", 20],
    "object-curly-spacing": ["error", "always"],
    "padded-blocks": ["error", "never"],

    "prefer-promise-reject-errors": "warn",

    // allow scripts that can be run via command line to ship with console logs
    "no-console": ["off"],
    // can help with integrating 3rd party libs such as d3
    "react/no-find-dom-node": ["off"],
    // this rule can falsely report errors for jsx arrays that are passed where they are mapped with a key
    // with this rule off, please check the console for warnings related to this. there should be none
    "react/jsx-key": ["off"],

    "import/no-unresolved": ["error", { commonjs: true }]
  }
};
