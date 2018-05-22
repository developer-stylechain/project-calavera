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
 * @returns {String} For example: npm i -D --save-exact eslint stylelint
 */
function getNPMInstallCmd(dependencies) {
    const base = 'npm i -D --save-exact ';
    return base + dependencies.join(' ');
}

module.exports = {
    addDependency,
    addDependencies,
    getNPMInstallCmd
};
