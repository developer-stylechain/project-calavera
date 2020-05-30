# Prettier config

From the [Prettier](https://prettier.io/) docs:

> Prettier is an opinionated code formatter

To add `Prettier` to your project, add the following to your `package.json`

```
...
"calavera": {
    "prettier": true
}
```

## Skeletons

This adds the following files to the root of your project:

- .prettierrc

Calavera uses the default Prettier config. If you need to customise the defaults, you can find [relevant documentation on the Prettier website](https://prettier.io/docs/en/options.html).

## Dev dependencies

`Prettier` adds the following `devDependencies`:

- [prettier](https://github.com/prettier/prettier)
