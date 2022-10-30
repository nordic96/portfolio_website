module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
    ],
    // ignorePatterns: ['**/*.js'],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['@typescript-eslint', 'react', 'jsx-a11y'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'require-jsdoc': 0,
        'valid-jsdoc': 0,
        'prettier/prettier': [
            'error',
            { endOfLine: 'auto' },
            { usePrettierrc: true },
        ],
    },
};
