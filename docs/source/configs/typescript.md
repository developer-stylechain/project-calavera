# typescript config

The typescript config adds the required configurations files for [typescript](https://www.typescriptlang.org/).

There are two configuration options based on defaults provided by [ysconfig bases](https://github.com/tsconfig/bases)

- Default recommended
- Node 12 recommended

To add the default `typescript` config for use in node Nodejs based projects, add the following to `package.json`

```
...
"calavera": {
    "typescript": true
}
```

To add the Node 12 target `typescript` config , add the following to `package.json`

```
...
"calavera": {
    "typescript": "node"
}
```

## Skeletons

This adds the following files to the root of your project:

- tsconfig.json

> Please see the relevant config on the [bases repo](https://github.com/tsconfig/bases#available-tsconfigs) for details of the configuration specifics

## Dev dependencies

`typescript` config adds the following `devDependencies`:

- typescript

And one of either of the following dependent on your config setting:

- @tsconfig/recommended
- @tsconfig/node12

Calavera will output the command you need to run to install the above dependencies inside your project.
