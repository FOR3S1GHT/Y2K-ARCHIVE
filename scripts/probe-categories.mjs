/**
 * Research helper: resolves which Wikimedia Commons categories / Wikipedia articles
 * actually exist for the subjects this archive covers.
 * Output: scripts/category-probe.json
 */
import { writeFileSync } from 'node:fs'

const COMMONS = 'https://commons.wikimedia.org/w/api.php'
const WIKI = 'https://en.wikipedia.org/w/api.php'
const UA = 'Y2KArchiveResearch/1.0 (frontend educational archive project)'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function api(base, params, attempt = 0) {
  const url = new URL(base)
  url.search = new URLSearchParams({ format: 'json', ...params }).toString()
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (res.status === 429 || res.status >= 500) {
    if (attempt < 3) {
      await sleep(3000 * (attempt + 1))
      return api(base, params, attempt + 1)
    }
    throw new Error(`HTTP ${res.status}`)
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

// 1. Which category names exist?
const CATEGORY_PROBES = [
  'Fashion in 1997', 'Fashion in 1998', 'Fashion in 1999', 'Fashion in 2000',
  'Fashion in 2001', 'Fashion in 2002', 'Fashion in 2003', 'Fashion in 2004',
  'Fashion in 2005', 'Fashion in 2006', '2000s fashion', '1990s fashion',
  'John Galliano', 'Alexander McQueen', 'Tom Ford', 'Donatella Versace',
  'Gianni Versace', 'Jean Paul Gaultier', 'Karl Lagerfeld', 'Miuccia Prada',
  'Marc Jacobs', 'Juicy Couture', 'Von Dutch', 'Ed Hardy', 'True Religion',
  'Baby Phat', 'Rocawear', 'Ecko Unltd', 'A Bathing Ape', 'Supreme',
  'Diesel (brand)', 'Miss Sixty', 'Louis Vuitton', 'Dior', 'Chanel', 'Gucci',
  'Prada', 'Versace', 'Heatherette', "Delia's", 'Gadzooks', 'Fashion shows in Paris',
  'Fashion shows in New York City', 'Denim', 'Miniskirts', 'Handbags',
  'Sunglasses', 'Platform shoes', 'Flip phones', 'iPod', 'Digital cameras',
  'Rhinestones', 'Butterfly hair clips', 'Celebrity red carpet',
  'MTV Video Music Awards', 'Grammy Awards', 'Rave culture', 'Cyberpunk',
  'Fashion photography', 'Y2K', 'Hip hop fashion', 'Sneakers', 'Tracksuits',
  'Britney Spears', 'Christina Aguilera', "Destiny's Child", 'Aaliyah',
  'Jennifer Lopez', 'Paris Hilton', 'Nicole Richie', 'Gwen Stefani',
  'Missy Elliott', 'Pharrell Williams', 'David Beckham', 'Sarah Jessica Parker',
  'Fashion magazines', 'Music videos', 'Reality television',
]

const catResults = {}
for (const q of CATEGORY_PROBES) {
  try {
    const d = await api(COMMONS, {
      action: 'query', list: 'search', srnamespace: '14', srlimit: '3', srsearch: q,
    })
    catResults[q] = (d.query?.search || []).map((s) => s.title.replace(/^Category:/, ''))
  } catch (e) {
    catResults[q] = [`ERROR ${e.message}`]
  }
  await sleep(700)
}

// 2. Wikipedia lead images for people / brands.
const WIKI_TITLES = [
  'Britney Spears', 'Christina Aguilera', "Destiny's Child", 'Beyoncé', 'Kelly Rowland',
  'Aaliyah', 'Jennifer Lopez', 'Paris Hilton', 'Nicole Richie', 'Gwen Stefani',
  'Missy Elliott', 'Pharrell Williams', 'David Beckham', 'Sarah Jessica Parker',
  'John Galliano', 'Tom Ford', 'Alexander McQueen', 'Donatella Versace',
  'Jean Paul Gaultier', 'Karl Lagerfeld', 'Miuccia Prada', 'Marc Jacobs',
  'Juicy Couture', 'Von Dutch (brand)', 'Ed Hardy', 'True Religion (brand)',
  'Baby Phat', 'Rocawear', 'Ecko Unltd', 'Bape', 'Supreme (brand)',
  'Diesel (brand)', 'Miss Sixty', 'Heatherette', "Delia's", 'Gadzooks',
  'Louis Vuitton', 'Dior', 'Chanel', 'Gucci', 'Prada', 'Versace',
  'Y2K aesthetic', 'Low-rise jeans', 'Miniskirt', 'Baby tee', 'Tracksuit',
  'Platform shoe', 'Baguette (bag)', 'Fendi', 'Butterfly clip',
  'Motorola Razr', 'IPod Classic', 'Nokia 3310', 'Tamagotchi',
  'MTV', 'Total Request Live', 'Blockbuster (video store)', 'Myspace',
  'Teen pop', 'Nu metal', 'Crunk', 'Blog', 'Napster', 'IMac G3',
]

const wikiResults = {}
for (const t of WIKI_TITLES) {
  try {
    const d = await api(WIKI, {
      action: 'query', titles: t, prop: 'pageimages|info', piprop: 'original|thumbnail',
      pithumbsize: '1400', inprop: 'url', redirects: '1',
    })
    const page = Object.values(d.query?.pages || {})[0]
    wikiResults[t] = page && !page.missing
      ? { title: page.title, thumb: page.thumbnail?.source, orig: page.original?.source, url: page.fullurl }
      : 'MISSING'
  } catch (e) {
    wikiResults[t] = `ERROR ${e.message}`
  }
  await sleep(700)
}

writeFileSync(new URL('./category-probe.json', import.meta.url), JSON.stringify({ catResults, wikiResults }, null, 2))
console.log('done')
