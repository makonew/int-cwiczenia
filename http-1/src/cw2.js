const http = require('http')

const path = require("path");

const utils = require("./utils")

const filePath = path.join(__dirname, "../data/cw2.json");

const pokemon = {}

console.log("Loading from: " + filePath)

utils.readFileToJson(filePath).forEach((value, index) => pokemon[value.name.toLowerCase()] = value)



const server = http.createServer((req, res) => {
    const { url: {
        pokemon: pokemon_name
    } } = utils.mapRouteToPattern(req.url, "/pokemon")

    if (!pokemon_name) {
        res.writeHead(200, { 'Content-Type': 'text/html' })

        res.write("<h1>Pokemon in database</h1>")
        for(let key in pokemon) {
            res.write(`<a href=${key.toLowerCase()}>${pokemon[key].name}</a>`)
            res.write("<br/>")
        }

        res.end()
        return;
    }

    if (pokemon[(pokemon_name).toLowerCase()] === undefined) {
        res.writeHead(404, { 'Content-Type': 'text/html' })
        res.write("Not found");
        res.end()
        return;
    }

    const found_pokemon = pokemon[pokemon_name]

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(
        `Name: ${found_pokemon.name} <br/> Type: ${found_pokemon.type} <br/> ${found_pokemon.description} <a href=\"/\">Go back here!</a>`
    );



    res.end()
})

server.listen(3000)