module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    project: ['./tsconfig.json', './cypress/tsconfig.json'],
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/no-children-prop': 0,
  },
  extends: [
    'react-app',
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    'react-app/jest',
  ],
  overrides: [
    {
      files: ['cypress/**/*.ts'],
      extends: ['plugin:cypress/recommended'],
    }
  ],
}