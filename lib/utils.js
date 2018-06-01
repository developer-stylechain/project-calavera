'use strict';

/**
 * Adds a new dependency to the dependency Array
 * @param {String} dependency - Dependency to add
 * @param {Array} dependencies - The current dependency Array
 * @returns {Array} the updated dependency Array
 */
function addDependency(dependency, dependencies) {
    dependencies.push(dependency);
    return dependencies;
}

/**
 * Concatenates the new Array of dependecies onto the existing dependency Array
 * @param {Array} newDependecyArray - Dependencies to concat
 * @param {Array} currentDependencyArray - The current dependency Array
 * @returns {Array} the updated dependency Array
 */
function addDependencies(newDependecyArray, currentDependencyArray) {
    currentDependencyArray = currentDependencyArray.concat(newDependecyArray);
    return currentDependencyArray;
}

/**
 * Takes an Array of dependencies and returns the npm command to run
 * in order to install all required dependencies.
 * @param {Array} dependecies - The array of dependencies that needs to be installed
 * @returns {String} For example: npm i -D --save-exact eslint stylelint
 */
function getNPMInstallCmd(dependencies) {
    const base = 'npm i -D --save-exact ';
    return base + dependencies.join(' ');
}

/**
 * Called when Calavera has written all skeletons. Logs
 * next steps information to the terminal.
 * @param {Object} calaveraConfig - The current calaveraConfig
 * @param {Array} dependecies - The array of dependencies that needs to be installed
 */
function complete(calaveraConfig, dependecies) {
    console.info('[Calavera] Skeletons written to project successfully');

    /* Only output the dependency info if there are more than one entry in
       calaveraConfig or, if there is only one, be sure that it is not colab.
       This is because the colab configuration does not require the instllation
       of any dependencies */
    if (
        Object.keys(calaveraConfig).length > 1 ||
        Object.keys(calaveraConfig)[0] !== 'colab'
    ) {
        const INSTALL_CMD = getNPMInstallCmd(dependecies);
        console.info(
            `[Calavera] Run the following command to install dependencies: ${INSTALL_CMD}`
        );
    }
}

module.exports = {
    addDependency,
    addDependencies,
    complete
};
