// Varukatalog, recept och förbrukning. bygg.mjs räknar ihop inköpslistorna ur detta.
// Enheter: g, ml, dl, st, klyfta, skivor, förp, burk.
// p = förpackningsstorlek, lagra = håller flera veckor (köps bara när skafferiet inte räcker),
// start = uppskattat lager efter veckan som slutar tis 3 nov.

const F = 'Frukt & grönt', M = 'Kött & fisk', D = 'Mejeri & ägg', S = 'Skafferi', B = 'Bröd', Fr = 'Fryst', G = 'Godis & snacks';

export const KATEGORIER = [F, M, D, S, B, Fr, G, 'Ostbricka (fredag)', 'Dryck', 'Köps på ICA'];

export const K = {
  banan: { n: 'Bananer', k: F, e: 'st', p: 6, pt: ['klase', 'klasar'] },
  apple: { n: 'Äpplen', k: F, e: 'st', p: 6 },
  paron: { n: 'Päron', k: F, e: 'st', p: 4 },
  gurka: { n: 'Gurka', k: F, e: 'st', p: 1 },
  tomat: { n: 'Tomater', k: F, e: 'g', p: 500 },
  paprika: { n: 'Paprika', k: F, e: 'st', p: 1 },
  broccoli: { n: 'Broccoli', k: F, e: 'st', p: 1 },
  morot: { n: 'Morötter', k: F, e: 'g', p: 1000, lagra: true },
  zucchini: { n: 'Zucchini', k: F, e: 'st', p: 1 },
  lok: { n: 'Gul lök', k: F, e: 'g', p: 1000, lagra: true },
  vitlok: { n: 'Vitlök', k: F, e: 'klyfta', p: 10, pt: ['huvud', 'huvuden'], lagra: true, start: 8 },
  sallad: { n: 'Sallad', k: F, e: 'st', p: 1 },
  avokado: { n: 'Avokado', k: F, e: 'st', p: 2 },
  spenat: { n: 'Babyspenat', k: F, e: 'g', p: 120, pt: ['påse', 'påsar'] },
  citron: { n: 'Citron', k: F, e: 'st', p: 1 },
  potatis: { n: 'Potatis', k: F, e: 'g', p: 1500, lagra: true },
  vindruvor: { n: 'Vindruvor', k: F, e: 'g', p: 300, anm: 'Till ostbrickan. Dela på längden åt Noah.' },
  sotpotatis: { n: 'Sötpotatis', k: F, e: 'g', p: 800 },

  kyckling: { n: 'Kycklingfilé', k: M, e: 'g', p: 600 },
  kycklinglar: { n: 'Kycklinglårfilé', k: M, e: 'g', p: 700 },
  notfars: { n: 'Nötfärs', k: M, e: 'g', p: 500, lagra: true, anm: 'Frys det du inte använder inom 2 dagar.' },
  lax: { n: 'Laxfilé', k: M, e: 'g', p: 500 },
  kalkon: { n: 'Kalkonpålägg', k: M, e: 'g', p: 120, pt: ['förp', 'förp'] },

  mjolk: { n: 'Mjölk', k: D, e: 'dl', p: 20, pt: ['paket (2 l)', 'paket (2 l)'] },
  yoghurt: { n: 'Turkisk yoghurt', k: D, e: 'g', p: 1000, pt: ['burk (1 kg)', 'burkar (1 kg)'] },
  kvarg: { n: 'Mild kvarg', k: D, e: 'g', p: 500 },
  keso: { n: 'Keso', k: D, e: 'g', p: 500 },
  hummus: { n: 'Hummus', k: D, e: 'g', p: 200 },
  agg: { n: 'Ägg', k: D, e: 'st', p: 12, pt: ['förp (12 st)', 'förp (12 st)'], lagra: true },
  smor: { n: 'Smör', k: D, e: 'g', p: 500, lagra: true },
  ost: { n: 'Ostbit till mackor', k: D, e: 'g', p: 400, lagra: true },
  rivost: { n: 'Riven ost', k: D, e: 'g', p: 200, lagra: true },
  cf: { n: 'Crème fraiche', k: D, e: 'g', p: 200 },

  havregryn: { n: 'Havregryn', k: S, e: 'g', p: 1000, lagra: true, start: 900 },
  ris: { n: 'Ris', k: S, e: 'g', p: 1000, lagra: true, start: 1200 },
  pasta: { n: 'Fullkornspasta', k: S, e: 'g', p: 500, lagra: true },
  krossade: { n: 'Krossade tomater', k: S, e: 'g', p: 400, pt: ['förp', 'förp'] },
  kidney: { n: 'Kidneybönor', k: S, e: 'burk', p: 1, pt: ['burk', 'burkar'] },
  kikarter: { n: 'Kikärtor', k: S, e: 'burk', p: 1, pt: ['burk', 'burkar'] },
  linser: { n: 'Röda linser', k: S, e: 'g', p: 500, lagra: true },
  majs: { n: 'Majs', k: S, e: 'burk', p: 1, pt: ['burk', 'burkar'] },
  kokos: { n: 'Kokosmjölk', k: S, e: 'ml', p: 400, pt: ['burk', 'burkar'] },
  curry: { n: 'Mild currypulver', k: S, e: 'burk', p: 1, lagra: true },
  tacokrydda: { n: 'Mild tacokrydda', k: S, e: 'förp', p: 1, lagra: true },
  tacosas: { n: 'Tacosås', k: S, e: 'burk', p: 1, pt: ['burk', 'burkar'], lagra: true },
  soja: { n: 'Salt-reducerad soja', k: S, e: 'ml', p: 250, pt: ['flaska', 'flaskor'], lagra: true },
  honung: { n: 'Honung', k: S, e: 'g', p: 350, pt: ['burk', 'burkar'], lagra: true },
  jnsmor: { n: 'Jordnötssmör', k: S, e: 'g', p: 340, pt: ['burk', 'burkar'], lagra: true },
  musli: { n: 'Osockrad müsli', k: S, e: 'g', p: 500, lagra: true },
  knacke: { n: 'Knäckebröd', k: S, e: 'g', p: 250, pt: ['förp', 'förp'], lagra: true },
  tortilla: { n: 'Tortillabröd', k: S, e: 'st', p: 8, pt: ['förp (8 st)', 'förp (8 st)'], lagra: true, start: 8 },
  mjol: { n: 'Vetemjöl', k: S, e: 'g', p: 1000, lagra: true },
  torrjast: { n: 'Torrjäst', k: S, e: 'förp', p: 1, lagra: true },
  fruktpure: { n: 'Fruktpuré eller mjuka bär till Noah', k: S, e: 'förp', p: 1 },
  ostar: { n: 'Ost (2–3 sorter)', k: 'Ostbricka (fredag)', e: 'g', p: 400, anm: 'T.ex. brie, lagrad ost, blåmögelost.' },
  kex: { n: 'Kex eller knäckebröd', k: 'Ostbricka (fredag)', e: 'förp', p: 1 },
  sylt: { n: 'Fikonmarmelad eller annan sylt', k: 'Ostbricka (fredag)', e: 'burk', p: 1, pt: ['burk', 'burkar'] },
  oliver: { n: 'Oliver eller cornichons', k: 'Ostbricka (fredag)', e: 'burk', p: 1, pt: ['burk', 'burkar'], anm: 'Valfritt' },
  popcorn: { n: 'Popcornmajs', k: S, e: 'g', p: 500, lagra: true },

  brod: { n: 'Fullkornsbröd', k: B, e: 'skivor', p: 20, pt: ['limpa', 'limpor'] },

  bar: { n: 'Frysta bär', k: Fr, e: 'g', p: 500, lagra: true },
  arter: { n: 'Frysta ärtor', k: Fr, e: 'g', p: 500, lagra: true },
  torsk: { n: 'Torskfilé, fryst', k: Fr, e: 'g', p: 500 },

  godis: { n: 'Lösgodis', k: G, e: 'g', p: 150, anm: 'Lördagsgodis. Ta bara det som ska ätas samma dag.' },
  choklad: { n: 'Mörk choklad 70 %', k: G, e: 'g', p: 100, pt: ['kaka', 'kakor'] },
  dippmix: { n: 'Dippmix (t.ex. gräddfil/lök)', k: G, e: 'förp', p: 1 },
  dryck: { n: 'Läsk, öl eller mineralvatten (valfritt)', k: 'Dryck', e: 'förp', p: 1, anm: 'Till spelkvällen med Dennis.' },
  princess: { n: 'Princesstårta', k: 'Köps på ICA', e: 'st', p: 1, anm: 'Köps på ICA. Hämta tis 10 nov eller på morgonen den 11:e. Beställ i förväg om de kräver det.' },
  tartljus: { n: 'Tårtljus', k: G, e: 'förp', p: 1 },
  chips: { n: 'Chips', k: G, e: 'förp', p: 1 }
};

