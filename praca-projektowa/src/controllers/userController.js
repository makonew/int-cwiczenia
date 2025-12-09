const userModel = require("../models/userModel");

async function getAll(req, res) {
    const notes = await userModel.getAllUsers();
    res.render("pages/index", { notes });
}

async function getAddForm(req, res) {
    res.render("pages/add");
}

async function postAdd(req, res) {
    const { username, password, age } = req.body;

    const strongPwd =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{8,}$/;

    if (!password || !strongPwd.test(password)) {
        return res.status(400).render("pages/add", {
            error:
                "Password must be at least 8 characters and include upper, lower, number, and special character.",
            username,
        });
    }

    if (!age || !(age >= 18)) {
        return res.status(400).render("pages/add", {
            error:
                "Please enter a valid age (18+).",
            username,
        });
    }

    await userModel.addUser({ username, age, password });
    res.redirect("/");
}

async function getUser(req, res) {
    const { username } = req.params;
    const user = await userModel.getUserByUsername(username);
    if (!user) return res.status(404).render("pages/user", { user: null });
    res.render("pages/user", { user });
}


module.exports = {
    getAll,
    getAddForm,
    postAdd,
    getUser
};
