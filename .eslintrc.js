export default {
  "env": {
    "node": true,
    "es6": true
  },
  "parser": "@babel/eslint-parser",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "allowImportExportEverywhere": true
  },
  "extends": ["airbnb", "prettier", "eslint:recommended"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      }
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
   ],
    "spaced-comment": "off",
    "no-console": "error",
    "consistent-return": "off",
    "func-names": "off",
    "object-shorthand": "off",
    "no-process-exit": "off",
    "no-param-reassign": "off",
    "no-return-await": "off",
    "no-underscore-dangle": "off",
    "class-methods-use-this": "off",
    "prefer-destructuring": ["error", { "object": true, "array": false }],
    "no-unused-vars": ["error", { "argsIgnorePattern": "req|res|next|val" }],
    "one-var-declaration-per-line": "off",
    "one-var": "off",
    "prefer-const": "off",
    "no-restricted-syntax": "off"
  }
};
