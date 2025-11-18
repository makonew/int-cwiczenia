const express = require('express')

const app = express();

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.status(200).send(`
        <form action="/" method="POST"/>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required/>
            <label for="age"/>Age:</label>
            <input type="number" id="age" name="age" required/>
            <button type="submit">Submit</button>
        </form>
        `)
})

app.post('/', (req, res) => {
    console.log(req)
    res.status(200).send(`
        ${req.body.name || "You didn't provide a name!"} <br/>
        ${req.body.age || "You didn't provide an age!"} <br/>
        <form action="/" method="POST"/>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required/>
            <label for="age"/>Age:</label>
            <input type="number" id="age" name="age" required/>
            <button type="submit">Submit</button>
        </form>
        `)
})

app.listen(3000, () => {
    console.log("Running on port 3000")
})