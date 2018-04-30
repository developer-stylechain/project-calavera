'use strict';

const fse = require('fs-extra');

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
