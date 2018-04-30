'use strict';

function addDependency(dependency, dependencies) {
    dependencies.push(dependency);
    return dependencies;
}

function getNPMInstallCmd(dependencies) {
    const base = 'npm i -D --save-exact ';
    return base + dependencies.join(' ');
}

module.exports = {
    addDependency,
    getNPMInstallCmd
};
