const { fillCatacomb } = require("../lib/calavera");
const fs = require("fs");
const mock = require("mock-fs");

describe("calavera", () => {
  afterEach(() => {
    mock.restore();
  });

  test("writes .prettierrc to root directory for prettier config", () => {
    mock({
      "package.json": JSON.stringify({
        name: "project-calavera",
        version: "0.0.0-semantically-released",
        calavera: {
          prettier: true
        }
      })
    });

    fillCatacomb().then(() => {
      expect(fs.stat("./.prettierrc").isFile()).toBe(true);
    });
  });
});
