const { FlatCompat } = require('@eslint/eslintrc');
const prettierRecommended = require('eslint-plugin-prettier/recommended');
const jestPlugin = require('eslint-plugin-jest');

const compat = new FlatCompat();

module.exports = [
    {
        ignores: [
            'node_modules/',
            '.expo/',
            'dist/',
            'web-build/',
            'babel.config.js',
            'metro.config.js',
        ],
    },
    ...compat.extends('expo'),
    prettierRecommended,
    {
        files: ['**/*.test.ts', '**/*.test.tsx', 'jest.setup.js', 'jest.config.js'],
        plugins: {
            jest: jestPlugin,
        },
        languageOptions: {
            globals: {
                jest: 'readonly',
                describe: 'readonly',
                it: 'readonly',
                expect: 'readonly',
                beforeAll: 'readonly',
                afterAll: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
            },
        },
        rules: {
            ...jestPlugin.configs.recommended.rules,
            '@typescript-eslint/no-require-imports': 'off',
            'no-undef': 'off', // globals are handled but sometimes flat config is tricky with implicit globals
        },
    },
    {
        files: ['scripts/*.js'],
        languageOptions: {
            globals: {
                process: 'readonly',
                __dirname: 'readonly',
                console: 'readonly',
                require: 'readonly',
            },
        },
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
            'no-undef': 'off',
        },
    },
    {
        rules: {
            'prettier/prettier': 'error',
        },
    },
];
