module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@next/next/recommended',
        'plugin:prettier/recommended',
    ],
    // ignorePatterns: ['**/*.js'],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
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
        'prettier/prettier': [
            'error',
            { endOfLine: 'auto' },
            { usePrettierrc: true },
        ],
    },
};
