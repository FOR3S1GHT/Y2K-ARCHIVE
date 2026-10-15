import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Grid2x2, LayoutGrid, Rows4, ZoomIn, ShieldCheck, Info } from 'lucide-react'

import DigitalLabel from '../components/DigitalLabel'
import Marquee from '../components/Marquee'
import TechDivider from '../components/TechDivider'
import SmartImage from '../components/SmartImage'
import MetallicButton from '../components/MetallicButton'
import ImageLightbox from '../components/ImageLightbox'
import { SearchInput, FilterBar, EmptyState } from '../components/ArchiveControls'

import { ARCHIVE_CATEGORIES, ARCHIVE_ITEMS, archiveByCategory } from '../data/archive'

const DENSITY = {
  dense: { cols: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6', sizes: '16vw' },
  standard: { cols: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4', sizes: '25vw' },
  feature: { cols: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3', sizes: '33vw' },
}

/**
 * Museum-style masonry using CSS columns so image heights stay natural.
 * Every tile opens the shared keyboard-accessible lightbox.
 */
function MasonryGrid({ items, onOpen, sizes }) {
  const reduce = useReducedMotion()
  return (
    <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 xl:columns-5 [&>*]:mb-3">
      {items.map((item, index) => (
        <motion.figure
          key={item.id}
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.45, delay: Math.min(index % 8, 6) * 0.04 }}
          className="group relative break-inside-avoid border border-chrome/20 bg-[#0b0c11]/70"
        >
          <button
            type="button"
            onClick={() => onOpen(index)}
            aria-label={`Open ${item.title} at full size`}
            className="block w-full cursor-zoom-in text-left"
          >
            <SmartImage
              src={item.src}
              alt={item.alt}
              ratio={item.ratio}
              className="border-0"
              imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              sizes={sizes}
            />
            <span className="pointer-events-none absolute right-2 top-2 flex size-7 items-center justify-center border border-chrome/30 bg-ink/80 text-chrome opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              <ZoomIn className="size-3.5" aria-hidden="true" />
            </span>
          </button>
          <figcaption className="border-t border-chrome/15 p-2.5">
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-cyber/80">{item.yearLabel}</p>
            <p className="mt-1 font-display text-sm leading-tight tracking-tight text-metallic">{item.title}</p>
            <p className="mt-1 font-mono text-[8px] uppercase leading-relaxed tracking-[0.12em] text-chrome/60">
              {item.note}
            </p>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  )
}

/**
 * Feature layout: an editorial sequence of alternating full-bleed and
 * paired plates, used for the unfiltered "everything" view.
 */
function EditorialGrid({ items, onOpen, sizes }) {
  const reduce = useReducedMotion()
  return (
    <div className="space-y-10">
      {items.map((item, index) => {
        const wide = index % 7 === 0
        const partnered = index % 7 === 3 && items[index + 1]
        const partner = partnered ? items[index + 1] : null

        if (partnered) {
          return (
            <div key={`${item.id}-pair`} className="grid gap-6 sm:grid-cols-2">
              {[item, partner].map((entry, i) => (
                <figure key={entry.id} className="group border border-chrome/20 bg-[#0b0c11]/70">
                  <button
                    type="button"
                    onClick={() => onOpen(index + i)}
                    className="block w-full cursor-zoom-in"
                    aria-label={`Open ${entry.title} at full size`}
                  >
                    <SmartImage
                      src={entry.src}
                      alt={entry.alt}
                      ratio={i === 0 ? 0.9 : 1.15}
                      className="border-0"
                      imgClassName="transition-transform duration-[900ms] group-hover:scale-[1.04]"
                      sizes="45vw"
                    />
                  </button>
                  <figcaption className="border-t border-chrome/15 p-3">
                    <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-cyber/80">
                      {entry.yearLabel} · {entry.note}
                    </p>
                    <p className="mt-1.5 font-display text-lg leading-tight tracking-tight text-metallic">
                      {entry.title}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          )
        }

        if (index % 7 === 4) return null // consumed by the pair above

        return (
          <motion.figure
            key={item.id}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className={`group ${wide ? 'border border-chrome/20 bg-[#0b0c11]/70' : 'mx-auto max-w-3xl'}`}
          >
            <div className={wide ? 'grid lg:grid-cols-[1.35fr_0.65fr]' : ''}>
              <button
                type="button"
                onClick={() => onOpen(index)}
                className="block w-full cursor-zoom-in"
                aria-label={`Open ${item.title} at full size`}
              >
                <SmartImage
                  src={item.src}
                  alt={item.alt}
                  ratio={wide ? 1.5 : item.ratio}
                  className="border-0"
                  imgClassName="transition-transform duration-[900ms] group-hover:scale-[1.03]"
                  sizes={wide ? '60vw' : sizes}
                />
              </button>
              <figcaption className={wide ? 'flex flex-col justify-center p-6' : 'pt-3'}>
                <div className="flex flex-wrap items-center gap-2">
                  <DigitalLabel tone="cyber" marker="box">
                    {item.category.toUpperCase()}
                  </DigitalLabel>
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-chrome/65">
                    {item.yearLabel}
                  </span>
                </div>
                <p className={`mt-3 font-display leading-tight tracking-tight text-metallic ${wide ? 'text-2xl' : 'text-lg'}`}>
                  {item.title}
                </p>
                <p className="mt-2 font-editorial text-sm italic leading-relaxed text-chrome/60">{item.note}</p>
                <p className="mt-3 font-mono text-[8px] uppercase leading-relaxed tracking-[0.14em] text-chrome/60">
                  {item.credit} · {item.licence}
                </p>
              </figcaption>
            </div>
          </motion.figure>
        )
      })}
    </div>
  )
}

export default function Archive() {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [layout, setLayout] = useState('editorial')
  const [lightbox, setLightbox] = useState(null)

  const counts = useMemo(() => {
    const map = { all: ARCHIVE_ITEMS.length }
    ARCHIVE_CATEGORIES.forEach((c) => {
      if (c.id === 'all') return
      map[c.id] = ARCHIVE_ITEMS.filter((item) => item.category === c.id).length
    })
    return map
  }, [])

  const filtered = useMemo(() => archiveByCategory(category, query), [category, query])

  const resetAll = () => {
    setCategory('all')
    setQuery('')
  }

  const periodCount = filtered.filter((item) => item.year && item.year <= 2009).length
  const laterCount = filtered.filter((item) => item.year && item.year > 2009).length

  return (
    <>
      {/* ------------------------------------------------------------ MASTHEAD */}
      <section className="relative overflow-hidden border-b border-chrome/20">
        <div className="absolute inset-0 tech-grid opacity-50" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1800px] px-4 pb-10 pt-10 sm:px-6 lg:pt-14 xl:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <DigitalLabel tone="electric" marker="box">
                  IMAGE_MEMORY.db
                </DigitalLabel>
                <DigitalLabel tone="chrome">MUSEUM MODE</DigitalLabel>
                <DigitalLabel tone="cyber">{ARCHIVE_ITEMS.length} RECORDS</DigitalLabel>
              </div>

              <h1 className="mt-7 font-display text-[2.8rem] leading-[0.86] tracking-tight sm:text-[4rem] lg:text-[5rem]">
                <span className="block text-metallic">LOOK AT THE</span>
                <span className="block chrome-plate">EVIDENCE,</span>
                <span className="block text-metallic">
                  NOT THE <span className="text-electric-soft">AESTHETIC.</span>
                </span>
              </h1>

              <p className="mt-6 max-w-2xl font-editorial text-lg italic leading-relaxed text-chrome/70">
                A curated visual collection in nine categories. Every record states what kind of image it is — a period
                photograph, a museum object, a product shot, or later material — and links to its own source page.
              </p>
            </div>

            <div className="border border-chrome/20 bg-[#0b0c11]/70 p-5">
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-chrome/70">
                <ShieldCheck className="size-3.5 text-cyber" aria-hidden="true" />
                DATING POLICY
              </p>
              <p className="mt-3 text-sm leading-relaxed text-chrome/65">
                Dates shown are the dates recorded on the source file page. Where a record is a modern photograph of a
                period object or a later image used for context, the record says so in its own note and carries its own
                year.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-chrome/15 pt-4">
                <div>
                  <p className="font-display text-2xl leading-none text-cyber">{periodCount}</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-chrome/65">
                    C.1996–2009
                  </p>
                </div>
                <div>
                  <p className="font-display text-2xl leading-none text-holo">{laterCount}</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-chrome/65">
                    LATER MATERIAL
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Marquee
          items={[
            'RUNWAY & GARMENT',
            'STREETWEAR',
            'CELEBRITY LOOKS',
            'DENIM',
            'ACCESSORIES',
            'CYBER FASHION',
            'POP CULTURE',
            'RETAIL & MEDIA',
          ]}
          tone="cyan"
          speed="slow"
        />
      </section>

      {/* ------------------------------------------------------------ CONTROLS */}
      <section className="sticky top-[57px] z-30 border-b border-chrome/20 bg-ink/95 backdrop-blur-lg">
        <div className="mx-auto flex max-w-[1800px] flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-end lg:gap-5 xl:px-10">
          <div className="lg:w-80 lg:shrink-0">
            <SearchInput
              value={query}
              onChange={setQuery}
              label="Search the visual archive"
              placeholder="SEARCH RECORDS…"
              id="image-search"
            />
          </div>

          <FilterBar
            options={ARCHIVE_CATEGORIES}
            value={category}
            onChange={setCategory}
            counts={counts}
            label="Archive category"
            className="lg:flex-1"
          />

          <div className="flex shrink-0 items-center justify-between gap-3 lg:justify-end">
            <div className="flex gap-1">
              {[
                { id: 'dense', icon: Grid2x2, label: 'Dense grid' },
                { id: 'standard', icon: LayoutGrid, label: 'Standard grid' },
                { id: 'editorial', icon: Rows4, label: 'Editorial layout' },
              ].map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setLayout(option.id)}
                  aria-pressed={layout === option.id}
                  aria-label={option.label}
                  title={option.label}
                  className={`border p-2 transition-colors ${
                    layout === option.id
                      ? 'border-cyber/70 text-cyber'
                      : 'border-chrome/20 text-chrome/70 hover:border-chrome/50'
                  }`}
                >
                  <option.icon className="size-3.5" aria-hidden="true" />
                </button>
              ))}
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-chrome/65">
              {String(filtered.length).padStart(3, '0')} RECORDS
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ RESULTS */}
      <section className="mx-auto max-w-[1800px] px-4 py-10 sm:px-6 xl:px-10">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3 border-b border-chrome/20 pb-3">
          <h2 className="font-display text-2xl leading-none tracking-tight text-metallic sm:text-3xl">
            {category === 'all' ? 'EVERY RECORD' : (ARCHIVE_CATEGORIES.find((c) => c.id === category)?.label || '').toUpperCase()}
          </h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-chrome/65">
            {layout === 'editorial' ? 'EDITORIAL LAYOUT' : layout === 'dense' ? 'DENSE GRID' : 'STANDARD GRID'}
            {query ? ` · QUERY “${query}”` : ''}
          </p>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="No records match those filters"
            body="Try a broader category, or search for a garment, a year or a photographer."
            onReset={resetAll}
          />
        ) : layout === 'editorial' ? (
          <EditorialGrid items={filtered} onOpen={setLightbox} sizes="60vw" />
        ) : (
          <MasonryGrid items={filtered} onOpen={setLightbox} sizes={DENSITY[layout]?.sizes || '25vw'} />
        )}
      </section>

      <TechDivider
        label="CREDITS // ALL RECORDS LINK TO SOURCE"
        code="LIC"
        className="mx-auto max-w-[1800px] px-4 sm:px-6 xl:px-10"
      />

      {/* ------------------------------------------------------------ CREDIT NOTE */}
      <section className="mx-auto max-w-[1800px] px-4 py-14 sm:px-6 xl:px-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="border border-chrome/20 bg-[#0b0c11]/70 p-5">
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome/70">
              <Info className="size-3.5 text-cyber" aria-hidden="true" />
              Where these images come from
            </p>
            <p className="mt-3 text-sm leading-relaxed text-chrome/65">
              Every photograph in this archive is drawn from Wikimedia Commons. The photographer credit and licence
              shown on each record are copied from that file’s own page and link back to it.
            </p>
          </div>
          <div className="border border-chrome/20 bg-[#0b0c11]/70 p-5">
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome/70">
              <ShieldCheck className="size-3.5 text-cyber" aria-hidden="true" />
              What is not here
            </p>
            <p className="mt-3 text-sm leading-relaxed text-chrome/65">
              Runway photography and magazine editorials from 1997–2006 are almost entirely under copyright, so this
              archive holds none of them. It shows what it can show legally, and says what it cannot.
            </p>
          </div>
          <div className="border border-chrome/20 bg-[#0b0c11]/70 p-5">
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome/70">
              <ZoomIn className="size-3.5 text-cyber" aria-hidden="true" />
              Using the lightbox
            </p>
            <p className="mt-3 text-sm leading-relaxed text-chrome/65">
              Click any record to open it full size. Use the arrow keys to move between images and Escape to close. The
              panel shows the full credit, licence and a link to the original file page.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <MetallicButton to="/about" tone="chrome" size="md">
            READ THE FULL CREDITS &amp; GLOSSARY
          </MetallicButton>
        </div>
      </section>

      <ImageLightbox
        items={filtered}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onNavigate={(direction) =>
          setLightbox((current) => {
            if (current === null || !filtered.length) return current
            return (current + direction + filtered.length) % filtered.length
          })
        }
      />
    </>
  )
}
