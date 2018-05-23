'use strict';

const fse = require('fs-extra');
const path = require('path');

const SKELETON_CLOSET = '../closet/skeletons/';

async function writeFile(skeleton) {
    try {
        const fileContents = await fse.readFile(
            SKELETON_CLOSET + skeleton,
            'utf-8'
        );
        fse.outputFile('./' + skeleton, fileContents);
    } catch (error) {
        console.error(`Error reading skeleton: ${error}`);
    }
}

async function writeFiles(skeletons) {
    try {
        for (let skeleton of skeletons) {
            console.log(
                '__dirname',
                path.join(__dirname, SKELETON_CLOSET + skeleton)
            );
            const fileContents = await fse.readFile(
                path.join(__dirname, SKELETON_CLOSET + skeleton),
                'utf-8'
            );
            fse.outputFile('./' + skeleton, fileContents);
        }
    } catch (error) {
        console.error(`Error reading skeleton: ${error}`);
    }
}

module.exports = {
    writeFile,
    writeFiles
};
