module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'default-param-last': 'off',
    'import/no-extraneous-dependencies': [ 'error', { devDependencies: true } ],
    'max-len': [ 'error', { code: 80, ignoreStrings: true } ],
    'arrow-body-style': ['error', 'always'],
  },
}
