/**
 * Research helper: precise image sourcing.
 *  A) `list=allimages&aiprefix=`  -> every Commons file whose title starts with a name.
 *  B) person-year categories      -> verified period photographs.
 * Output: scripts/precise-images.json
 */
import { writeFileSync, existsSync, readFileSync } from 'node:fs'

const API = 'https://commons.wikimedia.org/w/api.php'
const UA = 'Y2KArchiveResearch/1.0 (frontend educational archive project)'
const CACHE = new URL('./.precise-cache.json', import.meta.url)

const PREFIXES = [
  'Britney Spears', 'Christina Aguilera', 'Aaliyah', 'Jennifer Lopez', 'Paris Hilton',
  'Nicole Richie', 'Gwen Stefani', 'Missy Elliott', 'Pharrell Williams', 'David Beckham',
  'Sarah Jessica Parker', 'Beyonce', 'Beyoncé', 'Kelly Rowland', 'Destiny',
  'John Galliano', 'Tom Ford', 'Alexander McQueen', 'Donatella Versace',
  'Jean Paul Gaultier', 'Marc Jacobs', 'Karl Lagerfeld', 'Miuccia Prada',
  'Von Dutch', 'Ed Hardy', 'Juicy Couture', 'Baby Phat', 'Rocawear', 'Ecko',
  'Bape', 'BAPE', 'Miss Sixty', 'Heatherette', 'True Religion',
  'Diesel', 'Supreme', 'Nokia 3310', 'Motorola Razr', 'Motorola RAZR', 'IPod', 'iPod',
  'Palm', 'Tamagotchi', 'MiniDisc', 'Butterfly hair', 'Rhinestone',
  'Low rise', 'Low-rise', 'Platform', 'Handbag', 'Sunglasses', 'Miniskirt',
  'Denim', 'Tracksuit', 'Crop top', 'Cargo', 'Velour', 'Hip hop fashion',
  'Street fashion', 'Trl', 'TRL', 'Myspace', 'MySpace', 'Blockbuster Video',
  'Baggy', 'Bling', 'Flip phone', 'Digital camera', 'Cyberdog',
]

const PERSON_YEAR_CATS = [
  'Britney Spears in 1999', 'Britney Spears in 2000', 'Britney Spears in 2001',
  'Britney Spears in 2002', 'Britney Spears in 2003', 'Britney Spears in 2004',
  'Christina Aguilera in 2000', 'Christina Aguilera in 2002', 'Christina Aguilera in 2003',
  'Aaliyah in 2000', 'Jennifer Lopez in 2000', 'Jennifer Lopez in 2001',
  'Jennifer Lopez in 2002', 'Jennifer Lopez in 2003',
  'Paris Hilton in 2003', 'Paris Hilton in 2004', 'Paris Hilton in 2005',
  'Gwen Stefani in 2002', 'Gwen Stefani in 2003', 'Gwen Stefani in 2004',
  'Missy Elliott in 2001', 'Missy Elliott in 2003',
  'David Beckham in 2002', 'David Beckham in 2003',
  'Sarah Jessica Parker in 2000', 'Sarah Jessica Parker in 2001',
  'Sarah Jessica Parker in 2002', 'Sarah Jessica Parker in 2003',
  'Kelly Rowland in 2001', 'Beyoncé in 2001', 'Beyoncé Knowles in 2001',
  'Destiny\u2019s Child in 2001',
  'Nicole Richie in 2005', 'Nicole Richie in 2006',
  'Pharrell Williams in 2003', 'Pharrell Williams in 2004',
  'John Galliano in 2000', 'John Galliano in 2001',
  'Alexander McQueen in 2000', 'Alexander McQueen in 2001',
  'Tom Ford in 2000',
  'Gwen Stefani in 2005',
  'Hilary Duff in 2004', 'Lindsay Lohan in 2004', 'Avril Lavigne in 2003',
  'Mariah Carey in 2000', 'Mariah Carey in 2003',
  'Madonna in 2000', 'Madonna in 2001', 'Madonna in 2003',
  'Victoria Beckham in 2003', 'Victoria Beckham in 2004',
  'Usher in 2004', 'Alicia Keys in 2004', 'Nelly in 2002', 'Ja Rule in 2002',
  'Eminem in 2002', '50 Cent in 2003', 'Snoop Dogg in 2004', 'Ludacris in 2004',
  'Ciara in 2005', 'Kanye West in 2004', 'Ashanti in 2002', 'Ashlee Simpson in 2004',
  'Jessica Simpson in 2004', 'Mandy Moore in 2001', 'Anna Nicole Smith in 2004',
  'Naomi Campbell in 2000', 'Kate Moss in 2000', 'Gisele Bündchen in 2002',
  'Tyra Banks in 2002', 'Heidi Klum in 2003',
]

