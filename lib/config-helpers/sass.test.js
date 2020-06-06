const fs = require("fs");
const mock = require("mock-fs");

const { sassConfigFiles, sassDependencies, sassTooling } = require("./sass");
const {
  prettierConfigFiles,
  prettierWithStylelintDependencies,
} = require("./format");

const defaultFiles = {
  "closet/skeletons": {
    sass: {
      ".stylelintrc": "{}",
    },
    ".stylelintignore": "{}",
  },
};
const withPrettierFiles = {
  "closet/skeletons": {
    sass: {
      ".stylelintrc": `{"extends":["stylelint-a11y/recommended"]}`,
    },
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

describe("sassTooling.addSass", () => {
  afterEach(() => {
    mock.restore();
  });

  it("returns an array with the default dependencies as strings", async () => {
    mock(defaultFiles);

    let dependencies = await sassTooling.addSass();
    expect(dependencies).toStrictEqual(sassDependencies);
  });

  it('"returns an array with the default and prettier dependencies as strings"', async () => {
    mock(withPrettierFiles);

    let dependencies = await sassTooling.addSass(true);

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
  });

  it("writes default and prettier skeletons to disk", async () => {
    mock(withPrettierFiles);

    sassTooling.addSass(true);

    sassConfigFiles.forEach((skeleton) => {
      skeleton = skeleton.substr(skeleton.lastIndexOf("/") + 1);
      expect(fs.statSync(skeleton).isFile()).toBe(true);
    });

    prettierConfigFiles.forEach((skeleton) => {
      expect(fs.statSync(skeleton).isFile()).toBe(true);
    });
  });

  it("writes the .stylelintrc with the addition of the Prettier config option", async () => {
    mock(withPrettierFiles);

    await sassTooling.addSass(true);

    const stylelintConfig = fs.readFileSync(".stylelintrc", "utf-8");
    expect(stylelintConfig).toStrictEqual(expectedFileContents);
  });
});
