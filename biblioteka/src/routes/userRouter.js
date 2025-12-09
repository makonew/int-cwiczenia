const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAll);
router.get("/add", userController.getAddForm);
router.post("/add", userController.postAdd);
router.get("/users/:username", userController.getUser)

module.exports = router;
