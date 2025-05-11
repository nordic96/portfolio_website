const { defineConfig } = require('eslint/config');

const globals = require('globals');
const tsParser = require('@typescript-eslint/parser');
const js = require('@eslint/js');

//plugins
const nextPlugin = require('@next/eslint-plugin-next');
const prettierPlugin = require('eslint-plugin-prettier');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

module.exports = defineConfig([
    {
        files: ['**/*.{js,ts,tsx,jsx}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },

            parser: tsParser,
            ecmaVersion: 2018,
            sourceType: 'module',

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },

        extends: compat.extends(
            'plugin:@next/next/recommended',
            'plugin:prettier/recommended'
        ),

        plugins: { prettierPlugin, nextPlugin },

        settings: {
            react: {
                version: 'detect',
            },
        },

        rules: {
            'require-jsdoc': 0,
            'valid-jsdoc': 0,
            'jsx-a11y/no-static-element-interactions': 0,
            'jsx-a11y/click-events-have-key-events': 0,
            '@next/next/no-img-element': 0,
            '@next/next/no-html-link-for-pages': 0,

            'prettier/prettier': [
                'error',
                {
                    endOfLine: 'auto',
                },
                {
                    usePrettierrc: true,
                },
            ],
        },
    },
]);
