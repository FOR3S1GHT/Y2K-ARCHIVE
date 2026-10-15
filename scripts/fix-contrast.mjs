/**
 * Build helper: normalises text-colour opacities across the project so every
 * small label meets WCAG AA (4.5:1) against the archive's dark surfaces.
 *
 * Measured minimum opacities on #09090D:
 *   chrome ≥ 60 · cyber ≥ 60 · holo ≥ 70 · hotpink ≥ 90
 *   metallic ≥ 50 · electric-soft ≥ 90 · electric never passes (3.63 max)
 *
 * Only `text-<colour>/<opacity>` utilities are touched; borders, backgrounds
 * and gradients keep the original palette values.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'

const MIN = {
  chrome: 60,
  cyber: 60,
  holo: 70,
  hotpink: 90,
  metallic: 50,
  'electric-soft': 90,
}

// Keep a visible hierarchy inside the compliant range.
const STEP = {
  chrome: { 5: 60, 10: 60, 12: 60, 15: 60, 18: 62, 20: 60, 25: 60, 30: 60, 35: 62, 40: 65, 45: 68, 50: 70, 55: 72 },
  cyber: { 60: 65, 70: 75, 80: 85, 90: 95 },
  holo: { 70: 75, 80: 85, 90: 95 },
  hotpink: { 30: 95, 50: 95, 60: 95, 70: 95, 80: 95, 90: 95 },
  metallic: { 50: 60, 70: 75, 80: 85, 85: 90, 90: 95 },
  'electric-soft': { 50: 95, 70: 95, 80: 95, 90: 95 },
}

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(`${dir}/${e.name}`) : [`${dir}/${e.name}`],
  )

const files = walk('src').filter((f) => f.endsWith('.jsx') || f.endsWith('.js'))
const changes = []
let updated = 0

for (const file of files) {
  const before = readFileSync(file, 'utf8')
  let after = before

  // text-<colour>/<opacity>
  after = after.replace(/text-(chrome|cyber|holo|hotpink|metallic|electric-soft)\/(\d+)/g, (match, colour, raw) => {
    const value = Number(raw)
    const floor = MIN[colour]
    if (value >= floor) return match
    const mapped = STEP[colour]?.[value] ?? floor
    const next = Math.max(mapped, floor)
    changes.push(`${file.split('src/')[1]}: ${match} -> text-${colour}/${next}`)
    return `text-${colour}/${next}`
  })

  // Bare text-electric (measured 3.63:1 — never compliant for text).
  after = after.replace(/text-electric(?!-soft)/g, 'text-electric-soft')

  if (after !== before) {
    writeFileSync(file, after, 'utf8')
    updated += 1
  }
}

console.log(`updated ${updated} files, ${changes.length} token replacements`)
const byToken = changes.reduce((acc, c) => {
  const token = c.split(': ')[1].split(' -> ')[0]
  acc[token] = (acc[token] || 0) + 1
  return acc
}, {})
console.log(
  Object.entries(byToken)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => `${k} x${v}`)
    .join('\n'),
)
