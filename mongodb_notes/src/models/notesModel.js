const { ObjectId } = require("mongodb");
const { getDB } = require("../data/connection");

const TASK_STATUS = {
    TODO: "Do zrobienia",
    DOING: "W toku",
    DONE: "Zakończone"
}
function getNewStatus(status) {
    if (status === TASK_STATUS.TODO) return TASK_STATUS.DOING
    if (status === TASK_STATUS.DOING) return TASK_STATUS.DONE
    return TASK_STATUS.TODO
}

async function getAllNotes() {
    const db = getDB();
    return await db.collection("notes")
        .find()
        .sort({ createdAt: -1 })
        .toArray();
}

async function getNoteById(id) {
    const db = getDB();
    return await db.collection("notes")
        .findOne({ _id: new ObjectId(id) });;
}

async function addNote(title, content) {
    const db = getDB();
    await db.collection("notes")
        .insertOne({
            title,
            content: content.trim(),
            status: TASK_STATUS.TODO,
            createdAt: new Date(),
        });
}

async function deleteNote(id) {
    const db = getDB();
    await db.collection("notes")
        .deleteOne({ _id: new ObjectId(id) });
}

async function updateNote(id, title, content) {
    const db = getDB();
    await db.collection("notes")
        .updateOne({ _id: new ObjectId(id) }, { $set: { title, content } });
}

async function updateStatus(id) {
    const db = getDB();
    const note = await db.collection("notes")
        .findOne({ _id: new ObjectId(id) });

    const status = getNewStatus(note.status)
    await db.collection("notes")
        .updateOne({ _id: new ObjectId(id) }, { $set: { status } });
}

module.exports = {
    getAllNotes,
    getNoteById,
    addNote,
    deleteNote,
    updateNote,
    updateStatus,
};
