/**
 * Research helper: generates src/data/images.js from hand-picked pool titles.
 * Every entry keeps its real Commons file page, author and licence so captions
 * and attribution are never invented.
 */
import { readFileSync, writeFileSync } from 'node:fs'

const pool = JSON.parse(readFileSync(new URL('./pool.json', import.meta.url), 'utf8'))
const byTitle = new Map(pool.map((i) => [i.title, i]))

// key in the app  ->  exact Commons file title
const PICKS = {
  // ---- Home / hero -------------------------------------------------------
  heroKelly: 'Kelly Rowland 2001.jpg',
  aaliyahPortrait: 'Aaliyah Dana Haughton-02.jpg',
  aaliyahEditorial: 'Aaliyah-08.jpg',
  beyonceYoung: 'Beyonce Knowles at age 19 (cropped).jpeg',
  lowRiseJeans: 'Low-rise jeans in the mid-2000s.jpg',
  tracksuitJacket: 'Tracksuit jacket (AM 2017.66.31-1).jpg',
  tracksuitPants: 'Tracksuit pants (AM 2017.66.26-11).jpg',
  tracksuitDetail: 'Tracksuit jacket (AM 2017.66.31-5).jpg',
  lowRiseGirl: 'Low rise jeans girl, California.jpg',
  cropTop: 'Crop top - Stomach (2).jpg',
  cropTopPiercing: 'Crop top and navel piercing.jpg',
  platformBuffalo: 'Platform trainer Buffalo white-blue.jpg',
  adidasSuperstar: 'Adidas Superstar shoes pair.jpg',
  sneakersPurple: 'Sneakers and sweatpants on purple background.jpg',
  jeansOnly2002: 'Jeans \u201cOnly\u201d, sponge wash met wijduitlopende pijpen en gehaakte applicatie, objectnr 85321.JPG',
  junyaDenimJacket: '2002 Junya Watanabe for Comme des Gar\u00e7ons jacket, blue denim jeans patchwork 04.jpg',
  moonboot1999: 'Moonboot met gele kunststof stootrand, stof applicaties in felle kleuren, blauwe veter en harten in diverse neon-kleuren van polymeerklei, objectnr 78297.JPG',
  sunglasses2000: 'Oranje zonnebril met blauwgrijze glazen, objectnr 78427.JPG',
  sunglassesDisplay: 'Colourful display, sunglasses needed. - geograph.org.uk - 441439.jpg',

  // ---- Museum garments (Auckland Museum, via Commons) --------------------
  tshirt1999: 'T-shirt (AM 2002.94.1.1-2).jpg',
  tshirtShorts1999: 'T-shirt and shorts and armband (AM 2002.94.1-3).jpg',
  handbag1998: 'Handbag (AM 2016.7.9-1).jpg',
  handbag1998b: 'Handbag (AM 2016.7.9-3).jpg',
  handbagPurse: 'Handbag and purse (AM 2016.7.19-1).jpg',
  handbagPurseB: 'Handbag and purse (AM 2016.7.19-10).jpg',

  // ---- Designer work -----------------------------------------------------
  gallianoDior1998: '1998 pink ensemble by John Galliano for Dior.jpg',
  mcqueenGivenchy1998: 'Couture Givenchy by Alexander McQueen F-W 1998.jpg',
  mcqueenCoiled: 'Fitting of the Coiled Corset.jpg',
  mcqueenBowieCoat: 'Coat designed by Alexander McQueen for David Bowie.jpg',
  mcqueenSavageBeauty: 'Savage Beauty, dress by Alexander McQueen, Eshu collection.jpg',
  mcqueenMusee4: 'McQueen, Mus\u00e9e des beaux-arts - 4.jpg',
  mcqueenMusee10: 'McQueen, Mus\u00e9e des beaux-arts - 10.jpg',
  gaultierConeBra: 'Gaultier Cone bra.jpg',
  gaultierBustier: 'Jean-Paul Gaultier expo bustier.jpg',
  gaultierDrawings: "Drawings for Madonna's Blonde Ambition tour.jpg",
  gaultierKunsthal: 'Jean Paul Gaultier Kunsthal Rotterdam (8556756313).jpg',
  dressOfTheYear: 'Dress of the Year - Christopher Kane, Mary Quant, John Galliano.jpg',

  // ---- Accessories -------------------------------------------------------
  rhinestoneNecklace: 'Rhinestone necklace-4611.jpg',
  rhinestoneBrooch: 'Rhinestone brooch-4607.jpg',
  rhinestoneNecklaceB: 'Rhinestone necklace-4612.jpg',
  butterflyClips: 'Butterfly hair clips.jpg',
  bigChanelBag: 'Big Chanel Bag and Jeans (1324748053).jpg',
  studdedBelts: 'Studded Belts.jpg',

  // ---- Brands / retail ---------------------------------------------------
  vonDutchCap: 'Von Dutch Cap.JPG',
  edHardyRunway: 'Ed Hardy Runway Models.jpg',
  edHardyShoe: 'Ed Hardy running shoe 2008.jpg',
  juicyOutside: 'Juicy Couture Outside.jpg',
  juicyInside: 'Juicy Couture Inside.jpg',
  bapeHarajuku: 'Bape Store Harajuku 2015.jpg',
  bapeInside: 'Inside BAPE (3276951891).jpg',
  eckoShirt: 'T-shirt, oversized, maat XL, Merk Ecko Unlimited, blauw, wit en grijs met opdruk, objectnr 86904-3.JPG',
  eckoJeans: 'Zwarte korte jeans, baggy fit model, merk Ecko Unlimited, objectnr 86904-2(1).JPG',
  missSixtyStore: 'Miss Sixty, 39 Neal Street, Covent Garden 01.jpg',
  missSixtyStore2: 'Miss Sixty, 39 Neal Street, Covent Garden 02.jpg',
  missSixtyMall: 'HK TST K11 mall 107 shop MISS SIXTY.JPG',
  dieselWall: 'Diesel wall 2.jpg',
  trueReligionStore: 'True Religion Brand Jeans - panoramio.jpg',

  // ---- Technology / culture ---------------------------------------------
  motorolaRazr: 'Motorola Razr V3 black.jpg',
  motorolaRazrPink: 'Motorola RAZR V3 (Pink) - Front (Open).jpg',
  nokia3310: 'Nokia 3310 blue.jpg',
  ipodFirst: 'IPod 1Gen.jpg',
  ipodFamily: 'IPod family.jpg',
  sidekick: 'SidekickII.jpg',
  blackberry: 'BlackBerry 8700c and 7230.jpg',
  tamagotchi: 'Tamagotchi 0124 ubt.jpeg',
  walkman: 'Walkman.jpg',
  discman: 'Discman D121.jpg',
  minidisc: 'Minidisc.jpeg',
  imacG3: 'IMac G3 Bondi Blue, three-quarters view.png',
  trlStudios: 'TRL studios in Times Square in 2006.jpg',
  blockbuster: 'Blockbuster Video Rental Store Minneapolis.jpg',
  blockbusterSign: 'Anchorage Blockbuster video store sign (41219885734).jpg',
  mallInterior: 'Washington Square Mall inside - Oregon.JPG',
  myspaceShirt: 'Myspace T-shirt (2406126656).jpg',

  // ---- Cyber / subculture -----------------------------------------------
  cyberGoth: 'CyberGothTom.jpg',
  cyberGothAlice: 'Little Alice Cyber Goth (4121177268).jpg',
  gothWeekend: 'Goth weekends (63613715).jpg',
  pvcShorts: 'Fetish clothing - blue PVC shorts and top 1.jpg',
  pvcShorts2: 'Fetish clothing - blue PVC shorts and top 3.jpg',
  pvcPants: "Men's black PVC pants 03.jpg",
  latexShow: 'Art Love Latex - Fashion Show (8008183459).jpg',
  raveFashion: 'Gothic lolita takeshita street.jpg',

  // ---- People ------------------------------------------------------------
  britneyNfl: 'Britney Spears NFL Kickoff 2003.jpg',
  britneyNavy: 'Britney Spears Navy.jpg',
  christinaMtv: 'Christina Aguilera at the MTV Video Music Awards 2006.jpg',
  christinaDirrty: 'Christina Aguilera - Dirrty - Back to Basics Tour.jpg',
  destinyChildLive: "Destiny's Child Live 2.jpg",
  destinyChildTour: "Destiny's Child Tour.jpg",
  gwenNoDoubt: 'No Doubt at Summer Tour.jpg',
  gwenNoDoubt2: 'No Doubt at Summer Tour 9.jpg',
  missyElliott: 'Missy Elliott 2006.jpg',
  pharrell: 'Pharrell Williams at Womb Nightclub Tokyo 1.jpg',
  beckham: 'David Beckham.jpg',
  sjp: 'Sarah Jessica Parker.jpg',
  parisHilton: 'Paris hilton universal photo.jpg',
  parisHilton2: 'Paris Hilton.jpg',
  jloMarc: 'Jennifer Lopez & Marc Anthony 2007.jpg',
  tomFord: 'Tom Ford 2009.jpg',
  gallianoRunway: 'John Galliano - d\u00e9fil\u00e9 Christian Dior - 25 juin 2010.png',
  donatella: 'Donatella Versace (3537144779).jpg',
  lindsayLohan: 'Lindsay Lohan Elle 2009.jpg',
  hilaryDuff: 'Hilary Duff 2.jpg',
  avrilLavigne: 'Avril Lavigne, Beijing010 h.jpg',
  jessicaSimpson: 'Jessica Simpson 2004.jpg',
  usher: 'Usher 2004.jpg',
  ashanti: 'Ashanti.png',
  outkast: 'Outkast (3619554591).jpg',
  fergie: 'Fergie.jpg',
  tyraBanks: 'Tyra Banks(Cannes).jpg',
  christyTurlington: 'Christy Turlington 2000.jpg',
  rickyMartin: 'Ricky Martin Livin la Vida Loca Tour.jpg',
  maryJBlige: 'Mary J. Blige National Mall.jpg',
  mariahCarey: 'Mariah Carey in Cannes, 2000.png',

  // ---- Modern revival (must be labelled as later) ------------------------
  revivalGenZ: 'Gen Z streetwear in Qingdao in 2025.jpg',
  revivalShanghai: 'Shanghai streetwear in 2025, part 4.jpg',
  thriftRacks: 'Clothing racks in second hand shop, Prague.jpg',
  vintageRack: 'DFC 1571 A shopper browses a crowded rack of colorful dresses and tops running her hand along the hangers while choosing an outfit.jpg',
}

const out = {}
const missing = []
for (const [key, title] of Object.entries(PICKS)) {
  const item = byTitle.get(title)
  if (!item) { missing.push(`${key}: ${title}`); continue }
  out[key] = {
    title: item.title,
    url: item.url,
    page: item.page,
    artist: item.artist,
    licence: item.licence,
    date: item.date,
    year: item.year || null,
    w: item.w,
    h: item.h,
  }
}

writeFileSync(
  new URL('../src/data/imageRegistry.json', import.meta.url),
  JSON.stringify(out, null, 2),
)
console.log(`resolved ${Object.keys(out).length}/${Object.keys(PICKS).length}`)
if (missing.length) console.log('MISSING:\n' + missing.join('\n'))
