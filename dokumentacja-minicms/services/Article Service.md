# `services/articleService`.js

Serwis odpowiedzialny za obsługę logiki artykułów w aplikacji:
pobieranie listy artykułów, wyszukiwanie pojedynczych wpisów,
tworzenie nowych artykułów oraz zapisywanie ich do warstwy danych
(modelu `storage`).

Wykorzystuje funkcje:
- [`readArticles`](../models/storage.md#readarticles)  
- [`writeArticles`](../models/storage.md#writearticles)

z modułu `models/storage`.

---

## `slugify(title)`

Generuje slug na podstawie podanego tytułu artykułu.

Funkcja jest synchroniczna – przekształca tytuł na małe litery, usuwa
znaki niedozwolone oraz zamienia spacje na myślniki.

- **Typ:** funkcja synchroniczna
- **Zwraca:** `string`  
  Wygenerowany slug.

### Parametry

- `title` (`string`) – tytuł artykułu, który jest przekształcany w slug.

---

## `getAllArticles()`

Zwraca listę wszystkich artykułów.

Korzysta z funkcji
[`readArticles`](../models/storage.md#readarticles)
do odczytu danych z warstwy przechowywania.

- **Typ:** funkcja asynchroniczna (`async`)
- **Zwraca:** `Promise<Array<Object>>`  
  Obietnica rozwiązująca się listą artykułów.

### Parametry

Brak.

---

## `getArticlesBySlug(slug)`

Szuka i zwraca artykuł o podanym slug.

Pobiera listę artykułów za pomocą
[`readArticles`](../models/storage.md#readarticles),
a następnie wyszukuje pierwszy artykuł, którego pole `slug` jest
równe przekazanemu argumentowi.

- **Typ:** funkcja asynchroniczna (`async`)
- **Zwraca:** `Promise<Object|undefined>`  
  Obietnica rozwiązująca się znalezionym artykułem lub `undefined`,
  jeśli artykuł o takim slug nie istnieje.

### Parametry

- `slug` (`string`) – slug artykułu, używany do wyszukania wpisu.

---

## `createArticle({ title, content, author })`

Tworzy nowy artykuł, generuje dla niego unikalny slug i zapisuje go.

Wykonuje następujące kroki:

1. Pobiera wszystkie artykuły za pomocą
   [`readArticles`](../models/storage.md#readarticles).
2. Generuje bazowy slug z użyciem
   [`slugify`](#slugifytitle).
3. Sprawdza, czy slug jest unikalny; jeśli nie, dodaje kolejne sufiksy
   (`-1`, `-2`, itd.), aż znajdzie wolny slug.
4. Tworzy obiekt nowego artykułu (z `id`, datą utworzenia itd.).
5. Umieszcza nowy artykuł na początku listy i zapisuje całą listę
   przy pomocy
   [`writeArticles`](../models/storage.md#writearticles).

- **Typ:** funkcja asynchroniczna (`async`)
- **Zwraca:** `Promise<Object>`  
  Obietnica rozwiązująca się nowo utworzonym artykułem.

### Parametry

- `params` (`Object`) – obiekt z danymi nowego artykułu:
  - `title` (`string`) – tytuł artykułu, używany również do wygenerowania slug.
  - `content` (`string`) – treść artykułu.
  - `author` (`string`, opcjonalne) – autor artykułu; jeśli nie podano,
    ustawiane jest `'Unknown'`.