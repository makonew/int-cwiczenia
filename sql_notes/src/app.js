const express = require("express");
const path = require("path");
const notesRouter = require("./routes/notesRouter");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", notesRouter);

module.exports = app;
