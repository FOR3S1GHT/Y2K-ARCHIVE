import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import {
  ArrowRight,
  ArrowUpRight,
  Eye,
  Layers,
  Minus,
  Plus,
  Radio,
  ScanLine,
  Signal,
  Sparkles,
  Terminal,
} from 'lucide-react'

import MetallicButton from '../components/MetallicButton'
import DigitalLabel from '../components/DigitalLabel'
import SystemWindow from '../components/SystemWindow'
import Marquee from '../components/Marquee'
import SmartImage from '../components/SmartImage'
import SectionHeading from '../components/SectionHeading'
import TechDivider from '../components/TechDivider'
import EditorialCard from '../components/EditorialCard'

import { IMG } from '../data/images'
import { TRENDS, TREND_CATEGORIES } from '../data/trends'
import { BRANDS } from '../data/brands'
import { ICONS } from '../data/icons'
import { MILESTONES } from '../data/timeline'
import { ARCHIVE_ITEMS } from '../data/archive'
import { ORG, TICKER_ITEMS } from '../data/site'
import { STATS, IMAGE_COUNT } from '../data/stats'
import { useClock } from '../hooks/useClock'

const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

/** Rotating featured-trend readout inside a system window. */
function TrendIndexWindow() {
  const [index, setIndex] = useState(0)
  const trend = TRENDS[index]

  return (
    <SystemWindow
      title="CULTURE_INDEX//ROTATE"
      status={`${String(index + 1).padStart(2, '0')}/${String(TRENDS.length).padStart(2, '0')}`}
      tone="pink"
      footer={`Peak ${trend.peak} · ${trend.code}`}
      float
      delay={0.5}
    >
      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-chrome/70">Now indexing</p>
      <p className="mt-1.5 font-display text-xl leading-tight tracking-tight text-metallic">{trend.name}</p>
      <p className="mt-2 line-clamp-3 font-editorial text-xs italic leading-relaxed text-chrome/60">
        {trend.summary}
      </p>
      <div className="mt-3 flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setIndex((i) => (i - 1 + TRENDS.length) % TRENDS.length)}
          aria-label="Previous featured trend"
          className="border border-chrome/25 p-1.5 text-chrome/60 transition-colors hover:border-cyber/60 hover:text-cyber"
        >
          <Minus className="size-3" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % TRENDS.length)}
          aria-label="Next featured trend"
          className="border border-chrome/25 p-1.5 text-chrome/60 transition-colors hover:border-cyber/60 hover:text-cyber"
        >
          <Plus className="size-3" aria-hidden="true" />
        </button>
        <Link
          to="/trends"
          className="ml-auto flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-cyber/80 transition-colors hover:text-cyber"
        >
          OPEN FILE <ArrowRight className="size-3" aria-hidden="true" />
        </Link>
      </div>
    </SystemWindow>
  )
}

