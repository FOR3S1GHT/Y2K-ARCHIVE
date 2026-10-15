import { BRANDS } from './brands'
import { TRENDS } from './trends'
import { MILESTONES, YEARS } from './timeline'
import { ICONS } from './icons'
import { ARCHIVE_ITEMS } from './archive'
import { CULTURE_CHAPTERS } from './culture'
import { GLOSSARY } from './glossary'

/**
 * Live counts derived from the data files, so the interface numbers can
 * never drift out of step with the archive's actual contents.
 */
export const BRAND_COUNT = BRANDS.length
export const TREND_COUNT = TRENDS.length
export const ICON_COUNT = ICONS.length
export const MILESTONE_COUNT = MILESTONES.length
export const YEAR_COUNT = YEARS.length
export const IMAGE_COUNT = ARCHIVE_ITEMS.length
export const CULTURE_COUNT = CULTURE_CHAPTERS.length
export const GLOSSARY_COUNT = GLOSSARY.length
export const ARTICLE_COUNT =
  BRAND_COUNT + TREND_COUNT + ICON_COUNT + MILESTONE_COUNT + CULTURE_COUNT + GLOSSARY_COUNT

export const STATS = [
  { label: 'Brand records', value: BRAND_COUNT, tone: 'chrome' },
  { label: 'Trend files', value: TREND_COUNT, tone: 'cyber' },
  { label: 'Style icons', value: ICON_COUNT, tone: 'holo' },
  { label: 'Milestones', value: MILESTONE_COUNT, tone: 'pink' },
  { label: 'Visual records', value: IMAGE_COUNT, tone: 'chrome' },
  { label: 'Culture features', value: CULTURE_COUNT, tone: 'electric' },
]
