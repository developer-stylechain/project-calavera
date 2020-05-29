const { writeFiles } = require("../fileUtils");
const { prettierConfigFiles, prettierDependencies } = require("./format");

cssTooling = {
  /**
   * Returns an array of linting tool dependencies
   * and writes the relevant config files to disk
   * @param {Boolean} withPrettier - Whether or not to include prettier related config
   * @returns Array of strings of relevant dependencies
   */
  addLinting: (withPrettier) => {
    let configFiles = [".stylelintrc", ".stylelintignore"];
    let dependencies = [
      "stylelint",
      "stylelint-a11y",
      "stylelint-config-recommended",
    ];

    if (withPrettier) {
      configFiles.concat(prettierConfigFiles);
      dependencies.concat(prettierDependencies);
    }

    writeFiles(configFiles);

    return dependencies;
  },
};

module.exports = cssTooling;
