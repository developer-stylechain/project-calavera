const fs = require("fs");
const mock = require("mock-fs");

const { cssConfigFiles, cssDependencies, cssTooling } = require("./css");
const {
  prettierConfigFiles,
  prettierWithStylelintDependencies,
} = require("./format");

const defaultFiles = {
  "closet/skeletons/": {
    ".stylelintrc": "{}",
    ".stylelintignore": "{}",
  },
};
const withPrettierFiles = {
  "closet/skeletons/": {
    ".stylelintrc": `{"extends":["stylelint-a11y/recommended"]}`,
    ".stylelintignore": "{}",
    ".prettierrc.json": "{}",
    ".prettierignore": "# Ignore artifacts:",
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

  it("returns an array with the default dependencies as strings", () => {
    mock(defaultFiles);

    let dependencies = cssTooling.addLinting();
    expect(dependencies).toStrictEqual(cssDependencies);
  });

  it("returns an array with the default and prettier dependencies as strings", () => {
    mock(withPrettierFiles);

    let dependencies = cssTooling.addLinting(true);
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
  });

  it("writes default and prettier skeletons to disk", () => {
    mock(withPrettierFiles);

    cssTooling.addLinting(true);

    cssConfigFiles.forEach((skeleton) => {
      expect(fs.statSync(skeleton).isFile()).toBe(true);
    });

    prettierConfigFiles.forEach((skeleton) => {
      expect(fs.statSync(skeleton).isFile()).toBe(true);
    });
  });

  it("writes the .stylelintrc with the addition of the Prettier config option", () => {
    mock(withPrettierFiles);

    cssTooling.addLinting(true);

    const stylelintConfig = fs.readFileSync(".stylelintrc", "utf8");
    expect(stylelintConfig).toStrictEqual(expectedFileContents);
  });
});
