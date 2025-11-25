const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController");

router.get("/", notesController.getAll);
router.get("/add", notesController.getAddForm);
router.post("/add", notesController.postAdd);

module.exports = router;
