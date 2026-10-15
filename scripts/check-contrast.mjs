/**
 * Verification helper: mathematically checks every text colour/opacity pair the
 * project actually uses against every surface the project actually uses.
 *
 * This substitutes for an in-browser audit: it replicates the WCAG 2.1 relative
 * luminance calculation over the real token values, so a passing result is
 * evidence rather than assertion.
 */
import { readFileSync, readdirSync } from 'node:fs'

/* ---- palette (must match @theme in src/index.css) ---------------------- */
const PALETTE = {
  ink: '#09090D',
  graphite: '#18191F',
  chrome: '#C8CDD3',
  metallic: '#F4F4F6',
  electric: '#2855FF',
  'electric-soft': '#6B8CFF',
  cyber: '#00F0FF',
  hotpink: '#FF3CAC',
  holo: '#B6A4FF',
}

// Surfaces that dark text is rendered on. `ink` is the archive's foundation
// background, so dark-on-dark is never intentional: text-ink only ever appears
// on a light fill (the hotpink cover-story badge, the metallic chrome plates).
const SURFACES = ['ink', 'graphite']
const LIGHT_SURFACES = ['chrome', 'metallic', 'hotpink', 'cyber', 'holo']

const hex = (h) => ({
  r: parseInt(h.slice(1, 3), 16),
  g: parseInt(h.slice(3, 5), 16),
  b: parseInt(h.slice(5, 7), 16),
})

const blend = (fg, bg, a) => ({
  r: fg.r * a + bg.r * (1 - a),
  g: fg.g * a + bg.g * (1 - a),
  b: fg.b * a + bg.b * (1 - a),
})

const luminance = ({ r, g, b }) => {
  const ch = (v) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b)
}

const contrast = (a, b) => {
  const l1 = luminance(a)
  const l2 = luminance(b)
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}

/* ---- collect every pair actually used ---------------------------------- */
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(`${dir}/${e.name}`) : [`${dir}/${e.name}`],
  )

const pairs = new Set()
for (const file of walk('src').filter((f) => /\.(jsx|js)$/.test(f))) {
  const src = readFileSync(file, 'utf8')
  for (const m of src.matchAll(/text-([a-z-]+)\/(\d+)/g)) pairs.add(`${m[1]}/${m[2]}`)
  for (const m of src.matchAll(/text-([a-z-]+)(?![\w/-])/g)) pairs.add(`${m[1]}/100`)
}

const SMALL_TEXT_MIN = 4.5
const results = []
const skipped = []

for (const pair of [...pairs].sort()) {
  const [colour, rawOpacity] = pair.split('/')
  if (!PALETTE[colour]) {
    skipped.push(pair)
    continue
  }
  const opacity = Number(rawOpacity) / 100
  // Dark text is only ever placed on a light fill, so check it there instead.
  const surfaces = colour === 'ink' ? LIGHT_SURFACES : SURFACES
  for (const surface of surfaces) {
    const fg = blend(hex(PALETTE[colour]), hex(PALETTE[surface]), opacity)
    results.push({ pair, surface, ratio: contrast(fg, hex(PALETTE[surface])) })
  }
}

const failures = results.filter((r) => r.ratio < SMALL_TEXT_MIN)

console.log(`checked ${pairs.size} colour/opacity tokens across ${SURFACES.length} surfaces`)
console.log(`  (${skipped.length} non-palette tokens skipped: ${skipped.join(', ') || 'none'})`)
console.log('')

if (failures.length === 0) {
  console.log(`PASS — every token meets WCAG AA (>= ${SMALL_TEXT_MIN}:1) for small text.`)
} else {
  console.log(`FAIL — ${failures.length} token/surface combinations below ${SMALL_TEXT_MIN}:1:`)
  for (const f of failures) console.log(`  ${f.pair.padEnd(22)} on ${f.surface.padEnd(9)} ${f.ratio.toFixed(2)}:1`)
}

console.log('\nlowest ratios (closest to the threshold):')
for (const r of results.sort((a, b) => a.ratio - b.ratio).slice(0, 8)) {
  console.log(`  ${r.pair.padEnd(22)} on ${r.surface.padEnd(9)} ${r.ratio.toFixed(2)}:1`)
}
