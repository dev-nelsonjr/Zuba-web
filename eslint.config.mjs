import babelParser from '@babel/eslint-parser'
import js from '@eslint/js'
import globals from 'globals'
import prettierConfig from 'eslint-config-prettier'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import storybook from 'eslint-plugin-storybook'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'

export default [
  {
    ignores: ['coverage/**', 'dist/**', 'node_modules/**', 'storybook-static/**'],
  },
  js.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  ...storybook.configs['flat/recommended'],
  {
    files: [
      'src/**/*.{js,jsx}',
      '.storybook/**/*.{js,jsx}',
      'vite.config.mjs',
    ],
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
        },
      },
    },
    plugins: {
      prettier,
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...prettierConfig.rules,
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'never',
        },
      ],
      'no-shadow': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'prettier/prettier': 'error',
      'react/no-unescaped-entities': 'error',
      'react/prop-types': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      prettier,
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...prettierConfig.rules,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      'prettier/prettier': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
