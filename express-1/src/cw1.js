const express = require('express')
const fs = require('fs')

const path = "./express-1/data/cw1.json"

const addVegetable = (vegetable) => {
    let o = {
        vegetables: []
    }
    if(fs.existsSync(path))
    {
        o = JSON.parse(fs.readFileSync(path));
    }
    o.vegetables = [...o.vegetables, vegetable]
    fs.writeFileSync(path, JSON.stringify(o))
}

const getVegetables = () => {
        let o = {
        vegetables: []
    }
    if(fs.existsSync(path))
    {
        o = JSON.parse(fs.readFileSync(path));
    }
    return o.vegetables
}
const getFruits = () => {
        let o = {
        fruits: []
    }
    if(fs.existsSync(path))
    {
        o = JSON.parse(fs.readFileSync(path));
    }
    return o.fruits
}

const app = express();

app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    const { type } = req.query;
    switch (type) {
        case 'vegetables':
                res.status(200).send(getVegetables())
            break;
        case 'fruits':
                res.status(200).send(getFruits())
                break;
        default:
            res.status(200).send('No type of this type!')
            break;
    }

})


app.get("/add", (req, res) => {
    res.status(200).send(`
        <form action="/add" method="POST"/>
            <label for="vegetable">Vegetable:</label>
            <input type="text" id="vegetable" name="vegetable" required/>
            <button type="submit">Submit</button>
        </form>
        `)
})

app.post("/add", (req, res) => {
    const { vegetable } = req.body

    addVegetable(vegetable)

    res.status(201).send(`Succesfully added vegetable <br/> <a href="/add">Add again</a> <br/> <a href="/">View all added</a>`)
})

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000")
})