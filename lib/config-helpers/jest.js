const fs = require("fs");
const path = require("path");

const { eslintDependencies, eslintConfigFiles } = require("./eslint");
const { updateConfig } = require("../fileUtils");

const SKELETON_CLOSET = "../../closet/skeletons/";
const jestDependencies = ["jest", "eslint-plugin-jest"];
const jestESLintConfig = ["plugin:jest/recommended", "plugin:jest/style"];

/**
 * Updates an existing `.eslintrc.json` with the relevant eslint Jest plugins
 * @param {String} eslintConfig - path the root eslint config file
 * @returns the updated eslint config file contents as a string
 */
function addJestConfig(eslintConfig) {
  try {
    let fileContents = fs.readFileSync(eslintConfig, "utf8");
    return updateConfig(fileContents, jestESLintConfig);
  } catch (error) {
    throw new Error(`Error while adding jest tooling: ${error.toString()}`);
  }
}

const jestTooling = {
  /**
   * Returns an array of linting tool dependencies
   * @returns Array of strings of relevant dependencies
   */
  addTooling: () => {
    // user's current `.eslintrc.json`
    const eslintConfig = `${eslintConfigFiles[0]}`;

    let dependencies = jestDependencies;
    let fileContents = "";

    if (fs.existsSync(eslintConfig)) {
      fileContents = addJestConfig(eslintConfig);
    } else {
      try {
        fileContents = fs.readFileSync(
          path.join(__dirname, `${SKELETON_CLOSET}jest/.eslintrc.json`),
          "utf8"
        );
        dependencies = dependencies.concat(eslintDependencies);
      } catch (error) {
        throw new Error(
          `Error while reading .eslintrc.json: ${error.toString()}`
        );
      }
    }

    fs.writeFileSync(eslintConfig, fileContents);

    return dependencies;
  },
};

module.exports = {
  jestDependencies,
  jestTooling,
};
