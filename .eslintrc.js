module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  plugins: [
    "react"
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
    "plugin:react/recommended"
  ],
  rules: {
    // allow scripts that can be run via command line to ship with console logs
    "no-console": ["off"],
    "quotes": ["error", "single", { "avoidEscape": true }],
    "no-unused-vars": ["error", { "args": "none" }],

    // can help with integrating 3rd party libs such as d3
    "react/no-find-dom-node": ["off"],
    // this rule can falsely report errors for jsx arrays that are passed where they are mapped with a key
    // with this rule off, please check the console for warnings related to this. there should be none
    "react/jsx-key": ["off"]
  }
};
