/*
1.
 Swórz serwer który dynamicznie będzie
 zmieniał wyświelane produkty - np.
 owoce/warzywa - odczytane z pliku json
 zależnie od parametru w linku.
 2.
 Stwórz prosty serwer z wykorzystaniem
 routingu, który będzie prostą stroną z
 poradnikiem (np. do konkretych postaci z
 wybranej gry lub z przepisami).
 3.
 Stwórz serwer, który będzie przyjmował
 użytkowników do rejestracji, ale tylko
 pełnoletnich. Pamiętaj o sprawdzeniu siły
 hasła i zapisaniu użytkowników do pliku json.
 4.
 Stwórz prosty serwer CMS, który będzie
 pobierać z pliku json dane do wyświetlania na
 stronie w zależności od podanego id w url’u
*/

const http = require('http')

const path = require("path");

const utils = require("./utils")

const filePath = path.join(__dirname, "../data/warzywa.json");

const vegetables = {}

console.log("Loading from: " +filePath)

utils.readFileToJson(filePath).forEach((value, index) => vegetables[value.name] = value)




function addRoute(method, path, handler) {


    const shouldContinue = false;

    return { shouldContinue }
}


const server = http.createServer((req, res) => {
    console.log(req.url)
    console.log()
    const { url, parameters: {
        name
    } } = utils.mapRouteToPattern(req.url, "/parameter")

    if (vegetables[name] === undefined) {
        res.writeHead(404, { 'Content-Type': 'text/html' })
        res.write("Not found");
        res.end()
        return;
    }

    const vegetable = vegetables[name]

    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.write(JSON.stringify(vegetable));



    res.end()
})

server.listen(3000)