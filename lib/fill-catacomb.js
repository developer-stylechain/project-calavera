const signale = require("signale");

const { complete } = require("./utils");
const { getConfig } = require("./config");

const { cssTooling } = require("./config-helpers/css");
const { formatTooling } = require("./config-helpers/format");
const sassTooling = require("./config-helpers/sass");

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
    const withPrettier = config.prettier ? true : false;

    switch (config) {
      case "css":
        dependecies = dependecies.concat(cssTooling.addLinting(withPrettier));
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
  fillCatacomb,
};
