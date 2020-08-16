# eslint config

The eslint config adds the required configurations files and configuration for [eslint](https://eslint.org/). By default it also enables the `eslint:recommended`(https://eslint.org/docs/rules/) and `plugin:import/errors`(https://github.com/benmosher/eslint-plugin-import#rules) eslint extensions.

To add the `eslint` config to your project, add the following to `package.json`

```
...
"calavera": {
    "eslint": true
}
```

## Skeletons

This adds the following files to the root of your project:

- .eslintrc.json

### .eslintrc.json

```
{
    "extends": [
        "eslint:recommended",
        "plugin:import/errors"
    ],
    "rules": {
        "no-console": 1
    },
    "plugins": [
        "import"
    ],
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "env": {
        "es6": true,
        "browser": true,
        "node": true
    }
}
```

## Dev dependencies

`eslint` config adds the following `devDependencies`:

- eslint
- eslint-plugin-import

Calavera will output the command you need to run to install the above dependencies inside your project.
