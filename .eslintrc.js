module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb"],
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    semi: 0,
    "react/jsx-filename-extension": [1, { extensions: [".js"] }],
    "react/prop-types": 0,
    "react/prefer-stateless-function": 0,
    "react/no-array-index-key": 0,
    "no-console": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "react/destructuring-assignment": 0,
    "react/jsx-one-expression-per-line": 0,
    "max-len": ["error", { code: 300 }],
    "no-nested-ternary": 0,
    quotes: [2, "double", "avoid-escape"],
    "arrow-parens": "as-needed",
  },
}
