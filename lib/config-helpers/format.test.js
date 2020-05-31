const fs = require("fs");
const mock = require("mock-fs");

const {
  formatTooling,
  prettierConfigFiles,
  prettierDependencies,
} = require("./format");

describe("formatTooling.addPrettier", () => {
  afterEach(() => {
    mock.restore();
  });

  it("returns an array with the appropriate dependencies as strings", async () => {
    mock({
      "closet/skeletons/": {
        ".prettierrc": "{}",
      },
    });

    const dependencies = await formatTooling.addPrettier();
    expect(dependencies).toStrictEqual(prettierDependencies);
  });

  it("writes .prettierrc file to disk", async () => {
    mock({
      "closet/skeletons/": {
        ".prettierrc": "{}",
      },
    });
    await formatTooling.addPrettier();

    expect(fs.statSync(prettierConfigFiles[0]).isFile()).toBe(true);
  });
});
