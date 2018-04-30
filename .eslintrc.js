module.exports = {
    env: {
        es6: true,
        node: true
    },
    parserOptions: {
        ecmaVersion: 8
    },
    extends: 'eslint:recommended',
    rules: {
        'no-global-assign': 2,
        indent: [2, 4, { SwitchCase: 1 }],
        'linebreak-style': [2, 'unix'],
        quotes: [2, 'single'],
        semi: [2, 'always'],
        curly: [2, 'all'],
        camelcase: [
            2,
            {
                properties: 'always'
            }
        ],
        eqeqeq: [2, 'smart'],
        'no-console': [
            'error',
            {
                allow: ['error', 'info']
            }
        ],
        'one-var-declaration-per-line': [2, 'always'],
        'new-cap': 2
    },
    globals: {
        CodeMirror: true,
        console: true
    }
};
