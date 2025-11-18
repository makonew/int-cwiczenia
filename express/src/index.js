const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.status(200).send('Hello, express!')    
})

app.get('/contact', (req, res) => { 
    res.status(200).send('Hello on contact!')    
})

app.get('/about', (req, res) => {
    res.status(200).send('Hello on about!')    
})


app.listen(3000, () => {
    console.log("Running server on port 3000!")
})