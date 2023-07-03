module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
  },
  plugins: ["chai-friendly"],
  extends: [
    "eslint:recommended",
    "airbnb-base",
    "prettier",
    "plugin:chai-friendly/recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "radix": "off",
    "no-plusplus": "off",
    "curly": "error",
    "arrow-body-style": ["error", "as-needed"],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
  },
};
