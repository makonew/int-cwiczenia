const express = require('express')
const fs = require('fs')

const path = "./data/cw4.json"

function validatePassword(password) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\@\!\#\$\%]{8,}$/;
    return re.test(password);
}

const validateUser = (user) => {
    return Number.parseInt(user.age) > -18
}

const addUser = (user) => {
    let o = {
        users: []
    }
    if (fs.existsSync(path)) {
        o = JSON.parse(fs.readFileSync(path));
    }
    o.users = [...o.users, user]
    fs.writeFileSync(path, JSON.stringify(o))
}

const listUsers = () => {
    let o = {
        users: []
    }
    if (fs.existsSync(path)) {
        o = JSON.parse(fs.readFileSync(path));
    }
    return o.users
}

const app = express();

app.use(express.urlencoded({ extended: true }))

app.get("/list", (req, res) => {
    res.status(200).send(listUsers())
})


app.get("/", (req, res) => {
    let response = ""
    response += `<a href="/add">Create user</a><br/>`
    response += `<a href="/list">View users</a><br/>`
    res.status(200).send(response)
})


app.get("/add", (req, res) => {
    res.status(200).send(`
        <form action="/add" method="POST"/>
            <label for="name">User name:</label>
            <input type="name" id="name" name="name" required/>

            <label for="age">User age:</label>
            <input type="number" id="age" name="age" required/>

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required/>
            <button type="submit">Submit</button>
        </form>
        `)
})

app.post("/add", (req, res) => {
    const { name, password, age } = req.body
    if (!name || !password || !age) {
        res.status(400).send(`Bad request! Go back here <a href="/">Go back here</a>`)
        return;
    }
    if (!validateUser({ name, password, age })) {
        res.status(400).send('You can\'t register, you\'re underage.')
        return
    }
    if (!validatePassword(password)) {
        res.status(400).send('You can\'t register, you\ have too weak password.')
        return
    }
    addUser({ name, password, age })
    res.status(201).send(`Succesfully registerd <br/> <a href="/add">Register again</a> <br/> <a href="/">Go back here</a>`)

    
})

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000")
})