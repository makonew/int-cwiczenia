const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController");

router.get("/", notesController.getAll);
router.get("/add", notesController.getAddForm);
router.post("/add", notesController.postAdd);
router.post("/delete/:id", notesController.deleteNote);
router.get("/edit/:id", notesController.getEditForm);
router.post("/edit/:id", notesController.postEdit);
router.post("/changeStatus/:id", notesController.postChangeStatus);

module.exports = router;
