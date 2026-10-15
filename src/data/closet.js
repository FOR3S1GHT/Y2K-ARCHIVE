import { IMG } from './images'

/**
 * Closet styling laboratory options.
 *
 * Each option carries its own photographic reference where a real, relevant
 * image exists. Options without a suitable photograph render as a typographic
 * swatch instead of borrowing an unrelated one.
 */

export const STYLES = [
  {
    id: 'cyber',
    label: 'Cyber',
    code: 'CYB',
    blurb: 'Vinyl, hardware and reflective surfaces. Built for a dark room with a strong light.',
    refs: ['pvcShorts', 'cyberGoth', 'pvcPants'],
    tone: 'holo',
  },
  {
    id: 'pop-princess',
    label: 'Pop Princess',
    code: 'POP',
    blurb: 'Crystal, skin and a dancer’s silhouette — the stage wardrobe of the singles chart.',
    refs: ['britneyNfl', 'christinaMtv', 'cropTop'],
    tone: 'pink',
  },
  {
    id: 'streetwear',
    label: 'Streetwear',
    code: 'STR',
    blurb: 'Oversized graphics, baggy denim and one very deliberate sneaker.',
    refs: ['eckoShirt', 'eckoJeans', 'bapeInside'],
    tone: 'cyber',
  },
  {
    id: 'sporty',
    label: 'Sporty',
    code: 'SPT',
    blurb: 'Technical fabric worn off the field. Comfortable, and photographed on purpose.',
    refs: ['tracksuitJacket', 'adidasSuperstar', 'tracksuitPants'],
    tone: 'cyber',
  },
  {
    id: 'minimalist',
    label: 'Minimalist',
    code: 'MIN',
    blurb: 'One clean line, one good surface, nothing that asks for attention.',
    refs: ['sunglasses2000', 'handbagPurse'],
    tone: 'chrome',
  },
  {
    id: 'glam',
    label: 'Glam',
    code: 'GLM',
    blurb: 'Embellishment worn as the whole point of the outfit.',
    refs: ['rhinestoneNecklace', 'bigChanelBag', 'sunglasses2000'],
    tone: 'chrome',
  },
]

export const TOPS = [
  { id: 'baby-tee', label: 'Baby Tee', note: 'Shrunken, cap-sleeve, ends above the waist.', ref: 'cropTop' },
  { id: 'mesh-top', label: 'Mesh Top', note: 'Transparent layer, usually over a solid colour.', ref: 'pvcShorts' },
  { id: 'fitted-tank', label: 'Fitted Tank', note: 'Ribbed, close to the body, plain.', ref: 'tshirt1999' },
  { id: 'metallic-top', label: 'Metallic Top', note: 'Coated or foil-finish jersey that reflects light.', ref: 'tracksuitJacket' },
]

export const BOTTOMS = [
  { id: 'low-rise-denim', label: 'Low-Rise Denim', note: 'Waistband on the hip. Bootcut or straight.', ref: 'lowRiseJeans' },
  { id: 'cargo-pants', label: 'Cargo Pants', note: 'Large patch pockets, wide leg, low slung.', ref: 'eckoJeans' },
  { id: 'miniskirt', label: 'Miniskirt', note: 'Denim, leather or coated. Cut short and high.', ref: 'jeansOnly2002' },
  { id: 'flared-jeans', label: 'Flared Jeans', note: 'Narrow through the thigh, wide at the hem.', ref: 'lowRiseGirl' },
]

export const FOOTWEAR = [
  { id: 'platform-sneakers', label: 'Platform Sneakers', note: 'Deep sole, chunky upper, worn with a narrow silhouette.', ref: 'platformBuffalo' },
  { id: 'chunky-boots', label: 'Chunky Boots', note: 'Knee-high or stacked sole. Winter version of the same idea.', ref: 'moonboot1999' },
  { id: 'futuristic-trainers', label: 'Futuristic Trainers', note: 'Shell toe or technical runner, kept very clean.', ref: 'adidasSuperstar' },
]

export const ACCESSORIES = [
  { id: 'tinted-glasses', label: 'Tinted Glasses', note: 'Shield or wraparound, mirror lens.', ref: 'sunglasses2000' },
  { id: 'mini-bag', label: 'Mini Bag', note: 'Shoulder-strap, sized for a phone and one lip gloss.', ref: 'handbag1998' },
  { id: 'butterfly-clips', label: 'Butterfly Clips', note: 'Clustered on one side, not distributed evenly.', ref: 'butterflyClips' },
  { id: 'statement-jewellery', label: 'Statement Jewellery', note: 'Crystal hoops, layered chains, one rhinestone piece.', ref: 'rhinestoneNecklace' },
]