// Förbrukning per person och dag (frukost + mellanmål). Noah räknas som 0,6.
export const NOAH_VIKT = 0.6;
export const DAG = {
  banan: 0.5, apple: 0.4, paron: 0.3, yoghurt: 120, musli: 25, bar: 50, havregryn: 30,
  mjolk: 2.5, agg: 0.7, brod: 2, ost: 25, kalkon: 20, gurka: 0.3, morot: 60, hummus: 40,
  keso: 60, honung: 5, smor: 10, knacke: 20, kvarg: 30
};

export const FRUKOST = [
  'Havregrynsgröt med banan och bär',
  'Turkisk yoghurt med müsli och bär',
  'Smörgås med ost, gurka och ägg',
  'Äggröra på fullkornsbröd',
  'Turkisk yoghurt med müsli och bär',
  'Havregrynsgröt med honung och äpple',
  'Smörgås med kalkon och avokado'
];
export const MELLIS = [
  'Päron eller banan i bitar',
  'Hummus med gurka och riven morot',
  'Keso eller kvarg med bär',
  'Ostbitar med knäckebröd',
  'Äppelklyftor med yoghurt och kanel',
  'Yoghurt med bär',
  'Gurka och tunna morotsstavar med hummus'
];

// Recept för 2 portioner (du + Noah). rester: false om rätten inte värms om bra.
export const RECEPT = {
  lax: {
    namn: 'Ugnslax med potatis och broccoli', tid: '35 min', fisk: true,
    ingr: [['lax', 300], ['potatis', 500], ['broccoli', 1], ['citron', 0.5], ['yoghurt', 100]],
    steg: ['Ugn 200 °C. Tärna potatisen, vänd i olja och rosta 20 min.', 'Lägg laxen bredvid på plåten och rosta 12–15 min.', 'Ånga broccolin 4–5 min.', 'Rör ihop yoghurt, citronsaft och en nypa salt till sås.'],
    tips: 'Kolla laxen efter ben och ta bort skinnet åt Noah. Skär potatis och broccoli små.'
  },
  wok: {
    namn: 'Kycklingwok med ris', tid: '25 min', solo: true,
    ingr: [['kyckling', 300], ['paprika', 1], ['broccoli', 1], ['morot', 150], ['lok', 80], ['vitlok', 2], ['soja', 30], ['ris', 150]],
    steg: ['Koka riset.', 'Skär kyckling i strimlor och grönsakerna smalt. Morötterna tunnast.', 'Stek kycklingen genomstekt och ta upp den.', 'Woka morot, lök och broccoli 4 min, sedan paprika och vitlök 2 min.', 'Lägg tillbaka kycklingen, tillsätt soja och en skvätt vatten. Servera över riset.']
  },
  tacos: {
    namn: 'Tacos', tid: '25 min',
    ingr: [['notfars', 300], ['tacokrydda', 0.6], ['kidney', 1], ['majs', 1], ['tortilla', 4], ['sallad', 1], ['tomat', 150], ['gurka', 0.5], ['avokado', 1], ['rivost', 60], ['cf', 100], ['tacosas', 0.3]],
    steg: ['Bryn färsen, rör ner kryddan och lite vatten och sjud 5 min.', 'Skölj bönorna och blanda ner dem med majsen.', 'Skär grönsakerna och mosa avokadon.', 'Värm tortillabröden och ställ fram allt så att alla bygger själva.'],
    tips: 'Använd halv mängd krydda åt Noah om det blir för starkt.'
  },
  pastasas: {
    namn: 'Pasta med grönsaksrik köttfärssås', tid: '35 min', solo: true,
    ingr: [['notfars', 300], ['lok', 80], ['vitlok', 2], ['morot', 150], ['zucchini', 0.5], ['krossade', 400], ['arter', 50], ['pasta', 160], ['rivost', 40]],
    steg: ['Fräs lök och vitlök, bryn färsen.', 'Rör ner riven morot och zucchini samt tomaterna. Sjud 20 min.', 'Koka pastan och lägg i ärtorna i såsen sista 3 min.', 'Servera med riven ost.'],
    tips: 'De rivna grönsakerna försvinner i såsen, bra för en 3-åring.'
  },
  torsk: {
    namn: 'Ugnstorsk med rotfrukter', tid: '40 min', fisk: true,
    ingr: [['torsk', 300], ['morot', 200], ['potatis', 400], ['broccoli', 1], ['citron', 0.5], ['yoghurt', 100], ['smor', 20]],
    steg: ['Tina torsken i kylen kvällen innan.', 'Ugn 200 °C. Tärna morot och potatis, rosta 20 min.', 'Lägg torsken på plåten med lite smör och rosta 12–15 min.', 'Ånga broccolin och rör yoghurt med citron till sås.'],
    tips: 'Kolla torsken efter ben innan Noah får den.'
  },
  linssoppa: {
    namn: 'Röd linssoppa med bröd', tid: '30 min',
    ingr: [['linser', 150], ['morot', 200], ['lok', 100], ['vitlok', 2], ['kokos', 400], ['curry', 0.1], ['brod', 4], ['yoghurt', 50]],
    steg: ['Fräs lök, vitlök och curry i en kastrull.', 'Tillsätt riven morot, linser, kokosmjölk och 5 dl vatten. Sjud 15–20 min.', 'Mixa slätt med stavmixer.', 'Servera med bröd och en klick yoghurt.']
  },
  lar: {
    namn: 'Ugnsbakad kyckling med rotfrukter', tid: '45 min',
    ingr: [['kycklinglar', 350], ['potatis', 400], ['morot', 200], ['broccoli', 1], ['yoghurt', 100]],
    steg: ['Ugn 200 °C. Skär rotfrukterna i bitar och lägg på plåt med olja och salt.', 'Lägg kycklingen ovanpå och rosta 25–30 min tills den är genomstekt.', 'Ånga broccolin och servera med yoghurt.']
  },
  bullar: {
    namn: 'Ugnsbullar med potatis och gurka', tid: '40 min',
    ingr: [['notfars', 300], ['agg', 1], ['havregryn', 30], ['mjolk', 1], ['lok', 40], ['potatis', 500], ['gurka', 0.5], ['cf', 50]],
    steg: ['Ugn 200 °C. Blanda färs, ägg, havregryn, mjölk och riven lök. Rulla bullar.', 'Baka 15–18 min.', 'Koka potatisen och skär gurkan i tunna stavar.', 'Servera med crème fraiche.']
  },
  curry: {
    namn: 'Kikärtscurry med sötpotatis', tid: '35 min', solo: false,
    ingr: [['sotpotatis', 400], ['kikarter', 1], ['kokos', 400], ['lok', 80], ['vitlok', 2], ['spenat', 50], ['ris', 150], ['curry', 0.1]],
    steg: ['Koka riset.', 'Fräs lök, vitlök och curry. Tillsätt tärnad sötpotatis, kokosmjölk och 1 dl vatten.', 'Sjud 15 min, lägg i kikärtor och spenat sista 3 min.', 'Servera över riset.']
  },
  laxpasta: {
    namn: 'Pasta med lax och spenat', tid: '25 min', fisk: true, solo: true,
    ingr: [['pasta', 160], ['lax', 250], ['spenat', 60], ['cf', 100], ['citron', 0.5], ['arter', 50]],
    steg: ['Koka pastan och lägg i ärtorna sista 3 min.', 'Stek laxen i bitar, blanda med crème fraiche, spenat och citron.', 'Vänd ihop med pastan.']
  },
  pizza: {
    namn: 'Pizza på tortillabröd', tid: '25 min',
    ingr: [['tortilla', 4], ['krossade', 400], ['rivost', 120], ['paprika', 1], ['kalkon', 40], ['tomat', 150]],
    steg: ['Ugn 225 °C. Lägg tortillabröden på plåt och grädda 3 min.', 'Bred på krossade tomater, ost och valfria toppings.', 'Grädda 8–10 min.'],
    rester: false
  },
  chili: {
    namn: 'Mild bönchili med ris', tid: '35 min', solo: true,
    ingr: [['kidney', 1], ['majs', 1], ['krossade', 400], ['paprika', 1], ['lok', 80], ['morot', 100], ['vitlok', 2], ['ris', 150], ['rivost', 40], ['cf', 50]],
    steg: ['Koka riset.', 'Fräs lök, vitlök och tärnad paprika och morot.', 'Tillsätt tomater, bönor och majs och sjud 20 min.', 'Servera med ris, ost och crème fraiche.']
  },
  brod: {
    namn: 'Lätt bröd utan knådning', tid: '15 min + 12 tim jäsning + 45 min i ugnen',
    ingr: [['mjol', 500], ['torrjast', 0.1]],
    steg: ['Blanda 500 g vetemjöl, 1 tsk salt och en nypa torrjäst i en skål.', 'Rör ner 4 dl kallt vatten till en kladdig deg. Låt jäsa täckt 12 timmar (kvällen innan eller på morgonen).', 'Ugn 240 °C med en gjutjärnsgryta eller ugnsfast form inuti. Vänd ut degen på mjölad bänk, vik ihop och lägg i den heta grytan.', 'Grädda med lock 30 min och utan lock 15 min tills brödet är gyllene.'],
    tips: 'Vill du ha det på lördagsmorgonen: rör ihop degen på kvällen.'
  },
  omelett: {
    namn: 'Omelett med grönsaker', tid: '15 min', solo: true, rester: false,
    ingr: [['agg', 5], ['paprika', 0.5], ['tomat', 100], ['spenat', 40], ['rivost', 40], ['brod', 4], ['gurka', 0.5]],
    steg: ['Vispa ägg med lite mjölk och salt.', 'Stek de skurna grönsakerna 2 min, häll över äggen.', 'Strö över ost och vik ihop. Servera med bröd och gurka.']
  }
};

