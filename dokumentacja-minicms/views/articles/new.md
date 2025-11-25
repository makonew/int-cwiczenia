# `views/articles/new.ejs`

Widok odpowiedzialny za wyświetlanie formularza tworzenia nowego artykułu.

Szablon:

- renderuje tytuł strony na podstawie zmiennej `Title`,
- wyświetla nagłówek „Dodaj nowy artykuł”,
- prezentuje listę błędów walidacji (jeśli wystąpiły),
- udostępnia formularz dodawania artykułu z polami:
  tytuł, autor, treść,
- dołącza wspólne części layoutu: nagłówek i stopkę.

---

## Dane wejściowe widoku

### Zmienne

- `Title` (`string`) – tytuł strony, wyświetlany w elemencie `<title>`.
- `errors` (`Array<string> | null`) – lista komunikatów błędów walidacji;
  jeśli `null` lub pusta, sekcja błędów nie jest wyświetlana.
- `values` (`Object`) – wartości pól formularza (np. po błędnej walidacji):
  - `values.title` (`string`) – wstępnie wypełniony tytuł artykułu.
  - `values.author` (`string`) – wstępnie wypełniony autor artykułu.
  - `values.content` (`string`) – wstępnie wypełniona treść artykułu.

---

## Struktura widoku

- Dołącza arkusz stylów: `/stylesheets/main.css`.
- Dołącza części wspólne layoutu:
  - `../partials/header`
  - `../partials/footer`
- W elemencie `<main>`:
  - Wyświetla nagłówek: `Dodaj nowy artykuł`.
  - Jeśli `errors && errors.length > 0`:
    - Renderuje `<div class="errors">` z listą (`<ul>`) komunikatów błędów.
  - Renderuje formularz:
    - `action="/articles"`, `method="POST"`.
    - Pole tekstowe `title` (tytuł):
      - `value="<%= values.title %>"`.
    - Pole tekstowe `author` (autor):
      - `value="<%= values.author %>"`.
    - Pole `textarea` `content` (treść):
      - zawiera `values.content`.
    - Przycisk `submit` z etykietą „Dodaj artykuł”.

---

## Przykładowe wywołanie w kontrolerze

```js
res.render('articles/new', {
  Title: 'Dodaj nowy artykuł',
  value: {
	  title: "Tytuł artykułu",
	  author: "Autor artykułu",
	  content: "Treść artykułu"
  },
});
```