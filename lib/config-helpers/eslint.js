const { writeFiles } = require("../fileUtils");
const { editorconfigConfigFiles } = require("./editorconfig");
const { prettierConfigFiles } = require("./format");

const eslintConfigFiles = [".eslintrc.json"];
const eslintDependencies = ["eslint", "eslint-plugin-import"];
const eslintPrettierDependencies = ["prettier", "eslint-config-prettier"];

const eslintTooling = {
  /**
   * Returns an array of linting tool dependencies
   * and writes the relevant config files to disk
   * @returns Array of strings of relevant dependencies
   */
  addLinting: () => {
    const configFiles = eslintConfigFiles.concat(
      prettierConfigFiles,
      editorconfigConfigFiles
    );
    const dependencies = eslintDependencies.concat(eslintPrettierDependencies);

    writeFiles(configFiles);

    return dependencies;
  },
};

module.exports = {
  eslintConfigFiles,
  eslintDependencies,
  eslintPrettierDependencies,
  eslintTooling,
};
