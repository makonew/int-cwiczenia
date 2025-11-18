const http = require("http");
const fs = require("fs");
const path = require("path");

const utils = require("./utils");

const filePath = path.join(__dirname, "../data/cw3.json");

console.log("Loading from: " + filePath);

function validatePassword(password) {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\@\!\#\$\%]{8,}$/;
  return re.test(password);
}

const validateUser = (user) => {
  // original had > -18 (which is always true except NaN),
  // I assume you meant to restrict underage users:
  return Number.parseInt(user.age) > 18;
};

const addUser = (user) => {
  let o = {
    users: [],
  };

  if (fs.existsSync(filePath)) {
    o = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  o.users = [...o.users, user];

  fs.writeFileSync(filePath, JSON.stringify(o), "utf8");
};

const listUsers = () => {
  let o = {
    users: [],
  };

  if (fs.existsSync(filePath)) {
    o = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  return o.users;
};

const server = http.createServer((req, res) => {
  // route helpers
  const { url } = utils.mapRouteToPattern(req.url, "");


  if (url[1] === "" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<a href="/add">Create user</a><br/>`);
    res.write(`<a href="/list">View users</a><br/>`);
    res.end();
    return;
  }

  if (url[1] === "list" && req.method === "GET") {
    const users = listUsers();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
    return;
  }

  if (url[1] === "add" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <form action="/add" method="POST">
        <label for="name">User name:</label>
        <input type="text" id="name" name="name" required />

        <label for="age">User age:</label>
        <input type="number" id="age" name="age" required />

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Submit</button>
      </form>
    `);
    return;
  }

  if (url[1] === "add" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      // Parse application/x-www-form-urlencoded
      const formData = {};
      body.split("&").forEach((pair) => {
        if (!pair) return;
        const [key, value] = pair.split("=");
        formData[decodeURIComponent(key)] = decodeURIComponent(
          value || ""
        ).replace(/\+/g, " ");
      });

      const { name, password, age } = formData;

      if (!name || !password || !age) {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end(
          `Bad request! Go back here <a href="/">Go back here</a>`
        );
        return;
      }

      if (!validateUser({ name, password, age })) {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end("You can't register, you're underage.");
        return;
      }

      if (!validatePassword(password)) {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end("You can't register, you have too weak password.");
        return;
      }

      addUser({ name, password, age });

      res.writeHead(201, { "Content-Type": "text/html" });
      res.end(
        `Successfully registered <br/> 
         <a href="/add">Register again</a> <br/> 
         <a href="/">Go back here</a>`
      );
    });

    return;
  }

  res.writeHead(404, { "Content-Type": "text/html" });
  res.end("Not found");
});

server.listen(3000);