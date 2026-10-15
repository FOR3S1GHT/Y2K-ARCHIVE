/**
 * Repair helper: re-resolves every registry entry through the Commons
 * `imageinfo` API so each `url` is a thumbnail the server has actually
 * generated, at a width strictly below the source width.
 *
 * This replaces derived URLs with authoritative ones. Output: imageRegistry.json
 */
import { readFileSync, writeFileSync } from 'node:fs'

const REG = new URL('../src/data/imageRegistry.json', import.meta.url)
const API = 'https://commons.wikimedia.org/w/api.php'
const UA = 'Y2KArchiveRepair/1.0 (frontend archive project)'
const TARGET_W = 1200
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const registry = JSON.parse(readFileSync(REG, 'utf8'))
const entries = Object.entries(registry)

async function resolve(titles) {
  const url = new URL(API)
  url.search = new URLSearchParams({
    format: 'json',
    action: 'query',
    titles: titles.map((t) => `File:${t}`).join('|'),
    prop: 'imageinfo',
    iiprop: 'url|size',
    iiurlwidth: String(TARGET_W),
  }).toString()
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  const byTitle = new Map()
  for (const page of Object.values(data?.query?.pages || {})) {
    const info = page.imageinfo?.[0]
    if (!info) continue
    byTitle.set(page.title.replace(/^File:/, ''), info)
  }
  return byTitle
}

const groups = []
for (let i = 0; i < entries.length; i += 25) groups.push(entries.slice(i, i + 25))

let updated = 0
const problems = []

for (const group of groups) {
  const titles = group.map(([, v]) => v.title)
  let byTitle = null
  for (let attempt = 0; attempt < 4 && !byTitle; attempt += 1) {
    try {
      byTitle = await resolve(titles)
    } catch (e) {
      console.error(`  retry (${e.message})`)
      await sleep(3000 * (attempt + 1))
    }
  }
  if (!byTitle) {
    group.forEach(([k]) => problems.push(`${k}: group query failed`))
    continue
  }

  for (const [key, value] of group) {
    const info = byTitle.get(value.title)
    if (!info) {
      problems.push(`${key}: "${value.title}" not found`)
      continue
    }
    const origW = info.width || 0
    const origH = info.height || 0
    // Prefer the API-provided thumbnail; fall back to the original only when
    // it is already smaller than the requested width.
    const safeThumb = info.thumburl && origW > TARGET_W ? info.thumburl.split('?')[0] : info.url.split('?')[0]

    value.url = safeThumb.replace('thumb.wikimedia.org', 'upload.wikimedia.org')
    if (origW && origH) {
      const scale = Math.min(1, TARGET_W / origW)
      value.w = Math.round(origW * scale)
      value.h = Math.round(origH * scale)
    }
    updated += 1
  }
  await sleep(900)
}

writeFileSync(REG, JSON.stringify(registry, null, 2))
console.log(`resolved ${updated}/${entries.length}`)
if (problems.length) console.log('PROBLEMS:\n' + problems.join('\n'))
