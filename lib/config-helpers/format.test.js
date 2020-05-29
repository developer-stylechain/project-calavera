const { formatTooling } = require("./format");
const fs = require("fs");
const mock = require("mock-fs");

describe("formatTooling.addPrettier", () => {
  afterEach(() => {
    mock.restore();
  });

  it("returns an array with the appropriate dependencies as strings", async () => {
    const dependencies = await formatTooling.addPrettier();
    expect(dependencies).toStrictEqual(["prettier"]);
  });

  it("writes .prettierrc file to disk", async () => {
    mock({
      "closet/skeletons/": {
        ".prettierrc": "{}",
      },
    });
    await formatTooling.addPrettier();
    expect(fs.statSync(`${process.cwd()}/.prettierrc`).isFile()).toBe(true);
  });
});
