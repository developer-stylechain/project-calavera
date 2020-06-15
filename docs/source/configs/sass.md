# SASS config

The SASS config adds everything you get with the [CSS config](./css.md) as well as Stylelint extensions for SASS. To add the `SASS` config to your project, add the following to `package.json`

```
...
"calavera": {
    "sass": true
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
    "stylelint-config-sass-guidelines",
    "stylelint-a11y/recommended"
  ],
  "plugins": [
    "stylelint-scss"
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

`SASS` config adds the following `devDependencies`:

- stylelint
- stylelint-a11y
- stylelint-config-recommended
- stylelint-scss
- stylelint-config-sass-guidelines
- sass
- node-sass-chokidar

Calavera will output the command you need to run to install the above dependencies inside your project.

> NOTE: The above also includes the SASS preprocessor itself as well as `node-sass-chokidar`. Quoting from its docs:
> "Why? Because Gaze in docker and various virtual machines uses a lot of resources whereas chokidar does not. [Read about the advantages of chokidar](https://www.npmjs.com/package/node-sass-chokidar)"
