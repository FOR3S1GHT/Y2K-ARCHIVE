import registry from './imageRegistry.json'

/**
 * Every photograph in the archive is a real, verifiable file hosted on
 * Wikimedia Commons. Nothing here is invented: `sourceUrl` points at the
 * original file page, and `licence` / `credit` are copied from that page's
 * own metadata.
 *
 * `note` flags anything that is *not* a photograph from 1997–2006 so the UI
 * can label it honestly instead of presenting it as period material.
 */
const NOTES = {
  revivalGenZ: 'Photograph from 2025 — modern revival, not period material.',
  revivalShanghai: 'Photograph from 2025 — modern revival, not period material.',
  thriftRacks: 'Later photograph of second-hand retail, used to illustrate resale culture.',
  vintageRack: 'Photograph from 2025, used to illustrate how the era is resold today.',
  butterflyClips: 'Photograph from 2023 showing the hair clip style. The accessory peaked c.1998–2003.',
  rhinestoneNecklace: 'Modern museum-style photograph of a rhinestone necklace, not a period press image.',
  rhinestoneNecklaceB: 'Modern museum-style photograph of a rhinestone necklace, not a period press image.',
  rhinestoneBrooch: 'Modern museum-style photograph of a rhinestone brooch, not a period press image.',
  bapeHarajuku: 'Photograph from 2015 of the Harajuku store, used for location context.',
  bapeInside: 'Photograph from 2009 of a BAPE store interior.',
  edHardyRunway: 'Photograph from a 2008 Ed Hardy show, at the tail end of the brand’s peak.',
  edHardyShoe: 'Photograph from 2008 of an Ed Hardy running shoe.',
  juicyOutside: 'Photograph from 2007 of a Juicy Couture storefront.',
  juicyInside: 'Photograph from 2007 of a Juicy Couture store interior.',
  missSixtyStore: 'Later photograph of a Miss Sixty storefront in Covent Garden, London.',
  missSixtyStore2: 'Later photograph of a Miss Sixty storefront in Covent Garden, London.',
  missSixtyMall: 'Later photograph of a Miss Sixty shop in a Hong Kong mall.',
  dieselWall: 'Photograph from 2006 of Diesel branding.',
  vonDutchCap: 'Photograph from 2006 of a Von Dutch trucker cap.',
  tomFord: 'Photograph from 2009. Tom Ford led Gucci 1994–2004 and Yves Saint Laurent 1999–2004.',
  donatella: 'Photograph from 2009. Donatella Versace became artistic director in 1997.',
  gallianoRunway: 'Photograph from a Christian Dior show in June 2010, during Galliano’s tenure 1996–2011.',
  lindsayLohan: 'Photograph from 2009.',
  hilaryDuff: 'Photograph from 2008.',
  avrilLavigne: 'Photograph from 2008.',
  jloMarc: 'Photograph from 2007. Jennifer Lopez wore the green Versace dress at the Grammys in 2000.',
  christinaMtv: 'Photograph from the 2006 MTV Video Music Awards.',
  christinaDirrty: 'Photograph from the 2006–07 Back to Basics Tour.',
  missyElliott: 'Photograph from 2006.',
  pharrell: 'Photograph from 2007 in Tokyo.',
  beckham: 'Photograph from 2006.',
  sjp: 'Photograph from 2005.',
  destinyChildLive: 'Photograph from a 2005 Destiny’s Child tour date.',
  destinyChildTour: 'Photograph from a 2005 Destiny’s Child tour date.',
  usher: 'Photograph from 2004.',
  ashanti: 'Photograph from 2001.',
  outkast: 'Photograph from 2003.',
  fergie: 'Photograph from 2007, during the Black Eyed Peas’ The E.N.D. era.',
  tyraBanks: 'Photograph from the 2000 Cannes Film Festival.',
  christyTurlington: 'Photograph from 2000.',
  rickyMartin: 'Photograph from the 2000 Livin’ la Vida Loca Tour.',
  maryJBlige: 'Photograph from 2006.',
  mariahCarey: 'Photograph from the 2000 Cannes Film Festival.',
  imacG3: 'Product photograph of the iMac G3 (launched 1998).',
  motorolaRazr: 'Product photograph of the Motorola Razr V3 (launched late 2004).',
  motorolaRazrPink: 'Product photograph of a pink Motorola Razr V3.',
  nokia3310: 'Product photograph of the Nokia 3310 (launched 2000).',
  ipodFirst: 'Product photograph of a first-generation iPod (launched 23 October 2001).',
  ipodFamily: 'Product photograph of the iPod line.',
  sidekick: 'Product photograph of a T-Mobile Sidekick II.',
  blackberry: 'Product photograph of BlackBerry handsets.',
  tamagotchi: 'Product photograph of a Tamagotchi.',
  walkman: 'Product photograph of a Sony Walkman cassette player.',
  discman: 'Product photograph of a Sony Discman portable CD player.',
  minidisc: 'Product photograph of a MiniDisc.',
  trlStudios: 'Photograph from 2006 of the MTV TRL studio in Times Square.',
  blockbuster: 'Photograph from 2008 of a Blockbuster Video store, during the chain’s decline.',
  blockbusterSign: 'Photograph from 2018 of a surviving Blockbuster Video sign.',
  mallInterior: 'Photograph from 2007 of a US shopping mall interior.',
  myspaceShirt: 'Photograph from 2008 of a MySpace novelty T-shirt.',
  cyberGoth: 'Photograph from 2008 of cyber goth styling.',
  cyberGothAlice: 'Photograph from 2009 of cyber goth styling.',
  gothWeekend: 'Photograph from 2001 at a goth weekend gathering.',
  pvcShorts: 'Photograph from 2003 of a blue PVC shorts and top set.',
  pvcShorts2: 'Photograph from 2003 of a blue PVC shorts and top set.',
  pvcPants: 'Photograph from 2013 of PVC trousers, used to illustrate the fabric.',
  latexShow: 'Photograph from a 2012 latex fashion show, illustrating the material.',
  raveFashion: 'Photograph of Harajuku street fashion, illustrating subcultural dress-up.',
  mcqueenMusee4: 'Photograph from a 2023 Alexander McQueen exhibition.',
  mcqueenMusee10: 'Photograph from a 2023 Alexander McQueen exhibition.',
  mcqueenSavageBeauty: 'Photograph from the 2015 “Savage Beauty” exhibition of a garment from McQueen’s “Eshu” collection.',
  mcqueenCoiled: 'Photograph from 2004 documenting a fitting of the Coiled Corset, made with jeweller Shaun Leane.',
  mcqueenBowieCoat: 'Museum photograph of a coat designed by Alexander McQueen for David Bowie.',
  gaultierConeBra: 'Museum photograph of a Jean Paul Gaultier conical corset.',
  gaultierBustier: 'Exhibition photograph of a Jean Paul Gaultier bustier.',
  gaultierDrawings: 'Design drawings for Madonna’s Blond Ambition tour wardrobe, designed by Jean Paul Gaultier.',
  gaultierKunsthal: 'Exhibition photograph from a Jean Paul Gaultier retrospective.',
  dressOfTheYear: 'Museum group photograph including a John Galliano ensemble and the 1987 Dress of the Year.',
  junyaDenimJacket: 'Museum photograph of a 2002 Junya Watanabe for Comme des Garçons patchwork denim jacket.',
  gallianoDior1998: 'Museum photograph of a 1998 ensemble by John Galliano for Dior.',
  mcqueenGivenchy1998: 'Museum photograph of an autumn/winter 1998 Givenchy couture look by Alexander McQueen.',
  sunglassesDisplay: 'Photograph from 2007 of a sunglasses display, illustrating the category.',
  sunglasses2000: 'Museum photograph of an orange-framed pair of sunglasses catalogued to 2000.',
  sneakersPurple: 'Modern studio photograph of sneakers, used to illustrate footwear.',
  adidasSuperstar: 'Product photograph of the Adidas Superstar, a shell-toe design in production since 1969.',
  platformBuffalo: 'Product photograph of a Buffalo platform trainer.',
  lowRiseGirl: 'Photograph from 2005 of low-rise jeans styling.',
  handbag1998: 'Museum photograph of a handbag catalogued to 1998 (Auckland Museum).',
  handbag1998b: 'Museum photograph of a handbag catalogued to 1998 (Auckland Museum).',
  handbagPurse: 'Museum photograph of a handbag and purse from the Auckland Museum costume collection.',
  handbagPurseB: 'Museum photograph of a handbag and purse from the Auckland Museum costume collection.',
  tshirt1999: 'Museum photograph of a T-shirt catalogued to 1999 (Auckland Museum).',
  tshirtShorts1999: 'Museum photograph of a shorts and armband set catalogued to 1999 (Auckland Museum).',
  tracksuitJacket: 'Museum photograph of a tracksuit jacket catalogued to 2000 (Auckland Museum).',
  tracksuitPants: 'Museum photograph of tracksuit pants catalogued to 2000 (Auckland Museum).',
  tracksuitDetail: 'Museum photograph of a tracksuit jacket catalogued to 2000 (Auckland Museum).',
  jeansOnly2002: 'Museum photograph of a pair of “Only” jeans catalogued to 2002, with a crochet top.',
  moonboot1999: 'Museum photograph of a moon boot catalogued to 1999.',
  studdedBelts: 'Photograph from 2008 of studded belts, a punk and pop-punk staple of the period.',
  bigChanelBag: 'Photograph from 2007 of a large quilted Chanel bag with jeans.',
  eckoShirt: 'Museum photograph of an oversized Ecko Unlimited T-shirt (Rotterdam collection).',
  eckoJeans: 'Museum photograph of baggy-fit Ecko Unlimited shorts.',
  cropTop: 'Photograph from 2003 of a crop top worn with low-rise jeans.',
  cropTopPiercing: 'Photograph from 2006 of a crop top and navel piercing.',
  lowRiseJeans: 'Photograph from 2006 showing the classic low-rise jean back and pocket detail.',
}

