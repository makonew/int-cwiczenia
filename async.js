/*

Napisz funkcję z
setTimeout, która
po 3 sekundach
wypisze „Hello
World!”.

Napisz kod, który
próbuje odczytać
właściwość name z
obiektu. Obsłuż to
błędem w try...catch.
Przeprowadź
walidację pozytywną i
negatywną.

03

Napisz funkcję
checkNumber(num,
callback), która
sprawdza, czy liczba
jest parzysta czy
nieparzysta i zwraca
wynik przez callback.
*/

/*

Napisz funkcję
randomTask(),
która zwraca
Promise. 50% szans
na wypisanie
sukcesu i 50%
szans na
niepowodzenie.
*/
async function WypiszHelloWorldPo3Sekundach() {
    const t = setTimeout(()=>{
        console.log("Hello, world")
        clearTimeout(t)
    }, 3000)
}

function hasName(object) {
    try {
        const x = object.name;
        if(x == null) throw new Error("object doesnt have field name")
        console.log(x)
    } catch (error) {
        console.log("Obiekt nie posiada pola 'name'")
    }
}

async function randomTask() {
    return Math.random()>0.5?"Powodzenie":"Niepowodzenie"
}

function checkNumber(num, callback) {
    callback(num%2 == 0);
}

checkNumber(5, alert)