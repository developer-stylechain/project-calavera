const fs = require("fs");
const mock = require("mock-fs");

const { fillCatacomb } = require("./fill-catacomb");
const { cssConfigFiles } = require("./config-helpers/css");
const { prettierConfigFiles } = require("./config-helpers/format");

describe("fillCatacomb", () => {
  afterEach(() => {
    mock.restore();
  });

  it("writes .prettierrc to root directory for prettier config", async () => {
    mock({
      "package.json": JSON.stringify({
        name: "project-calavera",
        version: "0.0.0-semantically-released",
        calavera: {
          prettier: true,
        },
      }),
      "closet/skeletons/": {
        ".prettierrc": "{}",
      },
    });

    await fillCatacomb();

    expect(fs.statSync(prettierConfigFiles[0]).isFile()).toBe(true);
  });

  it("writes relevant config files to root directory for css config - no prettier", async () => {
    mock({
      "package.json": JSON.stringify({
        name: "project-calavera",
        version: "0.0.0-semantically-released",
        calavera: {
          css: true,
        },
      }),
      "closet/skeletons/": {
        ".stylelintrc": "{}",
        ".stylelintignore": "{}",
      },
    });

    await fillCatacomb();

    cssConfigFiles.forEach((skeleton) => {
      expect(fs.statSync(skeleton).isFile()).toBe(true);
    });
  });

  it("writes relevant config files to root directory for css config - with prettier", async () => {
    mock({
      "package.json": JSON.stringify({
        name: "project-calavera",
        version: "0.0.0-semantically-released",
        calavera: {
          css: true,
          prettier: true,
        },
      }),
      "closet/skeletons/": {
        ".stylelintrc": `{"extends":["stylelint-a11y/recommended"]}`,
        ".stylelintignore": "{}",
        ".prettierrc": "{}",
      },
    });

    await fillCatacomb();

    cssConfigFiles.forEach((skeleton) => {
      expect(fs.statSync(skeleton).isFile()).toBe(true);
    });
    expect(fs.statSync(prettierConfigFiles[0]).isFile()).toBe(true);
  });
});
