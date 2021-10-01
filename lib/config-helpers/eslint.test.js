const fs = require("fs");
const mock = require("mock-fs");

const {
  eslintConfigFiles,
  eslintDependencies,
  eslintPrettierDependencies,
  eslintTooling,
} = require("./eslint");
const { editorconfigConfigFiles } = require("./editorconfig");
const { prettierConfigFiles } = require("./format");

const defaultFiles = {
  "closet/skeletons/": {
    ".eslintrc.json": `{"extends":["eslint:recommended"]}`,
    ".prettierrc.json": "{}",
    ".prettierignore": "# Ignore artifacts:",
    ".editorconfig": "root = true",
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

  it("returns an array with all dependencies as strings", () => {
    mock(defaultFiles);

    let dependencies = eslintTooling.addLinting();
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

    prettierConfigFiles.forEach((skeleton) => {
      expect(fs.statSync(skeleton).isFile()).toBe(true);
    });

    editorconfigConfigFiles.forEach((skeleton) => {
      expect(fs.statSync(skeleton).isFile()).toBe(true);
    });
  });

  it("writes the .eslintrc.json with the addition of the Prettier config option", () => {
    mock(defaultFiles);

    eslintTooling.addLinting();

    const eslintConfig = fs.readFileSync(".eslintrc.json", "utf8");
    expect(eslintConfig).toStrictEqual(expectedFileContents);
  });
});
