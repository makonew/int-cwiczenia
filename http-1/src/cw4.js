const http = require("http");
const fs = require("fs");
const path = require("path");

const utils = require("./utils");

const filePath = path.join(__dirname, "../data/cw2.json");

console.log("Loading from: " + filePath);

const addPokemon = (pokemon) => {
  let o = {
    pokemon: [],
  };

  if (fs.existsSync(filePath)) {
    o = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  o = [...o, pokemon];

  fs.writeFileSync(filePath, JSON.stringify(o), "utf8");
};

const listPokemon = () => {
  let o = {
    pokemon: [],
  };

  if (fs.existsSync(filePath)) {
    o = {pokemon: JSON.parse(fs.readFileSync(filePath, "utf8"))}
    
  }
  return o.pokemon;
};

const server = http.createServer((req, res) => {
  const { url } = utils.mapRouteToPattern(req.url, "/1/:name");


  if (url['1'] === "" && req.method === "GET") {
    const pokemon = listPokemon();

    res.writeHead(200, { "Content-Type": "text/html" });

    let response = "";
    for (const p of pokemon) {
      response += `<a href="/pokemon/${encodeURIComponent(
        p.name
      )}">${p.name}</a> <br/>`;
    }
    response += '<a href="/add"> Add new pokemon </a>';

    res.end(response);
    return;
  }

  if (url['1'] === "list" && req.method === "GET") {
    const pokemon = listPokemon();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(pokemon));
    return;
  }

  if (url['1'] === "pokemon" && req.method === "GET") {
    const pokemonName = url[":name"];

    const pokemon = listPokemon().filter(
      (p) => p.name === pokemonName
    );

    if (pokemon.length === 0) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(
        '<h1>Page not found!</h1><br/><a href="/">Go back here!</a>'
      );
      return;
    }

    const p = pokemon[0];

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(
      `Name: ${p.name} <br/> Type: ${p.type} <br/> ${p.description} <a href="/">Go back here!</a>`
    );
    return;
  }

  if (url['1'] === "add" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <form action="/add" method="POST">
        <label for="name">Pokemon name:</label>
        <input type="text" id="name" name="name" required />
        
        <label for="type">Pokemon type:</label>
        <input type="text" id="type" name="type" required />
        
        <label for="description">Pokemon description:</label>
        <textarea id="description" name="description" required></textarea>
        
        <button type="submit">Submit</button>
      </form>
    `);
    return;
  }

  if (url['1'] === "add" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const formData = {};
      body.split("&").forEach((pair) => {
        if (!pair) return;
        const [key, value] = pair.split("=");
        formData[decodeURIComponent(key)] = decodeURIComponent(
          value || ""
        ).replace(/\+/g, " ");
      });

      const { name, type, description } = formData;

      if (!name || !type || !description) {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end(
          'Bad request! Go back here <a href="/">Go back here</a>'
        );
        return;
      }

      addPokemon({ name, type, description });

      res.writeHead(201, { "Content-Type": "text/html" });
      res.end(
        `Succesfully added pokemon <br/> 
         <a href="/add">Add again</a> <br/> 
         <a href="/">View all added</a>`
      );
    });

    return;
  }

  res.writeHead(404, { "Content-Type": "text/html" });
  res.end("Not found");
});

server.listen(3000);