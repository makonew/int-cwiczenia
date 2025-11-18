const express = require('express')
const fs = require('fs')

const app = express()

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync("./data/data.json", "utf-8"))

    res.status(200).json(data)
})

app.get('/add', (req, res) => {
    res.status(200).send(`
        <form action="/add" method="POST"/>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required/>
            <label for="age"/>Age:</label>
            <input type="number" id="age" name="age" required/>
            <button type="submit">Submit</button>
        </form>
        `)
})

app.post("/add", (req, res) => {
    const {name, age} = req.body;
    const data = JSON.parse(fs.readFileSync("./data/data.json"))
    data.push({id: data.length + 1, ...req.body})

    fs.writeFileSync('./data/data.json', JSON.stringify(data))

    res.status(200).send(`Added ${name}. 
            <br/><a href="/">Go back</a>
            <br/><a href="/add">Add another</a>`)
})

app.listen(3000, () => {
    console.log("Running on port 3000")
})