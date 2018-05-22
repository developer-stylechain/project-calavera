# project-calavera

A simple starting skeleton for common web projects. Bring your own frameworks.

## Set-up

To start with, you will need to have Nodejs installed. You can find instructions on the [Nodejs website](https://nodejs.org/en/).

Your next stop is to ensure that your project has a `package.json` file in the root of the project. If your project does not already have one, you can easily create one using the `npm init` command from your command line/terminal.

With all of the above in place, you are ready to start using Calavera. First thing is to add Calavera to your project and register it as a dev dependency. Run the following command.

```
npm i -D --save-exact project-calavera
```

This will install the project locally and add an entry to your `devDependencies` config.

## Configuration

Next, you need to tell Calavera what you want added to your project. There are currently two options. For both options you will add a new block to your `package.json` file. For example:

```
"dependencies": {
    "fs-extra": "5.0.0",
    "npm": "6.0.0"
},
"calavera": {
    ...
}
```

1.  Specify individual dependencies.

With this option you can add one or more dependencies to your project by explicitly specifying just what you need.

For example:

```
calavera: {
    "babeljs": true,
    "code-of-conduct": true,
    "eslint": true
}
```

Next run:

```
npm run calavera
```

This will add the required dot-files needed as well as a `.md` file in the case of the code of conduct. Once the command completes, it will in this case output the following:

```
Run the following command to install dependencies: npm i -D --save-exact babel-cli babel-preset-env eslint
```

Copy/paste an run the command. Once complete, you are done.

2.  Using bundles

Calavera also supports the notion of bundles. Currently there are two bundles you can choose from:

*   common
*   commonjs

### common

If you choose `common` your configuration will look as follows:

```
"calavera": {
    "common": true
}
```

This will add the following files to your project:

*   CODE-OF-CONDUCT.md
*   .eslintrc.js
*   .prettierrc
*   .sasslintrc
*   .stylelintrc
*   .stylelintignore

Running the command Calavera will output to stdout will then install:

*   eslint
*   prettier
*   sass-lint
*   stylelint

### commonjs

If you choose `common` your configuration will look as follows:

```
"calavera": {
    "commonjs": true
}
```

This will add the following files to your project:

*   CODE-OF-CONDUCT.md
*   .eslintrc.js
*   .prettierrc
*   .sasslintrc
*   .stylelintrc
*   .stylelintignore
*   .babelrc
*   .browserslistrc

Running the command Calavera will output to stdout will then install:

*   babel-cli
*   babel-preset-env
*   eslint
*   prettier
*   sass-lint
*   stylelint
