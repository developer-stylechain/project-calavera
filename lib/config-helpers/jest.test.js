const fs = require("fs");
const mock = require("mock-fs");

const { eslintDependencies } = require("./eslint");
const { jestDependencies, jestTooling } = require("./jest");

const defaultFiles = {
  ".eslintrc.json": "{}",
};

const expectedESLintFileContents = `{
  "extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:jest/recommended",
    "plugin:jest/style"
  ]
}`;
const noDefaultESLint = {
  "closet/skeletons/jest/": {
    ".eslintrc.json": expectedESLintFileContents,
  },
};

describe("jestTooling.addTooling", () => {
  afterEach(() => {
    mock.restore();
  });

  it("returns an array with the default dependencies as strings", () => {
    mock(defaultFiles);

    const dependencies = jestTooling.addTooling();
    expect(dependencies).toStrictEqual(jestDependencies);
  });

  it("adds jest plugins to existing .eslintrc.json", () => {
    const expectedBaseFileContents = `{
  "extends": [
    "plugin:jest/recommended",
    "plugin:jest/style"
  ]
}`;

    mock(defaultFiles);

    jestTooling.addTooling();

    const eslintConfig = fs.readFileSync(".eslintrc.json", "utf8");
    expect(eslintConfig).toStrictEqual(expectedBaseFileContents);
  });

  it("adds jest plugins to .eslintrc.json and keeps prettier as the last entry", () => {
    const defaultWithPrettier = {
      ".eslintrc.json": `{
  "extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "prettier"
  ]
}`,
    };
    const expectedPrettierBaseFileContents = `{
  "extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "prettier"
  ]
}`;

    mock(defaultWithPrettier);

    jestTooling.addTooling();

    const eslintConfig = fs.readFileSync(".eslintrc.json", "utf8");
    expect(eslintConfig).toStrictEqual(expectedPrettierBaseFileContents);
  });

  it("adds a .eslintrc.json if none exists with relevant jest plugins", () => {
    mock(noDefaultESLint);

    expect(fs.existsSync(".eslintrc.json")).toBe(false);

    jestTooling.addTooling();

    expect(fs.existsSync(".eslintrc.json")).toBe(true);

    const eslintConfig = fs.readFileSync(".eslintrc.json", "utf8");
    expect(eslintConfig).toStrictEqual(expectedESLintFileContents);
  });

  it("returns eslint and jest dependencies when there is no existing eslint config", () => {
    mock(noDefaultESLint);

    const dependencies = jestTooling.addTooling();

    expect(dependencies).toStrictEqual(
      jestDependencies.concat(eslintDependencies)
    );
  });
});
