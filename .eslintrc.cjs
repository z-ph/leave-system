module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'error',
    'no-console': 'warn',
    'no-debugger': 'error',
    'prefer-const': 'error',
  },
  ignorePatterns: [
    'dist/**',
    'dist-ssr/**',
    'coverage/**',
    'src/api/axios/Api.ts',
    'node_modules/**',
    '**/*.vue',
  ],
}