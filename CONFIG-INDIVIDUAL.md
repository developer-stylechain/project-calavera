# Individual configurations

## Stylelint

From the docs:

> A mighty, modern linter that helps you avoid errors and enforce conventions in your styles.

To add `stylelint` linting to your project, add the following to your `package.json`:

```
...
"calavera": {
    "stylelint": true
}
```

### Skeletons

This adds the following files to your project:

- .stylelintrc
- .stylelintignore // this ignores anything in css/libs/

The `stylelintrc` configurations simply extends [`stylelint-config-recommended`](https://github.com/stylelint/stylelint-config-recommended)
as recommended by the stylelint project when using stylint in combination with, for example [Prettier](https://prettier.io).
We highly recommend using Prettier. It is widely adopted, ensures consistent formatting of all your code, and Calavera can add it for you.

### Dev dependencies

Adding `stylelint` adds the following `devDependencies`:

- [stylelint](https://github.com/stylelint/stylelint)
- [stylelint-config-recommended](https://github.com/stylelint/stylelint-config-recommended)

## Stylelint for Sass

From the docs:

> A collection of SCSS specific linting rules for stylelint (in a form of a plugin).

To add Sass linting support to your project, add the following to your `package.json`:

```
...
"calavera": {
    "sasslint": true
}
```

### Skeletons

This adds the following files to your project:

- .stylelintrc
- .stylelintignore // this ignores anything in css/libs/

The `stylelintrc` configurations simply extends [`stylelint-config-recommended-scss`](https://github.com/kristerkari/stylelint-config-recommended-scss).

### Dev dependencies

Adding `sasslint` adds the following `devDependencies`:

- [stylelint](https://github.com/stylelint/stylelint)
- [stylelint-scss](https://github.com/kristerkari/stylelint-scss)
- [stylelint-config-recommended-scss](https://github.com/kristerkari/stylelint-config-recommended-scss)

## Prettier

From the docs:

> Prettier is an opinionated code formatter

To add `Prettier` to your project, add the following to your `package.json`

```
...
"calavera": {
    "prettier": true
}
```

### Skeletons

This adds the following files to your project:

- .prettierrc

Prettier is added with the default config of `{}` i.e. use defaults

### Dev dependencies

Adding `Prettier` adds the following `devDependencies`:

- [prettier](https://github.com/prettier/prettier)
