import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ChevronDown, Sparkles } from 'lucide-react'
import SmartImage from './SmartImage'
import DigitalLabel from './DigitalLabel'
import { TREND_CATEGORIES } from '../data/trends'

const CATEGORY_TONES = {
  denim: 'electric',
  glam: 'pink',
  sporty: 'cyber',
  cyber: 'holo',
  accessories: 'chrome',
  streetwear: 'cyber',
}

function categoryLabel(id) {
  return TREND_CATEGORIES.find((c) => c.id === id)?.label || id
}

/**
 * Expandable trend record. Collapsed it reads as an editorial plate;
 * expanded it reveals the full six-part record (context, garments,
 * materials, associations, modern styling, confidence).
 */
export default function TrendCard({ trend, image, index, layout = 'portrait', onOpenImage }) {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const tone = CATEGORY_TONES[trend.category] || 'chrome'

  const isWide = layout === 'wide'

  const rows = [
    { term: 'Typical garments', value: trend.garments },
    { term: 'Materials', value: trend.materials },
    { term: 'Associated with', value: trend.associated },
    { term: 'Subcultures', value: trend.subcultures },
    { term: 'Style it now', value: trend.modern },
  ]

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col border border-chrome/20 bg-[#0b0c11]/70 ${
        isWide ? 'lg:col-span-2 lg:flex-row' : ''
      }`}
    >
      <div className={`relative ${isWide ? 'lg:w-1/2 lg:shrink-0' : ''}`}>
        <button
          type="button"
          onClick={onOpenImage}
          aria-label={`View ${trend.name} image at full size`}
          className="block w-full cursor-zoom-in"
        >
          <SmartImage
            src={image?.src}
            alt={image?.alt || trend.name}
            ratio={isWide ? image?.ratio || 1.2 : image?.ratio}
            className="border-0 border-b border-chrome/15"
            imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            sizes={isWide ? '(max-width: 1024px) 100vw, 45vw' : '(max-width: 640px) 100vw, 33vw'}
          />
        </button>
        <span className="pointer-events-none absolute left-3 top-3 flex items-center gap-2">
          <span className="border border-metallic/25 bg-ink/75 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.2em] text-metallic/85 backdrop-blur-sm">
            {trend.code}
          </span>
        </span>
        <span className="pointer-events-none absolute right-3 top-3 border border-metallic/25 bg-ink/75 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.2em] text-metallic/85 backdrop-blur-sm">
          {trend.peak}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <DigitalLabel tone={tone} marker="box">
            {categoryLabel(trend.category)}
          </DigitalLabel>
          {index ? (
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-chrome/60">
              REC {String(index).padStart(2, '0')}
            </span>
          ) : null}
        </div>

        <h3 className="mt-3 font-display text-2xl leading-[0.95] tracking-tight text-metallic sm:text-3xl">
          {trend.name}
        </h3>

        <p className="mt-3 font-editorial text-sm italic leading-relaxed text-chrome/65">{trend.summary}</p>

        <p className="mt-4 text-sm leading-relaxed text-chrome/60">{trend.context}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {trend.garments.slice(0, 3).map((garment) => (
            <span
              key={garment}
              className="border border-chrome/15 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-chrome/70"
            >
              {garment}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-5 flex items-center justify-between gap-3 border-t border-chrome/15 pt-3 text-left font-mono text-[10px] uppercase tracking-[0.2em] text-chrome/60 transition-colors hover:text-cyber"
        >
          {open ? 'COLLAPSE RECORD' : 'FULL RECORD'}
          <ChevronDown className={`size-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>

        <motion.div
          initial={false}
          animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <dl className="mt-4 divide-y divide-chrome/10">
            {rows.map((row) => (
              <div key={row.term} className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
                <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-chrome/65">{row.term}</dt>
                <dd className="text-sm leading-relaxed text-chrome/70">
                  {Array.isArray(row.value) ? row.value.join(' · ') : row.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-3 flex items-start gap-2 border border-chrome/15 bg-[#0e0f14] p-3">
            <Sparkles className="mt-0.5 size-3.5 shrink-0 text-holo" aria-hidden="true" />
            <p className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-chrome/70">
              <span className="text-holo">CONFIDENCE · </span>
              {trend.confidence}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.article>
  )
}
