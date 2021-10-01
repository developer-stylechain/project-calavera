const fs = require("fs");
const mock = require("mock-fs");

const {
  editorconfigConfigFiles,
  editorconfigDependencies,
  editorconfigConfig,
} = require("./editorconfig");

const defaultFiles = {
  "closet/skeletons/": {
    ".editorconfig": "root = true",
  },
};

describe("editorconfigConfig.addConfig", () => {
  afterEach(() => {
    mock.restore();
  });

  it("returns an empty array of dependencies", async () => {
    mock(defaultFiles);

    let dependencies = await editorconfigConfig.addConfig();
    expect(dependencies).toStrictEqual(editorconfigDependencies);
  });

  it("writes skeletons to disk", () => {
    mock(defaultFiles);

    editorconfigConfig.addConfig();

    editorconfigConfigFiles.forEach((skeleton) => {
      expect(fs.statSync(skeleton).isFile()).toBe(true);
    });
  });
});
