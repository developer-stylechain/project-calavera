const fs = require("fs");
const mock = require("mock-fs");

const { cssConfigFiles, cssDependencies, cssTooling } = require("./css");
const { editorconfigConfigFiles } = require("./editorconfig");
const {
  prettierConfigFiles,
  prettierWithStylelintDependencies,
} = require("./format");

const defaultFiles = {
  "closet/skeletons/": {
    ".stylelintrc": `{"extends":["stylelint-a11y/recommended"]}`,
    ".stylelintignore": "{}",
    ".prettierrc.json": "{}",
    ".prettierignore": "# Ignore artifacts:",
    ".editorconfig": "root = true",
  },
};
const expectedFileContents = `{
    "extends": [
        "stylelint-a11y/recommended",
        "stylelint-prettier/recommended"
    ]
}`;

describe("cssTooling.addLinting", () => {
  afterEach(() => {
    mock.restore();
  });

  it("returns an array with css and default dependencies as strings", () => {
    mock(defaultFiles);

    let dependencies = cssTooling.addLinting();
    expect(dependencies).toStrictEqual(
      cssDependencies.concat(prettierWithStylelintDependencies)
    );
  });

  it("writes skeletons to disk", () => {
    mock(defaultFiles);

    cssTooling.addLinting();

    cssConfigFiles.forEach((skeleton) => {
      expect(fs.statSync(skeleton).isFile()).toBe(true);
    });

    prettierConfigFiles.forEach((skeleton) => {
      expect(fs.statSync(skeleton).isFile()).toBe(true);
    });

    editorconfigConfigFiles.forEach((skeleton) => {
      expect(fs.statSync(skeleton).isFile()).toBe(true);
    });

    const stylelintConfig = fs.readFileSync(".stylelintrc", "utf8");
    expect(stylelintConfig).toStrictEqual(expectedFileContents);
  });
});
