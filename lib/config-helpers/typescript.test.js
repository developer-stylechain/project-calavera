const fs = require("fs");
const mock = require("mock-fs");

const {
  typescriptConfigFiles,
  typescriptDependencies,
  typescriptNodeDependencies,
  typescriptTransitionalDependencies,
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

const transitionalExpectedFileContents = `{
  "extends": "@tsconfig/recommended/tsconfig.json",
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "outDir": "build"
  },
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

const transitionalConfigFiles = {
  "closet/skeletons/typescript-transitional/": {
    "tsconfig.json": transitionalExpectedFileContents,
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

  it("returns an array with the transitional dependencies as strings", async () => {
    mock(transitionalConfigFiles);

    let dependencies = await typescriptTooling.addTooling("transitional");
    expect(dependencies).toStrictEqual(typescriptTransitionalDependencies);
  });

  it("writes default skeleton to disk", async () => {
    mock(defaultFiles);

    await typescriptTooling.addTooling();

    const tsconfig = fs.readFileSync("tsconfig.json", "utf-8");
    expect(tsconfig).toStrictEqual(defaultExpectedFileContents);
    expect(tsconfig).not.toStrictEqual(nodeExpectedFileContents);
    expect(tsconfig).not.toStrictEqual(transitionalExpectedFileContents);
  });

  it("writes node specific skeleton to disk", async () => {
    mock(nodeConfigFiles);

    await typescriptTooling.addTooling("node");

    const tsconfig = fs.readFileSync("tsconfig.json", "utf-8");
    expect(tsconfig).toStrictEqual(nodeExpectedFileContents);
    expect(tsconfig).not.toStrictEqual(defaultExpectedFileContents);
    expect(tsconfig).not.toStrictEqual(transitionalExpectedFileContents);
  });

  it("writes transitional specific skeleton to disk", async () => {
    mock(transitionalConfigFiles);

    await typescriptTooling.addTooling("transitional");

    const tsconfig = fs.readFileSync("tsconfig.json", "utf-8");
    expect(tsconfig).toStrictEqual(transitionalExpectedFileContents);
    expect(tsconfig).not.toStrictEqual(defaultExpectedFileContents);
    expect(tsconfig).not.toStrictEqual(nodeExpectedFileContents);
  });
});
