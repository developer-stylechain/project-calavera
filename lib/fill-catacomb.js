const signale = require("signale");

const { complete } = require("./utils");
const { getConfig } = require("./config");

const { cssTooling } = require("./config-helpers/css");
const { formatTooling } = require("./config-helpers/format");
const { sassTooling } = require("./config-helpers/sass");
const { eslintTooling } = require("./config-helpers/eslint");

async function fillCatacomb() {
  const calaveraConfig = await getConfig();

  if (!calaveraConfig) {
    signale.info(
      "No configuration found for calavera. Please add a config block in your package.json"
    );
    return;
  }

  const configKeys = Object.keys(calaveraConfig);
  let dependecies = [];
  let withPrettier = false;

  /* If there is more than one entry in calaveraConfig, determine
   * if Prettier is one of the entries. If Prettier is found, see if
   * we also have either css, sass, or eslint as a config entry.
   *
   * If the above is true, set withPrettier to true and delete prettier
   * from calaveraConfig. This is to avoid duplication of Prettier
   * dependencies as well as duplicate file writes.
   */
  if (
    configKeys.length > 1 &&
    configKeys.includes("prettier") &&
    (configKeys.includes("css") ||
      configKeys.includes("sass") ||
      configKeys.includes("eslint"))
  ) {
    withPrettier = true;
    delete calaveraConfig["prettier"];
  }

  for (let config in calaveraConfig) {
    switch (config) {
      case "css":
        dependecies = dependecies.concat(cssTooling.addLinting(withPrettier));
        break;
      case "sass":
        dependecies = dependecies.concat(sassTooling.addSass(withPrettier));
        break;
      case "eslint":
        dependecies = dependecies.concat(
          eslintTooling.addLinting(withPrettier)
        );
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
