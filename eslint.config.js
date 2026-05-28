const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const globals = require('globals');

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

module.exports = [
    {
        ignores: ['node_modules/**', 'dist/**', 'coverage/**', '.*']
    },
    ...compat.extends('eslint:recommended', 'airbnb-base', 'prettier', 'plugin:chai-friendly/recommended'),
    {
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'commonjs',
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.mocha
            }
        },
        rules: {
            radix: 'off',
            'no-plusplus': 'off',
            curly: 'error',
            'arrow-body-style': ['error', 'as-needed'],
            'import/no-extraneous-dependencies': [
                'error',
                {
                    devDependencies: ['**/*.test.js', 'test/**', 'sample/**', 'eslint.config.js']
                }
            ]
        }
    },
    {
        files: ['test/**/*.js'],
        rules: {
            'no-unused-expressions': 'off',
            'no-underscore-dangle': 'off'
        }
    }
];
