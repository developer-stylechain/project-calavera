'use strict';

const fse = require('fs-extra');
const path = require('path');

const SKELETON_CLOSET = '../closet/skeletons/';

/**
 * Writes an individual skeleton file to the root of the project
 * @param {String} skeleton - The filename of the skeleton
 */
async function writeFile(skeleton) {
    try {
        const fileContents = await fse.readFile(
            path.join(__dirname, SKELETON_CLOSET + skeleton),
            'utf-8'
        );
        fse.outputFile('./' + skeleton, fileContents);
    } catch (error) {
        console.error(`Error reading skeleton: ${error}`);
    }
}

/**
 * Writes an Array of skeleton files to the root of the project
 * @param {Array} skeletons - The Array of skeleton filenames
 */
async function writeFiles(skeletons) {
    try {
        for (let skeleton of skeletons) {
            const fileContents = await fse.readFile(
                path.join(__dirname, SKELETON_CLOSET + skeleton),
                'utf-8'
            );

            // issue and pr templates are written to a different directory
            if (
                skeleton === 'ISSUE_TEMPLATE.md' ||
                skeleton === 'PULL_REQUEST_TEMPLATE.md'
            ) {
                fse.outputFile('./.github/' + skeleton, fileContents);
            } else {
                fse.outputFile('./' + skeleton, fileContents);
            }
        }
    } catch (error) {
        console.error(`Error reading skeleton: ${error}`);
    }
}

module.exports = {
    writeFile,
    writeFiles
};
