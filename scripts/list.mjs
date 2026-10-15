/**
 * Research helper: compact candidate listing.
 *   node scripts/list.mjs "<regex>" [minYear] [maxYear] [limit]
 */
import { readFileSync } from 'node:fs'

const [, , pattern, minY = '0', maxY = '2100', limit = '60'] = process.argv
const re = new RegExp(pattern, 'i')
const pool = JSON.parse(readFileSync(new URL('./pool.json', import.meta.url), 'utf8'))
const hits = pool.filter(
  (i) => re.test(i.title) && (i.year === 0 || (i.year >= Number(minY) && i.year <= Number(maxY))),
)
console.log(`${hits.length} hits for /${pattern}/ ${minY}-${maxY}`)
for (const i of hits.slice(0, Number(limit))) {
  console.log(`${i.title.slice(0, 66).padEnd(68)}${String(i.year || '-').padEnd(6)}${i.w}x${i.h}`)
}
