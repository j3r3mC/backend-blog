const fs = require('fs').promises;

exports.readFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath);
        console.log(data.toString());
    } catch (error) {
        console.error(`Got an error trying to read the file: ${error.message}`);
    }
}

exports.deleteFile = async (filePath) => {
    try {
        await fs.unlink(filePath);
        console.log(`Deleted ${filePath}`);
    } catch (error) {
        console.error(`Got an error trying to delete the file: ${error.message}`);
    }
}

exports.moveFile = async (source, destination) => {
    try {
        await fs.rename(source, destination);
        console.log(`Moved file from ${source} to ${destination}`);
    } catch (error) {
        console.error(`Got an error trying to move the file: ${error.message}`);
    }
}

const { error } = require("console");
const { base } = require('../models/user.model');


exports.openFile = async () => {
    try {
        const csvHeaders = "picture_profil";
        await fs.writeFile('node_files/.csv', csvHeaders);
    } catch {
        console.error(`Got an error trying to write to a file: ${error.message}`);
    }
}

exports.addPhoto = async (picture_profil, base64) => {
    try {
        const csvLine = `\n${picture_profil}, ${base64}`
        await fs.writeFile('node_files/pictures_profil.csv', csvLine, { flag: 'a' });
    } catch (error) {
        console.error(`Got an error trying to write to a file: ${error.message}`);
    }
}





