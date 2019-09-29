const signale = require("signale");

const { complete } = require("./utils");
const cssTooling = require("./config-helpers/css");
const formatTooling = require("./config-helpers/format");
const { getConfig } = require("./config");

async function fillCatacomb() {
  const calaveraConfig = await getConfig();
  let dependecies = [];

  if (!calaveraConfig) {
    signale.info(
      "No configuration found for calavera. Please add a config block in your package.json"
    );
    return;
  }

  for (let config in calaveraConfig) {
    switch (config) {
      case "sasslint":
        dependecies = dependecies.concat(cssTooling.addSasslint());
        break;
      case "stylelint":
        dependecies = dependecies.concat(cssTooling.addStylelint());
        break;
      case "prettier":
        let prettierDependencies = await formatTooling.addPrettier();
        dependecies = dependecies.concat(prettierDependencies);
        break;
      default:
        signale.error(`No configuration or skeleton match found for ${config}`);
        break;
    }
  }

  // Log next steps information to the terminal.
  complete(calaveraConfig, dependecies);
}

module.exports = {
  fillCatacomb
};
