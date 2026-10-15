/**
 * Build helper: consolidates the text-opacity scale.
 *
 * The WCAG fix raised many values, which left seven near-identical greys
 * (60/62/65/68/70/72/75) whose differences are imperceptible and read as
 * accidental inconsistency. This collapses them onto a deliberate four-step
 * scale, all still at or above the 4.5:1 contrast floor.
 *
 *   chrome 60 · chrome 65 · chrome 70 · chrome 80
 *   cyber 70 · cyber 80
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'

const MAP = {
  chrome: { 60: 60, 62: 60, 65: 65, 68: 70, 70: 70, 72: 70, 75: 80, 80: 80 },
  cyber: { 60: 70, 70: 70, 75: 80, 80: 80, 85: 80 },
  holo: { 80: 80 },
  hotpink: { 95: 100 },
  metallic: { 70: 70, 80: 85, 85: 85, 90: 90 },
  'electric-soft': { 90: 90, 95: 100 },
}

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(`${dir}/${e.name}`) : [`${dir}/${e.name}`],
  )

let updated = 0
const tally = {}

for (const file of walk('src').filter((f) => /\.(jsx|js)$/.test(f))) {
  const before = readFileSync(file, 'utf8')
  const after = before.replace(
    /text-(chrome|cyber|holo|hotpink|metallic|electric-soft)\/(\d+)/g,
    (match, colour, raw) => {
      const next = MAP[colour]?.[Number(raw)]
      if (!next || next === Number(raw)) return match
      tally[`${colour}/${raw} -> ${colour}/${next}`] = (tally[`${colour}/${raw} -> ${colour}/${next}`] || 0) + 1
      return `text-${colour}/${next}`
    },
  )
  if (after !== before) {
    writeFileSync(file, after, 'utf8')
    updated += 1
  }
}

console.log(`updated ${updated} files`)
for (const [k, v] of Object.entries(tally).sort()) console.log(`  ${k.padEnd(34)} x${v}`)

// Re-report the resulting scale so it can be eyeballed for sanity.
const final = {}
for (const file of walk('src').filter((f) => /\.(jsx|js)$/.test(f))) {
  for (const m of readFileSync(file, 'utf8').matchAll(/text-(chrome|cyber|holo|hotpink|metallic|electric-soft)\/(\d+)/g)) {
    final[`${m[1]}/${m[2]}`] = (final[`${m[1]}/${m[2]}`] || 0) + 1
  }
}
console.log('\nresulting scale:')
for (const [k, v] of Object.entries(final).sort()) console.log(`  ${k.padEnd(22)} x${v}`)
