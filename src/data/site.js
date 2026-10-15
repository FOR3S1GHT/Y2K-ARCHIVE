/** Shared site constants: navigation map, archive metadata and system copy. */

export const NAV_LINKS = [
  { id: 'home', path: '/', label: 'HOME', code: '01', module: 'PORTAL.SYS' },
  { id: 'trends', path: '/trends', label: 'TRENDS', code: '02', module: 'STYLE_MAG.dat' },
  { id: 'brands', path: '/brands', label: 'BRANDS', code: '03', module: 'FASHION_DB.dat' },
  { id: 'timeline', path: '/timeline', label: 'TIMELINE', code: '04', module: 'CHRONO_IDX.sys' },
  { id: 'icons', path: '/icons', label: 'ICONS', code: '05', module: 'CONTACT_SHEET.img' },
  { id: 'closet', path: '/closet', label: 'CLOSET', code: '06', module: 'STYLE_LAB.exe' },
  { id: 'culture', path: '/culture', label: 'CULTURE', code: '07', module: 'SIGNAL_FEED.mag' },
  { id: 'archive', path: '/archive', label: 'ARCHIVE', code: '08', module: 'IMAGE_MEMORY.db' },
  { id: 'about', path: '/about', label: 'ABOUT', code: '09', module: 'CONTROL_ROOM.sys' },
]

export const ORG = {
  name: 'Y2K//ARCHIVE',
  tagline: 'THE FUTURE WAS OURS.',
  range: '1997—2006',
  revision: 'REVISION 01',
  build: 'BUILD 2000.01',
  status: 'STYLE DATABASE ONLINE',
}

export const ERA_RANGE = { start: 1997, end: 2006 }

/** Marquee copy used across the interface. Real, non-misleading statements. */
export const TICKER_ITEMS = [
  'SYSTEM TIME // ARCHIVE CLOCK ONLINE',
  'ARCHIVE INDEX // 2000–2006',
  'SIGNAL RECEIVED',
  'MEMORY SECTOR 04',
  'STYLE DATABASE ONLINE',
  'Y2K//ARCHIVE — REVISION 01',
  'SOURCE IMAGERY — WIKIMEDIA COMMONS',
  'FICTION NOTICE — THIS OS IS FICTIONAL',
]

/** The fictional archive clock. Clearly presented as decorative. */
export function archiveStamp(offsetSeconds = 0) {
  const totalSeconds = 1 + Math.abs(offsetSeconds)
  const hh = String(Math.floor(totalSeconds / 3600) % 24).padStart(2, '0')
  const mm = String(Math.floor(totalSeconds / 60) % 60).padStart(2, '0')
  const ss = String(totalSeconds % 60).padStart(2, '0')
  return `${hh}:${mm}:${ss}`
}
