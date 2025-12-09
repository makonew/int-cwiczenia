const FILE_PATH = path.join(__dirname, "../../data/users.json");


const fs = require("fs");

function readFileToJson(filePath) {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        const json = JSON.parse(data);
        return json;
    } catch (err) {
        console.error("Error:", "Couldn't open file. Possibly doesnt exist yet.");
        return undefined;
    }
}

function writeFileToJson(filePath, obj) {
    try {
        const data = JSON.stringify(obj, null, 2);
        fs.writeFileSync(filePath, data, "utf8");
        return true;
    } catch (err) {
        console.error("Error:", err);
        return false;
    }
}

module.exports = {
    readFileToJson,
    writeFileToJson
}