import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react'

import DigitalLabel from '../components/DigitalLabel'
import SmartImage from '../components/SmartImage'
import Marquee from '../components/Marquee'
import TechDivider from '../components/TechDivider'
import MetallicButton from '../components/MetallicButton'
import TrendCard from '../components/TrendCard'
import { FilterBar, SearchInput, EmptyState } from '../components/ArchiveControls'
import ImageLightbox from '../components/ImageLightbox'

import { TRENDS, TREND_CATEGORIES } from '../data/trends'
import { IMG } from '../data/images'
import { STATS } from '../data/stats'
import { ORG } from '../data/site'

/** Hero uses two images in an overlapping composition, magazine-cover style. */
function MagHero() {
  const reduce = useReducedMotion()
  const left = IMG.lowRiseJeans
  const right = IMG.tracksuitJacket

  return (
    <section className="relative overflow-hidden border-b border-chrome/20 bg-graphite">
      <div className="tech-grid">
        <div className="mx-auto grid max-w-[1800px] gap-8 px-4 pb-12 pt-10 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:pb-16 lg:pt-14 xl:px-10">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <DigitalLabel tone="pink" marker="box">
                STYLE_MAG.dat
              </DigitalLabel>
              <DigitalLabel tone="chrome">ISSUE 17 · 17 TREND FILES</DigitalLabel>
            </div>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 font-display text-[3rem] leading-[0.86] tracking-tight sm:text-[4.2rem] lg:text-[5rem]"
            >
              <span className="block text-metallic">THE ISSUE</span>
              <span className="block chrome-plate">THAT NEVER</span>
              <span className="block text-metallic">
                WENT <span className="text-electric-soft">OUT</span>
              </span>
              <span className="block text-hotpink">OF PRINT.</span>
            </motion.h1>

            <p className="mt-7 max-w-xl font-editorial text-lg italic leading-relaxed text-chrome/70">
              Seventeen trend files, arranged as a magazine rather than a grid. Each one records what the trend was,
              where it came from, what it was made of, who wore it, and how to wear it now without dressing as a
              costume.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-chrome/15 pt-6">
              {STATS.slice(1, 4).map((stat) => (
                <div key={stat.label}>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-chrome/65">{stat.label}</p>
                  <p className="mt-1 font-display text-2xl leading-none text-metallic">
                    {String(stat.value).padStart(2, '0')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Overlapping image pair */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <SmartImage
                  src={left?.src}
                  alt={left?.alt}
                  ratio={0.72}
                  priority
                  sizes="(max-width: 1024px) 45vw, 22vw"
                />
              </motion.div>
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-10"
              >
                <SmartImage
                  src={right?.src}
                  alt={right?.alt}
                  ratio={0.72}
                  priority
                  sizes="(max-width: 1024px) 45vw, 22vw"
                />
              </motion.div>
            </div>
            <span className="pointer-events-none absolute -bottom-2 left-2 border border-metallic/25 bg-ink/85 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-metallic/85 backdrop-blur-sm">
              COVER STOCK · 2000–2006
            </span>
          </div>
        </div>

        <Marquee
          items={[
            'DENIM // LOW-RISE, MINI, DOUBLE',
            'GLAM // CRYSTAL, FOIL, LOGO',
            'SPORTY // VELOUR, TECH, TRACK',
            'CYBER // MESH, VINYL, HARDWARE',
            'ACCESSORIES // MINI BAG, SHIELD, CLIP',
            'STREETWEAR // CARGO, GRAPHIC, SNEAKER',
          ]}
          tone="pink"
          speed="slow"
        />
      </div>
    </section>
  )
}

export default function Trends() {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [lightbox, setLightbox] = useState(null)

  const counts = useMemo(() => {
    const map = { all: TRENDS.length }
    TREND_CATEGORIES.forEach((c) => {
      if (c.id === 'all') return
      map[c.id] = TRENDS.filter((t) => t.category === c.id).length
    })
    return map
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return TRENDS.filter((trend) => {
      if (category !== 'all' && trend.category !== category) return false
      if (!q) return true
      return [trend.name, trend.summary, trend.context, trend.peak, trend.materials, trend.associated]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(q))
    })
  }, [category, query])

  const lightboxItems = useMemo(
    () =>
      filtered
        .map((trend) => {
          const image = IMG[trend.image]
          if (!image) return null
          return {
            ...image,
            id: trend.id,
            title: trend.name,
            category: trend.category,
            yearLabel: trend.peak,
            note: trend.summary,
          }
        })
        .filter(Boolean),
    [filtered],
  )

  // Editorial groupings: the first record runs wide, then alternating rhythm.
  const [lead, ...rest] = filtered

  const resetAll = () => {
    setCategory('all')
    setQuery('')
  }

  return (
    <>
      <MagHero />

      {/* ------------------------------------------------------- FILTER BAR */}
      <section className="sticky top-[57px] z-30 border-b border-chrome/20 bg-ink/95 backdrop-blur-lg">
        <div className="mx-auto flex max-w-[1800px] flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-end lg:gap-6 xl:px-10">
          <div className="lg:w-96 lg:shrink-0">
            <SearchInput
              value={query}
              onChange={setQuery}
              label="Search trend records"
              placeholder="SEARCH TRENDS…"
              id="trend-search"
            />
          </div>
          <FilterBar
            options={TREND_CATEGORIES}
            value={category}
            onChange={setCategory}
            counts={counts}
            label="Trend category"
            className="lg:flex-1"
          />
          <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-chrome/65">
            {String(filtered.length).padStart(2, '0')} / {String(TRENDS.length).padStart(2, '0')} SHOWN
          </p>
        </div>
      </section>

      {filtered.length === 0 ? (
        <section className="mx-auto max-w-[1800px] px-4 py-20 sm:px-6 xl:px-10">
          <EmptyState
            title="No trend records match that query"
            body="Try a garment — denim, mesh, velour — or a period such as 2001."
            onReset={resetAll}
          />
        </section>
      ) : (
        <>
          {/* ------------------------------------------------- LEAD FEATURE */}
          {lead ? (
            <section className="mx-auto max-w-[1800px] px-4 py-12 sm:px-6 lg:py-16 xl:px-10">
              <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
                <button
                  type="button"
                  onClick={() => setLightbox(0)}
                  className="group relative block cursor-zoom-in text-left"
                >
                  <SmartImage
                    src={IMG[lead.image]?.src}
                    alt={IMG[lead.image]?.alt || lead.name}
                    ratio={0.9}
                    priority
                    imgClassName="transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <span className="absolute left-0 top-0 bg-hotpink px-3 py-1 font-mono text-[9px] uppercase tracking-[0.24em] text-ink">
                    COVER STORY
                  </span>
                </button>

                <div className="flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-2">
                    <DigitalLabel tone="pink" marker="box">
                      {lead.code}
                    </DigitalLabel>
                    <DigitalLabel tone="chrome">{lead.peak}</DigitalLabel>
                  </div>
                  <h2 className="mt-5 font-display text-4xl leading-[0.9] tracking-tight text-metallic sm:text-5xl lg:text-6xl">
                    {lead.name}
                  </h2>
                  <p className="mt-5 max-w-xl font-editorial text-xl italic leading-relaxed text-chrome/80">
                    {lead.summary}
                  </p>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-chrome/65">{lead.context}</p>

                  <dl className="mt-7 grid gap-5 border-t border-chrome/15 pt-5 sm:grid-cols-2">
                    <div>
                      <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-chrome/65">
                        Materials
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed text-chrome/65">{lead.materials}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-chrome/65">
                        Style it now
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed text-chrome/65">{lead.modern}</dd>
                    </div>
                  </dl>

                  <p className="mt-6 border border-chrome/15 bg-[#0e0f14] p-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-chrome/70">
                    <span className="text-holo">CONFIDENCE · </span>
                    {lead.confidence}
                  </p>
                </div>
              </div>
            </section>
          ) : null}

          <TechDivider
            label="REMAINING RECORDS // EDITORIAL ORDER"
            code="INDEX"
            className="mx-auto max-w-[1800px] px-4 sm:px-6 xl:px-10"
          />

          {/* ------------------------------------------------- RECORD GRID */}
          <section className="mx-auto max-w-[1800px] px-4 py-12 sm:px-6 xl:px-10">
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {rest.map((trend, index) => {
                const image = IMG[trend.image]
                const globalIndex = filtered.indexOf(trend)
                return (
                  <TrendCard
                    key={trend.id}
                    trend={trend}
                    image={image}
                    index={globalIndex + 1}
                    layout={index % 5 === 0 ? 'wide' : 'portrait'}
                    onOpenImage={() => setLightbox(lightboxItems.findIndex((i) => i.id === trend.id))}
                  />
                )
              })}
            </div>
          </section>
        </>
      )}

      {/* ------------------------------------------------------- BUILD THE LOOK */}
      <section className="border-y border-chrome/20 bg-graphite">
        <div className="tech-grid">
          <div className="mx-auto grid max-w-[1800px] gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:py-20 xl:px-10">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <DigitalLabel tone="cyber" marker="box">
                  STYLE_LAB.exe
                </DigitalLabel>
                <DigitalLabel tone="chrome">BUILD THE LOOK</DigitalLabel>
              </div>
              <h2 className="mt-6 font-display text-4xl leading-[0.9] tracking-tight text-metallic sm:text-5xl">
                TAKE THE TRENDS INTO THE
                <span className="block chrome-plate">STYLING LABORATORY.</span>
              </h2>
              <p className="mt-5 max-w-xl font-editorial text-lg italic leading-relaxed text-chrome/70">
                Pick a style module, choose a top, a bottom, footwear and an accessory, and the lab composes a written
                look with a reference board of the real garments. Then save it, randomise it or copy the description.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <MetallicButton to="/closet" tone="electric" size="lg" Icon={Sparkles}>
                  BUILD THE LOOK
                </MetallicButton>
                <MetallicButton to="/icons" tone="chrome" size="lg" Icon={BookOpen}>
                  SEE WHO WORE IT
                </MetallicButton>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {['pvcShorts', 'tracksuitJacket', 'sunglasses2000', 'lowRiseJeans', 'butterflyClips', 'moonboot1999'].map(
                (key) => {
                  const image = IMG[key]
                  if (!image) return null
                  return (
                    <SmartImage
                      key={key}
                      src={image.src}
                      alt={image.alt}
                      ratio={1}
                      sizes="14vw"
                      imgClassName="transition-transform duration-700 hover:scale-105"
                    />
                  )
                },
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- NOTES */}
      <section className="mx-auto max-w-[1800px] px-4 py-14 sm:px-6 xl:px-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="border border-chrome/20 bg-[#0b0c11]/70 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome/70">On dating</p>
            <p className="mt-3 text-sm leading-relaxed text-chrome/65">
              Peak ranges describe when a trend was most visible, not when it was invented. The low waist is older than
              this archive; the velour tracksuit is not. Both are documented in the individual records.
            </p>
          </div>
          <div className="border border-chrome/20 bg-[#0b0c11]/70 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome/70">On attribution</p>
            <p className="mt-3 text-sm leading-relaxed text-chrome/65">
              Where a trend is credited to a specific designer, that credit is the industry’s account rather than an
              established fact, and the record says so. Trends with no single origin are marked as such.
            </p>
          </div>
          <div className="border border-chrome/20 bg-[#0b0c11]/70 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome/70">On coverage</p>
            <p className="mt-3 text-sm leading-relaxed text-chrome/65">
              These trends circulated most widely through North America, Western Europe and Japan. Distinct parallel
              styles existed elsewhere and are not described here. {ORG.revision}.
            </p>
            <Link
              to="/about"
              className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-cyber/80 transition-colors hover:text-cyber"
            >
              READ THE EDITORIAL PRINCIPLES <ArrowRight className="size-3" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <ImageLightbox
        items={lightboxItems}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onNavigate={(step) =>
          setLightbox((current) => {
            if (current === null) return current
            return (current + step + lightboxItems.length) % lightboxItems.length
          })
        }
      />
    </>
  )
}
