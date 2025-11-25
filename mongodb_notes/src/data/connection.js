const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

let db;

async function connectDB() {
    try {
        await client.connect();
        db = await client.db("notes");
        console.log("Połączono z MongoDB");
    } catch (err) {
        console.log("Błąd połączenia z MongoDB: " + err);
    }
}

function getDB() {
    if (!db) throw new Error("Nie udało się połączyć z bazą danych!");
    return db;
}

module.exports = { connectDB, getDB };
