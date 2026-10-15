import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { Radio, Quote, ArrowUpRight, MapPin } from 'lucide-react'

import SectionHeading from '../components/SectionHeading'
import DigitalLabel from '../components/DigitalLabel'
import SmartImage from '../components/SmartImage'
import Marquee from '../components/Marquee'
import TechDivider from '../components/TechDivider'
import MetallicButton from '../components/MetallicButton'

import { CULTURE_CHAPTERS } from '../data/culture'
import { IMG } from '../data/images'
import { COVERAGE_NOTE } from '../data/glossary'
import { IMAGE_COUNT } from '../data/stats'

/** Chapter navigator — a vertical index on desktop, a scroll rail on mobile. */
function ChapterIndex({ chapters, active, onSelect }) {
  return (
    <nav
      aria-label="Culture chapters"
      className="no-scrollbar flex gap-1.5 overflow-x-auto lg:sticky lg:top-40 lg:flex-col lg:overflow-visible"
    >
      {chapters.map((chapter) => {
        const isActive = chapter.id === active
        return (
          <button
            key={chapter.id}
            type="button"
            onClick={() => onSelect(chapter.id)}
            aria-current={isActive ? 'true' : undefined}
            className={[
              'flex shrink-0 items-baseline gap-2.5 border px-3 py-2.5 text-left font-mono text-[10px] uppercase tracking-[0.16em] transition-colors lg:w-full',
              isActive
                ? 'border-hotpink/60 bg-gradient-to-r from-hotpink/20 to-transparent text-metallic'
                : 'border-chrome/20 text-chrome/70 hover:border-chrome/45 hover:text-metallic',
            ].join(' ')}
          >
            <span className={isActive ? 'text-hotpink' : 'text-chrome/60'}>{chapter.index}</span>
            <span className="truncate">{chapter.title.split(' ').slice(0, 4).join(' ')}</span>
          </button>
        )
      })}
    </nav>
  )
}

/** Feature layout — big image left, column of copy right. */
function FeatureChapter({ chapter }) {
  const image = IMG[chapter.image]
  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
      <div className="relative">
        <SmartImage
          src={image?.src}
          alt={image?.alt || chapter.title}
          ratio={0.82}
          sizes="(max-width: 1024px) 100vw, 55vw"
        />
        <span className="pointer-events-none absolute left-3 top-3 bg-ink/85 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.22em] text-metallic/85 backdrop-blur-sm">
          CHAPTER {chapter.index}
        </span>
        <p className="mt-2 font-mono text-[8px] uppercase leading-relaxed tracking-[0.14em] text-chrome/60">
          {image?.credit} · {image?.licence}
          {image?.year ? ` · ${image.year}` : ''}
        </p>
      </div>

      <div className="flex flex-col justify-center">
        {chapter.body.map((paragraph, i) => (
          <p key={i} className={`leading-relaxed text-chrome/70 ${i === 0 ? 'text-lg' : 'mt-4 text-base'}`}>
            {paragraph}
          </p>
        ))}
        {chapter.pull ? (
          <blockquote className="mt-6 border-l-2 border-hotpink/60 pl-4 font-editorial text-lg italic leading-relaxed text-chrome/80">
            {chapter.pull}
          </blockquote>
        ) : null}
      </div>
    </div>
  )
}

