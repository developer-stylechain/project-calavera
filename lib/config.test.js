const mock = require("mock-fs");
const { getConfig } = require("./config");

describe("config", () => {
  afterEach(() => {
    mock.restore();
  });

  test("config loads package.json and returns calavera object", async () => {
    mock({
      "package.json": JSON.stringify({
        name: "project-calavera",
        version: "0.0.0-semantically-released",
        calavera: {
          commonjs: true,
        },
      }),
    });
    const calaveraConfig = await getConfig();

    expect(calaveraConfig).toBeDefined();
    expect(calaveraConfig).toMatchObject({ commonjs: true });
  });

  test("config loads package.json and returns undefined when there is no calavera config", async () => {
    mock({
      "package.json": JSON.stringify({
        name: "project-calavera",
        version: "0.0.0-semantically-released",
      }),
    });
    const calaveraConfig = await getConfig();

    expect(calaveraConfig).toBeUndefined();
  });
});
