const { writeFiles } = require("../fileUtils");
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
   * @param {Boolean} withPrettier - Whether or not to include prettier related config
   * @returns Array of strings of relevant dependencies
   */
  addLinting: (withPrettier) => {
    let configFiles = cssConfigFiles;
    let dependencies = cssDependencies;

    if (withPrettier) {
      configFiles = configFiles.concat(prettierConfigFiles);
      dependencies = dependencies.concat(prettierWithStylelintDependencies);
    }

    writeFiles(configFiles, { withPrettier });

    return dependencies;
  },
};

module.exports = {
  cssConfigFiles,
  cssDependencies,
  cssTooling,
};
