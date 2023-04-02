/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
    'plugin:import/recommended',
    'plugin:jest-dom/recommended',
  ],
  plugins: ['testing-library', 'jest-dom'],
  overrides: [
    {
      files: ['e2e/**.spec.{js,ts,jsx,tsx}'],
      extends: ['plugin:playwright/playwright-test'],
    },
  ],
  env: {
    'vue/setup-compiler-macros': true,
  },
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
        groups: [
          'builtin',
          'external',
          'unknown',
          'internal',
          ['parent', 'sibling'],
          'index',
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'internal',
            pattern: '@/**',
          },
        ],
        pathGroupsExcludedImportTypes: [],
      },
    ],
    'max-len': [
      1,
      120,
      2,
      {
        ignoreComments: true,
        ignoreStrings: true,
        ignoreUrls: true,
      },
    ],
    'no-param-reassign': 'off',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        next: '*',
        prev: ['const', 'let', 'export', 'if'],
      },
      {
        blankLine: 'any',
        next: ['const', 'let', 'export'],
        prev: ['const', 'let', 'export'],
      },
    ],
    'vue/component-tags-order': [
      'error',
      {
        order: ['script', 'template', 'style'],
      },
    ],
  },
  ignorePatterns: ['node_modules', 'lib', 'dist', 'public'],
};
