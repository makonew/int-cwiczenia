const express = require('express')
const fs = require('fs')

const path = "./express-1/data/cw2.json"

const addPokemon = (pokemon) => {
    let o = {
        pokemon: []
    }
    if (fs.existsSync(path)) {
        o = JSON.parse(fs.readFileSync(path));
    }
    o.pokemon = [...o.pokemon, pokemon]
    fs.writeFileSync(path, JSON.stringify(o))
}

const listPokemon = () => {
    let o = {
        pokemon: []
    }
    if (fs.existsSync(path)) {
        o = JSON.parse(fs.readFileSync(path));
    }
    return o.pokemon
}

const app = express();

app.use(express.urlencoded({ extended: true }))

app.get("/list", (req, res) => {
    res.status(200).send(listPokemon())
})


app.get("/", (req, res) => {
    let response = ""
    for(var p of [{name: "Bulbasaur"}, {name: "Charmander"}, {name: "Squirtle"}]) {
        console.log(p)
        response += `<a href="/pokemon/${p.name}">${p.name}</a> <br/>`

    }

    //response += "<a href=\"/add\"> Add new pokemon </a>"
        console.log(response)
    res.status(200).send(response)
})

app.get("/pokemon/charmander", (req, res) => {
    const name = 'charmander';

    const pokemon = listPokemon().filter((pokemon) => pokemon.name.toLowerCase() === name.toLowerCase());

    if(pokemon.length == 0) {
        res.status(404).send("<h1>Page not found!</h1><br/><a href=\"/\">Go back here!</a>")
    }
    

    res.status(200).send(`Name: ${pokemon[0].name} <br/> Type: ${pokemon[0].name} <br/> ${pokemon[0].description} <a href=\"/\">Go back here!</a>`)
})

app.get("/pokemon/bulbasaur", (req, res) => {
    const name = 'bulbasaur';

    const pokemon = listPokemon().filter((pokemon) => pokemon.name.toLowerCase() === name.toLowerCase());

    if(pokemon.length == 0) {
        res.status(404).send("<h1>Page not found!</h1><br/><a href=\"/\">Go back here!</a>")
    }
    

    res.status(200).send(`Name: ${pokemon[0].name} <br/> Type: ${pokemon[0].name} <br/> ${pokemon[0].description} <a href=\"/\">Go back here!</a>`)
})

app.get("/pokemon/squirtle", (req, res) => {
    const name = 'squirtle';
 
    const pokemon = listPokemon().filter((pokemon) => pokemon.name.toLowerCase() === name.toLowerCase());

    if(pokemon.length == 0) {
        res.status(404).send("<h1>Page not found!</h1><br/><a href=\"/\">Go back here!</a>")
    }
    

    res.status(200).send(`Name: ${pokemon[0].name} <br/> Type: ${pokemon[0].name} <br/> ${pokemon[0].description} <a href=\"/\">Go back here!</a>`)
})

app.get("/add", (req, res) => {
    res.status(200).send(`
        <form action="/add" method="POST"/>
            <label for="name">Pokemon name:</label>
            <input type="name" id="name" name="name" required/>
            <label for="type">Pokemon type:</label>
            <input type="text" id="type" name="type" required/>
            <label for="description">Pokemon description:</label>
            <textarea id="description" name="description" required> </textarea>
            <button type="submit">Submit</button>
        </form>
        `)
})

app.post("/add", (req, res) => {
    const { name, type, description } = req.body
    if(!name || !type || !description) {
        res.status(400).send(`Bad request! Go back here <a href="/">Go back here</a>`);
        return;
    }
    addPokemon({name, type, description})

    res.status(201).send(`Succesfully added pokemon <br/> <a href="/add">Add again</a> <br/> <a href="/">View all added</a>`)
})

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000")
})