const strip = (u) => (u ? u.split('?')[0].replace('thumb.wikimedia.org', 'upload.wikimedia.org') : u)
const clean = (s) =>
  typeof s === 'string' ? s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 300) : ''
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function api(params, attempt = 0) {
  const url = new URL(API)
  url.search = new URLSearchParams({ format: 'json', ...params }).toString()
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (res.status === 429 || res.status >= 500) {
    if (attempt < 4) { await sleep(4000 * (attempt + 1)); return api(params, attempt + 1) }
    throw new Error(`HTTP ${res.status}`)
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

const MAX_W = 1400
/** Build a Commons thumbnail URL from an original file URL. */
function buildThumb(originalUrl, width) {
  const u = (originalUrl || '').split('?')[0].replace('thumb.wikimedia.org', 'upload.wikimedia.org')
  const m = u.match(/^https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/([0-9a-f])\/([0-9a-f]{2})\/(.+)$/)
  if (!m) return u
  const [, a, b, name] = m
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${a}/${b}/${name}/${width}px-${name}`
}

const mapPage = (p) => {
  // Works for both prop=imageinfo ("pages") and list=allimages (flat) responses.
  const info = p.imageinfo?.[0] || (p.url ? p : null)
  if (!info) return null
  const meta = p.imageinfo?.[0]?.extmetadata || p.extmetadata || {}
  if (!/^image\/(jpeg|png|webp)$/.test(info.mime || '')) return null
  const w = info.width || 0
  if (w < 600) return null
  const original = strip(info.url)
  const url = info.thumburl
    ? strip(info.thumburl)
    : w > MAX_W ? buildThumb(original, MAX_W) : original
  return {
    title: String(p.title || p.name || '').replace(/^File:/, ''),
    url,
    full: original,
    width: Math.min(w, MAX_W),
    height: Math.round(((info.height || w) * Math.min(w, MAX_W)) / Math.max(w, 1)),
    page: info.descriptionurl || p.descriptionurl,
    artist: clean(meta.Artist?.value) || 'Unknown author',
    licence: clean(meta.LicenseShortName?.value) || 'See file page',
    date: clean(meta.DateTimeOriginal?.value || meta.DateTime?.value),
    description: clean(meta.ImageDescription?.value),
  }
}

async function byPrefix(prefix) {
  try {
    const d = await api({
      action: 'query', list: 'allimages', aiprefix: prefix, ailimit: '120',
      aiprop: 'url|extmetadata|size|mime', iiurlwidth: '1400',
    })
    return (d.query?.allimages || []).map(mapPage).filter(Boolean)
  } catch (e) {
    console.error(`  ! prefix ${prefix}: ${e.message}`)
    return []
  }
}

async function byCategory(name) {
  try {
    const d = await api({
      action: 'query', generator: 'categorymembers', gcmtitle: `Category:${name}`,
      gcmtype: 'file', gcmlimit: '60', prop: 'imageinfo',
      iiprop: 'url|extmetadata|size|mime', iiurlwidth: '1400',
    })
    return Object.values(d?.query?.pages || {}).map(mapPage).filter(Boolean)
  } catch (e) {
    console.error(`  ! cat ${name}: ${e.message}`)
    return []
  }
}

const cache = existsSync(CACHE) ? JSON.parse(readFileSync(CACHE, 'utf8')) : {}
const out = { prefix: {}, personYear: {} }
let n = 0

for (const p of PREFIXES) {
  const key = `p:${p}`
  if (!cache[key]) {
    process.stdout.write(`prefix ${p}\n`)
    cache[key] = await byPrefix(p)
    n += 1
    writeFileSync(CACHE, JSON.stringify(cache, null, 2))
    await sleep(700)
  }
  out.prefix[p] = cache[key]
}

for (const c of PERSON_YEAR_CATS) {
  const key = `c:${c}`
  if (!cache[key]) {
    process.stdout.write(`cat ${c}\n`)
    cache[key] = await byCategory(c)
    n += 1
    writeFileSync(CACHE, JSON.stringify(cache, null, 2))
    await sleep(700)
  }
  out.personYear[c] = cache[key]
}

writeFileSync(new URL('./precise-images.json', import.meta.url), JSON.stringify(out, null, 2))
const total = Object.values(out.prefix).flat().length + Object.values(out.personYear).flat().length
console.log(`\nFetched ${n}. ${total} images.`)
