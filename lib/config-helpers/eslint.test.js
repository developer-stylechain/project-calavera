const fs = require("fs");
const mock = require("mock-fs");

const {
  eslintConfigFiles,
  eslintDependencies,
  eslintPrettierDependencies,
  eslintTooling,
} = require("./eslint");
const { prettierConfigFiles } = require("./format");

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

  it("returns an array with the default dependencies as strings", () => {
    mock(defaultFiles);

    let dependencies = eslintTooling.addLinting();
    expect(dependencies).toStrictEqual(eslintDependencies);
  });

  it("returns an array with the default and prettier dependencies as strings", () => {
    mock(withPrettierFiles);

    let dependencies = eslintTooling.addLinting(true);
    expect(dependencies).toStrictEqual(
      eslintDependencies.concat(eslintPrettierDependencies)
    );
  });

  it("writes skeletons to disk", () => {
    mock(defaultFiles);

    eslintTooling.addLinting();

    eslintConfigFiles.forEach((skeleton) => {
      expect(fs.statSync(skeleton).isFile()).toBe(true);
    });
  });

  it("writes default and prettier skeletons to disk", () => {
    mock(withPrettierFiles);

    eslintTooling.addLinting(true);

    eslintConfigFiles.forEach((skeleton) => {
      expect(fs.statSync(skeleton).isFile()).toBe(true);
    });

    prettierConfigFiles.forEach((skeleton) => {
      expect(fs.statSync(skeleton).isFile()).toBe(true);
    });
  });

  it("writes the .eslintrc.json with the addition of the Prettier config option", () => {
    mock(withPrettierFiles);

    eslintTooling.addLinting(true);

    const eslintConfig = fs.readFileSync(".eslintrc.json", "utf8");
    expect(eslintConfig).toStrictEqual(expectedFileContents);
  });
});
