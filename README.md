# Veckomat

En vecka i taget: inköpslista att bocka av, dag för dag och recept. Statisk sida på GitHub Pages.

- `vecka.json` är den aktuella veckan (inköpslista och dagsplan).
- `recept.json` är receptbiblioteket (alla recept gäller 2 portioner).
- `arkiv/` har tidigare veckor. Bockarna sparas i webbläsaren per vecka (`id` i `vecka.json`).

## Ny vecka

1. Flytta `vecka.json` till `arkiv/<id>.json`.
2. Skriv en ny `vecka.json` med nytt `id` (startdatum), dagarna och inköpslistan.
3. Nya recept läggs i `recept.json`.
4. Committa och pusha.

## Testa lokalt

Öppna inte `index.html` via `file:///`, för `fetch` blockeras då. Starta en lokal server i mappen, till exempel `npx serve`.
