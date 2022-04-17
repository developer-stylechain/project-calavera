const { writeFiles } = require("../fileUtils");
const { editorconfigConfigFiles } = require("./editorconfig");
const {
  prettierConfigFiles,
  prettierWithStylelintDependencies,
} = require("./format");

const sassConfigFiles = ["sass/.stylelintrc", ".stylelintignore"];
const sassDependencies = [
  "stylelint",
  "stylelint-a11y",
  "stylelint-config-recommended",
  "sass",
  "stylelint-scss",
  "stylelint-config-sass-guidelines",
];

const sassTooling = {
  /**
   * Returns an array of SASS tool dependencies
   * and writes the relevant config files to disk
   * @returns Array of strings of relevant dependencies
   */
  addSass: () => {
    const configFiles = sassConfigFiles.concat(
      prettierConfigFiles,
      editorconfigConfigFiles
    );
    const dependencies = sassDependencies.concat(
      prettierWithStylelintDependencies
    );

    writeFiles(configFiles);

    return dependencies;
  },
};

module.exports = {
  sassConfigFiles,
  sassDependencies,
  sassTooling,
};
