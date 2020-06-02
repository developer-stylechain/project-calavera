const { writeFiles } = require("../fileUtils");
const { prettierConfigFiles, prettierDependencies } = require("./format");

const sassConfigFiles = ["sass/.stylelintrc", ".stylelintignore"];
const sassDependencies = [
  "stylelint",
  "stylelint-a11y",
  "stylelint-config-recommended",
  "sass",
  "node-sass-chokidar",
  "stylelint-scss",
  "stylelint-config-sass-guidelines",
];

sassTooling = {
  /**
   * Returns an array of SASS tool dependencies
   * and writes the relevant config files to disk
   * @param {Boolean} withPrettier - Whether or not to include prettier related config
   * @returns Array of strings of relevant dependencies
   */
  addSass: (withPrettier) => {
    let configFiles = sassConfigFiles;
    let dependencies = sassDependencies;

    if (withPrettier) {
      configFiles = configFiles.concat(prettierConfigFiles);
      dependencies = dependencies.concat(prettierDependencies);
    }

    writeFiles(configFiles);

    return dependencies;
  },
};

module.exports = {
  sassConfigFiles,
  sassDependencies,
  sassTooling,
};