export const CLOSET_SLOTS = [
  { id: 'top', label: 'Tops', options: TOPS, code: 'TOP' },
  { id: 'bottom', label: 'Bottoms', options: BOTTOMS, code: 'BTM' },
  { id: 'footwear', label: 'Footwear', options: FOOTWEAR, code: 'FTW' },
  { id: 'accessory', label: 'Accessories', options: ACCESSORIES, code: 'ACC' },
]

export const EMPTY_LOOK = { style: 'cyber', top: 'baby-tee', bottom: 'low-rise-denim', footwear: 'platform-sneakers', accessory: 'tinted-glasses' }

/** Resolve an image key into a usable record, or null when none exists. */
export function slotImage(ref) {
  return ref ? IMG[ref] || null : null
}

export function findOption(slotId, optionId) {
  const slot = CLOSET_SLOTS.find((s) => s.id === slotId)
  return slot?.options.find((o) => o.id === optionId) || null
}

export function findStyle(styleId) {
  return STYLES.find((s) => s.id === styleId) || STYLES[0]
}

/** Deterministic look naming, derived from the actual selection. */
const PREFIX = {
  cyber: ['CHROME', 'VOLTAGE', 'SECTOR', 'NEON', 'SIGNAL'],
  'pop-princess': ['CRYSTAL', 'SPOTLIGHT', 'BUBBLEGUM', 'STAGE', 'GLITTER'],
  streetwear: ['BLOCK', 'CONCRETE', 'LOGO', 'CORNER', 'ARCHIVE'],
  sporty: ['TRACK', 'STADIUM', 'SPRINT', 'COURTSIDE', 'FIELD'],
  minimalist: ['SILENT', 'BLANK', 'MONO', 'REFINED', 'QUIET'],
  glam: ['DIAMOND', 'PLATINUM', 'BLING', 'PAPARAZZI', 'CANDLELIGHT'],
}
const SUFFIX = ['SYSTEM', 'PROTOCOL', 'PROGRAM', 'OPERATOR', 'SEQUENCE', 'INTERFACE']

export function lookName(look) {
  const style = findStyle(look.style)
  const seed = `${look.style}${look.top}${look.bottom}${look.footwear}${look.accessory}`
  let hash = 0
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) % 999983
  const prefixes = PREFIX[style.id] || PREFIX.cyber
  return `${prefixes[hash % prefixes.length]} ${SUFFIX[hash % SUFFIX.length]}`
}

/** A written description of the combination a reader has actually assembled. */
export function lookDescription(look) {
  const style = findStyle(look.style)
  const top = findOption('top', look.top)
  const bottom = findOption('bottom', look.bottom)
  const footwear = findOption('footwear', look.footwear)
  const accessory = findOption('accessory', look.accessory)

  const opening = `A ${style.label.toLowerCase()} build: ${top?.label.toLowerCase()} with ${bottom?.label.toLowerCase()}, finished with ${footwear?.label.toLowerCase()} and ${accessory?.label.toLowerCase()}.`

  const reasoning = {
    cyber: 'The materials do the work here — every surface should be able to catch a light source. Keep the palette narrow and let one piece reflect.',
    'pop-princess': 'This is a stage silhouette translated for daylight: short on top, low on the hip, and one piece that has been deliberately over-embellished.',
    streetwear: 'Volume is the whole argument. One oversized piece, one fitted piece, and a sneaker that is clean enough to read as intentional.',
    sporty: 'Technical fabric worn as ordinary clothing. The trick is to avoid anything that looks like it was chosen for the gym.',
    minimalist: 'Nothing competes. Pick one good surface — a coating, a sharp collar, a single piece of hardware — and leave the rest plain.',
    glam: 'Embellishment is the subject rather than the detail. One piece should be doing all the shining.',
  }[style.id]

  const notes = [top?.note, bottom?.note, footwear?.note, accessory?.note].filter(Boolean)
  return `${opening} ${reasoning} ${notes.join(' ')}`
}

export function randomLook(current = {}) {
  const pickRandom = (options, currentId) => {
    const pool = options.filter((o) => o.id !== currentId)
    const source = pool.length ? pool : options
    return source[Math.floor(Math.random() * source.length)].id
  }
  return {
    style: pickRandom(STYLES.map((s) => ({ id: s.id })), current.style),
    top: pickRandom(TOPS, current.top),
    bottom: pickRandom(BOTTOMS, current.bottom),
    footwear: pickRandom(FOOTWEAR, current.footwear),
    accessory: pickRandom(ACCESSORIES, current.accessory),
  }
}
