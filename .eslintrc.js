module.exports = {
  extends: [
    "airbnb-base",
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    mongo: true,
  },
  plugins: [],
  rules: {},
};
