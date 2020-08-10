## Contributing a config

At the time of writing all configs form part of the base Calavera package. Would a pluggable architecture make sense instead? It most definitely is something to consider but, until then, the information below guides you through the process of adding a new config to Calavera.

## The skeletons

The first step is adding the relevant skeleton(s) to the closet. Generally, and for this example, you will add this to the root of `closet/skeletons`. For our current example, we will add a file called `tsconfig.json` to this folder.

## The config source

The next step is to create the source file for our `config`. Inside `lib/config-helpers` create a new file called for example `typescript.js`. At some point we will want to write out our configurtion file content and so, the first thing we need to do is import `fileUtils`:

```
const { writeFiles } = require("../fileUtils");
```

Next, we set a couple of constants that hold the values for the config file(s) we will output, as well as the dependencies an end user will need to install. For example:

```
const typescriptConfigFiles = ["tsconfig.json"];
const typescriptDependencies = ["typescript", "@tsconfig/recommended"];
```

Next we add our main function:

```
const typeScriptTooling = {
    addTooling: (target) => {

    }
}
```

And lastly we export our constants and main function:

```
module.exports = {
  typescriptConfigFiles,
  typescriptDependencies,
  typeScriptTooling,
};
```

Depending on the complexity of the config you are adding, the main function here could be as simple as the following:

```
/**
 * Returns an array of tool dependencies
 * and writes the relevant config file to disk
 * @returns Array of strings of relevant dependencies
 */
() => {
    writeFiles(configFiles);
    return dependencies;
}
```

## Adding config to the Catacomb

At this point our config is ready to use, but will not be avialable to end users until we add the relevant entry to `lib/fill-catacomb.js`. First, we need to import our config:

```
const { typescriptTooling } = require("./config-helpers/typescript");
```

Next add a `case` for your config, for example:

```
case "typescript":
  let typescriptDependencies = await typescriptTooling.addTooling();
  dependencies = dependencies.concat(typescriptDependencies);
  break;
```

With the above in place, you should be able to use your new config by adding an entry to `package.json`, for example:

```
"calavera": {
    "typescript": true
}
```

## Writing tests

All new configs, or changes to existing configs, should have relevant tests to ensure the code will work as expected. We use [Jest](https://jestjs.io/) as our test framework and [mock-fs](https://github.com/tschaub/mock-fs) for filesystem mocking suring tests.

Create your test file, for example, `typescript.test.js` next to the source file inside `lib/config-helpers/`
First import the libraries for the filesystem as well as `mock-fs`:

```
const fs = require("fs");
const mock = require("mock-fs");
```

Next we import our constants and main function:

```
const {
  typescriptConfigFiles,
  typescriptDependencies,
  typescriptTooling,
} = require("./typescript");
```

Next we create an object that `mock-fs` will use to create a mock filesystem we can test against:

```
const defaultFiles = {
  "closet/skeletons/": {
    "tsconfig.json": "{}",
  },
};
```

Now we are ready to start writing our tests:

```
describe("typescriptTooling.addTooling", () => {
  afterEach(() => {
    mock.restore();
  });

  it("returns an array with the default dependencies as strings", async () => {
    mock(defaultFiles);

    let dependencies = await typescriptTooling.addTooling();
    expect(dependencies).toStrictEqual(typescriptDependencies);
  });
});
```

To run the above, enter the following in your terminal:

```
yarn test
```

> NOTE: The above will run the tests once and exit. While developing, you probably want to run Jest in watch mode. To do this, run the following command instead: `yarn test:dev`

The above is not an exhaustive test by any means. For more examples, have a look at existing tests inside the `lib/config-helpers` folder.

Once satisfied with your test coverage, there is one last step you need to complete.

## Documentation

You will find the documentation for the project in the `docs` folder. We host out documentation on [ReadTheDocs](https://project-calavera.readthedocs.io/index.html) and use the [Sphinx documentation generator](https://www.sphinx-doc.org/). You can find further details on the [Sphynx documentation site](https://docs.readthedocs.io/en/stable/index.html).

The easiest way to get a head start on writing relevant documentation for your config, is to copy and change one of the existing files inside `docs/source/configs`. Using one of these as a template, create a new file inside `docs/source/configs` called for example `typescript.md`. Once your documentation is written, add a refence to it inside `docs/source/index.rst` under `toctree`

You are now ready to open your pull request. We follow the following pattern for commit messages:

```
(enhancement) short title description

More detailed body desription of the enhancement

fix #123
```

Thank you for using and contributing to Project Calavera.
