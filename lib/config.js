'use strict';

const fse = require('fs-extra');

/**
 * Reads the `package.json` file and returns the calavera property
 * @returns {Object} The calavera object from `package.json` or `undefined`
 */
async function getConfig() {
    try {
        const packageObj = await fse.readJson('./package.json');
        return packageObj.calavera;
    } catch (error) {
        console.error('Error while reading package.json: ', error);
    }
}

module.exports = {
    getConfig
};
