const fs = require("fs");
const mock = require("mock-fs");

const { fillCatacomb } = require("./fill-catacomb");
const { cssConfigFiles } = require("./config-helpers/css");
const { prettierConfigFiles } = require("./config-helpers/format");
const { editorconfigConfigFiles } = require("./config-helpers/editorconfig");

describe("fillCatacomb", () => {
  afterEach(() => {
    mock.restore();
  });

  it("writes .prettierrc.json and .editorconfig to root directory by default", async () => {
    mock({
      "package.json": JSON.stringify({
        name: "project-calavera",
        version: "0.0.0-semantically-released",
      }),
      "closet/skeletons/": {
        ".prettierrc.json": "{}",
        ".prettierignore": "# Ignore artifacts:",
        ".editorconfig": "root = true",
      },
    });

    await fillCatacomb();

    expect(fs.existsSync(prettierConfigFiles[0])).toBe(true);
    expect(fs.existsSync(prettierConfigFiles[1])).toBe(true);
    expect(fs.existsSync(editorconfigConfigFiles[0])).toBe(true);
  });

  it("writes relevant config files to root directory for css config", async () => {
    mock({
      "package.json": JSON.stringify({
        name: "project-calavera",
        version: "0.0.0-semantically-released",
        calavera: {
          css: true,
        },
      }),
      "closet/skeletons/": {
        ".stylelintrc": `{"extends":["stylelint-a11y/recommended"]}`,
        ".stylelintignore": "{}",
        ".prettierrc.json": "{}",
        ".prettierignore": "# Ignore artifacts:",
        ".editorconfig": "root = true",
      },
    });

    await fillCatacomb();

    cssConfigFiles.forEach((skeleton) => {
      expect(fs.statSync(skeleton).isFile()).toBe(true);
    });

    prettierConfigFiles.forEach((skeleton) => {
      expect(fs.statSync(skeleton).isFile()).toBe(true);
    });
  });
});
