# Veckomat

Femveckors matplan med inköpslista för en vuxen och en treåring: frukost, mellanmål, middag och lördagsgodis.
Sidan är statisk och publiceras på GitHub Pages.

- Noahs dagar hämtas ur `data/noah-dagar.json` (kopia av `schema-noah`, bara datum och vem han är hos).
- Receptet och varukatalogen ligger i `data/modell.mjs`.
- `node scripts/bygg.mjs` räknar ihop `plan.json` (dagsplan, inköpslistor per vecka och skafferiplan).
- Basvaror och frysvaror (`lagra: true`) köps bara när det uppskattade lagret inte räcker, så inga dubletter.
- Bockarna på sidan sparas i webbläsaren (localStorage).

## Uppdatera

1. Ändra `data/modell.mjs` eller `data/noah-dagar.json`.
2. Kör `node scripts/bygg.mjs`.
3. Committa och pusha `plan.json` tillsammans med ändringen.

## Testa lokalt

Öppna inte `index.html` via `file:///`, för `fetch` blockeras då. Starta en lokal server i mappen, till exempel `npx serve`.