const pick = (key, alt, caption) => {
  const r = registry[key]
  if (!r) return null
  return {
    key,
    src: r.url,
    alt,
    caption,
    credit: r.artist,
    licence: r.licence,
    filePage: r.page,
    fileTitle: r.title,
    date: r.date || null,
    year: r.year || null,
    ratio: r.w && r.h ? Number((r.w / r.h).toFixed(3)) : 0.75,
    note: NOTES[key] || null,
  }
}

export const IMG = {
  // Hero & identity
  heroKelly: pick(
    'heroKelly',
    'Kelly Rowland photographed in 2001, with pink-streaked hair, a black cut-out top, leather mini skirt and thigh-high boots',
    'Kelly Rowland, 2001 — pink streaks, cut-out knit, leather and thigh-high boots.',
  ),
  aaliyahPortrait: pick(
    'aaliyahPortrait',
    'Close-up black and white portrait of Aaliyah in 2000, wearing a patterned bandana and hoop earrings',
    'Aaliyah, 2000. Bandana, hoop earrings, glossy lip.',
  ),
  aaliyahEditorial: pick(
    'aaliyahEditorial',
    'Aaliyah photographed in 2000 in a black jacket over a light top',
    'Aaliyah, 2000.',
  ),
  beyonceYoung: pick(
    'beyonceYoung',
    'Beyoncé Knowles photographed in November 2001 at the age of nineteen',
    'Beyoncé Knowles at nineteen, November 2001.',
  ),
  missyElliott: pick('missyElliott', 'Missy Elliott performing in 2006', 'Missy Elliott, 2006.'),
  pharrell: pick(
    'pharrell',
    'Pharrell Williams photographed at Womb nightclub in Tokyo in 2007',
    'Pharrell Williams, Tokyo, 2007.',
  ),
  gwenNoDoubt: pick(
    'gwenNoDoubt',
    'Gwen Stefani performing on stage with No Doubt in 2003',
    'Gwen Stefani with No Doubt, 2003.',
  ),
  gwenNoDoubt2: pick(
    'gwenNoDoubt2',
    'Gwen Stefani performing with No Doubt in 2003, seen from the side of the stage',
    'No Doubt on the Summer Tour, 2003.',
  ),
  britneyNfl: pick(
    'britneyNfl',
    'Britney Spears performing on the National Mall in Washington DC in September 2003',
    'Britney Spears, NFL Kickoff, September 2003.',
  ),
  britneyNavy: pick(
    'britneyNavy',
    'Britney Spears performing in 2003 in a stage outfit',
    'Britney Spears, 2003.',
  ),
  christinaMtv: pick(
    'christinaMtv',
    'Christina Aguilera on the red carpet at the 2006 MTV Video Music Awards',
    'Christina Aguilera, MTV Video Music Awards, 2006.',
  ),
  christinaDirrty: pick(
    'christinaDirrty',
    'Christina Aguilera performing “Dirrty” on the Back to Basics Tour in 2006',
    'Christina Aguilera performing “Dirrty”, 2006.',
  ),
  destinyChildLive: pick(
    'destinyChildLive',
    'Destiny’s Child performing live on their 2005 tour',
    'Destiny’s Child, 2005.',
  ),
  destinyChildTour: pick(
    'destinyChildTour',
    'Destiny’s Child on stage during their 2005 tour',
    'Destiny’s Child, 2005.',
  ),
  parisHilton: pick(
    'parisHilton',
    'Paris Hilton photographed in 2005 in a pink outfit',
    'Paris Hilton, 2005.',
  ),
  parisHilton2: pick('parisHilton2', 'Paris Hilton photographed in 2005', 'Paris Hilton, 2005.'),
  sjp: pick(
    'sjp',
    'Sarah Jessica Parker photographed in 2005',
    'Sarah Jessica Parker, 2005.',
  ),
  tyraBanks: pick('tyraBanks', 'Tyra Banks at the Cannes Film Festival in 2000', 'Tyra Banks, Cannes, 2000.'),
  christyTurlington: pick(
    'christyTurlington',
    'Christy Turlington photographed in 2000',
    'Christy Turlington, 2000.',
  ),
  mariahCarey: pick('mariahCarey', 'Mariah Carey at Cannes in 2000', 'Mariah Carey, Cannes, 2000.'),
  rickyMartin: pick(
    'rickyMartin',
    'Ricky Martin performing on the Livin’ la Vida Loca tour in 2000',
    'Ricky Martin on the Livin’ la Vida Loca Tour, 2000.',
  ),
  maryJBlige: pick('maryJBlige', 'Mary J. Blige performing in 2006', 'Mary J. Blige, 2006.'),
  usher: pick('usher', 'Usher photographed in 2004', 'Usher, 2004.'),
  ashanti: pick('ashanti', 'Ashanti photographed in 2001', 'Ashanti, 2001.'),
  outkast: pick('outkast', 'Outkast photographed in 2003', 'Outkast, 2003.'),
  fergie: pick('fergie', 'Fergie photographed in 2007', 'Fergie, 2007.'),
  jloMarc: pick('jloMarc', 'Jennifer Lopez photographed in 2007', 'Jennifer Lopez, 2007.'),
  hilaryDuff: pick('hilaryDuff', 'Hilary Duff photographed in 2008', 'Hilary Duff, 2008.'),
  lindsayLohan: pick('lindsayLohan', 'Lindsay Lohan photographed in 2009', 'Lindsay Lohan, 2009.'),
  avrilLavigne: pick('avrilLavigne', 'Avril Lavigne photographed in Beijing in 2008', 'Avril Lavigne, 2008.'),
  jessicaSimpson: pick('jessicaSimpson', 'Jessica Simpson photographed in 2004', 'Jessica Simpson, 2004.'),
  beckham: pick('beckham', 'David Beckham photographed in 2006', 'David Beckham, 2006.'),

  // Designers
  tomFord: pick('tomFord', 'Tom Ford photographed in 2009', 'Tom Ford, 2009.'),
  donatella: pick('donatella', 'Donatella Versace photographed in 2009', 'Donatella Versace, 2009.'),
  gallianoRunway: pick(
    'gallianoRunway',
    'John Galliano taking a bow on the Christian Dior runway in June 2010',
    'John Galliano on the Dior runway, June 2010.',
  ),
  gallianoDior1998: pick(
    'gallianoDior1998',
    'A pink ensemble designed by John Galliano for Dior, dated 1998, photographed on a museum mannequin',
    'Pink ensemble by John Galliano for Dior, 1998.',
  ),
  mcqueenGivenchy1998: pick(
    'mcqueenGivenchy1998',
    'An autumn/winter 1998 Givenchy couture look designed by Alexander McQueen, on a museum mannequin',
    'Givenchy couture by Alexander McQueen, autumn/winter 1998.',
  ),
  mcqueenCoiled: pick(
    'mcqueenCoiled',
    'A fitting of the Coiled Corset, a metal corset made by Alexander McQueen with jeweller Shaun Leane',
    'Fitting of the Coiled Corset, McQueen with Shaun Leane.',
  ),
  mcqueenBowieCoat: pick(
    'mcqueenBowieCoat',
    'A coat designed by Alexander McQueen for David Bowie, displayed in a museum case',
    'Coat designed by Alexander McQueen for David Bowie.',
  ),
  mcqueenSavageBeauty: pick(
    'mcqueenSavageBeauty',
    'A dress by Alexander McQueen from his “Eshu” collection displayed at the Savage Beauty exhibition',
    'McQueen, “Eshu”, shown at Savage Beauty.',
  ),
  mcqueenMusee4: pick(
    'mcqueenMusee4',
    'A garment by Alexander McQueen photographed in a 2023 museum exhibition',
    'Alexander McQueen, museum exhibition, 2023.',
  ),
  mcqueenMusee10: pick(
    'mcqueenMusee10',
    'A long garment by Alexander McQueen photographed in a 2023 museum exhibition',
    'Alexander McQueen, museum exhibition, 2023.',
  ),
  gaultierConeBra: pick(
    'gaultierConeBra',
    'A conical corset by Jean Paul Gaultier displayed in a museum',
    'Jean Paul Gaultier conical corset.',
  ),
  gaultierBustier: pick(
    'gaultierBustier',
    'A Jean Paul Gaultier bustier photographed at an exhibition',
    'Jean Paul Gaultier bustier, exhibition display.',
  ),
  gaultierDrawings: pick(
    'gaultierDrawings',
    'Design drawings for Madonna’s Blond Ambition tour wardrobe by Jean Paul Gaultier',
    'Gaultier drawings for Madonna’s Blond Ambition wardrobe.',
  ),
  gaultierKunsthal: pick(
    'gaultierKunsthal',
    'A Jean Paul Gaultier look shown at a Kunsthal Rotterdam retrospective',
    'Jean Paul Gaultier retrospective, Kunsthal Rotterdam.',
  ),
  dressOfTheYear: pick(
    'dressOfTheYear',
    'A museum group display including a John Galliano ensemble and the 1987 Dress of the Year',
    'Dress of the Year display, including John Galliano.',
  ),

  // Garments & trends
  lowRiseJeans: pick(
    'lowRiseJeans',
    'The low-rise back of a pair of Armani Jeans worn with a lace-up corset top, photographed in 2006',
    'Low-rise denim, mid-2000s. Armani Jeans with a lace-up corset top.',
  ),
  lowRiseGirl: pick(
    'lowRiseGirl',
    'A woman photographed in California in 2005 wearing low-rise jeans',
    'Low-rise denim in California, 2005.',
  ),
  tracksuitJacket: pick(
    'tracksuitJacket',
    'A velour-style tracksuit jacket from 2000, photographed for a museum collection',
    'Tracksuit jacket, 2000. Auckland Museum collection.',
  ),
  tracksuitPants: pick(
    'tracksuitPants',
    'Tracksuit pants from 2000 photographed for a museum collection',
    'Tracksuit pants, 2000. Auckland Museum collection.',
  ),
  tracksuitDetail: pick(
    'tracksuitDetail',
    'Detail of a tracksuit jacket from 2000 in a museum collection',
    'Tracksuit jacket detail, 2000.',
  ),
  cropTop: pick(
    'cropTop',
    'A crop top worn with low-rise jeans photographed in 2003',
    'Crop top styling, 2003.',
  ),
  cropTopPiercing: pick(
    'cropTopPiercing',
    'A crop top worn with a navel piercing, photographed in 2006',
    'Crop top and navel piercing, 2006.',
  ),
  tshirt1999: pick(
    'tshirt1999',
    'A T-shirt catalogued to 1999, photographed for a museum collection',
    'T-shirt, 1999. Auckland Museum collection.',
  ),
  tshirtShorts1999: pick(
    'tshirtShorts1999',
    'A T-shirt, shorts and armband set catalogued to 1999',
    'T-shirt, shorts and armband, 1999.',
  ),
  jeansOnly2002: pick(
    'jeansOnly2002',
    'A pair of “Only” wide-leg sponge-washed jeans from 2002 with a crochet top',
    '“Only” sponge-wash wide-leg jeans with a crochet top, 2002.',
  ),
  junyaDenimJacket: pick(
    'junyaDenimJacket',
    'A 2002 Junya Watanabe for Comme des Garçons patchwork denim jacket photographed in a museum',
    'Junya Watanabe for Comme des Garçons patchwork denim, 2002.',
  ),
  moonboot1999: pick(
    'moonboot1999',
    'A moon boot from 1999 with a yellow rubber rand and neon polymer-clay heart details',
    'Moon boot, 1999 — neon polymer clay, yellow rand.',
  ),
  platformBuffalo: pick(
    'platformBuffalo',
    'A white and blue Buffalo platform trainer photographed in 2005',
    'Buffalo platform trainer.',
  ),
  adidasSuperstar: pick(
    'adidasSuperstar',
    'A pair of white Adidas Superstar shell-toe trainers',
    'Adidas Superstar — the shell toe.',
  ),
  sneakersPurple: pick(
    'sneakersPurple',
    'Sneakers and sweatpants photographed on a purple background',
    'Sneakers and sweatpants.',
  ),
  sunglasses2000: pick(
    'sunglasses2000',
    'A pair of orange-framed sunglasses with blue-grey lenses catalogued to 2000',
    'Orange-framed sunglasses, c.2000. Museum collection.',
  ),
  sunglassesDisplay: pick(
    'sunglassesDisplay',
    'A colourful retail display of sunglasses photographed in 2007',
    'Sunglasses display, 2007.',
  ),
  butterflyClips: pick(
    'butterflyClips',
    'Butterfly hair clips photographed in 2023',
    'Butterfly hair clips — the accessory readopted in the 2020s revival.',
  ),
  rhinestoneNecklace: pick(
    'rhinestoneNecklace',
    'A rhinestone necklace photographed on a white background',
    'Rhinestone necklace.',
  ),
  rhinestoneNecklaceB: pick(
    'rhinestoneNecklaceB',
    'A rhinestone necklace photographed on a white background from a different angle',
    'Rhinestone necklace.',
  ),
  rhinestoneBrooch: pick('rhinestoneBrooch', 'A rhinestone brooch photographed on white', 'Rhinestone brooch.'),
  handbag1998: pick(
    'handbag1998',
    'A handbag catalogued to 1998, photographed for a museum collection',
    'Handbag, 1998. Auckland Museum collection.',
  ),
  handbag1998b: pick(
    'handbag1998b',
    'A second handbag catalogued to 1998, photographed for a museum collection',
    'Handbag, 1998. Auckland Museum collection.',
  ),
  handbagPurse: pick(
    'handbagPurse',
    'A handbag and matching purse photographed for a museum costume collection',
    'Handbag and purse, museum costume collection.',
  ),
  handbagPurseB: pick(
    'handbagPurseB',
    'A handbag and matching purse photographed from above for a museum collection',
    'Handbag and purse, museum costume collection.',
  ),
  bigChanelBag: pick(
    'bigChanelBag',
    'A large quilted Chanel bag photographed with a pair of jeans in 2007',
    'Large quilted Chanel bag, 2007.',
  ),
  studdedBelts: pick('studdedBelts', 'A row of studded belts photographed in 2008', 'Studded belts.'),
  eckoShirt: pick(
    'eckoShirt',
    'An oversized Ecko Unlimited T-shirt with a graphic print, photographed for a museum collection',
    'Oversized Ecko Unlimited T-shirt.',
  ),
  eckoJeans: pick(
    'eckoJeans',
    'Baggy-fit black Ecko Unlimited denim shorts photographed for a museum collection',
    'Ecko Unlimited baggy-fit denim.',
  ),

  // Brands
  vonDutchCap: pick(
    'vonDutchCap',
    'A Von Dutch trucker cap photographed in 2006',
    'Von Dutch trucker cap, 2006.',
  ),
  edHardyRunway: pick('edHardyRunway', 'Models on an Ed Hardy runway in 2008', 'Ed Hardy runway, 2008.'),
  edHardyShoe: pick('edHardyShoe', 'An Ed Hardy running shoe photographed in 2008', 'Ed Hardy running shoe, 2008.'),
  juicyOutside: pick('juicyOutside', 'The exterior of a Juicy Couture store photographed in 2007', 'Juicy Couture storefront, 2007.'),
  juicyInside: pick('juicyInside', 'The interior of a Juicy Couture store photographed in 2007', 'Juicy Couture interior, 2007.'),
  bapeHarajuku: pick('bapeHarajuku', 'The BAPE store in Harajuku photographed in 2015', 'BAPE Harajuku, 2015.'),
  bapeInside: pick('bapeInside', 'Inside a BAPE store photographed in 2009', 'Inside BAPE, 2009.'),
  missSixtyStore: pick(
    'missSixtyStore',
    'A Miss Sixty storefront on Neal Street, Covent Garden, London',
    'Miss Sixty, Neal Street, London.',
  ),
  missSixtyStore2: pick(
    'missSixtyStore2',
    'A second view of the Miss Sixty storefront on Neal Street in London',
    'Miss Sixty, Neal Street, London.',
  ),
  missSixtyMall: pick('missSixtyMall', 'A Miss Sixty shop seen inside a Hong Kong mall', 'Miss Sixty, Hong Kong.'),
  dieselWall: pick('dieselWall', 'Diesel branding photographed in 2006', 'Diesel branding, 2006.'),

  // Technology & culture
  motorolaRazr: pick(
    'motorolaRazr',
    'A black Motorola Razr V3 flip phone',
    'Motorola Razr V3 — launched late 2004.',
  ),
  motorolaRazrPink: pick('motorolaRazrPink', 'A pink Motorola Razr V3 flip phone, open', 'Motorola Razr V3 in pink.'),
  nokia3310: pick('nokia3310', 'A blue Nokia 3310 mobile phone', 'Nokia 3310 — launched 2000.'),
  ipodFirst: pick('ipodFirst', 'A first-generation Apple iPod', 'First-generation iPod, October 2001.'),
  ipodFamily: pick('ipodFamily', 'A group of Apple iPods from different generations', 'The iPod line.'),
  sidekick: pick('sidekick', 'A T-Mobile Sidekick II messaging phone', 'T-Mobile Sidekick II.'),
  blackberry: pick('blackberry', 'Two BlackBerry handsets with physical keyboards', 'BlackBerry handsets.'),
  tamagotchi: pick('tamagotchi', 'A Tamagotchi digital pet keychain toy', 'Tamagotchi.'),
  walkman: pick('walkman', 'A Sony Walkman cassette player', 'Sony Walkman.'),
  discman: pick('discman', 'A Sony Discman portable CD player', 'Sony Discman.'),
  minidisc: pick('minidisc', 'A MiniDisc cartridge', 'MiniDisc.'),
  imacG3: pick('imacG3', 'An iMac G3 in Bondi Blue', 'iMac G3, 1998.'),
  trlStudios: pick('trlStudios', 'The MTV TRL studios in Times Square photographed in 2006', 'MTV TRL studios, Times Square, 2006.'),
  blockbuster: pick(
    'blockbuster',
    'The interior of a Blockbuster Video rental store photographed in 2008',
    'Blockbuster Video, 2008.',
  ),
  blockbusterSign: pick(
    'blockbusterSign',
    'A Blockbuster Video store sign photographed in Anchorage in 2018',
    'A surviving Blockbuster sign, Anchorage, 2018.',
  ),
  mallInterior: pick(
    'mallInterior',
    'The interior of Washington Square Mall in Oregon photographed in 2007',
    'Shopping mall interior, 2007.',
  ),
  myspaceShirt: pick('myspaceShirt', 'A MySpace novelty T-shirt photographed in 2008', 'MySpace T-shirt, 2008.'),

  // Cyber / subculture
  cyberGoth: pick('cyberGoth', 'A cyber goth photographed in 2008 with coloured hair, goggles and straps', 'Cyber goth, 2008.'),
  cyberGothAlice: pick('cyberGothAlice', 'A cybergoth photographed in 2009 in a neon outfit', 'Cybergoth styling, 2009.'),
  gothWeekend: pick('gothWeekend', 'A goth photographed at a weekend gathering in 2001', 'Goth weekend, 2001.'),
  pvcShorts: pick('pvcShorts', 'A blue PVC shorts and top set photographed in 2003', 'Blue PVC shorts and top, 2003.'),
  pvcShorts2: pick('pvcShorts2', 'A blue PVC shorts and top set photographed from the back in 2003', 'Blue PVC set, 2003.'),
  pvcPants: pick('pvcPants', 'Black PVC trousers photographed in 2013', 'PVC trousers.'),
  latexShow: pick('latexShow', 'A model on a latex fashion show runway in 2012', 'Latex on the runway, 2012.'),
  raveFashion: pick('raveFashion', 'Street fashion photographed in Harajuku, Tokyo', 'Harajuku street fashion.'),

  // Revival
  revivalGenZ: pick('revivalGenZ', 'A young person photographed in Qingdao in 2025 wearing modern streetwear', 'Qingdao, 2025.'),
  revivalShanghai: pick(
    'revivalShanghai',
    'A young person photographed in Shanghai in 2025 wearing modern streetwear',
    'Shanghai, 2025.',
  ),
  thriftRacks: pick('thriftRacks', 'Racks of second-hand clothing in a Prague shop', 'Second-hand racks, Prague.'),
  vintageRack: pick(
    'vintageRack',
    'A shopper browsing a crowded rack of colourful dresses and tops',
    'Browsing the racks.',
  ),
}

/** Only entries that resolved to a real file are exported. */
export const hasImage = (key) => Boolean(IMG[key])
export const getImage = (key) => IMG[key] || null

export default IMG
