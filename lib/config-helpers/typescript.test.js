const fs = require("fs");
const mock = require("mock-fs");

const {
  typescriptConfigFiles,
  typescriptDependencies,
  typescriptNodeDependencies,
  typescriptTooling,
} = require("./typescript");

const defaultExpectedFileContents = `{
  "extends": "@tsconfig/recommended/tsconfig.json",
  "includes": ["src"]
}`;

const nodeExpectedFileContents = `{
  "extends": "@tsconfig/node12/tsconfig.json",
  "includes": ["src"]
}`;

const defaultFiles = {
  "closet/skeletons/": {
    "tsconfig.json": defaultExpectedFileContents,
  },
};

const nodeConfigFiles = {
  "closet/skeletons/typescript-node/": {
    "tsconfig.json": nodeExpectedFileContents,
  },
};

describe("typescriptTooling.addTooling", () => {
  afterEach(() => {
    mock.restore();
  });

  it("returns an array with the default dependencies as strings", async () => {
    mock(defaultFiles);

    let dependencies = await typescriptTooling.addTooling();
    expect(dependencies).toStrictEqual(typescriptDependencies);
  });

  it("returns an array with the Node12 dependencies as strings", async () => {
    mock(nodeConfigFiles);

    let dependencies = await typescriptTooling.addTooling("node");
    expect(dependencies).toStrictEqual(typescriptNodeDependencies);
  });

  it("writes default skeleton to disk", async () => {
    mock(defaultFiles);

    await typescriptTooling.addTooling();

    const tsconfig = fs.readFileSync("tsconfig.json", "utf-8");
    expect(tsconfig).toStrictEqual(defaultExpectedFileContents);
    expect(tsconfig).not.toStrictEqual(nodeExpectedFileContents);
  });

  it("writes node specific skeleton to disk", async () => {
    mock(defaultFiles);

    await typescriptTooling.addTooling("node");

    const tsconfig = fs.readFileSync("tsconfig.json", "utf-8");
    expect(tsconfig).toStrictEqual(nodeExpectedFileContents);
    expect(tsconfig).not.toStrictEqual(defaultExpectedFileContents);
  });
});
