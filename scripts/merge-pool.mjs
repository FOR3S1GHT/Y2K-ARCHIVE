/**
 * Research helper: merges every gathered candidate into one de-duplicated pool.
 * Output: scripts/pool.json  (source-of-truth pool used when writing src/data/images.js)
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const files = [
  'image-candidates.json', 'category-images.json', 'precise-images.json', 'extra-images.json',
]

const pool = new Map()
let scanned = 0

const add = (item, bucket) => {
  if (!item?.url || !item?.title) return
  scanned += 1
  const key = item.title
  if (pool.has(key)) {
    if (!pool.get(key).buckets.includes(bucket)) pool.get(key).buckets.push(bucket)
    return
  }
  pool.set(key, { ...item, buckets: [bucket] })
}

for (const f of files) {
  const p = new URL(`./${f}`, import.meta.url)
  if (!existsSync(p)) continue
  const data = JSON.parse(readFileSync(p, 'utf8'))
  for (const [bucket, value] of Object.entries(data)) {
    if (Array.isArray(value)) value.forEach((i) => add(i, `${f.replace('.json', '')}:${bucket}`))
    else for (const [sub, arr] of Object.entries(value)) (arr || []).forEach((i) => add(i, `${f.replace('.json', '')}:${bucket}/${sub}`))
  }
}

const list = [...pool.values()].sort((a, b) => a.title.localeCompare(b.title))

// Quality signals so selection on the page side can prefer good candidates.
const year = (s) => {
  const m = String(s || '').match(/(19\d\d|20\d\d)/)
  return m ? Number(m[1]) : 0
}
const out = list.map((i) => ({
  title: i.title,
  url: i.url,
  page: i.page,
  artist: i.artist,
  licence: i.licence,
  date: i.date,
  year: year(i.date),
  w: i.width,
  h: i.height,
  description: (i.description || '').slice(0, 200),
  buckets: i.buckets,
}))

writeFileSync(new URL('./pool.json', import.meta.url), JSON.stringify(out, null, 2))
console.log(`scanned ${scanned} -> ${out.length} unique files`)
console.log('with a usable year:', out.filter((i) => i.year).length)
