const fs = require("fs");
const mock = require("mock-fs");

const { editorconfigConfigFiles } = require("./editorconfig");
const { sassConfigFiles, sassDependencies, sassTooling } = require("./sass");
const {
  prettierConfigFiles,
  prettierWithStylelintDependencies,
} = require("./format");

const defaultFiles = {
  "closet/skeletons": {
    sass: {
      ".stylelintrc": `{"extends":["stylelint-a11y/recommended"]}`,
    },
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

describe("sassTooling.addSass", () => {
  afterEach(() => {
    mock.restore();
  });

  it('"returns an array with sass and default dependencies as strings"', async () => {
    mock(defaultFiles);

    let dependencies = await sassTooling.addSass();

    expect(dependencies).toStrictEqual(
      sassDependencies.concat(prettierWithStylelintDependencies)
    );
  });

  it("writes skeletons to disk", async () => {
    mock(defaultFiles);

    sassTooling.addSass();

    sassConfigFiles.forEach((skeleton) => {
      skeleton = skeleton.substr(skeleton.lastIndexOf("/") + 1);
      expect(fs.statSync(skeleton).isFile()).toBe(true);
    });

    prettierConfigFiles.forEach((skeleton) => {
      expect(fs.statSync(skeleton).isFile()).toBe(true);
    });

    editorconfigConfigFiles.forEach((skeleton) => {
      expect(fs.statSync(skeleton).isFile()).toBe(true);
    });
  });

  it("writes the .stylelintrc with the addition of the Prettier config option", async () => {
    mock(defaultFiles);

    await sassTooling.addSass();

    const stylelintConfig = fs.readFileSync(".stylelintrc", "utf8");
    expect(stylelintConfig).toStrictEqual(expectedFileContents);
  });
});
