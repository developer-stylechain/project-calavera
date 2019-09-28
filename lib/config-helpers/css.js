const { writeFiles } = require("../fileUtils");

cssTooling = {
  addStylelint: () => {
    writeFiles([".stylelintrc", ".stylelintignore"]);
    return ["stylelint", "stylelint-config-recommended"];
  }
};

module.exports = cssTooling;
