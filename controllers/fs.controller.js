const { encodeBase64 } = require("bcryptjs");
const fs = require("fs");
const { options } = require("../app");
const FILE_URI = process.env.FILE_URI;

exports.saveImg = (nameFile, base64) => {
    const buffedInput = Buffer.from(base64, 'base64');
    if (!fs.existsSync(`${FILE_URI}${nameFile}`)) {
        fs.writeFileSync(`${FILE_URI}${nameFile}.jpg`, buffedInput);
    }
}

exports.getImg = (fileName) => {
    console.log(fileName);
    const encodedFile = fileName
        ? fs.readFileSync(`${FILE_URI}${fileName}`, { encoding: "base64" })
        : console.log("FAILLED");

}

