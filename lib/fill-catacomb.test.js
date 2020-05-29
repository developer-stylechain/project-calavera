const { fillCatacomb } = require("./fill-catacomb");
const fs = require("fs");
const mock = require("mock-fs");

describe("fillCatacomb", () => {
  afterEach(() => {
    mock.restore();
  });

  test("writes .prettierrc to root directory for prettier config", async () => {
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
    expect(fs.statSync("./.prettierrc").isFile()).toBe(true);
  });
});
