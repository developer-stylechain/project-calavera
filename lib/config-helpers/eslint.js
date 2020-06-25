const { writeFiles } = require("../fileUtils");
const {
  prettierConfigFiles,
  prettierWithESLintDependencies,
} = require("./format");

const eslintConfigFiles = [".eslintrc.json"];
const eslintDependencies = ["eslint", "eslint-plugin-import"];

eslintTooling = {
  /**
   * Returns an array of linting tool dependencies
   * and writes the relevant config files to disk
   * @param {Boolean} withPrettier - Whether or not to include prettier related config
   * @returns Array of strings of relevant dependencies
   */
  addLinting: (withPrettier) => {
    let configFiles = eslintConfigFiles;
    let dependencies = eslintDependencies;

    if (withPrettier) {
      configFiles = configFiles.concat(prettierConfigFiles);
      dependencies = dependencies.concat(prettierWithESLintDependencies);
    }

    writeFiles(configFiles, { withPrettier });

    return dependencies;
  },
};

module.exports = {
  eslintConfigFiles,
  eslintDependencies,
  eslintTooling,
};