/** Spread layout — full-bleed image above a two-column essay and stat table. */
function SpreadChapter({ chapter }) {
  const image = IMG[chapter.image]
  return (
    <div>
      <SmartImage
        src={image?.src}
        alt={image?.alt || chapter.title}
        ratio={2.35}
        sizes="100vw"
        className="border-chrome/25"
        imgClassName="object-cover"
      />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="columns-1 gap-8 md:columns-2">
          {chapter.body.map((paragraph, i) => (
            <p key={i} className="mb-4 break-inside-avoid leading-relaxed text-chrome/70">
              {paragraph}
            </p>
          ))}
        </div>
        {chapter.stats ? (
          <div className="border border-chrome/20 bg-[#0b0c11]/70 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome/70">Chronology</p>
            <dl className="mt-4 divide-y divide-chrome/12">
              {chapter.stats.map(([year, note]) => (
                <div key={year} className="flex items-baseline gap-4 py-2.5">
                  <dt className="w-14 shrink-0 font-display text-xl leading-none text-cyber">{year}</dt>
                  <dd className="text-sm leading-snug text-chrome/65">{note}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}
      </div>
    </div>
  )
}

/** Essay layout — narrow measure, generous white space, small image. */
function EssayChapter({ chapter }) {
  const image = IMG[chapter.image]
  return (
    <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr] lg:gap-14">
      <div className="lg:order-2">
        <SmartImage
          src={image?.src}
          alt={image?.alt || chapter.title}
          ratio={0.95}
          sizes="(max-width: 1024px) 100vw, 35vw"
        />
        <p className="mt-2 font-editorial text-sm italic leading-relaxed text-chrome/70">{image?.caption}</p>
        <p className="mt-1 font-mono text-[8px] uppercase leading-relaxed tracking-[0.14em] text-chrome/60">
          {image?.credit} · {image?.licence}
        </p>
      </div>
      <div className="lg:order-1">
        {chapter.body.map((paragraph, i) => (
          <p
            key={i}
            className={`leading-relaxed text-chrome/70 ${
              i === 0 ? 'text-xl font-editorial italic text-chrome/80' : 'mt-5 text-base'
            }`}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}

/** Index layout — a list of entries with thumbnail plates. */
function IndexChapter({ chapter }) {
  return (
    <div>
      <div className="grid gap-px bg-chrome/15 sm:grid-cols-2 lg:grid-cols-4">
        {chapter.entries.map((entry) => {
          const image = entry.image ? IMG[entry.image] : null
          return (
            <article key={entry.title} className="group bg-ink">
              {image ? (
                <SmartImage
                  src={image.src}
                  alt={image.alt}
                  ratio={1.35}
                  className="border-0 border-b border-chrome/15"
                  imgClassName="transition-transform duration-[900ms] group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
              ) : (
                <div className="flex items-center justify-center border-b border-chrome/15 bg-gradient-to-br from-graphite to-ink" style={{ aspectRatio: 1.35 }}>
                  <span className="px-4 text-center font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-chrome/60">
                    NO IMAGE ON RECORD
                  </span>
                </div>
              )}
              <div className="p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-lg leading-tight tracking-tight text-metallic">{entry.title}</h3>
                  <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.16em] text-cyber/70">
                    {entry.years}
                  </span>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-chrome/60">{entry.note}</p>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

/** Diptych layout — two images stacked beside a text column. */
function DiptychChapter({ chapter }) {
  const primary = IMG[chapter.image]
  const secondary = chapter.secondaryImage ? IMG[chapter.secondaryImage] : null
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10">
      <div className="grid grid-cols-2 gap-3">
        <SmartImage src={primary?.src} alt={primary?.alt || chapter.title} ratio={0.76} sizes="25vw" />
        {secondary ? (
          <SmartImage
            src={secondary.src}
            alt={secondary.alt || chapter.title}
            ratio={0.76}
            sizes="25vw"
            className="mt-8"
          />
        ) : null}
      </div>
      <div>
        {chapter.body.map((paragraph, i) => (
          <p key={i} className={`leading-relaxed text-chrome/70 ${i === 0 ? 'text-lg' : 'mt-4 text-base'}`}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}

const LAYOUTS = {
  feature: FeatureChapter,
  spread: SpreadChapter,
  essay: EssayChapter,
  index: IndexChapter,
  diptych: DiptychChapter,
}

export default function Culture() {
  const [active, setActive] = useState('mtv')
  const reduce = useReducedMotion()

  const chapter = CULTURE_CHAPTERS.find((c) => c.id === active) || CULTURE_CHAPTERS[0]
  const Layout = LAYOUTS[chapter.layout] || FeatureChapter

  const select = (id) => {
    setActive(id)
    if (reduce) return
    window.requestAnimationFrame(() => {
      document.getElementById('chapter-view')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <>
      {/* ------------------------------------------------------------ MASTHEAD */}
      <section className="relative overflow-hidden border-b border-chrome/20">
        <div className="absolute inset-0 tech-grid opacity-50" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1800px] px-4 pb-10 pt-10 sm:px-6 lg:pt-14 xl:px-10">
          <div className="flex flex-wrap items-center gap-2">
            <DigitalLabel tone="pink" marker="box">
              SIGNAL_FEED.mag
            </DigitalLabel>
            <DigitalLabel tone="chrome">{CULTURE_CHAPTERS.length} FEATURES</DigitalLabel>
            <DigitalLabel tone="cyber">LONG-FORM</DigitalLabel>
          </div>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 font-display text-[2.8rem] leading-[0.86] tracking-tight sm:text-[4rem] lg:text-[5rem]"
          >
            <span className="block text-metallic">EVERY OUTFIT HAD</span>
            <span className="block chrome-plate">A SOUNDTRACK,</span>
            <span className="block text-metallic">
              A SCREEN AND A <span className="text-hotpink">DEVICE.</span>
            </span>
          </motion.h1>

          <p className="mt-6 max-w-3xl font-editorial text-lg italic leading-relaxed text-chrome/70">
            Clothing does not change on its own. It changes because of what people are watching, listening to, buying and
            carrying. These ten features trace those connections — and record where the story does not hold for
            everybody.
          </p>

          <div className="mt-8 flex max-w-4xl items-start gap-3 border border-chrome/20 bg-[#0b0c11]/70 p-4">
            <MapPin className="mt-0.5 size-4 shrink-0 text-hotpink" aria-hidden="true" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome/70">ON COVERAGE</p>
              <p className="mt-2 text-sm leading-relaxed text-chrome/65">{COVERAGE_NOTE}</p>
            </div>
          </div>
        </div>

        <Marquee
          items={[
            'MTV // MUSIC VIDEO DISTRIBUTION',
            'HIP-HOP // LABELS AS APPAREL',
            'PAPARAZZI // UNPOSED PHOTOGRAPHY',
            'DEVICES // WEARABLE TECHNOLOGY',
            'CYBER // REGIONAL SUBCULTURES',
            'REVIVAL // 2020s RE-READING',
          ]}
          tone="pink"
          reverse
        />
      </section>

      {/* ------------------------------------------------------------ CHAPTER NAV */}
      <section className="border-b border-chrome/20 bg-graphite">
        <div className="tech-grid">
          <div className="mx-auto max-w-[1800px] px-4 py-4 sm:px-6 xl:px-10">
            <ChapterIndex chapters={CULTURE_CHAPTERS} active={active} onSelect={select} />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ CHAPTER */}
      <section id="chapter-view" className="mx-auto max-w-[1800px] scroll-mt-32 px-4 py-14 sm:px-6 xl:px-10">
        <motion.header
          key={`head-${chapter.id}`}
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-display text-5xl leading-none text-chrome/60 sm:text-6xl">{chapter.index}</span>
            <DigitalLabel tone="pink" marker="box">
              CHAPTER {chapter.index} / {String(CULTURE_CHAPTERS.length).padStart(2, '0')}
            </DigitalLabel>
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-chrome/60">
              LAYOUT · {chapter.layout.toUpperCase()}
            </span>
          </div>

          <h2 className="mt-4 max-w-5xl font-display text-3xl leading-[0.92] tracking-tight text-metallic sm:text-4xl lg:text-5xl">
            {chapter.title}
          </h2>

          <p className="mt-5 max-w-3xl font-editorial text-xl italic leading-relaxed text-chrome/80">
            {chapter.standfirst}
          </p>

          <p className="mt-5 flex max-w-3xl items-start gap-2 border-t border-chrome/15 pt-4 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-chrome/65">
            <Radio className="mt-0.5 size-3 shrink-0 text-cyber" aria-hidden="true" />
            SCOPE · {chapter.scope}
          </p>
        </motion.header>

        <motion.div
          key={`body-${chapter.id}`}
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-10"
        >
          <Layout chapter={chapter} />
        </motion.div>

        {/* Chapter pager */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-chrome/20 pt-5">
          {(() => {
            const index = CULTURE_CHAPTERS.indexOf(chapter)
            const prev = CULTURE_CHAPTERS[(index - 1 + CULTURE_CHAPTERS.length) % CULTURE_CHAPTERS.length]
            const next = CULTURE_CHAPTERS[(index + 1) % CULTURE_CHAPTERS.length]
            return (
              <>
                <button
                  type="button"
                  onClick={() => select(prev.id)}
                  className="group flex items-center gap-3 text-left"
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-chrome/60">PREV</span>
                  <span className="font-display text-lg leading-tight tracking-tight text-chrome/70 transition-colors group-hover:text-metallic">
                    {prev.title}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => select(next.id)}
                  className="group flex items-center gap-3 text-right"
                >
                  <span className="font-display text-lg leading-tight tracking-tight text-chrome/70 transition-colors group-hover:text-metallic">
                    {next.title}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-chrome/60">NEXT</span>
                  <ArrowUpRight className="size-3.5 text-chrome/60 transition-colors group-hover:text-cyber" aria-hidden="true" />
                </button>
              </>
            )
          })()}
        </div>
      </section>

      <TechDivider label="CLOSING STATEMENT" code="END" className="mx-auto max-w-[1800px] px-4 sm:px-6 xl:px-10" />

      {/* ------------------------------------------------------------ CLOSING */}
      <section className="mx-auto max-w-[1800px] px-4 py-14 sm:px-6 xl:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <Quote className="size-6 text-hotpink" aria-hidden="true" />
            <p className="mt-5 font-display text-3xl leading-[0.95] tracking-tight text-metallic sm:text-4xl">
              THE CULTURE MOVED FASTER THAN THE CLOTHES COULD.
            </p>
            <p className="mt-5 text-base leading-relaxed text-chrome/70">
              A video could make a garment desirable in a week. A magazine took a month. A delivery to a shopping mall
              took a season. That gap — between how quickly an image travelled and how slowly an object could be
              produced — is the single most useful way to understand why Y2K fashion looks the way it does.
            </p>
            <p className="mt-4 text-base leading-relaxed text-chrome/70">
              When the gap closed, in the following decade, the look changed. Everything on this page is an attempt to
              describe what happened while it was still open.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MetallicButton to="/timeline" tone="chrome" size="md">
                FOLLOW THE TIMELINE
              </MetallicButton>
              <MetallicButton to="/about" tone="ghost" size="md">
                HOW THIS ARCHIVE WORKS
              </MetallicButton>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {['revivalGenZ', 'thriftRacks', 'mallInterior', 'blockbusterSign'].map((key) => {
              const image = IMG[key]
              if (!image) return null
              return (
                <figure key={key} className="border border-chrome/20 bg-[#0b0c11]/70">
                  <SmartImage src={image.src} alt={image.alt} ratio={1.2} className="border-0" sizes="25vw" />
                  <figcaption className="p-2.5">
                    <p className="font-mono text-[8px] uppercase leading-relaxed tracking-[0.14em] text-chrome/65">
                      {image.year ? `${image.year} · ` : ''}
                      {image.note || image.caption}
                    </p>
                  </figcaption>
                </figure>
              )
            })}
          </div>
        </div>

        <SectionHeading
          className="mt-16"
          index="—"
          kicker="READING ORDER"
          title="WHERE TO GO NEXT."
          standfirst="The archive is designed to be read in any order. These are the three routes that make the most sense from here."
        />

        <div className="mt-8 grid gap-px bg-chrome/15 sm:grid-cols-3">
          {[
            { to: '/archive', title: 'The Visual Archive', body: `${IMAGE_COUNT} records with search, filters and a full-size lightbox.` },
            { to: '/trends', title: 'The Trend Index', body: 'Seventeen records covering what people actually wore.' },
            { to: '/closet', title: 'The Styling Laboratory', body: 'Build a look from the same trend vocabulary.' },
          ].map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="group bg-ink p-6 transition-colors hover:bg-[#101118]"
            >
              <p className="font-display text-2xl leading-tight tracking-tight text-metallic">{card.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-chrome/60">{card.body}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-cyber/70 transition-colors group-hover:text-cyber">
                OPEN <ArrowUpRight className="size-3" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
