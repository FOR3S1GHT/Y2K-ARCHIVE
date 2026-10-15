import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ChevronDown, Calendar, Globe2, User, ShieldAlert, ShieldCheck } from 'lucide-react'
import SmartImage from './SmartImage'
import DigitalLabel from './DigitalLabel'

const TONE_BY_CATEGORY = {
  luxury: 'chrome',
  denim: 'electric',
  streetwear: 'cyber',
  celebrity: 'pink',
  retail: 'holo',
}

/**
 * Encyclopaedia entry. The founding year and the peak year are shown as two
 * separate figures, because conflating them is the most common error made
 * about this period.
 */
export default function BrandEntry({ brand, image, index, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const reduce = useReducedMotion()
  const tone = TONE_BY_CATEGORY[brand.category] || 'chrome'
  const contested = brand.confidence === 'contested'

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group border border-chrome/20 bg-[#0b0c11]/70 transition-colors hover:border-chrome/40"
    >
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:gap-5 sm:p-5">
        {/* Identity plate or photograph */}
        <div className="w-full shrink-0 sm:w-40 lg:w-48">
          {image ? (
            <SmartImage
              src={image.src}
              alt={image.alt}
              ratio={1}
              className="border-chrome/25"
              imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="200px"
            />
          ) : (
            <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden border border-chrome/25 bg-gradient-to-br from-graphite to-ink">
              <div className="absolute inset-0 scanlines opacity-50" aria-hidden="true" />
              <span className="relative px-3 text-center font-display text-lg leading-tight tracking-tight chrome-plate">
                {brand.logoPlate}
              </span>
              <span className="absolute bottom-1.5 left-0 right-0 text-center font-mono text-[8px] uppercase tracking-[0.18em] text-chrome/60">
                NO VERIFIED IMAGE
              </span>
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <DigitalLabel tone={tone} marker="box">
              {brand.category.toUpperCase()}
            </DigitalLabel>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-chrome/60">
              REC {String(index).padStart(2, '0')}
            </span>
            <span
              className={`flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.16em] ${
                contested ? 'text-hotpink/100' : 'text-cyber/70'
              }`}
              title={contested ? 'A detail in this record is contested' : 'Dates in this record are documented'}
            >
              {contested ? (
                <ShieldAlert className="size-3" aria-hidden="true" />
              ) : (
                <ShieldCheck className="size-3" aria-hidden="true" />
              )}
              {contested ? 'CONTESTED DETAIL' : 'DOCUMENTED'}
            </span>
          </div>

          <h3 className="mt-2.5 font-display text-2xl leading-none tracking-tight text-metallic sm:text-3xl">
            {brand.name}
          </h3>

          <dl className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-chrome/15 pt-3 sm:grid-cols-4">
            <div>
              <dt className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-chrome/65">
                <Calendar className="size-3" aria-hidden="true" /> Founded
              </dt>
              <dd className="mt-1 font-display text-xl leading-none text-metallic">{brand.founded}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-chrome/65">
                <Calendar className="size-3" aria-hidden="true" /> Y2K peak
              </dt>
              <dd className="mt-1 font-display text-xl leading-none text-cyber">{brand.y2kWindow}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-chrome/65">
                <Globe2 className="size-3" aria-hidden="true" /> Origin
              </dt>
              <dd className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-chrome/80">{brand.origin}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-chrome/65">
                <User className="size-3" aria-hidden="true" /> Founder
              </dt>
              <dd className="mt-1 font-mono text-[11px] uppercase leading-snug tracking-[0.08em] text-chrome/80">
                {brand.founder}
              </dd>
            </div>
          </dl>

          <p className="mt-4 text-sm leading-relaxed text-chrome/65">{brand.role}</p>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="mt-4 flex w-full items-center justify-between gap-3 border-t border-chrome/15 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome/70 transition-colors hover:text-cyber"
          >
            {open ? 'CLOSE FILE' : 'FULL FILE'}
            <ChevronDown className={`size-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>

          <motion.div
            initial={false}
            animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <dl className="mt-3 divide-y divide-chrome/10">
              <Row term="Creative lead" value={brand.creativeLead} />
              <Row term="Signature" value={brand.signature} />
              <Row term="Role in Y2K" value={brand.role} />
              <Row term="Later history" value={brand.later} />
              {brand.note ? <Row term="Note on dating" value={brand.note} highlight /> : null}
            </dl>

            <div className="mt-4 flex flex-wrap gap-2">
              {brand.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-chrome/15 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-chrome/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}

function Row({ term, value, highlight = false }) {
  if (!value) return null
  return (
    <div className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
      <dt
        className={`font-mono text-[9px] uppercase tracking-[0.18em] ${
          highlight ? 'text-hotpink/100' : 'text-chrome/65'
        }`}
      >
        {term}
      </dt>
      <dd className="text-sm leading-relaxed text-chrome/70">{value}</dd>
    </div>
  )
}
