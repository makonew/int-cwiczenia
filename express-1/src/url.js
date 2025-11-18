const express = require('express')

const app = express()

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    const name = req.query.name || "Unknown"
    const age = req.query.age || "NaN"

    res.status(`Hello, ${name}. You are ${age} years old.`)
})


app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})