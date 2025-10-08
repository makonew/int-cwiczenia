class KontoBankowe {
	#saldo = 0;
  	getSaldo() {
  	  return this.#saldo;
  	}

  	deposit(amount) {
  	  if (amount > 0) {
 	     this.#saldo += amount;
 	   }
  	}

  	withdraw(amount) {
  	  if (amount > 0 && amount <= this.#saldo) {
  	    this.#saldo -= amount;
    	}
  }

}

class StaticMethods {
	static WalnijFikolka(param1, param2)
	{
		if(param2 === undefined)
		{
			console.log(`Nazywam się ${param1} ${param2}`);
			return;
		}
		console.log(`Mam na imię ${param1}`);
	}
}

class Osoba {
  Powitaj() {
    console.log("Witaj!")
  }
}


class Uczen extends Osoba{
   #listaocen = [5]
  calculateSrednia() {
    let sum = 0;
    this.#listaocen.map((val) => sum += val)
    return sum / this.#listaocen.length
  }
}

const u = new Uczen()
u.Powitaj();
console.log(u.calculateSrednia())

class KalkulatorProsty {
  static Dodaj(a,b) {
    return a+b
  }
  static Odejmij(a,b){
    return KalkulatorProsty.Dodaj(a, -b)
  }
  static Podziel(a,b){
    return a / b;
  }
  static Pomnoz(a,b) {
    return a*b
  }
}

console.log(KalkulatorProsty.Pomnoz(10, 5))

class SrodekTransportu {
    constructor(){
        if(this.constructor === "SrodekTransportu") {
            throw new Error("Klasa jest abstrakcyjna");
        }
    }

    PrzemiescSie() {1}
}


//Samolot, Auto, Lodz.

class Samolot extends SrodekTransportu{
    PrzemiescSie() {
        console.log("Samolot Leci")
    }
}

class Auto extends SrodekTransportu{
    PrzemiescSie() {
        console.log("Auto Jedzie")
    }
}

class Lodz extends SrodekTransportu{
    PrzemiescSie() {
        console.log("Lodz płynie")
    }
}

class Psowate {
    dajGlos() {}
}

class Szczeniak extends Psowate {
    dajGlos() {
        console.log("Szczeniak szczeka")
    }
}


class Pies extends Psowate {
    dajGlos() {
        console.log("Pies szczeka")
    }
}


class Wilk extends Psowate {
    dajGlos() {
        console.log("Wilk wyje ")
    }
}

/*

Stwórz klasę abstrakcyjną artysta, która zawiera
metody: tworzDzielo() oraz kontempluj().
Następnie utwórz klasy rzeźbiarz, malarz,
pisarz.

*/

class Artysta {
    constructor(){
        if(this.constructor === "SrodekTransportu") {
            throw new Error("Klasa jest abstrakcyjna");
        }
    }

    tworzDzielo() {}
    kontempluj() {}
}


class Rzezbiarz extends Artysta {
    
    tworzDzielo() {
        /*
            Implementacja tworzenia dzieła
        */
    }
    kontempluj() {
        /*
            Implementacja Kontenmplacji
        */
    }
}

class Malarz extends Artysta {
    
    tworzDzielo() {
        /*
            Implementacja tworzenia dzieła
        */
    }
    kontempluj() {
        /*
            Implementacja Kontenmplacji
        */
    }
}

class Pisarz extends Artysta {
    
    tworzDzielo() {
        /*
            Implementacja tworzenia dzieła
        */
    }
    kontempluj() {
        /*
            Implementacja Kontenmplacji
        */
    }
}


function validatePassword(password) {
     const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(password);
}

const uzytkownicy = []

class Uzytkownik {
    constructor(password) {
        if(validatePassword(password))
        {
            uzytkownicy.push(this)
            alert("Udało się dodać użytkownika!")
            return
        }
        alert("Nie udało się dodać użytkownika! Za słabe hasło!")
    }
}

document.querySelector('#uzytkownicy_form').addEventListener('submit', (ev) => {
    ev.preventDefault()
    new Uzytkownik(document.querySelector('#password').value)
})