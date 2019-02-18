## Using bundle configurations

Calavera also supports the notion of bundles. The following bundles are currently available:

- [colab](#colab)
- [common-web](#common-web)
- [commonjs](#commonjs)

## colab

This adds files that are especially useful when the repository is intended to be used collaboratively. While most open source projects fits this model, it is not rule, and so this bundle is provided separately.

### config

```
...
"calavera": {
    "colab": true
}
```

### Skeletons

This will add the following files to your project:

- .all-contributorsrc
- CODE-OF-CONDUCT.md
- contribute.json
- ISSUE_TEMPLATE.md (written to the .github folder)
- PULL_REQUEST_TEMPLATE.md (written to the .github folder)

## common-web

This configuration is useful for most common web projects.

### config

```
"calavera": {
    "common-web": true
}
```

### Skeletons

This will add the following files to your project:

- .prettierrc
- .sasslintrc
- .stylelintrc
- .stylelintignore

### Dependency installation

When Calavera completes writing the above files, it will output the `npm` command you need to run in order to install the required dependencies. It will be of the form:

```
npm i -D --save-exact prettier sass-lint stylelint
```

Which will then install the following `devDependencies`

- [prettier](https://www.npmjs.com/package/prettier)
- [sass-lint](https://www.npmjs.com/package/sass-lint)
- [stylelint](https://www.npmjs.com/package/stylelint)

## commonjs

This can either be used in conjunction with `common-web` or on it’s own if you project is purely JavaScript based.

### config

```
"calavera": {
    "commonjs": true
}
```

### Skeletons

This will add the following files to your project:

- .eslintrc.js
- .babelrc
- .browserslistrc

### Dependency installation

When Calavera completes writing the above files, it will output the `npm` command you need to run in order to install the required dependencies. It will be of the form:

```
npm i -D --save-exact babel-cli babel-preset-env eslint
```

- [babel-cli](https://www.npmjs.com/package/babel-cli)
- [babel-preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env)
- [eslint](https://www.npmjs.com/package/eslint)

## simple-parcel

TODO: Also remember to add instructions on editor config [https://prettier.io/docs/en/editors.html] - also add support for adding scripts to package.json

This can either be used in conjunction with `common-web` or on it’s own if you project is purely JavaScript based.

### config

```
"calavera": {
    "commonjs": true
}
```

### Skeletons

This will add the following files to your project:

- .eslintrc.js
- .babelrc
- .browserslistrc

### Dependency installation

When Calavera completes writing the above files, it will output the `npm` command you need to run in order to install the required dependencies. It will be of the form:

```
npm i -D --save-exact babel-cli babel-preset-env eslint
```

- [babel-cli](https://www.npmjs.com/package/babel-cli)
- [babel-preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env)
- [eslint](https://www.npmjs.com/package/eslint)
