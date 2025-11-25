const notesModel = require("../models/notesModel")

async function getAll(req, res) {
    const notes = await notesModel.getAllNotes()
    res.render("pages/index", { notes })
}

async function getAddForm(req, res) {
    res.render("pages/add")
}

async function postAdd(req, res) {
    const { title, content } = req.body

    notesModel.addNote(title, content, (err) => {
        if (err) return res.status(500).send("Database error: " + err)
        res.redirect("/")
    })
    res.redirect("/")
}

module.exports = {
    getAll,
    getAddForm,
    postAdd
}
