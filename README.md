# project-calavera

A simple starting skeleton for vanilla web projects.

## Using Calavera

### Prerequisites

To start with, you will need to have Nodejs installed. You can find instructions on the [Nodejs website](https://nodejs.org/).

Your next stop is to ensure that your project has a `package.json` file in the root of the project. If your project does not already have one, you can create one using the `npm init` or `yarn init` command from your command line/terminal.

With the above in place, you are ready to start using Calavera.

### Example Usage

Run the following from the root of your project and follow the prompts:

```
npx project-calavera
```

This will add the required dot-files to your project. Once the command completes, it will output the command you should run to install the required dependencies:

> NOTE: Calavera by default prints the command for the NPM package manager. If you prefer `yarn`, you can select it as your preferred package manager.

```
Run the following command to install your dependencies: npm i -D --save-exact babel-cli babel-preset-env eslint
```

Copy, paste and run the command in your terminal. Once complete, you are of to the races.

Make something awesome! 💀

## Available configs explained

### CSS config

The CSS config adds the required configurations files and configuration for [Stylelint](https://stylelint.io/). By default it also enables the `stylelint-config-recommended`(https://github.com/stylelint/stylelint-config-recommended) and `stylelint-a11y`(https://github.com/YozhikM/stylelint-a11y) Stylelint extensions.

#### Skeletons

This adds the following files to the root of your project:

- .stylelintrc
- .stylelintignore

#### .stylelintrc

```
{
  "extends": [
    "stylelint-config-recommended",
    "stylelint-a11y/recommended"
  ],
  "rules": {
    "max-nesting-depth": 2,
    "declaration-no-important": true,
    "font-weight-notation": "named-where-possible"
  }
}
```

#### .stylelintignore

By default files inside `css/libs` will be ignored.

```
css/libs/
```

### Dev dependencies

`CSS` config adds the following `devDependencies`:

- stylelint
- stylelint-a11y
- stylelint-config-recommended

Calavera will output the command you need to run to install the above dependencies inside your project.

### eslint config

The eslint config adds the required configurations files and configuration for [eslint](https://eslint.org/). By default it also enables the `eslint:recommended`(https://eslint.org/docs/rules/) and `plugin:import/errors`(https://github.com/benmosher/eslint-plugin-import#rules) eslint extensions.

#### Skeletons

This adds the following files to the root of your project:

- .eslintrc.json

##### .eslintrc.json

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

### Dev dependencies

`eslint` config adds the following `devDependencies`:

- eslint
- eslint-plugin-import

Calavera will output the command you need to run to install the above dependencies inside your project.

### Prettier config

Prettier is added to your project by default. This will be configurable in future.

From the [Prettier](https://prettier.io/) docs:

> Prettier is an opinionated code formatter

#### Skeletons

This adds the following files to the root of your project:

- .prettierrc.json

Calavera uses the default Prettier config. If you need to customise the defaults, you can find [relevant documentation on the Prettier website](https://prettier.io/docs/en/options.html).

### Dev dependencies

`Prettier` adds the following `devDependencies`:

- [prettier](https://github.com/prettier/prettier)
