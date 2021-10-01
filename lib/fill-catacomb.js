const signale = require("signale");

const { complete } = require("./utils");
const { getConfig } = require("./config");

const { cssTooling } = require("./config-helpers/css");
const { editorconfigConfig } = require("./config-helpers/editorconfig");
const { eslintTooling } = require("./config-helpers/eslint");
const { formatTooling } = require("./config-helpers/format");
const { jestTooling } = require("./config-helpers/jest");
const { sassTooling } = require("./config-helpers/sass");
const { typescriptTooling } = require("./config-helpers/typescript");

async function fillCatacomb() {
  let calaveraConfig = await getConfig();

  if (!calaveraConfig) {
    signale.info("Writing default Prettier and editorconfig files");
    calaveraConfig = { default: true };
  }

  let dependencies = [];
  let manager = "yarn";

  for (let config in calaveraConfig) {
    switch (config) {
      case "css":
        dependencies = dependencies.concat(
          cssTooling.addLinting(true /* withPrettier: true */)
        );
        break;
      case "sass":
        dependencies = dependencies.concat(
          sassTooling.addSass(true /* withPrettier: true */)
        );
        break;
      case "eslint":
        dependencies = dependencies.concat(
          eslintTooling.addLinting(true /* withPrettier: true */)
        );
        break;
      case "jest":
        dependencies = dependencies.concat(jestTooling.addTooling());
        break;
      case "manager":
        manager = config;
        break;
      case "typescript":
        dependencies = dependencies.concat(
          typescriptTooling.addTooling(calaveraConfig[config])
        );
        break;
      default:
        dependencies = dependencies.concat(editorconfigConfig.addConfig());
        dependencies = dependencies.concat(formatTooling.addPrettier());
        signale.info(`Adding Prettier and .editorconfig by default`);
        break;
    }
  }

  // Log next steps information to the terminal.
  complete(manager, dependencies);
}

module.exports = {
  fillCatacomb,
};
