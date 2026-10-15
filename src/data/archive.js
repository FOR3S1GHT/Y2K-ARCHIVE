import { IMG } from './images'

/**
 * Visual archive records.
 *
 * `archiveNote` distinguishes what each image actually is: a period
 * photograph, a museum object, a product photograph, or later material used
 * for context. Dates are only given where the source file records one.
 */

export const ARCHIVE_CATEGORIES = [
  { id: 'all', label: 'Everything', short: 'ALL' },
  { id: 'runway', label: 'Design & Garment', short: 'GAR' },
  { id: 'streetwear', label: 'Streetwear', short: 'STR' },
  { id: 'celebrity', label: 'Celebrity Looks', short: 'CEL' },
  { id: 'denim', label: 'Denim', short: 'DNM' },
  { id: 'accessories', label: 'Accessories', short: 'ACC' },
  { id: 'cyber', label: 'Cyber Fashion', short: 'CYB' },
  { id: 'popculture', label: 'Pop Culture', short: 'POP' },
  { id: 'advertising', label: 'Retail & Media', short: 'RET' },
]

// [imageKey, category, title, note, yearLabel, credit override]
const RAW = [
  ['gallianoDior1998', 'runway', 'Pink ensemble, John Galliano for Dior', 'Museum object photograph', '1998', ''],
  ['mcqueenGivenchy1998', 'runway', 'Givenchy couture, Alexander McQueen', 'Museum object photograph', 'Autumn/Winter 1998', ''],
  ['mcqueenCoiled', 'runway', 'Fitting the Coiled Corset', 'Documentary photograph of a fitting, made with jeweller Shaun Leane', 'Photographed 2004', ''],
  ['mcqueenBowieCoat', 'runway', 'Coat designed for David Bowie', 'Museum object photograph', 'No date recorded', ''],
  ['mcqueenSavageBeauty', 'runway', 'Dress from the “Eshu” collection', 'Exhibition photograph, “Savage Beauty”', 'Photographed 2015', ''],
  ['mcqueenMusee4', 'runway', 'Alexander McQueen, exhibition display', 'Exhibition photograph', 'Taken 2023', ''],
  ['mcqueenMusee10', 'runway', 'Alexander McQueen, long garment', 'Exhibition photograph', 'Taken 2023', ''],
  ['gaultierConeBra', 'runway', 'Jean Paul Gaultier conical corset', 'Museum object photograph', 'No date recorded', ''],
  ['gaultierBustier', 'runway', 'Jean Paul Gaultier bustier', 'Exhibition photograph', 'No date recorded', ''],
  ['gaultierDrawings', 'runway', 'Drawings for Madonna’s Blond Ambition wardrobe', 'Archive drawings by Jean Paul Gaultier', 'Tour wardrobe, 1990', ''],
  ['gaultierKunsthal', 'runway', 'Jean Paul Gaultier retrospective look', 'Exhibition photograph', 'Taken 2013', ''],
  ['dressOfTheYear', 'runway', 'Dress of the Year display', 'Museum group display, includes a John Galliano ensemble', 'Mixed dates', ''],
  ['junyaDenimJacket', 'denim', 'Junya Watanabe for Comme des Garçons, patchwork denim', 'Museum object photograph', '2002', ''],
  ['jeansOnly2002', 'denim', '“Only” sponge-wash wide-leg jeans with crochet top', 'Museum object photograph', '2002', ''],
  ['lowRiseJeans', 'denim', 'Low-rise denim with a lace-up corset top', 'Period photograph', '2006', ''],
  ['lowRiseGirl', 'denim', 'Low-rise jeans, California', 'Period photograph', '2005', ''],
  ['bigChanelBag', 'denim', 'Large quilted Chanel bag worn with jeans', 'Period photograph', '2007', ''],
  ['tracksuitJacket', 'streetwear', 'Tracksuit jacket', 'Museum object photograph, Auckland Museum', '2000', ''],
  ['tracksuitPants', 'streetwear', 'Tracksuit pants', 'Museum object photograph, Auckland Museum', '2000', ''],
  ['tracksuitDetail', 'streetwear', 'Tracksuit jacket, detail', 'Museum object photograph, Auckland Museum', '2000', ''],
  ['tshirt1999', 'streetwear', 'T-shirt', 'Museum object photograph, Auckland Museum', '1999', ''],
  ['tshirtShorts1999', 'streetwear', 'T-shirt, shorts and armband set', 'Museum object photograph, Auckland Museum', '1999', ''],
  ['eckoShirt', 'streetwear', 'Oversized Ecko Unlimited T-shirt', 'Museum object photograph', 'No date recorded', ''],
  ['eckoJeans', 'streetwear', 'Ecko Unlimited baggy-fit denim shorts', 'Museum object photograph', 'No date recorded', ''],
  ['edHardyRunway', 'streetwear', 'Ed Hardy runway', 'Show photograph, at the end of the brand’s peak', '2008', ''],
  ['edHardyShoe', 'streetwear', 'Ed Hardy running shoe', 'Product photograph', '2008', ''],
  ['vonDutchCap', 'streetwear', 'Von Dutch trucker cap', 'Product photograph', '2006', ''],
  ['dieselWall', 'streetwear', 'Diesel branding', 'Photograph of retail branding', '2006', ''],
  ['bapeHarajuku', 'streetwear', 'BAPE store, Harajuku', 'Later photograph of the store', '2015', ''],
  ['bapeInside', 'streetwear', 'Inside BAPE', 'Later photograph of a store interior', '2009', ''],
  ['missSixtyStore', 'streetwear', 'Miss Sixty, Neal Street, London', 'Photograph of a storefront', 'No date recorded', ''],
  ['juicyOutside', 'streetwear', 'Juicy Couture storefront', 'Photograph of a storefront', '2007', ''],
  ['juicyInside', 'streetwear', 'Juicy Couture store interior', 'Photograph of a store interior', '2007', ''],
  ['aaliyahPortrait', 'celebrity', 'Aaliyah', 'Period photograph', '2000', ''],
  ['aaliyahEditorial', 'celebrity', 'Aaliyah', 'Period photograph', '2000', ''],
  ['beyonceYoung', 'celebrity', 'Beyoncé Knowles, aged nineteen', 'Period photograph', 'November 2001', ''],
  ['britneyNfl', 'celebrity', 'Britney Spears, NFL Kickoff', 'Period photograph, US Navy', 'September 2003', ''],
  ['britneyNavy', 'celebrity', 'Britney Spears', 'Period photograph, US Navy', 'September 2003', ''],
  ['christinaMtv', 'celebrity', 'Christina Aguilera, MTV Video Music Awards', 'Period photograph', '2006', ''],
  ['christinaDirrty', 'celebrity', 'Christina Aguilera performing “Dirrty”', 'Period photograph', '2006', ''],
  ['destinyChildLive', 'celebrity', 'Destiny’s Child, live', 'Period photograph', '2005', ''],
  ['destinyChildTour', 'celebrity', 'Destiny’s Child, tour', 'Period photograph', '2005', ''],
  ['gwenNoDoubt', 'celebrity', 'Gwen Stefani with No Doubt', 'Period photograph', '2003', ''],
  ['gwenNoDoubt2', 'celebrity', 'No Doubt, Summer Tour', 'Period photograph', '2003', ''],
  ['missyElliott', 'celebrity', 'Missy Elliott', 'Period photograph', '2006', ''],
  ['pharrell', 'celebrity', 'Pharrell Williams, Tokyo', 'Period photograph', '2007', ''],
  ['parisHilton', 'celebrity', 'Paris Hilton', 'Period photograph', '2005', ''],
  ['parisHilton2', 'celebrity', 'Paris Hilton', 'Period photograph', '2005', ''],
  ['sjp', 'celebrity', 'Sarah Jessica Parker', 'Period photograph', '2005', ''],
  ['beckham', 'celebrity', 'David Beckham', 'Period photograph', '2006', ''],
  ['jloMarc', 'celebrity', 'Jennifer Lopez', 'Period photograph', '2007', ''],
  ['tyraBanks', 'celebrity', 'Tyra Banks, Cannes', 'Period photograph', '2000', ''],
  ['christyTurlington', 'celebrity', 'Christy Turlington', 'Period photograph', '2000', ''],
  ['mariahCarey', 'celebrity', 'Mariah Carey, Cannes', 'Period photograph', '2000', ''],
  ['maryJBlige', 'celebrity', 'Mary J. Blige', 'Period photograph', '2006', ''],
  ['usher', 'celebrity', 'Usher', 'Period photograph', '2004', ''],
  ['ashanti', 'celebrity', 'Ashanti', 'Period photograph', '2001', ''],
  ['outkast', 'celebrity', 'Outkast', 'Period photograph', '2003', ''],
  ['rickyMartin', 'celebrity', 'Ricky Martin, Livin’ la Vida Loca Tour', 'Period photograph', '2000', ''],
  ['jessicaSimpson', 'celebrity', 'Jessica Simpson', 'Period photograph', '2004', ''],
  ['handbag1998', 'accessories', 'Handbag', 'Museum object photograph, Auckland Museum', '1998', ''],
  ['handbag1998b', 'accessories', 'Handbag, second view', 'Museum object photograph, Auckland Museum', '1998', ''],
  ['handbagPurse', 'accessories', 'Handbag and purse', 'Museum costume collection', 'No date recorded', ''],
  ['handbagPurseB', 'accessories', 'Handbag and purse, overhead view', 'Museum costume collection', 'No date recorded', ''],
  ['sunglasses2000', 'accessories', 'Orange-framed sunglasses with blue-grey lenses', 'Museum object photograph', 'c.2000', ''],
  ['sunglassesDisplay', 'accessories', 'Sunglasses display', 'Photograph of a retail display', '2007', ''],
  ['platformBuffalo', 'accessories', 'Buffalo platform trainer', 'Product photograph', '2005', ''],
  ['moonboot1999', 'accessories', 'Moon boot with neon polymer-clay detail', 'Museum object photograph', '1999', ''],
  ['adidasSuperstar', 'accessories', 'Adidas Superstar', 'Product photograph', 'No date recorded', ''],
  ['sneakersPurple', 'accessories', 'Sneakers and sweatpants', 'Studio photograph', 'No date recorded', ''],
  ['rhinestoneNecklace', 'accessories', 'Rhinestone necklace', 'Studio photograph', 'No date recorded', ''],
  ['rhinestoneNecklaceB', 'accessories', 'Rhinestone necklace, second view', 'Studio photograph', 'No date recorded', ''],
  ['rhinestoneBrooch', 'accessories', 'Rhinestone brooch', 'Studio photograph', 'No date recorded', ''],
  ['butterflyClips', 'accessories', 'Butterfly hair clips', 'Later photograph of a period accessory type', '2023', ''],
  ['studdedBelts', 'accessories', 'Studded belts', 'Photograph, illustrating a period accessory type', '2008', ''],
  ['cropTopPiercing', 'popculture', 'Crop top with a navel piercing', 'Period photograph', '2006', ''],
  ['cropTop', 'popculture', 'Crop top styling', 'Period photograph', '2003', ''],
  ['pvcShorts', 'cyber', 'Blue PVC shorts and top', 'Photograph, illustrating period club materials', '2003', ''],
  ['pvcShorts2', 'cyber', 'Blue PVC shorts and top, reverse', 'Photograph, illustrating period club materials', '2003', ''],
  ['pvcPants', 'cyber', 'PVC trousers', 'Studio photograph of the material', '2013', ''],
  ['cyberGoth', 'cyber', 'Cyber goth styling', 'Subculture photograph', '2008', ''],
  ['cyberGothAlice', 'cyber', 'Cybergoth styling', 'Subculture photograph', '2009', ''],
  ['gothWeekend', 'cyber', 'Goth weekend', 'Subculture photograph', '2001', ''],
  ['latexShow', 'cyber', 'Latex on the runway', 'Runway photograph, illustrating the material', '2012', ''],
  ['raveFashion', 'cyber', 'Harajuku street fashion', 'Street photograph, illustrating subcultural dress', 'No date recorded', ''],
  ['imacG3', 'popculture', 'iMac G3 in Bondi Blue', 'Product photograph', 'Model launched 1998', ''],
  ['ipodFirst', 'popculture', 'First-generation iPod', 'Product photograph', 'Model launched October 2001', ''],
  ['ipodFamily', 'popculture', 'The iPod line', 'Product photograph', 'No date recorded', ''],
  ['motorolaRazr', 'popculture', 'Motorola Razr V3', 'Product photograph', 'Model launched late 2004', ''],
  ['motorolaRazrPink', 'popculture', 'Motorola Razr V3, pink', 'Product photograph', 'Model launched late 2004', ''],
  ['nokia3310', 'popculture', 'Nokia 3310', 'Product photograph', 'Model launched 2000', ''],
  ['sidekick', 'popculture', 'T-Mobile Sidekick II', 'Product photograph', 'No date recorded', ''],
  ['blackberry', 'popculture', 'BlackBerry handsets', 'Product photograph', 'No date recorded', ''],
  ['tamagotchi', 'popculture', 'Tamagotchi', 'Product photograph', 'No date recorded', ''],
  ['walkman', 'popculture', 'Sony Walkman', 'Product photograph', 'No date recorded', ''],
  ['discman', 'popculture', 'Sony Discman', 'Product photograph', 'No date recorded', ''],
  ['minidisc', 'popculture', 'MiniDisc', 'Product photograph', 'No date recorded', ''],
  ['trlStudios', 'popculture', 'MTV TRL studios, Times Square', 'Broadcast location photograph', '2006', ''],
  ['blockbuster', 'advertising', 'Blockbuster Video store interior', 'Retail photograph', '2008', ''],
  ['blockbusterSign', 'advertising', 'Surviving Blockbuster Video sign', 'Retail photograph', '2018', ''],
  ['mallInterior', 'advertising', 'Shopping mall interior', 'Retail photograph', '2007', ''],
  ['myspaceShirt', 'advertising', 'MySpace novelty T-shirt', 'Photograph, illustrating early social media merchandise', '2008', ''],
  ['vintageRack', 'advertising', 'Browsing the racks', 'Later photograph of how the era is resold', '2025', ''],
  ['thriftRacks', 'advertising', 'Second-hand racks', 'Later photograph of resale culture', 'No date recorded', ''],
  ['revivalGenZ', 'advertising', 'Modern streetwear, Qingdao', 'Modern revival photograph — not period material', '2025', ''],
  ['revivalShanghai', 'advertising', 'Modern streetwear, Shanghai', 'Modern revival photograph — not period material', '2025', ''],
]

export const ARCHIVE_ITEMS = RAW.map(([key, category, title, note, yearLabel]) => {
  const image = IMG[key]
  if (!image) return null
  return {
    id: key,
    category,
    title,
    note,
    yearLabel,
    ...image,
  }
}).filter(Boolean)

export const ARCHIVE_COUNT = ARCHIVE_ITEMS.length

export function archiveByCategory(category, query = '') {
  const q = query.trim().toLowerCase()
  return ARCHIVE_ITEMS.filter((item) => {
    const matchesCategory = category === 'all' || item.category === category
    if (!matchesCategory) return false
    if (!q) return true
    return [item.title, item.note, item.yearLabel, item.credit, item.alt]
      .filter(Boolean)
      .some((field) => String(field).toLowerCase().includes(q))
  })
}
