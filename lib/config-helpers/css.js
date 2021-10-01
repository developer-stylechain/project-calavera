const { writeFiles } = require("../fileUtils");
const { editorconfigConfigFiles } = require("./editorconfig");
const {
  prettierConfigFiles,
  prettierWithStylelintDependencies,
} = require("./format");

const cssConfigFiles = [".stylelintrc", ".stylelintignore"];
const cssDependencies = [
  "stylelint",
  "stylelint-a11y",
  "stylelint-config-recommended",
];

const cssTooling = {
  /**
   * Returns an array of linting tool dependencies
   * and writes the relevant config files to disk
   * @returns Array of strings of relevant dependencies
   */
  addLinting: () => {
    const configFiles = cssConfigFiles.concat(
      prettierConfigFiles,
      editorconfigConfigFiles
    );
    const dependencies = cssDependencies.concat(
      prettierWithStylelintDependencies
    );

    writeFiles(configFiles);

    return dependencies;
  },
};

module.exports = {
  cssConfigFiles,
  cssDependencies,
  cssTooling,
};
