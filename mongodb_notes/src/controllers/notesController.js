const notesModel = require("../models/notesModel");

async function getAll(req, res) {
    const notes = await notesModel.getAllNotes();
    res.render("pages/index", { notes });
}

async function getAddForm(req, res) {
    res.render("pages/add");
}

async function postAdd(req, res) {
    const { title, content } = req.body;
    await notesModel.addNote(title, content);
    res.redirect("/");
}

async function deleteNote(req, res) {
    await notesModel.deleteNote(req.params.id);
    res.redirect("/");
}

async function getEditForm(req, res) {
    const note = await notesModel.getNoteById(req.params.id);
    res.render("pages/edit", { note });
}

async function postEdit(req, res) {
    const { title, content } = req.body;
    await notesModel.updateNote(req.params.id, title, content);
    res.redirect("/");
}

async function postChangeStatus(req, res) {
    await notesModel.updateStatus(req.params.id);
    res.redirect("/");
}

module.exports = {
    getAll,
    getAddForm,
    postAdd,
    deleteNote,
    getEditForm,
    postEdit,
    postChangeStatus,
};