export default function Home() {
  const reduce = useReducedMotion()
  const now = useClock()
  const [featuredOpen, setFeaturedOpen] = useState(true)

  const hero = IMG.heroKelly
  const featuredTrends = TRENDS.slice(0, 5)
  const featuredBrands = BRANDS.slice(0, 6)
  const featuredIcons = [ICONS[3], ICONS[0], ICONS[9], ICONS[5]]
  const timelinePreview = MILESTONES.filter((m) =>
    ['jlo-versace', 'double-denim-2001', 'ipod-2001', 'juicy-1997', 'simple-life-2003', 'matrix-1999'].includes(m.id),
  )
  const archivePreview = ARCHIVE_ITEMS.filter((item) =>
    ['lowRiseJeans', 'platformBuffalo', 'motorolaRazr', 'butterflyClips', 'tracksuitJacket', 'sunglasses2000'].includes(
      item.id,
    ),
  )

  const fadeUp = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
        }

  return (
    <>
      {/* ==================================================== HERO */}
      <section className="relative overflow-hidden border-b border-chrome/20">
        <div className="absolute inset-0 tech-grid opacity-60" aria-hidden="true" />
        <div
          className="absolute -left-40 top-1/4 size-[38rem] rounded-full bg-electric/12 blur-[130px]"
          aria-hidden="true"
        />
        <div
          className="absolute -right-40 bottom-0 size-[32rem] rounded-full bg-hotpink/10 blur-[130px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid max-w-[1800px] gap-10 px-4 pb-12 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pb-20 lg:pt-16 xl:px-10">
          {/* Copy column */}
          <div className="relative z-20 flex flex-col justify-center">
            <motion.div {...fadeUp(0)} className="flex flex-wrap items-center gap-2">
              <DigitalLabel tone="cyber" marker="box">
                ARCHIVE INDEX // {ORG.range}
              </DigitalLabel>
              <DigitalLabel tone="chrome">SIGNAL RECEIVED</DigitalLabel>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome/65">
                LOCAL {timeFormatter.format(now)}
              </span>
            </motion.div>

            <motion.p
              {...fadeUp(0.08)}
              className="mt-8 font-mono text-[11px] uppercase tracking-[0.34em] text-chrome/70 sm:text-xs"
            >
              1997—2006. A DIGITAL FASHION REVOLUTION.
            </motion.p>

            <motion.h1
              {...fadeUp(0.14)}
              className="mt-4 font-display text-[3.1rem] leading-[0.84] tracking-tight sm:text-[4.6rem] lg:text-[5.4rem] xl:text-[6.4rem]"
            >
              <span className="block chrome-plate">THE FUTURE</span>
              <span className="block text-metallic">
                WAS <span className="text-hotpink">OURS.</span>
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.22)}
              className="mt-7 max-w-xl text-base leading-relaxed text-chrome/70 sm:text-lg"
            >
              Y2K//ARCHIVE is a digital fashion museum of the years either side of the millennium — the denim, the
              houses, the charts, the phones and the machines. Every record is sourced. Every image is dated.
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="mt-9 flex flex-wrap gap-3">
              <MetallicButton to="/archive" tone="electric" size="lg" Icon={ScanLine}>
                ENTER THE ARCHIVE
              </MetallicButton>
              <MetallicButton to="/timeline" tone="chrome" size="lg" Icon={Layers}>
                EXPLORE THE ERA
              </MetallicButton>
            </motion.div>

            {/* Live counters */}
            <motion.dl
              {...fadeUp(0.4)}
              className="mt-12 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-4 border-t border-chrome/15 pt-6 sm:grid-cols-4"
            >
              {STATS.slice(0, 4).map((stat) => (
                <div key={stat.label}>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-chrome/65">{stat.label}</dt>
                  <dd className="mt-1 font-display text-3xl leading-none text-metallic">
                    {String(stat.value).padStart(2, '0')}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Image column */}
          <div className="relative z-10">
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute -left-2 -top-2 hidden size-16 border-l border-t border-electric/60 lg:block" aria-hidden="true" />
              <div className="absolute -bottom-2 -right-2 hidden size-16 border-b border-r border-hotpink/60 lg:block" aria-hidden="true" />

              <SmartImage
                src={hero?.src}
                alt={hero?.alt}
                ratio={0.82}
                priority
                className="lg:translate-y-4"
                imgClassName="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 46vw"
              />

              <span className="pointer-events-none absolute left-3 top-3 border border-metallic/25 bg-ink/80 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.22em] text-metallic/85 backdrop-blur-sm">
                MEMORY SECTOR 04
              </span>
            </motion.div>

            <div className="mt-3 flex flex-wrap items-start justify-between gap-3 border-t border-chrome/15 pt-3">
              <p className="max-w-md font-editorial text-sm italic leading-relaxed text-chrome/60">
                {hero?.caption}
              </p>
              <p className="font-mono text-[8px] uppercase leading-relaxed tracking-[0.14em] text-chrome/60">
                {hero?.credit} · {hero?.licence}
              </p>
            </div>
          </div>
        </div>

        {/* Floating interface cluster */}
        <div className="relative z-20 mx-auto max-w-[1800px] px-4 pb-12 sm:px-6 xl:px-10">
          <div className="grid gap-4 lg:grid-cols-[18rem_1fr_20rem] lg:items-start">
            <SystemWindow
              title="ARCHIVE_STATUS.exe"
              status="ONLINE"
              tone="cyber"
              footer={`${ORG.build} // ${ORG.revision}`}
              delay={0.45}
            >
              <ul className="space-y-2 font-mono text-[10px] uppercase tracking-[0.14em]">
                {[
                  ['MEMORY SECTOR', '04 / ACTIVE'],
                  ['STYLE DATABASE', 'ONLINE'],
                  ['IMAGE MEMORY', `${IMAGE_COUNT} RECORDS`],
                  ['INDEX RANGE', ORG.range],
                ].map(([term, value]) => (
                  <li key={term} className="flex items-baseline justify-between gap-3 border-b border-chrome/10 pb-1.5">
                    <span className="text-chrome/70">{term}</span>
                    <span className="text-right text-cyber/80">{value}</span>
                  </li>
                ))}
              </ul>
            </SystemWindow>

            {/* Break-out editorial strip */}
            <div className="hidden border border-chrome/20 bg-[#0b0c11]/70 p-5 lg:block">
              <div className="flex items-center gap-3">
                <Terminal className="size-4 text-cyber" aria-hidden="true" />
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-chrome/70">
                  WHAT THIS ARCHIVE IS
                </p>
              </div>
              <p className="mt-4 font-editorial text-lg italic leading-relaxed text-chrome/70">
                A fictional interface wrapped around a real history. The build numbers are invented. The photographs,
                the dates and the credits are not — each image links to its own source page, and every later photograph
                is labelled with its own year.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <DigitalLabel tone="holo">FICTION NOTICE — INTERFACE ONLY</DigitalLabel>
                <DigitalLabel tone="chrome">SOURCED IMAGERY</DigitalLabel>
              </div>
            </div>

            <div className="space-y-4">
              <TrendIndexWindow />
              {featuredOpen ? (
                <SystemWindow
                  title="SIGNAL_FEED.dat"
                  status="LIVE"
                  tone="chrome"
                  onDismiss={() => setFeaturedOpen(false)}
                  dismissLabel="Collapse the signal feed panel"
                  footer="Panel can be restored below"
                  delay={0.6}
                >
                  <div className="flex items-start gap-3">
                    <Signal className="mt-0.5 size-4 shrink-0 text-cyber" aria-hidden="true" />
                    <p className="font-editorial text-xs italic leading-relaxed text-chrome/65">
                      Signal feed dropping in and out. Archive index stable across all nine sectors.
                    </p>
                  </div>
                </SystemWindow>
              ) : (
                <div className="border border-dashed border-chrome/25 bg-[#0b0c11]/60 p-3">
                  <button
                    type="button"
                    onClick={() => setFeaturedOpen(true)}
                    className="flex w-full items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-chrome/70 transition-colors hover:text-cyber"
                  >
                    RESTORE SIGNAL_FEED.dat
                    <Plus className="size-3.5" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <Marquee items={TICKER_ITEMS} tone="cyber" />
      </section>

      {/* ==================================================== TIMELINE PREVIEW */}
      <section className="mx-auto max-w-[1800px] px-4 py-16 sm:px-6 lg:py-24 xl:px-10">
        <SectionHeading
          index="01"
          kicker="CHRONO_IDX.sys"
          title="A COUNTDOWN THAT ENDED, AND A LOOK THAT DIDN'T."
          standfirst="The years either side of the millennium were a preparation for something. The preparation shaped the clothing even when the event didn't happen."
          aside="1997 — 2006 · 4 CHAPTERS · INTERACTIVE"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-start">
          <ol className="grid gap-px bg-chrome/15 sm:grid-cols-2 lg:grid-cols-3">
            {timelinePreview.map((milestone, index) => (
              <motion.li
                key={milestone.id}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative bg-ink p-5"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-4xl leading-none text-chrome/60 transition-colors group-hover:text-cyber/70">
                    {milestone.year}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-chrome/60">
                    {milestone.tag}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg leading-tight tracking-tight text-metallic">
                  {milestone.title}
                </h3>
                <p className="mt-2.5 line-clamp-4 text-sm leading-relaxed text-chrome/60">{milestone.body}</p>
                <Link
                  to="/timeline"
                  className="mt-4 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-cyber/70 transition-colors group-hover:text-cyber"
                >
                  JUMP TO {milestone.year} <ArrowUpRight className="size-3" aria-hidden="true" />
                </Link>
              </motion.li>
            ))}
          </ol>

          <div className="space-y-4">
            <SystemWindow title="CHRONO_IDX.sys" status="4 CHAPTERS" tone="electric" footer="Select a year on the timeline">
              <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-chrome/70">
                The archive timeline is genuinely navigable — choose any year from 1997 to 2006 and the record for that
                year loads with its own photograph and context.
              </p>
              <MetallicButton to="/timeline" tone="chrome" size="sm" className="mt-4 w-full">
                OPEN TIMELINE
              </MetallicButton>
            </SystemWindow>

            <div className="border border-chrome/20 bg-[#0b0c11]/70 p-4">
              <DigitalLabel tone="holo">VERIFICATION KEY</DigitalLabel>
              <ul className="mt-3 space-y-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-chrome/70">
                <li className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 bg-cyber" aria-hidden="true" />
                  <span>
                    <span className="text-cyber">DATED EVENT</span> — a specific, documented occurrence.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 bg-hotpink" aria-hidden="true" />
                  <span>
                    <span className="text-hotpink">INTERPRETATION</span> — a reading of a gradual shift.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <TechDivider label="TREND DATABASE // 17 RECORDS ONLINE" code="SEC-02" className="mx-auto max-w-[1800px] px-4 sm:px-6 xl:px-10" />

      {/* ==================================================== TRENDS */}
      <section className="mx-auto max-w-[1800px] px-4 py-16 sm:px-6 lg:py-24 xl:px-10">
        <SectionHeading
          index="02"
          kicker="STYLE_MAG.dat"
          title="THE OBJECTS THEMSELVES."
          standfirst="Not every trend below was invented in this period. Some were inherited and sharpened; a few were genuinely created inside it. The archive says which is which."
        />

        <div className="mt-12 grid gap-px bg-chrome/15 lg:grid-cols-12">
          {featuredTrends.map((trend, index) => {
            const image = IMG[trend.image]
            const spans = ['lg:col-span-5', 'lg:col-span-4', 'lg:col-span-3', 'lg:col-span-7', 'lg:col-span-5']
            return (
              <motion.div
                key={trend.id}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: (index % 3) * 0.06 }}
                className={`group relative bg-ink ${spans[index]}`}
              >
                <Link to="/trends" className="block h-full">
                  <SmartImage
                    src={image?.src}
                    alt={image?.alt}
                    ratio={index % 3 === 1 ? 1.1 : 0.86}
                    className="border-0 border-b border-chrome/15"
                    imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyber/80">{trend.code}</span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-chrome/60">
                        {trend.peak}
                      </span>
                    </div>
                    <h3 className="mt-2.5 font-display text-xl leading-tight tracking-tight text-metallic sm:text-2xl">
                      {trend.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 font-editorial text-sm italic leading-relaxed text-chrome/70">
                      {trend.summary}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          })}

          <div className="flex flex-col justify-between gap-6 bg-gradient-to-br from-electric/15 via-ink to-ink p-6 lg:col-span-7">
            <div>
              <DigitalLabel tone="cyber">FULL INDEX</DigitalLabel>
              <p className="mt-4 font-display text-3xl leading-[0.95] tracking-tight text-metallic sm:text-4xl">
                17 TREND RECORDS, FILTERED SIX WAYS.
              </p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-chrome/65">
                Denim, glam, sporty, cyber, accessories and streetwear. Each record carries its historical context, the
                garments and materials involved, who was associated with it, and a considered suggestion for wearing it
                now.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {TREND_CATEGORIES.filter((c) => c.id !== 'all').map((category) => (
                  <span
                    key={category.id}
                    className="border border-chrome/20 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-chrome/70"
                  >
                    {category.label}
                  </span>
                ))}
              </div>
            </div>
            <MetallicButton to="/trends" tone="chrome" size="md">
              OPEN TREND INDEX
            </MetallicButton>
          </div>
        </div>
      </section>

      {/* ==================================================== BRANDS TEASER */}
      <section className="border-y border-chrome/20 bg-graphite">
        <div className="tech-grid">
          <div className="mx-auto max-w-[1800px] px-4 py-16 sm:px-6 lg:py-24 xl:px-10">
            <SectionHeading
              index="03"
              kicker="FASHION_DB.dat"
              title="FOUNDED, THEN FASHIONABLE — TWO DIFFERENT YEARS."
              standfirst="Chanel was founded in 1910 and peaked as a logo obsession in this period. Juicy Couture was founded inside it. Conflating the two is the most common error made about Y2K fashion."
            />

            <div className="mt-12 grid gap-px bg-chrome/15 sm:grid-cols-2 lg:grid-cols-3">
              {featuredBrands.map((brand, index) => (
                <motion.div
                  key={brand.id}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group relative bg-ink p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-display text-2xl leading-none tracking-tight chrome-plate">
                      {brand.logoPlate}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-chrome/60">
                      {brand.origin}
                    </span>
                  </div>
                  <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-chrome/15 pt-4">
                    <div>
                      <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-chrome/65">Founded</dt>
                      <dd className="mt-1 font-display text-2xl leading-none text-metallic">{brand.founded}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-chrome/65">Y2K peak</dt>
                      <dd className="mt-1 font-display text-2xl leading-none text-cyber">{brand.y2kWindow}</dd>
                    </div>
                  </dl>
                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-chrome/60">{brand.role}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MetallicButton to="/brands" tone="chrome" size="md">
                OPEN ENCYCLOPAEDIA
              </MetallicButton>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-chrome/65">
                SEARCHABLE · CATEGORY FILTERED · {BRANDS.length} ENTRIES
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== ICONS */}
      <section className="mx-auto max-w-[1800px] px-4 py-16 sm:px-6 lg:py-24 xl:px-10">
        <SectionHeading
          index="04"
          kicker="CONTACT_SHEET.img"
          title="FAME WAS A STYLING FORMAT."
          standfirst="A performer, a producer, a footballer and a couturier influenced this period through completely different mechanisms. The contact sheet is arranged so that difference is visible."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredIcons.map((icon, index) => {
            const image = IMG[icon.image]
            return (
              <motion.div
                key={icon.id}
                initial={reduce ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className="group"
              >
                <Link to="/icons" className="block">
                  <div className="relative">
                    <SmartImage
                      src={image?.src}
                      alt={image?.alt || icon.name}
                      ratio={0.78}
                      imgClassName="grayscale-[25%] transition-[filter,transform] duration-[900ms] group-hover:grayscale-0 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                    <span className="pointer-events-none absolute left-2 top-2 bg-ink/85 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.2em] text-metallic/85 backdrop-blur-sm">
                      FRAME {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="border border-t-0 border-chrome/20 bg-[#0b0c11]/70 p-3">
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-chrome/65">
                      {icon.field.toUpperCase()}
                    </p>
                    <p className="mt-1.5 font-display text-lg leading-tight tracking-tight text-metallic">
                      {icon.name}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-8">
          <MetallicButton to="/icons" tone="ghost" size="md">
            VIEW ALL {ICONS.length} PROFILES
          </MetallicButton>
        </div>
      </section>

      {/* ==================================================== THE LOOK OF TOMORROW */}
      <section className="relative overflow-hidden border-y border-chrome/20">
        <div className="absolute inset-0" aria-hidden="true">
          <SmartImage
            src={IMG.pvcShorts?.src}
            alt=""
            ratio={2.4}
            className="size-full border-0 opacity-25"
            imgClassName="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" aria-hidden="true" />

        <div className="relative mx-auto max-w-[1800px] px-4 py-20 sm:px-6 lg:py-28 xl:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <DigitalLabel tone="holo" marker="box">
                  EDITORIAL // THE LOOK OF TOMORROW
                </DigitalLabel>
                <DigitalLabel tone="chrome">MEMORY SECTOR 04</DigitalLabel>
              </div>

              <h2 className="mt-6 font-display text-4xl leading-[0.9] tracking-tight text-metallic sm:text-5xl lg:text-6xl">
                THEY DRESSED AS IF THE
                <span className="block chrome-plate">MACHINE HAD ALREADY ARRIVED.</span>
              </h2>

              <div className="mt-7 max-w-2xl space-y-4 text-base leading-relaxed text-chrome/70">
                <p>
                  The futurism of 1999–2003 was not about science fiction. It was about surfaces: coated fabric that
                  behaved like metal, lenses that turned the face into an instrument, a phone worn on the body as
                  decoration. The future was treated as a material rather than a destination.
                </p>
                <p>
                  That is why the look dates so badly and reads so well. A garment that reflected the room it was
                  standing in was making a claim about the present. When you look at these photographs now, you are
                  looking at people who believed the millennium was the beginning of something rather than the end of
                  it.
                </p>
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <MetallicButton to="/culture" tone="cyan" size="md" Icon={Radio}>
                  READ THE CULTURE FILES
                </MetallicButton>
                <MetallicButton to="/closet" tone="chrome" size="md" Icon={Sparkles}>
                  BUILD A LOOK
                </MetallicButton>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: 'Materials', value: 'Coated, mirrored, vinyl, chainmail' },
                { label: 'Optics', value: 'Shield lenses, wraparound frames' },
                { label: 'Hardware', value: 'D-rings, buckles, exposed zips' },
                { label: 'Palette', value: 'Black, chrome, one saturated accent' },
              ].map((item) => (
                <div key={item.label} className="border border-chrome/20 bg-ink/70 p-4 backdrop-blur-sm">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-chrome/65">{item.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-chrome/80">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== TECHNOLOGY */}
      <section className="mx-auto max-w-[1800px] px-4 py-16 sm:px-6 lg:py-24 xl:px-10">
        <SectionHeading
          index="05"
          kicker="SIGNAL_FEED.mag"
          title="THE MACHINES WERE WORN, NOT CARRIED."
          standfirst="Portable technology in this period was small, colourful and had a visible surface. That made it jewellery — and jewellery gets styled."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <EditorialCard
            image={IMG.motorolaRazr}
            variant="plate"
            kicker="HARDWARE // 2004"
            title="Motorola Razr V3"
            caption="Thin enough to vanish into a jeans pocket. Clothing and handsets started being designed around each other in the same years."
          />

          <div className="grid gap-px bg-chrome/15 sm:grid-cols-2">
            {[
              { image: IMG.ipodFirst, label: 'Apple iPod', meta: '2001', note: 'White acrylic, circular wheel, white earbud cable.' },
              { image: IMG.nokia3310, label: 'Nokia 3310', meta: '2000', note: 'Interchangeable covers. The phone as a decorated object.' },
              { image: IMG.sidekick, label: 'T-Mobile Sidekick', meta: '2002', note: 'A physical keyboard and a screen that swivelled.' },
              { image: IMG.tamagotchi, label: 'Tamagotchi', meta: '1996', note: 'The first thing worn on the body that beeped for you.' },
            ].map((item) => (
              <div key={item.label} className="bg-ink p-4">
                <SmartImage
                  src={item.image?.src}
                  alt={item.image?.alt || item.label}
                  ratio={1.4}
                  sizes="30vw"
                />
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <p className="font-display text-lg leading-tight tracking-tight text-metallic">{item.label}</p>
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-cyber/80">{item.meta}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-chrome/70">{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <EditorialCard
            image={IMG.imacG3}
            variant="plate"
            kicker="DESIGN // 1998"
            title="iMac G3"
            caption="Transparent colour applied to a machine. The clearest single object for understanding Y2K product design."
          />
          <EditorialCard
            image={IMG.trlStudios}
            variant="plate"
            kicker="BROADCAST // 2006"
            title="MTV TRL, Times Square"
            caption="A glass studio on a public street, so the audience became part of the broadcast — and so did their clothes."
          />
          <EditorialCard
            image={IMG.blockbuster}
            variant="plate"
            kicker="RETAIL // 2008"
            title="Blockbuster Video"
            caption="The Friday-night ritual of the period. Its decline tracks the migration of the same audience online."
          />
        </div>
      </section>

      <TechDivider label="IMAGE_MEMORY // CURATED VISUAL RECORDS" code="SEC-06" className="mx-auto max-w-[1800px] px-4 sm:px-6 xl:px-10" />

      {/* ==================================================== ARCHIVE PREVIEW */}
      <section className="mx-auto max-w-[1800px] px-4 py-16 sm:px-6 lg:py-24 xl:px-10">
        <SectionHeading
          index="06"
          kicker="IMAGE_MEMORY.db"
          title="A MUSEUM, NOT A MOOD BOARD."
          standfirst="Every visual record carries its own date, its own credit and an honest note describing what kind of image it is — a period photograph, a museum object, a product shot, or later material."
          aside={`${IMAGE_COUNT} RECORDS · 9 CATEGORIES · FULL LIGHTBOX`}
        />

        <div className="mt-12 grid gap-px bg-chrome/15 sm:grid-cols-2 lg:grid-cols-4">
          {archivePreview.map((item, index) => (
            <div
              key={item.id}
              className={`group relative bg-ink ${index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}`}
            >
              <SmartImage
                src={item.src}
                alt={item.alt}
                ratio={index === 0 ? 1.1 : 0.82}
                className="border-0"
                imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent p-3 pt-8">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-cyber/80">{item.yearLabel}</p>
                <p className="mt-1 font-display text-sm leading-tight tracking-tight text-metallic">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <MetallicButton to="/archive" tone="electric" size="md" Icon={Eye}>
            ENTER THE VISUAL ARCHIVE
          </MetallicButton>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-chrome/65">
            SEARCH · FILTER · FULL-SIZE LIGHTBOX · KEYBOARD NAVIGATION
          </p>
        </div>
      </section>
    </>
  )
}
