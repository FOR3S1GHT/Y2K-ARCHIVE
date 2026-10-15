import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Database, Search, Layers, Percent } from 'lucide-react'

import SectionHeading from '../components/SectionHeading'
import DigitalLabel from '../components/DigitalLabel'
import Marquee from '../components/Marquee'
import TechDivider from '../components/TechDivider'
import BrandEntry from '../components/BrandEntry'
import SmartImage from '../components/SmartImage'
import { SearchInput, FilterBar, EmptyState } from '../components/ArchiveControls'

import { BRANDS, BRAND_CATEGORIES } from '../data/brands'
import { IMG } from '../data/images'

const CATEGORY_BLURB = {
  luxury:
    'Houses that were already old in 1997 and peaked in this period as objects of desire — some for the first time in decades.',
  denim: 'Labels whose Y2K importance was the fabric itself: the cut, the wash and the price of a pair of jeans.',
  streetwear: 'Brands built on scarcity, graphics and subculture — several of which arrived at global scale inside this period.',
  celebrity: 'Labels owned or led by performers, which turned a music audience into an apparel market.',
  retail:
    'Chains and labels that most people actually bought Y2K fashion from — and what happened to each of them afterwards.',
}

export default function Brands() {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const reduce = useReducedMotion()

  const options = useMemo(() => [{ id: 'all', label: 'All Records', short: 'ALL' }, ...BRAND_CATEGORIES], [])

  const counts = useMemo(() => {
    const map = { all: BRANDS.length }
    BRAND_CATEGORIES.forEach((c) => {
      map[c.id] = BRANDS.filter((b) => b.category === c.id).length
    })
    return map
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return BRANDS.filter((brand) => {
      if (category !== 'all' && brand.category !== category) return false
      if (!q) return true
      return [
        brand.name,
        brand.origin,
        brand.founder,
        brand.creativeLead,
        brand.signature,
        brand.role,
        brand.later,
        String(brand.founded),
        brand.y2kWindow,
        ...(brand.tags || []),
      ]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(q))
    })
  }, [category, query])

  const grouped = useMemo(() => {
    const groups = new Map()
    filtered.forEach((brand) => {
      if (!groups.has(brand.category)) groups.set(brand.category, [])
      groups.get(brand.category).push(brand)
    })
    return [...groups.entries()]
  }, [filtered])

  const inventedInPeriod = BRANDS.filter((b) => b.founded >= 1997).length
  const inherited = BRANDS.length - inventedInPeriod

  const resetAll = () => {
    setCategory('all')
    setQuery('')
  }

  return (
    <>
      {/* --------------------------------------------------------- MASTHEAD */}
      <section className="relative overflow-hidden border-b border-chrome/20">
        <div className="absolute inset-0 tech-grid opacity-50" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1800px] px-4 pb-12 pt-10 sm:px-6 lg:pt-14 xl:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <DigitalLabel tone="electric" marker="box">
                  FASHION_DB.dat
                </DigitalLabel>
                <DigitalLabel tone="chrome">ENCYCLOPAEDIA MODE</DigitalLabel>
                <DigitalLabel tone="cyber">{BRANDS.length} ENTRIES</DigitalLabel>
              </div>

              <motion.h1
                initial={reduce ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 font-display text-[2.8rem] leading-[0.86] tracking-tight sm:text-[4rem] lg:text-[5rem]"
              >
                <span className="block chrome-plate">THE ENCYCLOPAEDIA</span>
                <span className="block text-metallic">OF WHAT WE WORE.</span>
              </motion.h1>

              <p className="mt-6 max-w-2xl font-editorial text-lg italic leading-relaxed text-chrome/70">
                A founding date and a moment of popularity are two different facts. This database keeps them apart on
                purpose — because the most useful thing to know about Y2K fashion is which labels were actually born in
                it.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-px border border-chrome/20 bg-chrome/15">
              {[
                { label: 'Founded 1997–2006', value: inventedInPeriod, icon: Layers, tone: 'text-cyber' },
                { label: 'Older, peaked now', value: inherited, icon: Database, tone: 'text-metallic' },
                { label: 'Categories', value: BRAND_CATEGORIES.length, icon: Percent, tone: 'text-holo' },
                { label: 'Searchable', value: 'YES', icon: Search, tone: 'text-hotpink' },
              ].map((stat) => (
                <div key={stat.label} className="bg-ink p-4">
                  <stat.icon className={`size-4 ${stat.tone}`} aria-hidden="true" />
                  <p className="mt-3 font-display text-3xl leading-none text-metallic">{stat.value}</p>
                  <p className="mt-1.5 font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-chrome/65">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Marquee
          items={[
            'DIOR 1946 · GALLIANO 1996–2011',
            'JUICY COUTURE FOUNDED 1997',
            'BAPE FOUNDED 1993 · SUPREME 1994',
            'TRUE RELIGION FOUNDED 2002',
            'ROC AWEAR 1999 · SOLD 2007',
            'HEATHERETTE 1999 · CLOSED 2008',
            'DELIA’S 1993 · CLOSED 2015 · RE-LAUNCHED 2018',
          ]}
          tone="electric"
          reverse
        />
      </section>

      {/* ------------------------------------------------------- CONTROLS */}
      <section className="sticky top-[57px] z-30 border-b border-chrome/20 bg-ink/95 backdrop-blur-lg">
        <div className="mx-auto flex max-w-[1800px] flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-end lg:gap-6 xl:px-10">
          <div className="lg:w-96 lg:shrink-0">
            <SearchInput
              value={query}
              onChange={setQuery}
              label="Search brand records"
              placeholder="SEARCH BRANDS, FOUNDERS, YEARS…"
              id="brand-search"
            />
          </div>
          <FilterBar
            options={options}
            value={category}
            onChange={setCategory}
            counts={counts}
            label="Brand category"
            className="lg:flex-1"
          />
          <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-chrome/65">
            {String(filtered.length).padStart(2, '0')} RECORDS
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------- RESULTS */}
      <section className="mx-auto max-w-[1800px] px-4 py-12 sm:px-6 xl:px-10">
        {filtered.length === 0 ? (
          <EmptyState
            title="No brand records match that query"
            body="Try a name, a country, a founder or a year — for example 1999, Italy, or denim."
            onReset={resetAll}
          />
        ) : (
          <div className="space-y-14">
            {grouped.map(([categoryId, entries]) => {
              const meta = BRAND_CATEGORIES.find((c) => c.id === categoryId)
              return (
                <div key={categoryId}>
                  <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-chrome/20 pb-3">
                    <h2 className="font-display text-2xl leading-none tracking-tight text-metallic sm:text-3xl">
                      {meta?.label || categoryId}
                    </h2>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-chrome/65">
                      {String(entries.length).padStart(2, '0')} ENTRIES · {meta?.short}
                    </p>
                  </div>

                  {category === 'all' ? (
                    <p className="mt-4 max-w-3xl font-editorial text-base italic leading-relaxed text-chrome/60">
                      {CATEGORY_BLURB[categoryId]}
                    </p>
                  ) : null}

                  <div className="mt-6 space-y-5">
                    {entries.map((brand, index) => (
                      <BrandEntry
                        key={brand.id}
                        brand={brand}
                        image={brand.image ? IMG[brand.image] : null}
                        index={BRANDS.indexOf(brand) + 1}
                        defaultOpen={entries.length <= 3 && index === 0}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      <TechDivider label="CHRONOLOGY NOTES" code="META" className="mx-auto max-w-[1800px] px-4 sm:px-6 xl:px-10" />

      {/* ------------------------------------------------------- CHRONOLOGY */}
      <section className="mx-auto max-w-[1800px] px-4 py-14 sm:px-6 xl:px-10">
        <SectionHeading
          index="—"
          kicker="DATING LOGIC"
          title="WHAT THE TWO NUMBERS MEAN."
          standfirst="Entries where a date is disputed or loosely reported are flagged in the record itself. Nothing here is presented as certain when it is not."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-px bg-chrome/15 sm:grid-cols-2">
            {[
              {
                term: 'Founded 1997–2006',
                body: 'The label was created inside the period — Juicy Couture (1997), Sean John (1998), Rocawear (1999), Baby Phat (1999), True Religion (2002), Ed Hardy (2004).',
              },
              {
                term: 'Older, peaked in the period',
                body: 'Chanel (1910), Gucci (1921), Prada (1913), Louis Vuitton (1854), Versace (1978), Diesel (1978), Miss Sixty (1991), BAPE (1993), Supreme (1994).',
              },
              {
                term: 'Closed',
                body: 'The business ceased trading. Heatherette closed in 2008; Gadzooks ceased operating after 2005.',
              },
              {
                term: 'Closed, then relaunched',
                body: 'Delia’s wound down its retail operations by 2015 and now operates under licence as a sub-brand of Dolls Kill.',
              },
              {
                term: 'Acquired or sold',
                body: 'A change of ownership rather than a closure. Rocawear (2007), Baby Phat (2004, and reacquired 2019), Sean John (2016), Ecko Unltd. (2009).',
              },
              {
                term: 'Decline in popularity',
                body: 'Nothing more than that. A brand falling out of fashion is not the same as a brand dying, and this archive never treats it as one.',
              },
            ].map((row) => (
              <div key={row.term} className="bg-ink p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyber/80">{row.term}</p>
                <p className="mt-3 text-sm leading-relaxed text-chrome/65">{row.body}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {[
              ['logoPlateBrands', IMG.missSixtyStore, 'Miss Sixty, Neal Street, London'],
              ['juicy', IMG.juicyOutside, 'Juicy Couture storefront, 2007'],
              ['bape', IMG.bapeInside, 'Inside BAPE, 2009'],
            ].map(([key, image, label]) => (
              <figure key={key} className="border border-chrome/20 bg-[#0b0c11]/70">
                <SmartImage
                  src={image?.src}
                  alt={image?.alt || label}
                  ratio={1.6}
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="border-0 border-b border-chrome/15"
                />
                <figcaption className="p-3">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-chrome/70">{label}</p>
                  {image?.note ? (
                    <p className="mt-1.5 font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-chrome/60">
                      {image.note}
                    </p>
                  ) : null}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
