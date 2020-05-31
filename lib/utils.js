"use strict";

const fse = require("fs-extra");
const path = require("path");
const signale = require("signale");

/**
 * Takes an Array of dependencies and returns the npm command to run
 * in order to install all required dependencies.
 * @param {Array} dependecies - The array of dependencies that needs to be installed
 * @returns {String} For example: npm i -D --save-exact eslint stylelint
 */
function getNPMInstallCmd(dependencies) {
  return `npm i -D --save-exact ${dependencies.join(" ")}`;
}

/**
 * Takes an Array of dependencies and returns the yarn command to run
 * in order to install all required dependencies.
 * @param {Array} dependecies - The array of dependencies that needs to be installed
 * @returns {String} For example: yarn eslint stylelint --dev
 */
function getYarnInstallCmd(dependencies) {
  return `yarn ${dependencies.join(" ")} --dev`;
}

/**
 * Called when Calavera has written all skeletons. Logs
 * next steps information to the terminal.
 * @param {Object} calaveraConfig - The current calaveraConfig
 * @param {Array} dependecies - The array of dependencies that needs to be installed
 */
function complete(calaveraConfig, dependecies) {
  signale.success("[Calavera] Skeletons written to project successfully");

  /* Only output the dependency info if there are more than one entry in
       calaveraConfig or, if there is only one, be sure that it is not colab.
       This is because the colab configuration does not require the installation
       of any dependencies */
  if (Object.keys(calaveraConfig)[0] !== "colab") {
    const INSTALL_CMD = getNPMInstallCmd(dependecies);
    signale.info(
      `[Calavera] Run the following command to install dependencies: ${INSTALL_CMD}`
    );
  }
}

async function loadPackageJson() {
  try {
    const fileContents = await fse.readFile(
      path.join(__dirname, "package.json"),
      "utf-8"
    );
  } catch (error) {
    signale.error(`Error reading package.json: ${error}`);
  }
}

module.exports = {
  complete,
};
