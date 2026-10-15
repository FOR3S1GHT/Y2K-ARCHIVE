/**
 * Research helper: pulls curated image lists from specific Wikimedia Commons categories.
 * Category members are hand-curated by Commons editors, so relevance is far higher
 * than full-text search. Output: scripts/category-images.json
 */
import { writeFileSync, existsSync, readFileSync } from 'node:fs'

const API = 'https://commons.wikimedia.org/w/api.php'
const UA = 'Y2KArchiveResearch/1.0 (frontend educational archive project)'
const CACHE = new URL('./.catcache.json', import.meta.url)

const CATEGORIES = {
  eraRunway: [
    'Fashion in 1997', 'Fashion in 1998', 'Fashion in 1999', 'Fashion in 2000',
    'Fashion in 2001', 'Fashion in 2002', 'Fashion in 2003', 'Fashion in 2004',
    'Fashion in 2005', 'Fashion in 2006',
  ],
  eraFashion: [
    '2000s fashion', 'Female fashion in the 2000s', 'Male fashion in the 2000s',
    '1990s fashion', 'Female fashion in the 1990s', 'Male fashion in the 1990s',
  ],
  designerWork: [
    'Clothing designed by John Galliano', 'Alexander McQueen (brand)',
    'Green Versace dress of Jennifer Lopez', 'Cone bra corset',
    'Clothing designed by Alexander McQueen',
  ],
  streetwearBrands: [
    'A Bathing Ape', 'A Bathing Ape brand products', 'Ecko Unltd',
    'Miss Sixty', 'Miss Sixty, Milano', 'Von Dutch', 'Juicy Couture',
    'Diesel (brand)', 'Heatherette', 'Rocawear', 'Sean John', 'Baby Phat',
    'True Religion',
  ],
  trendGarments: [
    'Denim', 'Miniskirts', 'Handbags', 'Sunglasses', 'Platform shoes',
    'Tracksuits', 'Sneakers', 'Streetwear', 'Hip hop fashion', 'Crop tops',
    'Cargo pants', 'Rhinestones', 'Leather jackets', 'Puffer jackets',
    'Bandage dresses', 'Belly chains', 'Camisoles',
  ],
  tech: [
    'Flip phones', 'IPod', 'Digital cameras', 'Nokia 3310', 'Palm (PDA)',
    'MiniDisc', 'CRT monitors', 'IMac G3', 'Dial-up',
  ],
  people: [
    'Britney Spears', 'Christina Aguilera', 'Aaliyah', 'Jennifer Lopez',
    'Paris Hilton', 'Gwen Stefani', 'Missy Elliott', 'Pharrell Williams',
    'David Beckham', 'Sarah Jessica Parker in 1999', 'Sarah Jessica Parker in 2003',
    'Destiny\u2019s Child', 'Beyonc\u00e9', 'Kelly Rowland', 'Nicole Richie',
    'John Galliano', 'Tom Ford', 'Alexander McQueen',
  ],
  culture: [
    'Music videos', 'MTV Video Music Awards', 'Fashion photography',
    'Shopping malls', 'Arcades', 'Video rental shops', 'Sneaker culture',
    'Rave culture', 'Cyberpunk', 'Skateboarding',
  ],
}

const strip = (u) => (u ? u.split('?')[0].replace('thumb.wikimedia.org', 'upload.wikimedia.org') : u)
const clean = (s) =>
  typeof s === 'string' ? s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 300) : ''
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function api(params, attempt = 0) {
  const url = new URL(API)
  url.search = new URLSearchParams({ format: 'json', ...params }).toString()
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (res.status === 429 || res.status >= 500) {
    if (attempt < 3) {
      await sleep(3500 * (attempt + 1))
      return api(params, attempt + 1)
    }
    throw new Error(`HTTP ${res.status}`)
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

async function categoryFiles(name) {
  try {
    const d = await api({
      action: 'query',
      generator: 'categorymembers',
      gcmtitle: `Category:${name}`,
      gcmtype: 'file',
      gcmlimit: '70',
      prop: 'imageinfo',
      iiprop: 'url|extmetadata|size|mime',
      iiurlwidth: '1600',
    })
    return Object.values(d?.query?.pages || {})
      .map((p) => {
        const info = p.imageinfo?.[0]
        if (!info) return null
        const meta = info.extmetadata || {}
        if (!/^image\/(jpeg|png|webp)$/.test(info.mime || '')) return null
        if ((info.width || 0) < 700) return null
        return {
          title: p.title.replace(/^File:/, ''),
          category: name,
          url: strip(info.thumburl || info.url),
          full: strip(info.url),
          width: info.thumbwidth || info.width,
          height: info.thumbheight || info.height,
          page: info.descriptionurl,
          artist: clean(meta.Artist?.value) || 'Unknown author',
          credit: clean(meta.Credit?.value),
          licence: clean(meta.LicenseShortName?.value) || 'See file page',
          date: clean(meta.DateTimeOriginal?.value || meta.DateTime?.value),
          description: clean(meta.ImageDescription?.value),
          objectName: clean(meta.ObjectName?.value),
        }
      })
      .filter(Boolean)
  } catch (e) {
    console.error(`  ! ${name}: ${e.message}`)
    return []
  }
}

const cache = existsSync(CACHE) ? JSON.parse(readFileSync(CACHE, 'utf8')) : {}
const out = {}
let fetched = 0

for (const [bucket, cats] of Object.entries(CATEGORIES)) {
  out[bucket] = []
  const seen = new Set()
  for (const c of cats) {
    if (!cache[c]) {
      process.stdout.write(`[fetch][${bucket}] ${c}\n`)
      cache[c] = await categoryFiles(c)
      fetched += 1
      writeFileSync(CACHE, JSON.stringify(cache, null, 2))
      await sleep(800)
    }
    for (const item of cache[c]) {
      if (seen.has(item.title)) continue
      seen.add(item.title)
      out[bucket].push(item)
    }
  }
}

writeFileSync(new URL('./category-images.json', import.meta.url), JSON.stringify(out, null, 2))
const total = Object.values(out).reduce((a, b) => a + b.length, 0)
console.log(`\nFetched ${fetched} categories. ${total} unique images.`)
