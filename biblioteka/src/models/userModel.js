const path = require("path");
const crypto = require("crypto");

const {
    readFileToJson,
    writeFileToJson
} = require("../services/fileOperations")

const DEFAULT_OBJECT = { users: [] }



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