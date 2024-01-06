const signale = require("signale");

const { complete } = require("./utils");

const { cssTooling } = require("./config-helpers/css");
const { editorconfigConfig } = require("./config-helpers/editorconfig");
const { eslintTooling } = require("./config-helpers/eslint");
const { formatTooling } = require("./config-helpers/format");

async function fillCatacomb(skeletons, packageManager) {
  let dependencies = [];

  for (let config in skeletons) {
    switch (config) {
      case "Stylelint":
        dependencies = dependencies.concat(cssTooling.addLinting());
        break;
      case "ESLint":
        dependencies = dependencies.concat(eslintTooling.addLinting());
        break;
      default:
        signale.info("No skeletons matched known skeletons");
        break;
    }
  }

  signale.info(`Adding Prettier and .editorconfig by default`);
  dependencies = dependencies.concat(editorconfigConfig.addConfig());
  dependencies = dependencies.concat(formatTooling.addPrettier());

  complete(packageManager, dependencies);
}

module.exports = {
  fillCatacomb,
};
