/**
 * Research helper: select candidates from the merged pool.
 *   node scripts/pick.mjs "<regex>" [minYear] [maxYear] [limit]
 */
import { readFileSync } from 'node:fs'

const [, , pattern, minY = '0', maxY = '2100', limit = '40'] = process.argv
const re = new RegExp(pattern, 'i')
const pool = JSON.parse(readFileSync(new URL('./pool.json', import.meta.url), 'utf8'))

const hits = pool.filter(
  (i) =>
    re.test(i.title) &&
    (i.year === 0 || (i.year >= Number(minY) && i.year <= Number(maxY))),
)

console.log(`${hits.length} matches for /${pattern}/ (${minY}-${maxY})\n`)
for (const i of hits.slice(0, Number(limit))) {
  console.log(
    `${i.title.slice(0, 58).padEnd(60)} ${String(i.year).padEnd(5)} ${i.w}x${i.h}  ${i.licence.slice(0, 18)}`,
  )
  console.log(`    ${i.url}`)
}
