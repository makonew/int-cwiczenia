const { db } = require("../data/connection");

function getAllNotes(callback) {
    db.query("SELECT * FROM  notes", callback);
}

function addNote(title, content, callback) {
    console.log("Adding note")
    const query = "INSERT INTO notes (title, content) VALUES (?, ?)";
    db.query(query, [title, content], () => {
        console.log(arguments); callback(arguments)});
}

module.exports = { getAllNotes, addNote };
