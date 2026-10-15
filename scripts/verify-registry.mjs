/**
 * Verification helper: confirms every registry entry still resolves to a real
 * Commons file, using batched API calls rather than one HTTP request per image.
 *
 * This avoids the 429 throttling that individual image fetches trigger, and it
 * checks the authoritative source rather than a CDN response.
 */
import { readFileSync } from 'node:fs'

const reg = JSON.parse(readFileSync(new URL('../src/data/imageRegistry.json', import.meta.url), 'utf8'))
const API = 'https://commons.wikimedia.org/w/api.php'
const UA = 'Y2KArchiveVerify/1.0 (frontend archive project)'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const entries = Object.entries(reg)
const groups = []
for (let i = 0; i < entries.length; i += 50) groups.push(entries.slice(i, i + 50))

const missing = []
let confirmed = 0
const seenTitles = new Set()

for (const group of groups) {
  const url = new URL(API)
  url.search = new URLSearchParams({
    format: 'json',
    action: 'query',
    titles: group.map(([, v]) => `File:${v.title}`).join('|'),
    prop: 'imageinfo',
    iiprop: 'url|size',
    iiurlwidth: '1200',
  }).toString()

  let data = null
  for (let attempt = 0; attempt < 5 && !data; attempt += 1) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA } })
      if (res.status === 429 || res.status >= 500) {
        await sleep(5000 * (attempt + 1))
        continue
      }
      data = await res.json()
    } catch {
      await sleep(4000)
    }
  }
  if (!data) {
    group.forEach(([k]) => missing.push(`${k}: API unavailable`))
    continue
  }

  const found = new Map()
  for (const page of Object.values(data.query?.pages || {})) {
    found.set(page.title.replace(/^File:/, ''), page)
  }

  for (const [key, value] of group) {
    const page = found.get(value.title)
    if (!page || page.missing !== undefined) {
      missing.push(`${key}: file not found on Commons`)
      continue
    }
    if (!page.imageinfo?.[0]?.url) {
      missing.push(`${key}: no imageinfo`)
      continue
    }
    confirmed += 1
    seenTitles.add(page.title)
  }
  await sleep(1500)
}

console.log(`CONFIRMED ON SOURCE: ${confirmed}/${entries.length}`)
if (missing.length) console.log('\nPROBLEMS:\n' + missing.join('\n'))
else console.log('Every record resolves to a real Commons file with a served thumbnail.')
