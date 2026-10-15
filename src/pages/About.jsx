import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { BookMarked, ExternalLink, Info, Search, ShieldCheck, Sparkles, Terminal } from 'lucide-react'

import SectionHeading from '../components/SectionHeading'
import DigitalLabel from '../components/DigitalLabel'
import SystemWindow from '../components/SystemWindow'
import Marquee from '../components/Marquee'
import TechDivider from '../components/TechDivider'
import MetallicButton from '../components/MetallicButton'
import SmartImage from '../components/SmartImage'
import { SearchInput, EmptyState } from '../components/ArchiveControls'

import { GLOSSARY, PRINCIPLES, COVERAGE_NOTE } from '../data/glossary'
import { ARCHIVE_ITEMS } from '../data/archive'
import { IMG } from '../data/images'
import { ORG, NAV_LINKS } from '../data/site'
import { STATS, ARTICLE_COUNT } from '../data/stats'

/** Every distinct source used in the archive, derived rather than typed by hand. */
function useCredits() {
  return useMemo(() => {
    const seen = new Map()
    ARCHIVE_ITEMS.forEach((item) => {
      const key = item.credit || 'Unknown author'
      if (!seen.has(key)) {
        seen.set(key, { credit: key, licence: item.licence, count: 0, example: item })
      }
      seen.get(key).count += 1
    })
    return [...seen.values()].sort((a, b) => b.count - a.count)
  }, [])
}

