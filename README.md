# project-calavera

[![Documentation Status](https://readthedocs.org/projects/project-calavera/badge/?version=latest)](https://project-calavera.readthedocs.io/?badge=latest)

A simple starting skeleton for common web projects. Bring your own frameworks.

## Set-up

To start with, you will need to have Nodejs installed. You can find instructions on the [Nodejs website](https://nodejs.org/en/).

Your next stop is to ensure that your project has a `package.json` file in the root of the project. If your project does not already have one, you can easily create one using the `npm init` command from your command line/terminal.

With all of the above in place, you are ready to start using Calavera.

If you are using NPM version 5.2.0(run `npm -v` to determine your version) or higher, all you need to do is, choose a configuration, add it to your `package.json` and run the following:

```
npx project-calavera
```

### npm@5.1.x and older

If you are not on npm@5.2.0+ then read onward. First thing is to add Calavera to your project, and register it as a dev dependency. Run the following command.

```
npm i -D --save-exact project-calavera
```

This will install the project locally and add an entry in `devDependencies` inside `package.json`.

## Configuration

Next, you need to tell Calavera what you want added to your project. Once you have chosen your individual items or bundle(s), add a new block to your `package.json` file. For example:

### Individual dependencies

```
calavera: {
    "babeljs": true,
    "code-of-conduct": true,
    "eslint": true
}
```

### Bundle configurations

```
"dependencies": {
    "fs-extra": "5.0.0",
    "npm": "6.0.0"
},
"calavera": {
    "common-web": true,
    "commonjs": true
}
```

Next run:

```
npm run calavera
```

This will add the required dot-files needed as well as a `.md` file in the case of the code of conduct. Once the command completes, it will output the `npm` command you should run to install the required dependencies:

```
Run the following command to install your dependencies: npm i -D --save-exact babel-cli babel-preset-env eslint
```

Copy/paste an run the command. Once complete, you are of to the races.
