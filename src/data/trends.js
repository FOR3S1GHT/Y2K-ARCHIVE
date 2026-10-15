import { IMG } from './images'

/**
 * Trend records.
 *
 * Each entry answers the same six questions so the editorial layouts can
 * recombine them freely: what it was, where it came from, what it was made of,
 * who was associated with it, how to wear it now, and how confident we are
 * about the dating.
 */

export const TREND_CATEGORIES = [
  { id: 'all', label: 'All Signals', short: 'ALL' },
  { id: 'denim', label: 'Denim', short: 'DNM' },
  { id: 'glam', label: 'Glam', short: 'GLM' },
  { id: 'sporty', label: 'Sporty', short: 'SPT' },
  { id: 'cyber', label: 'Cyber', short: 'CYB' },
  { id: 'accessories', label: 'Accessories', short: 'ACC' },
  { id: 'streetwear', label: 'Streetwear', short: 'STR' },
]

export const TRENDS = [
  {
    id: 'low-rise-jeans',
    code: 'TRN-01',
    name: 'Low-Rise Jeans',
    category: 'denim',
    peak: '1999–2007',
    image: 'lowRiseJeans',
    summary:
      'Denim cut to sit on or below the hip bone, so that the waistband — and usually the midriff — became the point of the outfit.',
    context:
      'The hip-hugger is an old idea, but the version that dominated the turn of the millennium was pushed by designers rather than the high street. Alexander McQueen’s mid-1990s tailoring, shown on the Paris schedule, is widely credited with legitimising the deliberately low waist, and the idea moved quickly into mass denim. By 2001 the low waist was the default cut in almost every women’s jeans range.',
    garments: ['Bootcut and flared jeans', 'Denim miniskirts', 'Capri and pedal-pusher lengths'],
    materials: 'Rigid and lightly stretch denim, usually with a whiskered or sanded finish at the hip',
    associated:
      'Alexander McQueen for the tailoring origin; Miss Sixty and Diesel for the commercial cut; a long list of pop and R&B performers for the styling',
    subcultures: 'Pop, R&B, and the mall mainstream — this was not an underground look, it was the mainstream.',
    modern:
      'Wear it with a longer, fitted top tucked at the front rather than a cropped one — the silhouette still reads, but the proportions are easier to carry. Look for a mid-rise if you want the line without the constant adjustment.',
    confidence: 'The cut is verified; the attribution of its origin to a single designer is contested and should be read as the industry story rather than settled fact.',
  },
  {
    id: 'low-rise-miniskirt',
    code: 'TRN-02',
    name: 'Low-Rise Miniskirt',
    category: 'denim',
    peak: '2000–2006',
    image: 'jeansOnly2002',
    summary:
      'The shortest expression of the low-waist silhouette: a denim or leather skirt cut high, worn with boots or bare legs.',
    context:
      'The miniskirt is a 1960s invention, but the Y2K version was defined by its rise rather than its hem. Denim mini-skirts in particular became a uniform of the early 2000s, worn with bare legs in summer and with knee-high boots in winter — the combination that made the look work across a whole year.',
    garments: ['Denim miniskirts', 'Leather and pleather miniskirts', 'Layered skirt-over-trouser combinations'],
    materials: 'Denim, coated cotton, PVC and faux leather',
    associated:
      'Dolce & Gabbana and Versace for the runway; mall denim labels for the everyday version',
    subcultures: 'Pop and club culture, plus the American mall mainstream.',
    modern:
      'Pair with an oversized knit or a tailored jacket to balance the proportion, and pick one bare element rather than several.',
    confidence: 'Broad trend, securely dated across the period.',
  },
  {
    id: 'baby-tee',
    code: 'TRN-03',
    name: 'Baby Tees & Fitted Tops',
    category: 'glam',
    peak: '1997–2004',
    image: 'cropTop',
    summary:
      'A shrunken, cap-sleeve or short-sleeve T-shirt cut close to the body and ending above the waist.',
    context:
      'The shrunken T-shirt is a 1970s idea — Fiorucci sold versions of it in Milan and New York — but it returned at the end of the 1990s as the natural partner to low-rise denim. The Y2K version added slogans, rhinestones, contrast stitching and sometimes a small amount of stretch.',
    garments: ['Cap-sleeve baby tees', 'Fitted tanks and camis', 'Ringer and raglan tees'],
    materials: 'Ribbed and heavyweight cotton, sometimes with spandex for a closer fit',
    associated:
      'Fiorucci as the historical origin; a wide field of American teen retailers and graphics labels for the 2000s version',
    subcultures: 'Teen pop, mall culture and, later, the indie sleaze look of the mid-2000s.',
    modern:
      'The safest way to wear it now is with a high-waisted bottom, which reverses the original proportions and removes the need for constant readjustment.',
    confidence: 'Verified. The exact origin of the term "baby tee" is not settled.',
  },
  {
    id: 'velour-tracksuits',
    code: 'TRN-04',
    name: 'Velour Tracksuits',
    category: 'sporty',
    peak: '2001–2008',
    image: 'tracksuitJacket',
    summary:
      'A matching jacket-and-trouser set in soft velour, often branded across the back, worn as daywear rather than for exercise.',
    context:
      'This is one of the few trends on this list that was genuinely created inside the Y2K period. Juicy Couture, founded in 1997 by Pamela Skaist-Levy and Gela Nash-Taylor, put a velour tracksuit on a visible circle of Los Angeles celebrities in the early 2000s, and the garment moved from workout wear to public uniform almost immediately. Museum collections now hold examples catalogued to 2000.',
    garments: ['Zip-front velour jackets', 'Matching low-rise velour trousers', 'Terry-cloth versions for summer'],
    materials: 'Cotton-blend velour and terry cloth, with rhinestone or chain-stitch branding',
    associated: 'Juicy Couture, Baby Phat and a large field of imitators',
    subcultures: 'Los Angeles celebrity culture and, through hip-hop labels, a parallel and often more embellished version.',
    modern:
      'Treat it as a single-garment statement: wear the jacket with plain denim, or the trousers with an oversized shirt, rather than both at once.',
    confidence: 'Verified. Juicy Couture’s 1997 founding date is documented; the exact date the tracksuit became a mass trend is not.',
  },
  {
    id: 'metallic-fabrics',
    code: 'TRN-05',
    name: 'Metallic Fabrics & Liquid Surfaces',
    category: 'glam',
    peak: '1999–2005',
    image: 'pvcShorts',
    summary:
      'Clothing that behaves like a surface: foil, coated, vinyl, chainmail and mirrored fabrics that reflect light rather than absorb it.',
    context:
      'Futurist metal clothing goes back at least as far as Paco Rabanne’s 1960s metal-link dresses. What changed at the millennium was the price and the production: coated cottons, stretch PVC and metallic-coated knits became affordable enough to appear in high-street ranges. The result was a look that belonged simultaneously to the nightclub and to the runway.',
    garments: ['Metallic mini dresses', 'Coated trousers', 'PVC skirts and shorts', 'Chainmail tops'],
    materials: 'Foil-coated jersey, stretch PVC, polyurethane, lamé and metal mesh',
    associated:
      'Paco Rabanne as the historical reference point; Versace, Gucci and Jean Paul Gaultier for the luxury version',
    subcultures: 'Club, cyber and fetish subcultures across Europe and North America.',
    modern:
      'Use one reflective piece with matte everything else. A metallic bag or boot carries the reference without the costume effect.',
    confidence: 'Verified as a broad material trend. Specific runway attributions are best checked per collection.',
  },
  {
    id: 'cargo-pants',
    code: 'TRN-06',
    name: 'Cargo Pants',
    category: 'streetwear',
    peak: '1998–2005',
    image: 'eckoJeans',
    summary:
      'Utility trousers with large patch pockets, originally military, adopted as wide, low-slung everyday wear.',
    context:
      'Cargo trousers travelled from military surplus into 1980s and 1990s street and rave culture long before the millennium. Their Y2K popularity was partly a continuation of baggy hip-hop styling and partly a fashion response to utility — the pocket became decorative as often as it was functional.',
    garments: ['Wide-leg cargo trousers', 'Cargo skirts and shorts', 'Convertible zip-off trousers'],
    materials: 'Heavy cotton canvas, ripstop nylon and parachute fabrics',
    associated:
      'Marithé + François Girbaud for the 1980s French reinterpretation of workwear denim; hip-hop and skate labels for the 2000s version',
    subcultures: 'Hip-hop, skateboarding, rave and the "techno utility" look.',
    modern:
      'Choose one volume: a wide cargo trouser with a fitted top, or a cargo jacket with slim bottoms.',
    confidence: 'Verified as a broad trend. Individual brand attributions vary by country.',
  },
  {
    id: 'denim-on-denim',
    code: 'TRN-07',
    name: 'Denim On Denim',
    category: 'denim',
    peak: '2000–2004',
    image: 'junyaDenimJacket',
    summary:
      'Indigo worn with indigo — jacket over jeans, or skirt over jeans — usually in matching or near-matching washes.',
    context:
      'Double denim has a long history in American workwear and western dress, but its most memed moment came at the start of the millennium. Britney Spears and Justin Timberlake arrived at the American Music Awards in January 2001 in coordinated full denim and, deliberately or not, fixed the look as the era’s definitive red-carpet image.',
    garments: ['Trucker jackets', 'Denim waistcoats', 'Denim maxi and midi skirts', 'Denim corset tops'],
    materials: 'Rigid indigo denim, sometimes in contrasting or patched washes',
    associated: 'Designers from the Paris and New York schedules, and a long list of performers who wore it on the red carpet.',
    subcultures: 'Primarily mainstream, with roots in western wear and hip-hop styling.',
    modern:
      'Break the match deliberately: one very dark piece against one very light piece reads as a styling decision rather than an accident.',
    confidence: 'Verified. The 2001 red-carpet image is a documented photograph, not a rumour.',
  },
  {
    id: 'rhinestones-sequins',
    code: 'TRN-08',
    name: 'Rhinestones & Sequins',
    category: 'glam',
    peak: '1999–2006',
    image: 'rhinestoneNecklace',
    summary:
      'Applied shine: crystal-studded denim, sequinned tops, rhinestone belts and oversized costume jewellery.',
    context:
      'Rhinestones are glass, not diamond, and the word is effectively a brand name that became generic. In the early 2000s they moved from costume jewellery onto clothing itself — a belt, a back pocket, a phone case — as hip-hop styling and pop styling converged on the same idea of visible wealth.',
    garments: ['Rhinestone belts', 'Studded denim', 'Sequin halter tops', 'Embellished bags and phones'],
    materials: 'Glass crystal, acrylic stone, sequin embroidery on denim and jersey',
    associated: 'Hip-hop stylists and labels, and the pop performers who shared their stylists',
    subcultures: 'Hip-hop, pageant and club culture, then mainstream retail.',
    modern:
      'Use one embellished accessory as the focal point of an otherwise plain outfit.',
    confidence: 'Verified as a broad trend; individual pieces here are museum or studio photographs rather than period press images.',
  },
  {
    id: 'mini-bags',
    code: 'TRN-09',
    name: 'Mini & Baguette Bags',
    category: 'accessories',
    peak: '1997–2005',
    image: 'handbagPurse',
    summary:
      'The small shoulder bag you carry under one arm — sized for a phone, a card and a lip gloss, and nothing else.',
    context:
      'Fendi introduced the Baguette in 1997, and its appearance on Sex and the City in the late 1990s turned a specific expensive bag into the first widely acknowledged "It bag". The category it created — small, structured, and frequently reissued in new colours and materials — defined early-2000s accessory culture.',
    garments: ['Shoulder-strap mini bags', 'Baguette silhouettes', 'Nano totes', 'Belt bags'],
    materials: 'Leather, patent leather, jacquard monogram canvas, sometimes fur or pony hair',
    associated:
      'Fendi as the origin of the Baguette; Louis Vuitton, Dior and Chanel for logo-heavy competitors',
    subcultures: 'Mainstream luxury, with a parallel and much cheaper version in mall retail.',
    modern:
      'Photograph it against a plain surface — a small bag reads as an object first and an accessory second.',
    confidence: 'Verified. Fendi founded the Baguette in 1997; the "first It bag" claim is attributed to the industry press rather than a formal record.',
  },
  {
    id: 'wraparound-sunglasses',
    code: 'TRN-10',
    name: 'Futuristic Wraparound Sunglasses',
    category: 'accessories',
    peak: '1999–2006',
    image: 'sunglasses2000',
    summary:
      'Shield lenses and wraparound frames that covered more of the face than seemed strictly necessary.',
    context:
      'Performance eyewear brands had been building wraparound frames for sport since the 1980s, and Y2K fashion took the shape and stripped out the function. Combined with the period’s interest in science fiction and machine imagery, the wraparound became a way of looking partly non-human — an effect that fashion photography of the period leaned into deliberately.',
    garments: ['Shield sunglasses', 'Tinted visors', 'Coloured-lens aviators'],
    materials: 'Injection-moulded nylon and polycarbonate, mirrored or gradient-tinted lenses',
    associated: 'Sport-performance eyewear manufacturers, then designers producing their own versions',
    subcultures: 'Cyber, rave and sportswear crossover.',
    modern:
      'A single mirrored shield frame with a very plain outfit is the cleanest route — everything else should look ordinary.',
    confidence: 'Verified as a broad shape trend. This particular pair is a museum object catalogued to c.2000.',
  },
  {
    id: 'platform-sneakers',
    code: 'TRN-11',
    name: 'Platform Sneakers & Chunky Boots',
    category: 'accessories',
    peak: '1997–2004',
    image: 'platformBuffalo',
    summary:
      'Footwear built on an exaggerated sole — platform trainers, stacked-sole boots, and the moon boot.',
    context:
      'The German label Buffalo built its reputation in the 1990s on footwear with an unusually deep sole, and the look reached a global audience when the Spice Girls wore Buffalo platform trainers around 1996–97. The idea ran through the whole Y2K period in different weights: deep-sole trainers early on, moon boots and stacked leather later.',
    garments: ['Platform trainers', 'Stacked-sole boots', 'Moon boots', 'Chunky lace-up shoes'],
    materials: 'Rubber, polyurethane and EVA soles with leather, suede or synthetic uppers',
    associated: 'Buffalo as the signature name; sportswear manufacturers for the trainer version',
    subcultures: 'Pop, rave and club culture — the footprint is part of the music.',
    modern:
      'Keep the rest of the outfit narrow so the shoe does the work; tight denim or a short skirt.',
    confidence: 'Buffalo footwear is verified. The exact year the platform trainer became mass fashion is not firmly established.',
  },
  {
    id: 'butterfly-clips',
    code: 'TRN-12',
    name: 'Butterfly Clips & Hair Jewellery',
    category: 'accessories',
    peak: '1998–2003',
    image: 'butterflyClips',
    summary:
      'Small plastic butterflies, rhinestone grips and star clips distributed through tied-back hair.',
    context:
      'The butterfly clip is the period’s smallest and most widespread accessory. It required almost no skill, cost almost nothing, and produced an instantly recognisable look — which is exactly why it appears in so many photographs of the period and why it returned in the 2020s revival. The version sold today is often the same mould in a new colour.',
    garments: ['Butterfly clips', 'Rhinestone bobby pins', 'Star and flower grips', 'Beaded hair elastics'],
    materials: 'Injection-moulded plastic, acrylic rhinestone, sometimes metal springs',
    associated: 'Not attributable to a single house — this is a mass-market accessory with no designer origin.',
    subcultures: 'Teen culture, school and pop fandom across many countries.',
    modern:
      'Cluster three or four clips on one side rather than distributing them evenly; the modern reading is deliberate placement.',
    confidence: 'Verified as a period trend. The photograph illustrating this entry is from 2023 and is labelled as such.',
  },
  {
    id: 'logomania',
    code: 'TRN-13',
    name: 'Logo-Heavy Fashion',
    category: 'glam',
    peak: '1999–2005',
    image: 'bigChanelBag',
    summary:
      'Monograms, house names and brand marks printed at full size, repeated across a garment, or worn as hardware.',
    context:
      'Logomania had happened before — 1980s Italian fashion ran on it — but the millennium version was different because luxury houses had begun collaborating with artists and pop figures. Marc Jacobs’ work at Louis Vuitton, beginning with the Stephen Sprouse graffiti monogram in 2001 and the Takashi Murakami Monogram Multicolore in 2003, is the clearest example of a heritage logo being repackaged as a pop object.',
    garments: ['Monogram bags and belts', 'Printed logo tees', 'Logo-print denim', 'Hardware-branded jewellery'],
    materials: 'Coated monogram canvas, printed jersey, enamel and metal hardware',
    associated:
      'Louis Vuitton, Dior, Chanel, Gucci and Fendi; Fiorucci for the earlier pop version',
    subcultures: 'Hip-hop, reality television and the tabloid culture that documented both.',
    modern:
      'One logo per outfit. The point is recognition, and two competing marks cancel each other out.',
    confidence: 'Verified. The Murakami and Sprouse collaboration dates are documented.',
  },
  {
    id: 'mesh-layering',
    code: 'TRN-14',
    name: 'Mesh Tops & Layering',
    category: 'cyber',
    peak: '1999–2005',
    image: 'mcqueenCoiled',
    summary:
      'Transparent or semi-transparent fabric worn over, under or instead of a solid garment.',
    context:
      'Mesh and sheer fabric let clothing reveal structure without revealing skin — a technique with a long couture history that became a mass styling habit at the millennium. The layering habit extended to everything: a tank over a tee, sleeves over sleeves, a dress over jeans.',
    garments: ['Mesh long-sleeve tops', 'Sheer overlay dresses', 'Layered camisoles', 'Fishnet sleeves'],
    materials: 'Polyester and nylon mesh, silk chiffon, organza, fishnet',
    associated: 'Jean Paul Gaultier for the couture version; clubwear manufacturers for the accessible version',
    subcultures: 'Cyber, goth, rave and fetish subcultures.',
    modern:
      'Layer mesh over a solid base colour so it reads as texture rather than transparency.',
    confidence: 'Verified as a broad technique across the period.',
  },
  {
    id: 'cyber-techno',
    code: 'TRN-15',
    name: 'Cyber & Techno Styling',
    category: 'cyber',
    peak: '1997–2005',
    image: 'gothWeekend',
    summary:
      'Dressing as if the body were a machine: vinyl, straps, reflective panels, goggles and industrial hardware.',
    context:
      'Cyber styling grew out of European club and fetish culture rather than the runway, and it borrowed heavily from industrial music, science fiction film design and military surplus. It has never been one look — the German and Dutch scenes, the American rave scene and the Japanese cyber-goth scene each assembled different parts — and its influence on mainstream fashion was mostly a transfer of materials.',
    garments: ['Vinyl and PVC trousers', 'Strapped and harnessed tops', 'Cargo trousers with hardware', 'Platform boots'],
    materials: 'PVC, latex, neoprene, webbing, metal D-rings, reflective tape',
    associated: 'Not associated with a single fashion house; the material vocabulary was later adopted by many.',
    subcultures: 'Cyber-goth, techno, industrial and fetish scenes, with distinct regional versions.',
    modern:
      'Use one hardware element — a buckled belt or a harness strap — rather than a full set.',
    confidence: 'Verified as a subcultural scene with regional variation. The images here range from 2001 to 2009 and are labelled individually.',
  },
  {
    id: 'pop-princess',
    code: 'TRN-16',
    name: 'Pop-Princess Fashion',
    category: 'glam',
    peak: '1999–2004',
    image: 'britneyNfl',
    summary:
      'The stage and red-carpet wardrobe of the late-1990s and early-2000s pop charts: sparkle, skin, and a dancer’s body-first silhouette.',
    context:
      'The biggest pop performers of the period were also the most photographed people in the world, and their stage wardrobe became a shopping list. This was the first pop generation whose outfits circulated instantly through music television and the new internet, which compressed the distance between a performance and a fast-fashion copy to a matter of weeks.',
    garments: ['Crystallised crop tops and hot pants', 'Low-rise leather trousers', 'Bedazzled denim', 'Stage boots'],
    materials: 'Stretch jersey, leather, Swarovski-crystal-applied fabric, coated denim',
    associated:
      'Costume designers working with the performers themselves rather than a single fashion house',
    subcultures: 'Teen pop and dance-pop — an international mainstream phenomenon with strong regional differences.',
    modern:
      'Take one element — crystals or a leather trouser — and set it against normal clothes.',
    confidence: 'Verified as a broad trend. Specific costume attributions should be checked per performance.',
  },
  {
    id: 'early-streetwear',
    code: 'TRN-17',
    name: 'Early-2000s Streetwear',
    category: 'streetwear',
    peak: '1998–2006',
    image: 'eckoShirt',
    summary:
      'Baggy denim, oversized graphics, sports jerseys and limited-edition sneakers, cross-borrowed between skate, hip-hop and club cultures.',
    context:
      'Streetwear is the era’s connective tissue. Japanese labels supplied scarcity and camouflage; American skate brands supplied the box logo and the deck; hip-hop labels supplied scale and the oversized silhouette. By the early 2000s the three were copying each other constantly, and the resulting vocabulary — graphic tee, baggy denim, a statement sneaker — is still the default casual outfit today.',
    garments: ['Graphic tees and hoodies', 'Baggy denim', 'Sports jerseys', 'Souvenir and trucker caps'],
    materials: 'Heavyweight cotton jersey, raw and stonewashed denim, nylon outerwear',
    associated: 'BAPE, Supreme, Ecko Unltd., Rocawear, Sean John and their collaborators',
    subcultures: 'Skate, hip-hop, graffiti and Japanese Ura-Harajuku.',
    modern:
      'Balance the volume: one oversized piece with one fitted piece, and let the sneakers be the only loud element.',
    confidence: 'Verified. Individual label histories are covered on the Brands page.',
  },
]

export function trendImage(trend) {
  return trend.image ? IMG[trend.image] : null
}

/** Trend names grouped by category — used by the Closet style presets. */
export const TRENDS_BY_CATEGORY = TREND_CATEGORIES.filter((c) => c.id !== 'all').map((c) => ({
  ...c,
  items: TRENDS.filter((t) => t.category === c.id),
}))
