# `views/articles/list.ejs`

Widok odpowiedzialny za wyświetlanie listy artykułów.

Szablon:

- renderuje tytuł strony na podstawie zmiennej `Title`,
- wyświetla nagłówek „Lista artykułów”,
- prezentuje listę artykułów jako linki prowadzące do pojedynczych wpisów,
- w przypadku braku artykułów wyświetla komunikat,
- dołącza wspólne części layoutu: nagłówek i stopkę.

---

## Dane wejściowe widoku

### Zmienne

- `Title` (`string`) – tytuł strony, wyświetlany w elemencie `<title>`.
- `articles` (`Array<Object>`) – lista artykułów do wyświetlenia:
  - `article.slug` (`string`) – slug artykułu używany w adresie URL.
  - `article.title` (`string`) – tytuł artykułu wyświetlany jako tekst linku.

---

## Struktura widoku

- Dołącza arkusz stylów: `/stylesheets/main.css`.
- Dołącza części wspólne layoutu:
  - `../partials/header`
  - `../partials/footer`
- W elemencie `<main>`:
  - Wyświetla nagłówek: `Lista artykułów`.
  - Renderuje listę (`<ul>`):
    - Jeśli `articles.length === 0` – pojedynczy `<li>` z tekstem:
      „Brak artykułów do wyświetlenia.”
    - W przeciwnym razie – dla każdego artykułu:
      - `<li>` z linkiem `<a href="/articles/<slug>">` zawierającym tytuł artykułu.

---

## Przykładowe wywołanie w kontrolerze

```js
res.render('articles/list', {
  Title: 'Artykuły',
  articles,
});
```