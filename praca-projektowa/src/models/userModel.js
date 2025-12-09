const path = require("path");
const crypto = require("crypto");

const FILE_PATH = path.join(__dirname, "../../data/users.json");
const DEFAULT_OBJECT = { users: [] }

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


function getUserByUsername(username) {
    const users = readFileToJson(FILE_PATH) || DEFAULT_OBJECT
    return (users.users || []).filter((val) => val.username === username)[0]
}

function getAllUsers() {
    const users = readFileToJson(FILE_PATH) || DEFAULT_OBJECT

    return (users.users || []).sort() //To jest niesamowite, że boję sie zostawiać komentarze bo ktoś może uznać to za wygenerowane przez AI
}

function addUser(user) {
    if (
        !user ||
        typeof user !== "object" ||
        typeof user.username !== "string" ||
        typeof user.password !== "string" ||
        user.username.trim() === "" ||
        user.password.trim() === ""
    ) {
        throw new Error("Invalid user: 'username' and 'password' are required.")
    }

    const hash = crypto.createHash('sha256')

    hash.update(user.password)

    const digest = hash.digest('hex')

    const obj = readFileToJson(FILE_PATH) || DEFAULT_OBJECT

    if (!Array.isArray(obj.users)) obj.users = []

    const exists = obj.users.some(
        (u) => String(u.username).toLowerCase() === user.username.toLowerCase()
    );
    if (exists) {
        throw new Error("Username already exists.")
    }

    obj.users = [...obj.users, { ...user, password: digest }]

    writeFileToJson(FILE_PATH, obj)

    return { username: user.username }
}

module.exports = {
    getAllUsers,
    getUserByUsername,
    addUser
}