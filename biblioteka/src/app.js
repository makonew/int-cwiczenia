const express = require("express");
const path = require("path");
const userRouter = require("./routes/userRouter");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", userRouter);

module.exports = app;