// Middagar när Noah är hos dig, i ordning. Minst en fiskrätt varje vecka.
export const HUVUD = ['lax', 'wok', 'tacos', 'torsk', 'pastasas', 'linssoppa', 'lar', 'bullar', 'laxpasta', 'curry', 'pizza', 'lax', 'pastasas', 'chili', 'torsk', 'lar', 'bullar'];
// Enkla middagar för dig när Noah inte är hos dig (halv portion).
export const SOLO = ['omelett', 'chili', 'wok', 'omelett', 'laxpasta', 'chili', 'wok'];

// Särskilda dagar. extraPersoner läggs på frukost/mellanmål, ingr är extra varor den dagen.
export const OVERRIDE = {
  '2026-10-28': { middagRecept: 'wok', faktor: 2, port: '2 portioner (en blir matlåda)' },
  '2026-10-29': { middagRecept: 'lax', faktor: 1.5, port: '2 portioner' },
  '2026-10-30': { med: 'Du + kompis (fre–sön)', middagRecept: 'tacos', faktor: 1.7, port: '2 vuxna', extra: 'Kompisen kommer. Ostbricka till kvällen.' },
  '2026-10-31': { med: 'Du + kompis, ni åker på förmiddagen', borta: true, baslinje: 0.5, mellis: 'Borta', middag: { typ: 'ute', recept: null, namn: 'Borta', port: '' } },
  '2026-11-01': { med: 'Borta', borta: true, baslinje: 0, frukost: 'Borta', mellis: 'Borta', middag: { typ: 'ute', recept: null, namn: 'Borta', port: '' } },
  '2026-11-02': { middagRecept: 'pastasas', faktor: 1.7, port: '2 portioner' },
  '2026-11-03': { middagRecept: 'torsk', faktor: 1.7, port: '2 portioner' },
  '2026-11-10': {
    med: 'Du + Dennis',
    lunch: 'Thaibuffé med Dennis',
    middag: { typ: 'ute', recept: null, namn: 'Middag ute med Dennis', port: '' },
    extra: ['Rör ihop brödsmeten innan ni går ut, så jäser den över natten till onsdag (recept: Lätt bröd utan knådning)', 'Spelkväll med Dennis (Heroes of Might and Magic 3): chips med dipp, popcorn, godis, mörk choklad och något att dricka'],
    ingr: [['chips', 2], ['dippmix', 1], ['cf', 200], ['popcorn', 160], ['godis', 200], ['choklad', 100], ['dryck', 1]],
    extraPersoner: 0
  },
  '2026-11-11': {
    med: 'Du + Dennis, Noah hämtas från förskolan på eftermiddagen',
    frukost: 'God frukost hemma: äggröra, avokadotoast, yoghurt med bär och müsli',
    lunch: 'Smörgåsar med nybakat bröd, ost, kalkon och hummus',
    extra: ['Du bakar bröd (recept: Lätt bröd utan knådning)', 'Du fyller år! Princesstårta (köpt på ICA) med Noah på eftermiddagen'],
    recept: 'brod',
    extraPersoner: 1,
    kopTidigare: true,
    ingr: [['agg', 4], ['avokado', 2], ['tomat', 150], ['yoghurt', 200], ['bar', 100], ['brod', 6], ['ost', 100], ['kalkon', 60], ['hummus', 100], ['gurka', 1], ['princess', 1], ['tartljus', 1]]
  }
};

// Veckan som redan är handlad enligt din egen lista (nyckel = veckoindex, 0 = första veckan).
export const FASTKOP = {
  0: {
    banan: 1, paron: 1, vindruvor: 1, gurka: 2, tomat: 1, paprika: 3, broccoli: 2, morot: 1, zucchini: 1, lok: 1, vitlok: 1,
    sallad: 1, avokado: 1, spenat: 1, citron: 1, potatis: 1,
    kyckling: 1, lax: 1, notfars: 2, kalkon: 1,
    mjolk: 1, yoghurt: 1, kvarg: 1, keso: 1, hummus: 1, agg: 1, smor: 1, rivost: 1, ost: 1, cf: 1,
    ostar: 1, kex: 1, sylt: 1, oliver: 1,
    musli: 1, pasta: 1, krossade: 2, tacokrydda: 1, tacosas: 1, majs: 1, kidney: 1, soja: 1, jnsmor: 1, fruktpure: 1, honung: 1,
    brod: 1, knacke: 1, torsk: 1, bar: 1, arter: 1, dryck: 1
  }
};
export const FAST_ANM = { 0: 'Den här veckan är redan handlad enligt din lista. Bockarna visar vad du köpte.' };
