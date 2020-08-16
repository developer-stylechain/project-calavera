# jest config

The jest config does not add any configuration files but, updates your `eslint` config with the relevant [Jest](jestjs.io/) `eslint` plugins. If you do not already have an `eslint` configuration file, this config will add a `eslint` config as specified in the [eslint config docs](./eslint.md) and update it with the Jest plugins.

To add the `jest` config to your project, add the following to `package.json`

```
...
"calavera": {
    "jest": true
}
```

## Skeletons

If no `eslint` config exists, this adds the following files to the root of your project:

- .eslintrc.json

### .eslintrc.json

```
{
    "extends": [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:jest/recommended",
        "plugin:jest/style"
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

If your project already had an `eslint` config, the following two entries are added to the `extends` array:

- plugin:import/errors
- plugin:jest/recommended

## Dev dependencies

`jest` config adds the following `devDependencies`:

- [jest](https://www.npmjs.com/package/jest)
- [eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest)

If no `eslint` config existed, it will also add the following dependecnies:

- [eslint](https://www.npmjs.com/package/eslint)
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)

Calavera will output the command you need to run to install the above dependencies inside your project.
