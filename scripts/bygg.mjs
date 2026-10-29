// Bygger plan.json: dagsplan, inköpslistor per vecka och skafferiplan.
// Körs med: node scripts/bygg.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { K, KATEGORIER, DAG, NOAH_VIKT, FRUKOST, MELLIS, RECEPT, HUVUD, SOLO, OVERRIDE } from '../data/modell.mjs';

const rot = join(dirname(fileURLToPath(import.meta.url)), '..');
const dagar = JSON.parse(readFileSync(join(rot, 'data', 'noah-dagar.json'), 'utf8'));
const VECKODAG = ['sön', 'mån', 'tis', 'ons', 'tors', 'fre', 'lör'];
const MANAD = ['jan', 'feb', 'mars', 'apr', 'maj', 'juni', 'juli', 'aug', 'sep', 'okt', 'nov', 'dec'];
const EPS = 1e-9;

const dagNamn = (iso) => { const d = new Date(iso + 'T12:00:00'); return `${VECKODAG[d.getDay()]} ${d.getDate()} ${MANAD[d.getMonth()]}`; };
const isoVecka = (iso) => {
  const d = new Date(iso + 'T12:00:00');
  const dag = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - dag + 3);
  const jan4 = new Date(d.getFullYear(), 0, 4, 12);
  return 1 + Math.round(((d - jan4) / 86400000 - 3 + ((jan4.getDay() + 6) % 7)) / 7);
};
const lagg = (need, key, q) => { if (!K[key]) throw new Error('Okänd vara: ' + key); need[key] = (need[key] || 0) + q; };

function fmt(k, n) {
  const tot = n * k.p;
  if (k.pt) return `${n} ${n === 1 ? k.pt[0] : k.pt[1]}`;
  if (k.e === 'g') return tot >= 1000 ? `${tot / 1000} kg`.replace('.', ',') : `${tot} g`;
  if (k.e === 'dl') return tot >= 10 ? `${tot / 10} l`.replace('.', ',') : `${tot} dl`;
  return `${tot} ${k.e}`;
}
function fmtMangd(k, q) {
  if (k.e === 'g') return q >= 1000 ? `${Math.round(q / 100) / 10} kg`.replace('.', ',') : `${Math.round(q)} g`;
  if (k.e === 'dl') return `${Math.round(q * 10) / 10} dl`.replace('.', ',');
  return `${Math.round(q * 10) / 10} ${k.e}`.replace('.', ',');
}

const NV = 7;
// Varor för en särskild dag (extra personer, extra ingredienser, recept).
function ovVaror(need, ov) {
  Object.entries(DAG).forEach(([key, q]) => lagg(need, key, q * (ov.extraPersoner || 0)));
  (ov.ingr || []).forEach(([key, q]) => lagg(need, key, q));
  if (ov.recept) RECEPT[ov.recept].ingr.forEach(([key, q]) => lagg(need, key, q));
}
const tidigare = Object.entries(OVERRIDE).filter(([, ov]) => ov.kopTidigare).map(([datum, ov]) => {
  const idx = dagar.findIndex((d) => d.datum === datum);
  if (idx % NV !== 0) throw new Error('kopTidigare gäller bara första dagen i en vecka: ' + datum);
  return { vecka: idx / NV - 1, ov };
});
const veckor = [];
const stock = {};
Object.keys(K).forEach((k) => { stock[k] = K[k].start || 0; });
const kopt = {};
let huvudIdx = 0, soloIdx = 0, restFran = null;

