const mysql = require("mysql");

let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "notes_app",
    port: 3306,
});

db.connect((err) => {
    if (err) {
        console.error("Wystąpił problem podczas łączenia z bazą danych: ", err);
        return;
    }
    console.log("Połączono z bazą danych MySQL.");
});

async function connectDB() {

}


module.exports = { connectDB, db };
