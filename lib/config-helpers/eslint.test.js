const fs = require("fs");
const mock = require("mock-fs");

const {
  eslintConfigFiles,
  eslintDependencies,
  eslintTooling,
} = require("./eslint");
const {
  prettierConfigFiles,
  prettierWithESLintDependencies,
} = require("./format");

const defaultFiles = {
  "closet/skeletons/": {
    ".eslintrc.json": "{}",
  },
};
const withPrettierFiles = {
  "closet/skeletons/": {
    ".eslintrc.json": `{"extends":["eslint:recommended"]}`,
    ".prettierrc": "{}",
  },
};
const expectedFileContents = `{
    "extends": [
        "eslint:recommended",
        "prettier"
    ]
}`;

describe("eslintTooling.addLinting", () => {
  afterEach(() => {
    mock.restore();
  });

  it("returns an array with the default dependencies as strings", async () => {
    mock(defaultFiles);

    let dependencies = await eslintTooling.addLinting();
    expect(dependencies).toStrictEqual(eslintDependencies);
  });

  it("returns an array with the default and prettier dependencies as strings", async () => {
    mock(withPrettierFiles);

    let dependencies = await eslintTooling.addLinting(true);
    expect(dependencies).toStrictEqual(
      eslintDependencies.concat(prettierWithESLintDependencies)
    );
  });

  it("writes skeletons to disk", async () => {
    mock(defaultFiles);

    await eslintTooling.addLinting();

    eslintConfigFiles.forEach((skeleton) => {
      expect(fs.statSync(skeleton).isFile()).toBe(true);
    });
  });

  it("writes default and prettier skeletons to disk", async () => {
    mock(withPrettierFiles);

    await eslintTooling.addLinting(true);

    eslintConfigFiles.forEach((skeleton) => {
      expect(fs.statSync(skeleton).isFile()).toBe(true);
    });

    prettierConfigFiles.forEach((skeleton) => {
      expect(fs.statSync(skeleton).isFile()).toBe(true);
    });
  });

  it("writes the .eslintrc.json with the addition of the Prettier config option", async () => {
    mock(withPrettierFiles);

    await eslintTooling.addLinting(true);

    const eslintConfig = fs.readFileSync(".eslintrc.json", "utf-8");
    expect(eslintConfig).toStrictEqual(expectedFileContents);
  });
});
