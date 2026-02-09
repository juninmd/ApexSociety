const expo = require('eslint-config-expo/flat');
const prettierRecommended = require('eslint-plugin-prettier/recommended');

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
    ...expo,
    prettierRecommended,
    {
        rules: {
            'prettier/prettier': 'error',
        },
    },
];