for (let w = 0; w * NV < dagar.length; w++) {
  const slice = dagar.slice(w * NV, w * NV + NV);
  const need = {};
  const dagKort = [];
  tidigare.filter((t) => t.vecka === w).forEach((t) => ovVaror(need, t.ov));

  slice.forEach((d, j) => {
    const i = w * NV + j;
    const noah = d.hos === 'Pappa';
    const nasta = dagar[i + 1];
    const nastaNoah = nasta ? nasta.hos === 'Pappa' : true;
    const ov = OVERRIDE[d.datum];
    const pd = 1 + (noah ? NOAH_VIKT : 0) + (ov && !ov.kopTidigare ? ov.extraPersoner || 0 : 0);
    Object.entries(DAG).forEach(([key, q]) => lagg(need, key, q * pd));

    let middag;
    if (ov) {
      if (ov.middag) middag = ov.middag;
      if (!ov.kopTidigare) ovVaror(need, { ingr: ov.ingr, recept: ov.recept });
    }
    if (middag) { restFran = null; }
    else if (noah) {
      const id = HUVUD[huvudIdx++ % HUVUD.length];
      const r = RECEPT[id];
      const extra = !nastaNoah && nasta && r.rester !== false;
      const f = extra ? 1.5 : 1;
      r.ingr.forEach(([key, q]) => lagg(need, key, q * f));
      middag = { typ: 'recept', recept: id, namn: r.namn, port: extra ? '3 portioner (en blir rester)' : '2 portioner' };
      restFran = extra ? id : null;
    } else if (restFran) {
      middag = { typ: 'rester', recept: restFran, namn: 'Rester: ' + RECEPT[restFran].namn, port: '1 portion' };
      restFran = null;
    } else {
      const id = SOLO[soloIdx++ % SOLO.length];
      const r = RECEPT[id];
      r.ingr.forEach(([key, q]) => lagg(need, key, q * 0.5));
      middag = { typ: 'solo', recept: id, namn: r.namn, port: '1 portion (halva receptet)' };
    }

    const dow = new Date(d.datum + 'T12:00:00').getDay();
    let extra = ov && ov.extra ? ov.extra : null;
    if (dow === 6) {
      if (noah) {
        lagg(need, 'godis', 150); lagg(need, 'popcorn', 80);
        extra = 'Lördagsgodis (lösgodis ca 150 g att dela) och popcorn';
      } else {
        lagg(need, 'choklad', 100); lagg(need, 'popcorn', 80); lagg(need, 'chips', 1); lagg(need, 'yoghurt', 150);
        extra = 'Lördagssnacks för dig: mörk choklad, popcorn och chips med yoghurtdipp';
      }
    }
    dagKort.push({
      datum: d.datum, dag: dagNamn(d.datum), noah,
      med: ov && ov.med ? ov.med : null, lunch: ov && ov.lunch ? ov.lunch : null,
      frukost: ov && ov.frukost ? ov.frukost : FRUKOST[i % FRUKOST.length], mellis: MELLIS[i % MELLIS.length], middag, extra
    });
  });

  // Köp: lagervaror köps bara när skafferiet inte räcker, färskvaror alltid efter behov.
  const rader = {};
  const hemma = [];
  Object.keys(need).forEach((key) => {
    const k = K[key], q = need[key];
    let n;
    if (k.lagra) {
      if (stock[key] + EPS >= q) { stock[key] -= q; n = 0; hemma.push({ namn: k.n, text: `räcker (kvar ca ${fmtMangd(k, stock[key])})` }); }
      else { n = Math.ceil((q - stock[key]) / k.p - EPS); stock[key] += n * k.p - q; }
    } else { n = Math.ceil(q / k.p - EPS); }
    if (n > 0) {
      (rader[k.k] ||= []).push({ key, namn: k.n, qty: fmt(k, n), anm: k.anm || '' });
      if (k.lagra) (kopt[key] ||= []).push({ vecka: w + 1, qty: fmt(k, n) });
    }
  });
  const lista = KATEGORIER.filter((c) => rader[c]).map((c) => ({ kat: c, rader: rader[c].sort((a, b) => a.namn.localeCompare(b.namn, 'sv')) }));
  veckor.push({
    vecka: w + 1, veckonr: (() => { const a = isoVecka(slice[0].datum), c = isoVecka(slice[slice.length - 1].datum); return a === c ? `${a}` : `${a}–${c}`; })(), fran: slice[0].datum, till: slice[slice.length - 1].datum,
    rubrik: `${dagNamn(slice[0].datum)} till ${dagNamn(slice[slice.length - 1].datum)}`,
    noahDagar: slice.filter((d) => d.hos === 'Pappa').length, dagar: dagKort, lista, hemma
  });
}

const skafferi = Object.keys(K).filter((key) => K[key].lagra).map((key) => ({
  namn: K[key].n, kat: K[key].k,
  start: K[key].start ? fmtMangd(K[key], K[key].start) : 'inget',
  kop: (kopt[key] || []).map((x) => `v${x.vecka}: ${x.qty}`).join(', ') || 'behöver inte köpas',
  anm: K[key].anm || ''
})).sort((a, b) => a.kat.localeCompare(b.kat, 'sv') || a.namn.localeCompare(b.namn, 'sv'));

const recept = Object.entries(RECEPT).map(([id, r]) => ({
  id, namn: r.namn, tid: r.tid, fisk: !!r.fisk, tips: r.tips || '',
  ingr: r.ingr.map(([key, q]) => ({ namn: K[key].n, mangd: fmtMangd(K[key], q) })), steg: r.steg
}));

writeFileSync(join(rot, 'plan.json'), JSON.stringify({ byggd: new Date().toISOString().slice(0, 10), veckor, skafferi, recept }, null, 1));
console.log(`plan.json: ${veckor.length} veckor, ${recept.length} recept, ${skafferi.length} lagervaror`);
