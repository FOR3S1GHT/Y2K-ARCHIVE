import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Aperture, Film, Grid3x3, Rows3 } from 'lucide-react'

import SectionHeading from '../components/SectionHeading'
import DigitalLabel from '../components/DigitalLabel'
import IconCard from '../components/IconCard'
import SmartImage from '../components/SmartImage'
import TechDivider from '../components/TechDivider'
import Marquee from '../components/Marquee'
import { FilterBar } from '../components/ArchiveControls'

import { ICONS, ICON_FIELDS } from '../data/icons'
import { IMG } from '../data/images'

/** Contact-sheet strip across the top: every available portrait in one run. */
function ContactStrip() {
  const withImages = ICONS.filter((icon) => icon.image)

  return (
    <div className="border-y border-chrome/20 bg-[#08090c]">
      <div className="mx-auto max-w-[1800px] px-4 py-5 sm:px-6 xl:px-10">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-chrome/70">
            <Film className="size-3.5 text-hotpink" aria-hidden="true" />
            CONTACT SHEET // AVAILABLE NEGATIVES
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-chrome/60">
            {withImages.length} OF {ICONS.length} FRAMES AVAILABLE
          </p>
        </div>

        <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1">
          {ICONS.map((icon, index) => {
            const image = icon.image ? IMG[icon.image] : null
            return (
              <div key={icon.id} className="group relative w-24 shrink-0 sm:w-28">
                {image ? (
                  <SmartImage
                    src={image.src}
                    alt={image.alt}
                    ratio={0.76}
                    className="border-chrome/25"
                    imgClassName="grayscale transition-[filter,transform] duration-700 group-hover:grayscale-0 group-hover:scale-[1.06]"
                    sizes="112px"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="flex w-full items-center justify-center border border-dashed border-chrome/20 bg-graphite"
                    style={{ aspectRatio: 0.76 }}
                  >
                    <Aperture className="size-4 text-chrome/60" />
                  </div>
                )}
                <span className="mt-1 block truncate font-mono text-[8px] uppercase tracking-[0.14em] text-chrome/65">
                  {String(index + 1).padStart(2, '0')} {icon.name.split(' ')[0]}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function Icons() {
  const [field, setField] = useState('all')
  const [density, setDensity] = useState('editorial')
  const reduce = useReducedMotion()

  const counts = useMemo(() => {
    const map = { all: ICONS.length }
    ICON_FIELDS.forEach((f) => {
      if (f.id === 'all') return
      map[f.id] = ICONS.filter((i) => i.field === f.id).length
    })
    return map
  }, [])

  const filtered = useMemo(
    () => (field === 'all' ? ICONS : ICONS.filter((icon) => icon.field === field)),
    [field],
  )

  const lead = filtered[0]
  const rest = filtered.slice(1)

  return (
    <>
      {/* ------------------------------------------------------------ MASTHEAD */}
      <section className="relative overflow-hidden border-b border-chrome/20">
        <div className="absolute inset-0 tech-grid opacity-50" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1800px] gap-8 px-4 pb-10 pt-10 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:pt-14 xl:px-10">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <DigitalLabel tone="pink" marker="box">
                CONTACT_SHEET.img
              </DigitalLabel>
              <DigitalLabel tone="chrome">15 PROFILES</DigitalLabel>
              <DigitalLabel tone="holo">EDITORIAL MODE</DigitalLabel>
            </div>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 font-display text-[2.8rem] leading-[0.86] tracking-tight sm:text-[4rem] lg:text-[5rem]"
            >
              <span className="block chrome-plate">THE PEOPLE WHO</span>
              <span className="block text-metallic">MADE IT</span>
              <span className="block text-hotpink">CONTAGIOUS.</span>
            </motion.h1>

            <p className="mt-6 max-w-2xl font-editorial text-lg italic leading-relaxed text-chrome/70">
              These profiles are deliberately uneven. A pop performer, a producer, a footballer and a couturier reached
              fashion through completely different routes, and arranging them in a single format would flatten the very
              thing that makes the period interesting.
            </p>
          </div>

          <div className="border border-chrome/20 bg-[#0b0c11]/70 p-5">
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-chrome/70">
              <Aperture className="size-3.5 text-cyber" aria-hidden="true" />
              NOTE ON PORTRAITS
            </p>
            <p className="mt-3 text-sm leading-relaxed text-chrome/65">
              Every portrait in this contact sheet is an openly licensed photograph with its own date recorded beneath
              it. Where no licensed period portrait exists for a figure, the archive prints a typographic plate rather
              than illustrating the entry with someone else.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <DigitalLabel tone="cyber">SOURCED</DigitalLabel>
              <DigitalLabel tone="chrome">DATED</DigitalLabel>
            </div>
          </div>
        </div>
      </section>

      <ContactStrip />

      <Marquee
        items={[
          'FRAME 01 — BRITNEY SPEARS',
          'FRAME 04 — AALIYAH',
          'FRAME 10 — PHARRELL WILLIAMS',
          'FRAME 14 — TOM FORD',
          'FRAME 15 — ALEXANDER MCQUEEN',
          'SHUTTER // ARCHIVE INDEX 1997—2006',
        ]}
        tone="pink"
        speed="slow"
      />

      {/* ------------------------------------------------------------ CONTROLS */}
      <section className="sticky top-[57px] z-30 border-b border-chrome/20 bg-ink/95 backdrop-blur-lg">
        <div className="mx-auto flex max-w-[1800px] flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:gap-6 xl:px-10">
          <FilterBar
            options={ICON_FIELDS}
            value={field}
            onChange={setField}
            counts={counts}
            label="Field"
            className="lg:flex-1"
          />
          <div className="flex shrink-0 items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-chrome/65">Layout</span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setDensity('editorial')}
                aria-pressed={density === 'editorial'}
                aria-label="Editorial layout"
                className={`border p-2 transition-colors ${
                  density === 'editorial'
                    ? 'border-cyber/70 text-cyber'
                    : 'border-chrome/20 text-chrome/70 hover:border-chrome/50'
                }`}
              >
                <Grid3x3 className="size-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setDensity('compact')}
                aria-pressed={density === 'compact'}
                aria-label="Compact layout"
                className={`border p-2 transition-colors ${
                  density === 'compact'
                    ? 'border-cyber/70 text-cyber'
                    : 'border-chrome/20 text-chrome/70 hover:border-chrome/50'
                }`}
              >
                <Rows3 className="size-3.5" aria-hidden="true" />
              </button>
            </div>
            <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em] text-chrome/65">
              {String(filtered.length).padStart(2, '0')} FRAMES
            </span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ PROFILES */}
      <section className="mx-auto max-w-[1800px] px-4 py-12 sm:px-6 xl:px-10">
        {filtered.length === 0 ? (
          <p className="border border-dashed border-chrome/25 p-8 text-center font-editorial text-base italic text-chrome/70">
            No profiles are held for that field.
          </p>
        ) : (
          <>
            {/* Lead profile runs full width with a large frame */}
            {lead ? (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="mb-10 border border-chrome/20 bg-[#0b0c11]/70"
              >
                <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative">
                    {lead.image ? (
                      <SmartImage
                        src={IMG[lead.image]?.src}
                        alt={IMG[lead.image]?.alt}
                        ratio={0.95}
                        priority
                        className="border-0"
                        sizes="(max-width: 1024px) 100vw, 44vw"
                      />
                    ) : (
                      <div className="flex aspect-square items-center justify-center bg-graphite">
                        <span className="font-display text-3xl chrome-plate">{lead.name}</span>
                      </div>
                    )}
                    <span className="absolute left-0 top-0 bg-hotpink px-3 py-1 font-mono text-[9px] uppercase tracking-[0.24em] text-ink">
                      LEAD PROFILE
                    </span>
                  </div>

                  <div className="p-6 sm:p-8">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyber/80">
                      FRAME 01 · {lead.field.toUpperCase()} · {lead.years}
                    </p>
                    <h2 className="mt-4 font-display text-4xl leading-[0.9] tracking-tight text-metallic sm:text-5xl">
                      {lead.name}
                    </h2>
                    <p className="mt-5 font-editorial text-lg italic leading-relaxed text-chrome/80">{lead.bio}</p>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-chrome/65">
                          Signature elements
                        </p>
                        <ul className="mt-2.5 space-y-1.5">
                          {lead.signature.map((item) => (
                            <li key={item} className="flex gap-2 text-sm leading-snug text-chrome/70">
                              <span aria-hidden="true" className="mt-1.5 size-1 shrink-0 bg-hotpink/70" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-chrome/65">Influence</p>
                        <p className="mt-2.5 text-sm leading-relaxed text-chrome/65">{lead.influence}</p>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-chrome/15 pt-4">
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-chrome/65">Iconic moment</p>
                      <p className="mt-2 font-editorial text-base italic leading-relaxed text-chrome/70">
                        {lead.moment}
                      </p>
                    </div>

                    {lead.portraitNote ? (
                      <p className="mt-5 border border-chrome/12 bg-[#0e0f14] p-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-chrome/65">
                        {lead.portraitNote}
                      </p>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            ) : null}

            {/* Remaining profiles */}
            <div
              className={
                density === 'compact'
                  ? 'grid gap-5 lg:grid-cols-2'
                  : 'grid gap-6 sm:grid-cols-2 xl:grid-cols-3'
              }
            >
              {rest.map((icon, index) => (
                <IconCard
                  key={icon.id}
                  icon={icon}
                  image={icon.image ? IMG[icon.image] : null}
                  index={index + 1}
                  variant={density === 'compact' ? 'wide' : 'portrait'}
                />
              ))}
            </div>
          </>
        )}
      </section>

      <TechDivider
        label="EDITORIAL NOTE // REPRESENTATION"
        code="META"
        className="mx-auto max-w-[1800px] px-4 sm:px-6 xl:px-10"
      />

      <section className="mx-auto max-w-[1800px] px-4 py-14 sm:px-6 xl:px-10">
        <SectionHeading
          index="—"
          kicker="WHO IS MISSING"
          title="THIS LIST IS NOT NEUTRAL, AND IT IS NOT COMPLETE."
          standfirst="A contact sheet reflects what survived in openly licensed archives as much as it reflects who mattered. Both facts are recorded here."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="border border-chrome/20 bg-[#0b0c11]/70 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome/70">On survival</p>
            <p className="mt-3 text-sm leading-relaxed text-chrome/65">
              Photographs from this period survive unevenly. Tour and broadcast imagery was often professionally shot
              and licensed; magazine and paparazzi photography largely was not. An archive built only on openly licensed
              material therefore over-represents live performance and under-represents editorial styling.
            </p>
          </div>
          <div className="border border-chrome/20 bg-[#0b0c11]/70 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome/70">On parallel scenes</p>
            <p className="mt-3 text-sm leading-relaxed text-chrome/65">
              Y2K style was not one look. Distinct scenes existed in Seoul, Lagos, São Paulo, Mumbai and elsewhere with
              their own references and their own stars. They are not on this contact sheet, and their absence is a gap
              in the record rather than a judgement about importance.
            </p>
          </div>
          <div className="border border-chrome/20 bg-[#0b0c11]/70 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome/70">On the missing frame</p>
            <p className="mt-3 text-sm leading-relaxed text-chrome/65">
              One profile on this page has no photograph. Nicole Richie was central to the period’s celebrity styling,
              and no openly licensed portrait could be found. Rather than borrow an unrelated image, the archive prints
              a typographic plate and says why.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
