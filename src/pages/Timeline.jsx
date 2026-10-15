import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight, CalendarRange, Crosshair } from 'lucide-react'

import SectionHeading from '../components/SectionHeading'
import DigitalLabel from '../components/DigitalLabel'
import TimelineItem from '../components/TimelineItem'
import TechDivider from '../components/TechDivider'
import MetallicButton from '../components/MetallicButton'
import ImageLightbox from '../components/ImageLightbox'

import { ERA_CHAPTERS, MILESTONES, YEARS, yearNote } from '../data/timeline'
import { IMG } from '../data/images'

const CHAPTER_TONE = {
  'pre-millennium': { text: 'text-electric-soft', border: 'border-electric/50', glow: 'bg-electric/10' },
  'new-millennium': { text: 'text-cyber', border: 'border-cyber/50', glow: 'bg-cyber/10' },
  'pop-glamour': { text: 'text-hotpink', border: 'border-hotpink/50', glow: 'bg-hotpink/10' },
  'reality-streetwear': { text: 'text-holo', border: 'border-holo/50', glow: 'bg-holo/10' },
}

export default function Timeline() {
  const [year, setYear] = useState(2000)
  const [lightbox, setLightbox] = useState(null)
  const reduce = useReducedMotion()
  const detailRef = useRef(null)

  const yearMilestones = useMemo(() => MILESTONES.filter((m) => m.year === year), [year])

  const lightboxItems = useMemo(
    () =>
      MILESTONES.map((milestone) => {
        const image = milestone.image ? IMG[milestone.image] : null
        if (!image) return null
        return {
          ...image,
          id: milestone.id,
          title: milestone.title,
          category: milestone.tag.toLowerCase(),
          yearLabel: milestone.date,
          note: milestone.body,
        }
      }).filter(Boolean),
    [],
  )

  const chapter = useMemo(
    () => ERA_CHAPTERS.find((c) => c.id === yearMilestones[0]?.chapter) || ERA_CHAPTERS[1],
    [yearMilestones],
  )

  const tone = CHAPTER_TONE[chapter.id] || CHAPTER_TONE['new-millennium']

  const yearIndex = YEARS.indexOf(year)
  const note = yearNote(year)
  const step = (direction) => {
    const next = YEARS[(yearIndex + direction + YEARS.length) % YEARS.length]
    setYear(next)
  }

  // Keep the detail panel in view when a year changes (never on first paint).
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (reduce) return
    detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [year, reduce])

  return (
    <>
      {/* ----------------------------------------------------------- MASTHEAD */}
      <section className="relative overflow-hidden border-b border-chrome/20">
        <div className="absolute inset-0 tech-grid opacity-50" aria-hidden="true" />
        <div
          className={`absolute -right-32 top-0 size-[30rem] rounded-full ${tone.glow} blur-[120px]`}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1800px] px-4 pb-10 pt-10 sm:px-6 lg:pt-14 xl:px-10">
          <div className="flex flex-wrap items-center gap-2">
            <DigitalLabel tone="cyber" marker="box">
              CHRONO_IDX.sys
            </DigitalLabel>
            <DigitalLabel tone="chrome">1997 — 2006</DigitalLabel>
            <DigitalLabel tone="holo">{MILESTONES.length} MILESTONES</DigitalLabel>
          </div>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 font-display text-[2.8rem] leading-[0.86] tracking-tight sm:text-[4rem] lg:text-[5.2rem]"
          >
            <span className="block text-metallic">TEN YEARS THAT</span>
            <span className="block chrome-plate">THOUGHT THEY WERE</span>
            <span className="block text-metallic">
              A <span className="text-electric-soft">BEGINNING.</span>
            </span>
          </motion.h1>

          <p className="mt-6 max-w-3xl font-editorial text-lg italic leading-relaxed text-chrome/70">
            A navigable record of 1997 to 2006. Choose any year and the archive loads that year’s milestones with their
            images and context. Dated events and interpretive readings are marked separately, so a judgement about a
            gradual shift is never presented as a fact.
          </p>
        </div>
      </section>

      {/* --------------------------------------------------- CHAPTER RAIL */}
      <section className="border-b border-chrome/20 bg-graphite">
        <div className="tech-grid">
          <div className="mx-auto grid max-w-[1800px] gap-px bg-chrome/10 sm:grid-cols-2 lg:grid-cols-4">
            {ERA_CHAPTERS.map((era) => {
              const active = era.id === chapter.id
              const eraTone = CHAPTER_TONE[era.id]
              const eraYears = YEARS.filter((y) => MILESTONES.some((m) => m.year === y && m.chapter === era.id))
              return (
                <button
                  key={era.id}
                  type="button"
                  onClick={() => setYear(eraYears[0] ?? year)}
                  aria-pressed={active}
                  className={`group bg-ink p-5 text-left transition-colors hover:bg-[#101118] ${
                    active ? 'ring-1 ring-inset ring-cyber/40' : ''
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${eraTone.text}`}>
                      {era.range}
                    </span>
                    {active ? (
                      <Crosshair className="size-3.5 text-cyber" aria-hidden="true" />
                    ) : (
                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-chrome/60">
                        {eraYears.length} YEARS
                      </span>
                    )}
                  </div>
                  <p
                    className={`mt-3 font-display text-xl leading-tight tracking-tight ${
                      active ? 'text-metallic' : 'text-chrome/65'
                    }`}
                  >
                    {era.label}
                  </p>
                  <p className="mt-3 line-clamp-3 font-editorial text-sm italic leading-relaxed text-chrome/70">
                    {era.blurb}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- YEAR SELECTOR */}
      <section
        aria-label="Select a year"
        className="sticky top-[57px] z-30 border-b border-chrome/20 bg-ink/95 backdrop-blur-lg"
      >
        <div className="mx-auto flex max-w-[1800px] items-center gap-3 px-4 py-3 sm:px-6 xl:px-10">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous year"
            className="border border-chrome/25 p-2.5 text-chrome/60 transition-colors hover:border-cyber/60 hover:text-cyber"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>

          <div className="no-scrollbar flex flex-1 items-center gap-1.5 overflow-x-auto">
            {YEARS.map((y) => {
              const active = y === year
              return (
                <button
                  key={y}
                  type="button"
                  onClick={() => setYear(y)}
                  aria-pressed={active}
                  aria-label={`Show ${y} milestones`}
                  className={[
                    'shrink-0 border px-3.5 py-2 font-display text-xl leading-none tracking-tight transition-colors sm:text-2xl',
                    active
                      ? 'border-cyber/70 bg-gradient-to-b from-cyber/25 to-transparent text-cyber'
                      : 'border-chrome/20 text-chrome/70 hover:border-chrome/50 hover:text-metallic',
                  ].join(' ')}
                >
                  {y}
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next year"
            className="border border-chrome/25 p-2.5 text-chrome/60 transition-colors hover:border-cyber/60 hover:text-cyber"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* --------------------------------------------------- YEAR DETAIL */}
      <section ref={detailRef} className="mx-auto max-w-[1800px] px-4 py-12 sm:px-6 xl:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-40">
            <motion.div
              key={year}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-chrome/65">YEAR IN FOCUS</p>
              <p className="mt-2 font-display text-[5.5rem] leading-[0.78] tracking-tight chrome-plate sm:text-[7rem] lg:text-[8.5rem]">
                {year}
              </p>
              <p className={`mt-4 font-mono text-[10px] uppercase tracking-[0.2em] ${tone.text}`}>{chapter.label}</p>
              <p className="mt-4 max-w-md font-editorial text-base italic leading-relaxed text-chrome/65">
                {chapter.blurb}
              </p>

              {note ? (
                <div className="mt-6 border border-chrome/20 bg-[#0b0c11]/70 p-4">
                  <p className="font-display text-lg leading-tight tracking-tight text-metallic">
                    {note.headline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-chrome/65">{note.note}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {note.mood.map((tag) => (
                      <span
                        key={tag}
                        className="border border-chrome/15 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-chrome/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              <dl className="mt-8 space-y-2 border-t border-chrome/15 pt-5 font-mono text-[10px] uppercase tracking-[0.16em]">
                {[
                  ['Chapter', chapter.range],
                  ['Milestones', `${yearMilestones.length} record${yearMilestones.length === 1 ? '' : 's'}`],
                  ['Dated events', `${yearMilestones.filter((m) => m.verified).length}`],
                  ['Interpretations', `${yearMilestones.filter((m) => !m.verified).length}`],
                ].map(([term, value]) => (
                  <div key={term} className="flex items-baseline justify-between gap-4 border-b border-chrome/10 pb-1.5">
                    <dt className="text-chrome/65">{term}</dt>
                    <dd className="text-right text-metallic/85">{value}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-5 flex items-start gap-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-chrome/60">
                <CalendarRange className="mt-0.5 size-3 shrink-0" aria-hidden="true" />
                Dates are given as recorded. Where a milestone is a reading of gradual change, it is marked
                INTERPRETATION.
              </p>
            </motion.div>
          </div>

          <div className="min-w-0">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-chrome/20 pb-3">
              <h2 className="font-display text-2xl leading-none tracking-tight text-metallic">
                {year} — MILESTONE RECORDS
              </h2>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-chrome/65">
                {String(YEARS.indexOf(year) + 1).padStart(2, '0')} / {String(YEARS.length).padStart(2, '0')}
              </span>
            </div>

            {yearMilestones.length === 0 ? (
              <p className="border border-dashed border-chrome/25 p-8 text-center font-editorial text-base italic text-chrome/70">
                No milestone records are held for {year}. Select another year from the rail above.
              </p>
            ) : (
              <ol className="space-y-5">
                {yearMilestones.map((milestone, index) => (
                  <TimelineItem
                    key={milestone.id}
                    milestone={milestone}
                    index={index}
                    image={milestone.image ? IMG[milestone.image] : null}
                    align={index % 2 === 0 ? 'left' : 'right'}
                    isActive
                    onOpenImage={
                      lightboxItems.some((i) => i.id === milestone.id)
                        ? () => setLightbox(lightboxItems.findIndex((i) => i.id === milestone.id))
                        : undefined
                    }
                  />
                ))}
              </ol>
            )}
          </div>
        </div>
      </section>

      <TechDivider
        label="FULL CHRONOLOGY // ALL RECORDS"
        code="SEQ-2000"
        className="mx-auto max-w-[1800px] px-4 sm:px-6 xl:px-10"
      />

      {/* --------------------------------------------------- FULL SEQUENCE */}
      <section className="mx-auto max-w-[1800px] px-4 py-14 sm:px-6 xl:px-10">
        <SectionHeading
          index="—"
          kicker="SEQUENTIAL VIEW"
          title="THE WHOLE LINE, START TO FINISH."
          standfirst="Every milestone in order, so the shape of the decade is visible at once rather than one year at a time."
        />

        <div className="mt-10 overflow-x-auto">
          <ol className="flex min-w-max gap-px bg-chrome/15">
            {MILESTONES.map((milestone) => {
              const eraTone = CHAPTER_TONE[milestone.chapter] || CHAPTER_TONE['new-millennium']
              const isCurrent = milestone.year === year
              return (
                <li key={milestone.id} className="w-56 shrink-0 bg-ink">
                  <button
                    type="button"
                    onClick={() => setYear(milestone.year)}
                    className={`h-full w-full p-4 text-left transition-colors hover:bg-[#101118] ${
                      isCurrent ? 'ring-1 ring-inset ring-cyber/40' : ''
                    }`}
                  >
                    <span className={`font-mono text-[9px] uppercase tracking-[0.2em] ${eraTone.text}`}>
                      {milestone.date}
                    </span>
                    <span className="mt-2 block font-display text-3xl leading-none text-chrome/60">
                      {milestone.year}
                    </span>
                    <span className="mt-3 block font-mono text-[10px] uppercase leading-snug tracking-[0.12em] text-metallic/85">
                      {milestone.title}
                    </span>
                    <span className="mt-3 block font-mono text-[9px] uppercase tracking-[0.16em] text-chrome/60">
                      {milestone.verified ? 'DATED EVENT' : 'INTERPRETATION'}
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <MetallicButton to="/icons" tone="chrome" size="md">
            SEE THE PEOPLE IN THIS TIMELINE
          </MetallicButton>
          <MetallicButton to="/archive" tone="ghost" size="md">
            BROWSE THE VISUAL ARCHIVE
          </MetallicButton>
        </div>
      </section>

      <ImageLightbox
        items={lightboxItems}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onNavigate={(direction) =>
          setLightbox((current) => {
            if (current === null || !lightboxItems.length) return current
            return (current + direction + lightboxItems.length) % lightboxItems.length
          })
        }
      />
    </>
  )
}
