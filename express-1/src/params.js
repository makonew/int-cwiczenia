const express = require('express')

const app = express()

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.status(200).send(`Go to <a href="/users/">/users/:name</a>`)
})


app.get('/users/:name', (req, res) => {
    const { name } = req.params;

    res.status(200).send(`Hello, ${name}`)
})



app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})