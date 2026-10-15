/**
 * Research helper: final gap-filling pass.
 * Output: scripts/extra-images.json
 */
import { writeFileSync, existsSync, readFileSync } from 'node:fs'

const API = 'https://commons.wikimedia.org/w/api.php'
const UA = 'Y2KArchiveResearch/1.0 (frontend educational archive project)'
const CACHE = new URL('./.extra-cache.json', import.meta.url)

const CATEGORIES = [
  'Fashion shows in 1999', 'Fashion shows in 2000', 'Fashion shows in 2001',
  'Fashion shows in 2002', 'Fashion shows in 2003', 'Fashion shows in 2004',
  'New York Fashion Week', 'Paris Fashion Week', 'Milan Fashion Week',
  "Victoria's Secret Fashion Show", 'Fashion week', 'Runway models', 'Catwalk',
  'Denim jackets', 'Jeans', 'Bell-bottoms', 'Mini skirts', 'High-heeled shoes',
  'Sneakers by brand', 'Adidas Superstar', 'Converse All Star', 'Buffalo shoes',
  'Puma shoes', 'Nike shoes', 'Boots', 'Cowboy boots',
  'Rappers', 'Hip hop musicians', 'Boy bands', 'Girl groups', 'Pop singers',
  'Music videos by year', 'Bling-bling', 'Gold jewellery', 'Pearl necklaces',
  'Chokers', 'Hair clips', 'Hoops (jewellery)', 'Costume jewellery',
  'Belly chain', 'Sunglasses by brand', 'Ray-Ban', 'Chanel handbags',
  'Louis Vuitton handbags', 'Fendi', 'Hermès bags',
  'Auckland Museum costume collection', 'Costume Collection, Auckland Museum',
  'Denim skirts', 'Fringed clothing', 'Tie-dye', 'Embroidered clothing',
  'Leather trousers', 'Hot pants', 'Tube tops', 'Halterneck tops',
]

const PREFIXES = [
  'Britney', 'Justin Timberlake', 'Lindsay Lohan', 'Hilary Duff', 'Avril Lavigne',
  'Usher', 'Kanye West', 'Ashanti', 'Mary J. Blige', 'Lil Kim', 'Pink (singer)',
  'Shakira', 'Ricky Martin', 'Enrique Iglesias', 'Outkast', 'Nelly', 'Ciara',
  'Gwen Stefani', 'Fergie', 'Nicole Scherzinger', 'Beyoncé', 'Rihanna',
  'Jessica Simpson', 'Mandy Moore', 'Kelly Clarkson', 'Eve (rapper)',
  'Buffalo (footwear)', 'Buffalo boots', 'Crocs',
  'Kate Moss', 'Naomi Campbell', 'Gisele', 'Tyra Banks', 'Heidi Klum',
  'Cindy Crawford', 'Christy Turlington', 'Adriana Lima', 'Alessandra Ambrosio',
  'Heatherette', 'Jeremy Scott', 'Anna Sui', 'Betsey Johnson', 'Roberto Cavalli',
  'Dolce & Gabbana', 'Yohji Yamamoto', 'Comme des Garçons', 'Raf Simons',
  'Helmut Lang', 'Calvin Klein', 'Tommy Hilfiger', 'Ralph Lauren',
  'Gap (clothing)', 'H&M', 'Zara', 'Forever 21', 'Topshop',
  'Blockbuster', 'Mall', 'Arcade', 'Karaoke', 'Flip phone', 'BlackBerry',
  'Sidekick', 'Pager', 'Walkman', 'Discman', 'Vinyl record shop',
]

const strip = (u) => (u ? u.split('?')[0].replace('thumb.wikimedia.org', 'upload.wikimedia.org') : u)
const clean = (s) =>
  typeof s === 'string' ? s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 300) : ''
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const MAX_W = 1400

function buildThumb(originalUrl, width) {
  const u = (originalUrl || '').split('?')[0].replace('thumb.wikimedia.org', 'upload.wikimedia.org')
  const m = u.match(/^https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/([0-9a-f])\/([0-9a-f]{2})\/(.+)$/)
  if (!m) return u
  const [, a, b, name] = m
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${a}/${b}/${name}/${width}px-${name}`
}

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

const mapPage = (p) => {
  const info = p.imageinfo?.[0] || (p.url ? p : null)
  if (!info) return null
  const meta = p.imageinfo?.[0]?.extmetadata || p.extmetadata || {}
  if (!/^image\/(jpeg|png|webp)$/.test(info.mime || '')) return null
  const w = info.width || 0
  if (w < 600) return null
  const original = strip(info.url)
  const url = info.thumburl ? strip(info.thumburl) : w > MAX_W ? buildThumb(original, MAX_W) : original
  return {
    title: String(p.title || p.name || '').replace(/^File:/, ''),
    url, full: original,
    width: Math.min(w, MAX_W),
    height: Math.round(((info.height || w) * Math.min(w, MAX_W)) / Math.max(w, 1)),
    page: info.descriptionurl || p.descriptionurl,
    artist: clean(meta.Artist?.value) || 'Unknown author',
    licence: clean(meta.LicenseShortName?.value) || 'See file page',
    date: clean(meta.DateTimeOriginal?.value || meta.DateTime?.value),
    description: clean(meta.ImageDescription?.value),
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
  } catch (e) { console.error(`  ! cat ${name}: ${e.message}`); return [] }
}

async function byPrefix(prefix) {
  try {
    const d = await api({
      action: 'query', list: 'allimages', aiprefix: prefix, ailimit: '80',
      aiprop: 'url|extmetadata|size|mime',
    })
    return (d.query?.allimages || []).map(mapPage).filter(Boolean)
  } catch (e) { console.error(`  ! prefix ${prefix}: ${e.message}`); return [] }
}

const cache = existsSync(CACHE) ? JSON.parse(readFileSync(CACHE, 'utf8')) : {}
const out = { categories: {}, prefixes: {} }
let n = 0

for (const c of CATEGORIES) {
  if (!cache[`c:${c}`]) {
    process.stdout.write(`cat ${c}\n`)
    cache[`c:${c}`] = await byCategory(c); n += 1
    writeFileSync(CACHE, JSON.stringify(cache, null, 2)); await sleep(600)
  }
  if (cache[`c:${c}`].length) out.categories[c] = cache[`c:${c}`]
}
for (const p of PREFIXES) {
  if (!cache[`p:${p}`]) {
    process.stdout.write(`prefix ${p}\n`)
    cache[`p:${p}`] = await byPrefix(p); n += 1
    writeFileSync(CACHE, JSON.stringify(cache, null, 2)); await sleep(600)
  }
  if (cache[`p:${p}`].length) out.prefixes[p] = cache[`p:${p}`]
}

writeFileSync(new URL('./extra-images.json', import.meta.url), JSON.stringify(out, null, 2))
console.log(`\nFetched ${n}. ${Object.values(out.categories).flat().length + Object.values(out.prefixes).flat().length} images.`)
