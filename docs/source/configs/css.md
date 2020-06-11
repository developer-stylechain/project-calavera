# CSS config

The CSS config adds the required configurations files and configuration for [Stylelint](https://stylelint.io/). By default it also enables the `stylelint-config-recommended`(https://github.com/stylelint/stylelint-config-recommended) and `stylelint-a11y`(https://github.com/YozhikM/stylelint-a11y) Stylelint extensions.

To add the `CSS` config to your project, add the following to your `package.json`

```
...
"calavera": {
    "css": true
}
```

## Skeletons

This adds the following files to the root of your project:

- .stylelintrc
- .stylelintignore

### .stylelintrc

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

### .stylelintignore

By default files inside `css/libs` will be ignored.

```
css/libs/
```

## Dev dependencies

`CSS` config adds the following `devDependencies`:

- stylelint
- stylelint-a11y
- stylelint-config-recommended

Calavera will output the required command to run to install the above dependencies inside your project.
