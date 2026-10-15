/**
 * Research helper: gathers verified Wikimedia Commons image metadata.
 * Not part of the app bundle. Output: scripts/image-candidates.json
 *
 * Queries the Commons API, retrieves real thumbnail URLs plus
 * artist / licence / date metadata so captions and credits are never fabricated.
 *
 * Resumable: results are cached per query in scripts/.cache.json so re-runs
 * only fetch what is missing. Throttled with retry/backoff for HTTP 429.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const API = 'https://commons.wikimedia.org/w/api.php'
const UA = 'Y2KArchiveResearch/1.0 (frontend educational archive project)'
const CACHE = new URL('./.cache.json', import.meta.url)
const OUT = new URL('./image-candidates.json', import.meta.url)

const QUERIES = {
  runway: [
    'John Galliano Dior runway 2000',
    'Alexander McQueen runway 2001',
    'Tom Ford Gucci runway 1999',
    'Versace runway 2000',
    'Jean Paul Gaultier runway 1995',
    'Chanel runway 2000s',
    'Prada runway 2000',
    'Louis Vuitton runway 2000s',
    'fashion week 2002 catwalk',
    'fashion show catwalk 2001',
    'Yves Saint Laurent 2002 runway',
    'Marc Jacobs 2002',
    'Miu Miu runway',
    'Viktor Rolf 2000s',
    'Betsey Johnson fashion show',
    'haute couture 2001 Paris',
  ],
  denim: [
    'low rise jeans 2000s',
    'denim skirt 2000s fashion',
    'denim jacket 1999',
    'jeans fashion 2000',
    'Diesel jeans store',
    'jeans advertisement',
  ],
  celebrity: [
    'Britney Spears 2001',
    'Britney Spears 2003',
    'Christina Aguilera 2002',
    'Destiny\u2019s Child 2001',
    'Beyonce Knowles 2001',
    'Aaliyah 2000',
    'Jennifer Lopez 2002',
    'Paris Hilton 2004',
    'Nicole Richie 2005',
    'Gwen Stefani 2003',
    'Missy Elliott 2003',
    'Pharrell Williams 2004',
    'David Beckham 2002',
    'Sarah Jessica Parker 2002',
    'John Galliano 2000',
    'Tom Ford 2000',
    'Alexander McQueen 2000',
    'Victoria Beckham 2003',
    'Kelly Rowland 2001',
    'Mary J Blige 2002',
  ],
  streetwear: [
    'hip hop fashion 2000s',
    'Rocawear',
    'Sean John clothing',
    'BAPE A Bathing Ape',
    'Supreme store New York',
    'Von Dutch trucker hat',
    'Ed Hardy clothing',
    'Juicy Couture tracksuit',
    'Baby Phat',
    'True Religion brand',
    'Ecko Unltd',
    'Adidas tracksuit 2000',
    'New York street fashion 2003',
    'skateboarder clothing 2000s',
  ],
  accessories: [
    'sunglasses 2000s wraparound',
    'handbag 2000s',
    'platform shoe fashion',
    'rhinestone jewellery',
    'butterfly hair clip',
    'statement necklace 2000s',
    'flip phone 2003',
    'MP3 player 2001 iPod',
    'converse sneakers 2000s',
    'high heel boots 2000s',
    'designer handbag',
  ],
  technology: [
    'iPod 2001',
    'Motorola Razr V3',
    'digital camera 2001',
    'Sony Walkman 2000',
    'CRT monitor desktop 2000',
    'Palm PDA 2000',
    'Nokia 3310',
    'cybercafe 2000s',
    'MiniDisc player',
    'Dial up internet modem 2000',
  ],
  culture: [
    'MTV Video Music Awards red carpet',
    'Grammy Awards 2001 red carpet',
    'music video film set',
    'Y2K computer anxiety',
    'cyberpunk subculture 2000s',
    'rave culture 2000',
    'blockbuster video store',
    'shopping mall 2000s',
    'teen magazine 2000s',
    'skateboarding 2001',
    'mySpace computer screen',
    'TRL MTV studio',
    'hip hop music video 2002',
    'reality television 2000s',
  ],
  cyber: [
    'cyber goth fashion',
    'rave fashion 1990s',
    'futuristic fashion costume',
    'metal fabric clothing',
    'holographic fabric',
    'techno club Berlin 1999',
    'cyberpunk cosplay neon',
    'latex clothing fashion',
    'PVC fashion',
    'space age fashion 1960s',
  ],
  advertising: [
    'fashion advertisement 1999',
    'vintage poster fashion 2000',
    'magazine advertisement 2000s',
    'perfume advertisement 2000s',
    'billboard advertising 2000s',
    'vintage fashion catalog page',
  ],
  fashionGeneral: [
    'fashion model photoshoot 2000',
    'hair straightening 2000s',
    'glitter makeup 2000s',
    'fashion 1999 runway',
    'sports clothing 2000 Adidas',
    'Nike sneakers 2000',
    'lip gloss makeup product',
    'jewelry store 2000s',
    'sunglasses display shop',
  ],
  revival: [
    'Y2K revival fashion',
    'Gen Z fashion 2020s',
    'thrift store clothing rack',
    'vintage clothing market',
  ],
}

const strip = (u) => (u ? u.split('?')[0].replace('thumb.wikimedia.org', 'upload.wikimedia.org') : u)
const clean = (s) =>
  typeof s === 'string' ? s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 300) : ''

const cache = existsSync(CACHE) ? JSON.parse(readFileSync(CACHE, 'utf8')) : {}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function api(params) {
  const url = new URL(API)
  url.search = new URLSearchParams({ format: 'json', ...params }).toString()
  const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' } })
  if (res.status === 429 || res.status >= 500) {
    const err = new Error(`HTTP ${res.status}`)
    err.retryable = true
    throw err
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

async function search(query, limit = 10) {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      const data = await api({
        action: 'query',
        generator: 'search',
        gsrnamespace: '6',
        gsrsearch: query,
        gsrlimit: String(limit),
        prop: 'imageinfo',
        iiprop: 'url|extmetadata|size|mime',
        iiurlwidth: '1600',
      })
      const pages = Object.values(data?.query?.pages || {})
      return pages
        .map((p) => {
          const info = p.imageinfo?.[0]
          if (!info) return null
          const meta = info.extmetadata || {}
          if (!/^image\/(jpeg|png|webp)$/.test(info.mime || '')) return null
          if ((info.width || 0) < 640) return null
          return {
            title: p.title.replace(/^File:/, ''),
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
    } catch (err) {
      if (!err.retryable || attempt === 3) {
        console.error(`  ! ${query}: ${err.message}`)
        return []
      }
      const wait = 4000 * (attempt + 1)
      console.error(`  ~ ${query}: ${err.message}, retry in ${wait}ms`)
      await sleep(wait)
    }
  }
  return []
}

const out = {}
const seen = new Set()
let fetched = 0

for (const [bucket, queries] of Object.entries(QUERIES)) {
  out[bucket] = []
  for (const q of queries) {
    if (!cache[q]) {
      process.stdout.write(`[fetch][${bucket}] ${q}\n`)
      cache[q] = await search(q)
      fetched += 1
      writeFileSync(CACHE, JSON.stringify(cache, null, 2))
      await sleep(900)
    }
    for (const r of cache[q]) {
      if (seen.has(r.title)) continue
      seen.add(r.title)
      out[bucket].push({ ...r, query: q })
    }
  }
}

writeFileSync(OUT, JSON.stringify(out, null, 2))
const total = Object.values(out).reduce((a, b) => a + b.length, 0)
console.log(`\nFetched ${fetched} new queries. Wrote ${total} unique candidates across ${Object.keys(out).length} buckets.`)
