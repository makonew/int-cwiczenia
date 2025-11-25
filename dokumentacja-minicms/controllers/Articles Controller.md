# `controllers/articlesController.js`

Kontroler odpowiedzialny za obsługę tras związanych z artykułami:
lista artykułów, wyświetlanie pojedynczego artykułu, tworzenie nowego
artykułu oraz wyświetlanie formularza tworzenia.

---

## `index(req, res)`

Akcja kontrolera wyświetlająca listę wszystkich artykułów.

Korzysta z funkcji
[`getAllArticles`](services/Article%20Service.md#getAllArticles)

z serwisu artykułów do pobrania danych, a następnie renderuje widok
listy.

- **Typ:** funkcja asynchroniczna (`async`)
- **Zwraca:** `Promise<void>`  
  Obietnica rozwiązująca się po wyrenderowaniu widoku.

### Parametry

- `req` (`Object`) – obiekt żądania Express.
- `res` (`Object`) – obiekt odpowiedzi Express.

---

## `show(req, res)`

Akcja kontrolera wyświetlająca pojedynczy artykuł na podstawie slug.

Korzysta z funkcji
[`getArticlesBySlug`](../services/Article%20Service.md#getarticlesbyslugslug)
z serwisu artykułów, aby odnaleźć artykuł o podanym slug. Jeśli artykuł
nie zostanie znaleziony, renderuje stronę błędu 404; w przeciwnym
przypadku renderuje widok pojedynczego artykułu.

- **Typ:** funkcja asynchroniczna (`async`)
- **Zwraca:** `Promise<void>`  
  Obietnica rozwiązująca się po wyrenderowaniu widoku lub strony błędu 404.

### Parametry

- `req` (`Object`) – obiekt żądania Express (zawiera m.in. `params.slug`).
- `res` (`Object`) – obiekt odpowiedzi Express.

---

## `create(req, res)`

Akcja kontrolera obsługująca utworzenie nowego artykułu.

Waliduje dane wejściowe, a w przypadku błędów ponownie wyświetla formularz
wraz z komunikatami. Przy poprawnych danych tworzy artykuł, wywołując
funkcję
[`createArticle`](../services/Article%20Service.md#createarticle-title-content-author)
z serwisu artykułów, a następnie przekierowuje na stronę nowego artykułu.

- **Typ:** funkcja asynchroniczna (`async`)
- **Zwraca:** `Promise<void>`  
  Obietnica rozwiązująca się po zakończeniu obsługi żądania (render lub
  przekierowanie).

### Parametry

- `req` (`Object`) – obiekt żądania Express (zawiera dane formularza w `body`).
- `res` (`Object`) – obiekt odpowiedzi Express.

---

## `newForm(req, res)`

Akcja kontrolera wyświetlająca formularz tworzenia nowego artykułu.

Renderuje widok formularza, przekazując domyślne wartości pól oraz brak
błędów walidacji.

- **Typ:** funkcja asynchroniczna (`async`)
- **Zwraca:** `Promise<void>`  
  Obietnica rozwiązująca się po wyrenderowaniu widoku.

### Parametry

- `req` (`Object`) – obiekt żądania Express.
- `res` (`Object`) – obiekt odpowiedzi Express.