/**
 * Verification helper: definitive check of the registry as it currently stands.
 *
 * Wikimedia throttles bursts, so this walks all 117 records slowly, treats
 * 400/403/429/5xx as "try again later" rather than as a broken link, and
 * reports the HTTP status plus the actual image content-type for each record.
 */
import { readFileSync, writeFileSync } from 'node:fs'

const REG = new URL('../src/data/imageRegistry.json', import.meta.url)
const REPORT = new URL('./verify-report.json', import.meta.url)
const registry = JSON.parse(readFileSync(REG, 'utf8'))
const entries = Object.entries(registry)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const RETRYABLE = new Set([400, 403, 408, 429, 500, 502, 503, 504])
const results = []

for (const [key, item] of entries) {
  let status = null
  let type = null
  let bytes = null

  for (let attempt = 0; attempt < 7; attempt += 1) {
    try {
      const res = await fetch(item.url, {
        headers: { 'User-Agent': 'Y2KArchiveVerify/2.0 (frontend archive project)' },
      })
      status = res.status
      if (status === 200) {
        type = res.headers.get('content-type')
        bytes = Number(res.headers.get('content-length') || 0)
        break
      }
      if (!RETRYABLE.has(status)) break
      await sleep(3000 * (attempt + 1))
    } catch (e) {
      status = `network: ${e.message}`
      await sleep(2500)
    }
  }

  const ok = status === 200 && /^image\//.test(type || '')
  results.push({ key, status, type, kb: bytes ? Math.round(bytes / 1024) : null, ok })
  process.stdout.write(ok ? '.' : 'x')
  await sleep(450)
}

writeFileSync(REPORT, JSON.stringify(results, null, 2))

const good = results.filter((r) => r.ok)
const bad = results.filter((r) => !r.ok)
const throttled = bad.filter((r) => RETRYABLE.has(r.status))

console.log(`\n\nLOADED OK   : ${good.length}/${results.length}`)
console.log(`THROTTLED   : ${throttled.length}`)
console.log(`TRULY BROKEN: ${bad.length - throttled.length}`)

if (good.length) {
  const sizes = good.map((r) => r.kb).filter(Boolean)
  console.log(`Payload      : ${sizes.reduce((a, b) => a + b, 0)} kB total, median ${sizes.sort((a, b) => a - b)[Math.floor(sizes.length / 2)]} kB`)
}
if (bad.length) {
  console.log('\nNOT CONFIRMED:')
  for (const r of bad) console.log(`  ${r.key.padEnd(20)} ${r.status}  ${registry[r.key].url.slice(0, 90)}`)
}
