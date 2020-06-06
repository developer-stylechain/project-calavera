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
    ".prettierrc": "{}",
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

  it("returns an array with the default dependencies as strings", async () => {
    mock(defaultFiles);

    let dependencies = await cssTooling.addLinting();
    expect(dependencies).toStrictEqual(cssDependencies);
  });

  it("returns an array with the default and prettier dependencies as strings", async () => {
    mock(withPrettierFiles);

    let dependencies = await cssTooling.addLinting(true);
    expect(dependencies).toStrictEqual(
      cssDependencies.concat(prettierWithStylelintDependencies)
    );
  });

  it("writes skeletons to disk", async () => {
    mock(defaultFiles);

    await cssTooling.addLinting();

    cssConfigFiles.forEach((skeleton) => {
      expect(fs.statSync(skeleton).isFile()).toBe(true);
    });
  });

  it("writes default and prettier skeletons to disk", async () => {
    mock(withPrettierFiles);

    await cssTooling.addLinting(true);

    cssConfigFiles.forEach((skeleton) => {
      expect(fs.statSync(skeleton).isFile()).toBe(true);
    });

    prettierConfigFiles.forEach((skeleton) => {
      expect(fs.statSync(skeleton).isFile()).toBe(true);
    });
  });

  it("writes the .stylelintrc with the addition of the Prettier config option", async () => {
    mock(withPrettierFiles);

    await cssTooling.addLinting(true);

    const stylelintConfig = fs.readFileSync(".stylelintrc", "utf-8");
    expect(stylelintConfig).toStrictEqual(expectedFileContents);
  });
});