export default function About() {
  const [query, setQuery] = useState('')
  const [showAllCredits, setShowAllCredits] = useState(false)
  const reduce = useReducedMotion()
  const credits = useCredits()

  const filteredGlossary = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return GLOSSARY
    return GLOSSARY.filter(
      (entry) =>
        entry.term.toLowerCase().includes(q) || entry.definition.toLowerCase().includes(q),
    )
  }, [query])

  const visibleCredits = showAllCredits ? credits : credits.slice(0, 8)

  return (
    <>
      {/* ------------------------------------------------------------ MASTHEAD */}
      <section className="relative overflow-hidden border-b border-chrome/20">
        <div className="absolute inset-0 tech-grid opacity-60" aria-hidden="true" />
        <div className="absolute -left-40 top-0 size-[30rem] rounded-full bg-electric/10 blur-[130px]" aria-hidden="true" />

        <div className="relative mx-auto max-w-[1800px] px-4 pb-10 pt-10 sm:px-6 lg:pt-14 xl:px-10">
          <div className="flex flex-wrap items-center gap-2">
            <DigitalLabel tone="electric" marker="box">
              CONTROL_ROOM.sys
            </DigitalLabel>
            <DigitalLabel tone="cyber">{ORG.build}</DigitalLabel>
            <DigitalLabel tone="chrome">READ ONLY</DigitalLabel>
          </div>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 font-display text-[2.8rem] leading-[0.86] tracking-tight sm:text-[4rem] lg:text-[5rem]"
          >
            <span className="block chrome-plate">HOW THIS ARCHIVE</span>
            <span className="block text-metallic">DECIDES WHAT IS TRUE.</span>
          </motion.h1>

          <div className="mt-7 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
            <p className="max-w-2xl font-editorial text-lg italic leading-relaxed text-chrome/70">
              Y2K//ARCHIVE is two things joined together: a fictional computer interface built for atmosphere, and a
              genuine, sourced record of fashion between 1997 and 2006. The first is decoration and says so. The second
              is not to be taken lightly.
            </p>

            <div className="grid grid-cols-2 gap-px border border-chrome/20 bg-chrome/15">
              {[
                ['Sections', NAV_LINKS.length],
                ['Articles', ARTICLE_COUNT],
                ['Visual records', ARCHIVE_ITEMS.length],
                ['Glossary terms', GLOSSARY.length],
              ].map(([label, value]) => (
                <div key={label} className="bg-ink p-4">
                  <p className="font-display text-3xl leading-none text-metallic">{value}</p>
                  <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-chrome/65">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Marquee
          items={[
            'FICTION NOTICE — THE INTERFACE IS INVENTED',
            'SOURCED IMAGERY — WIKIMEDIA COMMONS',
            'DATES SEPARATED FROM REPUTATIONS',
            'LATER MATERIAL ALWAYS LABELLED',
            'Y2K//ARCHIVE — REVISION 01',
          ]}
          tone="electric"
        />
      </section>

      {/* ------------------------------------------------------------ WHAT Y2K MEANS */}
      <section className="mx-auto max-w-[1800px] px-4 py-16 sm:px-6 lg:py-20 xl:px-10">
        <SectionHeading
          index="01"
          kicker="DEFINITION"
          title="WHAT Y2K FASHION ACTUALLY MEANS."
          standfirst="The phrase describes a period and a look at the same time, which is why it is so often used loosely."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5 text-base leading-relaxed text-chrome/70">
            <p>
              Y2K is short for "Year 2000". The term began as a computing phrase — the Y2K bug was the expected failure
              of systems that stored dates in two digits when the calendar rolled from 1999 to 2000. It only later
              became the name of a decade and, after that, the name of a look.
            </p>
            <p>
              As a fashion term, "Y2K" is used in this archive to cover <strong className="text-metallic">1997 to
              2006</strong>. Those dates are a working range rather than a hard border. The period has a recognisable
              opening — the end of the 1990s, when minimalism gave way to surface and sparkle — and a recognisable
              close, when the wide leg narrowed, skinny denim arrived and a phone with a keyboard became the most
              interesting object in the room.
            </p>
            <p>
              The look itself is easier to describe than to date. It favoured a low waist, a small bag, a reflective
              surface, a large logo and a lens that covered more of the face than it needed to. Those choices are not
              arbitrary: each of them is a response to something happening outside fashion, whether that was music
              television, the luxury turnaround of the mid-1990s, or the arrival of cheap personal technology.
            </p>
            <p>
              Crucially, Y2K fashion is not one look and never was. A velour tracksuit, a rhinestone belt, a mesh top and
              a Nike shell-toe all belong to this period, and were worn by people who had almost nothing in common.
              Treating them as a single aesthetic is a modern convenience.
            </p>
          </div>

          <div className="space-y-4">
            <SystemWindow
              title="PERIOD_PARAMETERS.sys"
              status="DEFINED"
              tone="cyber"
              footer={`Archive index // ${ORG.range}`}
            >
              <dl className="divide-y divide-chrome/12 font-mono text-[10px] uppercase tracking-[0.14em]">
                {[
                  ['Period covered', '1997 — 2006'],
                  ['Pre-millennium', '1997 — 1999'],
                  ['New millennium', '2000 — 2001'],
                  ['Pop era', '2002 — 2003'],
                  ['Late period', '2004 — 2006'],
                  ['Coda entry', '2007'],
                ].map(([term, value]) => (
                  <div key={term} className="flex items-baseline justify-between gap-4 py-2">
                    <dt className="text-chrome/70">{term}</dt>
                    <dd className="text-right text-metallic/85">{value}</dd>
                  </div>
                ))}
              </dl>
            </SystemWindow>

            <div className="border border-chrome/20 bg-[#0b0c11]/70 p-4">
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-hotpink">
                <Info className="size-3.5" aria-hidden="true" />
                FICTION NOTICE
              </p>
              <p className="mt-3 text-sm leading-relaxed text-chrome/65">
                Y2K//ARCHIVE OS, its build numbers, boot sequence, system messages and simulated timestamps are
                invented for atmosphere. They are decorative. Nothing in the interface is a claim about a historical
                fact, and no invented label is ever attached to a real photograph.
              </p>
            </div>
          </div>
        </div>
      </section>

      <TechDivider label="ORIGINAL VS REVIVAL" code="SEC-02" className="mx-auto max-w-[1800px] px-4 sm:px-6 xl:px-10" />

      {/* ------------------------------------------------------------ ORIGINAL VS REVIVAL */}
      <section className="mx-auto max-w-[1800px] px-4 py-16 sm:px-6 xl:px-10">
        <SectionHeading
          index="02"
          kicker="THE DISTINCTION"
          title="ORIGINAL Y2K IS NOT THE SAME AS THE REVIVAL."
          standfirst="This is the most important distinction in the archive, and the one most often blurred."
        />

        <div className="mt-10 grid gap-px bg-chrome/15 lg:grid-cols-2">
          <div className="bg-ink p-6">
            <DigitalLabel tone="cyber" marker="box">
              ORIGINAL · 1997–2006
            </DigitalLabel>
            <ul className="mt-5 space-y-4">
              {[
                'Manufactured in a specific industrial moment, at a specific cost, often in very short runs.',
                'Distributed physically — through malls, catalogues, boutiques and department stores.',
                'Circulated through television, print magazines and the earliest social platforms.',
                'Trend cycles measured in months and seasons, set by broadcasters and publishers.',
                'Worn by people who did not know the period was going to have a name.',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-chrome/70">
                  <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 bg-cyber" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-ink p-6">
            <DigitalLabel tone="hotpink" marker="box">
              REVIVAL · 2019 ONWARD
            </DigitalLabel>
            <ul className="mt-5 space-y-4">
              {[
                'Reproduces the surfaces without the economic conditions that produced them.',
                'Much of it is built on resale — the revival has physically consumed part of the original period.',
                'Circulated through short video, where a look can travel in days rather than months.',
                'Frequently indistinguishable from the original in a photograph, and dated in the file instead.',
                'Often labelled "Y2K" regardless of whether the garment was made in 2002 or last year.',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-chrome/70">
                  <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 bg-hotpink" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {[
            { key: 'lowRiseJeans', label: 'Original', note: 'A period photograph from the middle of the era.' },
            { key: 'revivalGenZ', label: 'Revival', note: 'A 2025 photograph of modern streetwear.' },
          ].map((item) => {
            const image = IMG[item.key]
            return (
              <figure key={item.key} className="border border-chrome/20 bg-[#0b0c11]/70">
                <SmartImage src={image?.src} alt={image?.alt} ratio={1.5} className="border-0" sizes="45vw" />
                <figcaption className="flex flex-wrap items-baseline justify-between gap-3 p-4">
                  <span className="font-display text-lg leading-tight tracking-tight text-metallic">{item.label}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-chrome/70">
                    {image?.year || 'Date not recorded'} · {image?.licence}
                  </span>
                  <p className="w-full font-editorial text-sm italic leading-relaxed text-chrome/60">{item.note}</p>
                </figcaption>
              </figure>
            )
          })}
        </div>

        <div className="mt-8 border border-hotpink/30 bg-hotpink/5 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-hotpink">THE RULE THIS ARCHIVE FOLLOWS</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-chrome/70">
            A garment manufactured recently is never presented as a document of the period. Where a photograph was taken
            after 2009, its own year appears on the record — and the archive tells you whether it is a museum photograph
            of a period object, a product shot, or a picture of the revival itself.
          </p>
        </div>
      </section>

      <TechDivider label="EDITORIAL PRINCIPLES" code="SEC-03" className="mx-auto max-w-[1800px] px-4 sm:px-6 xl:px-10" />

      {/* ------------------------------------------------------------ PRINCIPLES */}
      <section className="mx-auto max-w-[1800px] px-4 py-16 sm:px-6 xl:px-10">
        <SectionHeading
          index="03"
          kicker="METHOD"
          title="SIX RULES THE ARCHIVE WORKS TO."
          standfirst="These are constraints rather than aspirations. They exist because fashion history is unusually easy to invent by accident."
        />

        <div className="mt-10 grid gap-px bg-chrome/15 sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((principle, index) => (
            <article key={principle.title} className="bg-ink p-6">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-display text-3xl leading-none text-chrome/60">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <ShieldCheck className="size-3.5 text-cyber/70" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-xl leading-tight tracking-tight text-metallic">
                {principle.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-chrome/65">{principle.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 border border-chrome/20 bg-[#0b0c11]/70 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome/70">ON COVERAGE</p>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-chrome/65">{COVERAGE_NOTE}</p>
        </div>
      </section>

      {/* ------------------------------------------------------------ CREDITS */}
      <section className="border-y border-chrome/20 bg-graphite">
        <div className="tech-grid">
          <div className="mx-auto max-w-[1800px] px-4 py-16 sm:px-6 xl:px-10">
            <SectionHeading
              index="04"
              kicker="SOURCES"
              title="IMAGE CREDITS & SOURCE REFERENCES."
              standfirst="No photograph in this archive is unattributed. Every credit below is taken from the source file page and is listed with the licence recorded there."
            />

            <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
              <div className="overflow-hidden border border-chrome/20">
                <table className="w-full border-collapse text-left">
                  <caption className="sr-only">Image credits used in the visual archive</caption>
                  <thead>
                    <tr className="border-b border-chrome/20 bg-[#0e0f14]">
                      <th scope="col" className="p-3 font-mono text-[9px] uppercase tracking-[0.18em] text-chrome/70">
                        Credit
                      </th>
                      <th scope="col" className="p-3 font-mono text-[9px] uppercase tracking-[0.18em] text-chrome/70">
                        Licence
                      </th>
                      <th scope="col" className="p-3 text-right font-mono text-[9px] uppercase tracking-[0.18em] text-chrome/70">
                        Records
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleCredits.map((row) => (
                      <tr key={row.credit} className="border-b border-chrome/10 last:border-0">
                        <td className="p-3 text-sm leading-snug text-chrome/70">{row.credit}</td>
                        <td className="p-3 font-mono text-[10px] uppercase tracking-[0.08em] text-chrome/70">
                          {row.licence}
                        </td>
                        <td className="p-3 text-right font-mono text-[10px] text-cyber/80">{row.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-4">
                <div className="border border-chrome/20 bg-ink p-5">
                  <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome/70">
                    <BookMarked className="size-3.5 text-cyber" aria-hidden="true" />
                    Source collections
                  </p>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-chrome/65">
                    <li>
                      <span className="text-metallic">Wikimedia Commons</span> — the source for every photograph in
                      the visual archive, including museum object photography and period press photographs released
                      into the public domain.
                    </li>
                    <li>
                      <span className="text-metallic">Auckland Museum</span> — costume collection object photography
                      catalogued to 1998–2002, reproduced via Commons.
                    </li>
                    <li>
                      <span className="text-metallic">Museum exhibition photography</span> — images of garments by
                      Galliano, McQueen and Gaultier recorded at later retrospectives.
                    </li>
                    <li>
                      <span className="text-metallic">US Department of Defense</span> — public domain photographs of
                      performances on federal property.
                    </li>
                  </ul>
                </div>

                <div className="border border-chrome/20 bg-ink p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome/70">Attribution</p>
                  <p className="mt-3 text-sm leading-relaxed text-chrome/65">
                    Each record in the visual archive carries its photographer credit, its licence and a direct link to
                    the original file page, so the source can be inspected independently.
                  </p>
                  <a
                    href="https://commons.wikimedia.org"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-4 inline-flex items-center gap-2 border border-chrome/25 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-chrome/70 transition-colors hover:border-cyber/70 hover:text-cyber"
                  >
                    Wikimedia Commons
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAllCredits((v) => !v)}
                  className="flex w-full items-center justify-between gap-3 border border-chrome/30 bg-gradient-to-b from-[#2a2d36] to-[#14151a] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-metallic transition-colors hover:border-cyber/60 hover:text-cyber"
                >
                  {showAllCredits ? 'SHOW FEWER' : `SHOW ALL ${credits.length} CREDITS`}
                  <Terminal className="size-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TechDivider label="GLOSSARY" code="SEC-05" className="mx-auto max-w-[1800px] px-4 sm:px-6 xl:px-10" />

      {/* ------------------------------------------------------------ GLOSSARY */}
      <section className="mx-auto max-w-[1800px] px-4 py-16 sm:px-6 xl:px-10">
        <SectionHeading
          index="05"
          kicker="GLOSSARY"
          title="THE WORDS THIS ARCHIVE USES."
          standfirst="Definitions are written for this archive and describe how each term is used here, which is not always how a catalogue would define it."
        />

        <div className="mt-8 max-w-xl">
          <SearchInput
            value={query}
            onChange={setQuery}
            label="Search the glossary"
            placeholder="SEARCH TERMS…"
            id="glossary-search"
          />
        </div>

        <div className="mt-8">
          {filteredGlossary.length === 0 ? (
            <EmptyState
              title="No glossary terms match"
              body="Try a shorter word — denim, mesh, bag."
              onReset={() => setQuery('')}
            />
          ) : (
            <dl className="grid gap-px bg-chrome/15 sm:grid-cols-2 lg:grid-cols-3">
              {filteredGlossary.map((entry) => (
                <div key={entry.term} className="bg-ink p-5">
                  <dt className="font-display text-lg leading-tight tracking-tight text-metallic">{entry.term}</dt>
                  <dd className="mt-2.5 text-sm leading-relaxed text-chrome/65">{entry.definition}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-chrome/65">
          {filteredGlossary.length} OF {GLOSSARY.length} TERMS SHOWN
        </p>
      </section>

      {/* ------------------------------------------------------------ CLOSING */}
      <section className="relative overflow-hidden border-t border-chrome/25 bg-graphite">
        <div className="tech-grid">
          <div className="absolute inset-0 scanlines opacity-50" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/60 to-ink" aria-hidden="true" />

          <div className="relative mx-auto max-w-[1800px] px-4 py-20 sm:px-6 lg:py-28 xl:px-10">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <DigitalLabel tone="chrome" marker="box">
                    END OF FILE
                  </DigitalLabel>
                  <DigitalLabel tone="cyber">{ORG.revision}</DigitalLabel>
                </div>

                <p className="mt-8 font-display text-[2.6rem] leading-[0.86] tracking-tight sm:text-[3.6rem] lg:text-[4.4rem]">
                  <span className="block chrome-plate">THE FUTURE NEVER</span>
                  <span className="block text-metallic">
                    LOOKED SO <span className="text-hotpink">GOOD.</span>
                  </span>
                </p>

                <p className="mt-7 max-w-xl font-editorial text-lg italic leading-relaxed text-chrome/70">
                  Twenty-five years on, the clothing of 1997 to 2006 is easier to see than it was at the time. This
                  archive exists so that the surfaces stay attached to the history that produced them.
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                  <MetallicButton to="/" tone="electric" size="lg" Icon={Sparkles}>
                    RETURN TO THE PORTAL
                  </MetallicButton>
                  <MetallicButton to="/archive" tone="chrome" size="lg" Icon={Search}>
                    ENTER THE VISUAL ARCHIVE
                  </MetallicButton>
                </div>

                <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-chrome/15 pt-6">
                  {STATS.slice(0, 3).map((stat) => (
                    <div key={stat.label}>
                      <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-chrome/65">
                        {stat.label}
                      </dt>
                      <dd className="mt-1 font-display text-2xl leading-none text-metallic">
                        {String(stat.value).padStart(2, '0')}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Chrome closing panel */}
              <div className="relative">
                <div className="border border-chrome/30 bg-[#0c0d12]/95">
                  <div className="border-b border-chrome/20 bg-gradient-to-b from-[#24262e] to-[#14161c] px-4 py-2">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-metallic/85">
                      ARCHIVE//SEALED
                    </p>
                  </div>
                  <div className="p-6">
                    <p className="font-display text-5xl leading-none tracking-tight chrome-plate sm:text-6xl">
                      Y2K<span className="text-electric-soft">//</span>ARCHIVE
                    </p>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.26em] text-chrome/70">
                      {ORG.tagline}
                    </p>

                    <dl className="mt-8 divide-y divide-chrome/12 font-mono text-[10px] uppercase tracking-[0.14em]">
                      {[
                        ['Index range', ORG.range],
                        ['Sections online', `${NAV_LINKS.length} / ${NAV_LINKS.length}`],
                        ['Visual records', String(ARCHIVE_ITEMS.length)],
                        ['Image source', 'Wikimedia Commons'],
                        ['Interface', 'Fictional'],
                        ['History', 'Sourced'],
                      ].map(([term, value]) => (
                        <div key={term} className="flex items-baseline justify-between gap-4 py-2">
                          <dt className="text-chrome/65">{term}</dt>
                          <dd className="text-right text-metallic/85">{value}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="mt-6 h-1 w-full bg-chrome/15">
                      <div className="h-full w-full bg-gradient-to-r from-electric via-cyber to-hotpink" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
