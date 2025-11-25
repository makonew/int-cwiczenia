# `models/storage.js`

Model odpowiedzialny za obsługę logiki przechowywania danych w aplikacji.

---

## `readArticles()`

Odczytuje listę artykułów z pliku JSON.

- **Typ:** funkcja asynchroniczna (`async`)
- **Zwraca:** `Promise<Array<Object>>`  
  Lista artykułów.

### Parametry

Brak.

---

## `writeArticles(articles)`

Zapisuje listę artykułów do pliku JSON.

- **Typ:** funkcja asynchroniczna (`async`)
- **Zwraca:** `Promise<void>`  
  Brak zwracanej wartości.

### Parametry

- `articles` (`Array<Object>`) – lista artykułów do zapisania.