import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Power, ArrowUp } from 'lucide-react'
import { NAV_LINKS, ORG, TICKER_ITEMS } from '../data/site'
import { ARTICLE_COUNT, IMAGE_COUNT } from '../data/stats'
import DigitalLabel from './DigitalLabel'

/**
 * Archive footer styled as a system shutdown panel.
 * The "shutdown" interaction is archive fiction and says so.
 */
export default function Footer() {
  const [shutdown, setShutdown] = useState(false)

  useEffect(() => {
    if (!shutdown) return undefined
    const id = setTimeout(() => setShutdown(false), 4200)
    return () => clearTimeout(id)
  }, [shutdown])

  return (
    <footer className="relative mt-24 border-t border-chrome/20 bg-graphite">
      <div className="tech-grid">
        {/* signal strip */}
        <div className="overflow-hidden border-b border-chrome/15 bg-ink/60">
          <div className="flex w-max animate-marquee-slow items-center gap-8 whitespace-nowrap py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-chrome/65 motion-reduce:animate-none">
            {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={`${item}-${i}`} className="flex items-center gap-8">
                {item}
                <span aria-hidden="true">/</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto grid max-w-[1800px] gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr_0.8fr] xl:px-10">
          <div>
            <Link to="/" className="inline-block">
              <span className="font-display text-3xl leading-none tracking-tight text-metallic sm:text-4xl">
                Y2K<span className="text-electric-soft">//</span>ARCHIVE
              </span>
            </Link>
            <p className="mt-3 max-w-md font-editorial text-base italic leading-relaxed text-chrome/60">
              {ORG.tagline} A digital fashion archive covering {ORG.range}: the trends, the brands, the people and the
              machines that made the millennium feel like a launch sequence.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <DigitalLabel tone="cyber">{ORG.build}</DigitalLabel>
              <DigitalLabel tone="chrome">{ORG.revision}</DigitalLabel>
              <DigitalLabel tone="holo">IMAGE MEMORY {IMAGE_COUNT}</DigitalLabel>
            </div>
          </div>

          <nav aria-label="Footer index" className="grid grid-cols-2 gap-x-6 gap-y-1 self-start">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                className="group flex items-center gap-2 border-b border-chrome/10 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-chrome/70 transition-colors hover:border-cyber/50 hover:text-cyber"
              >
                <span className="text-[8px] text-chrome/60 group-hover:text-cyber">{link.code}</span>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="self-start">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-chrome/70">SYSTEM PANEL</span>
            <dl className="mt-4 space-y-2 font-mono text-[10px] uppercase tracking-[0.14em]">
              {[
                ['Archive index', ORG.range],
                ['Sections online', `${NAV_LINKS.length} / ${NAV_LINKS.length}`],
                ['Articles', String(ARTICLE_COUNT)],
                ['Visual records', String(IMAGE_COUNT)],
                ['Source imagery', 'Wikimedia Commons'],
              ].map(([term, value]) => (
                <div key={term} className="flex items-baseline justify-between gap-4 border-b border-chrome/10 pb-1.5">
                  <dt className="text-chrome/65">{term}</dt>
                  <dd className="text-right text-metallic/85">{value}</dd>
                </div>
              ))}
            </dl>

            <button
              type="button"
              onClick={() => setShutdown(true)}
              className="mt-6 flex w-full items-center justify-between gap-3 border border-chrome/30 bg-gradient-to-b from-[#2a2d36] to-[#14151a] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-metallic transition-colors hover:border-hotpink/70 hover:text-hotpink"
            >
              <span className="flex items-center gap-2">
                <Power className="size-3.5" aria-hidden="true" />
                SHUT DOWN ARCHIVE
              </span>
              <span className="text-chrome/60">FICTION</span>
            </button>
          </div>
        </div>

        <div className="border-t border-chrome/15 bg-ink">
          <div className="mx-auto flex max-w-[1800px] flex-col gap-3 px-4 py-4 font-mono text-[9px] uppercase tracking-[0.18em] text-chrome/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 xl:px-10">
            <p>
              {ORG.name} — a fictional interface. Photography sourced from Wikimedia Commons under the licences listed
              on each record.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/about" className="transition-colors hover:text-cyber">
                IMAGE CREDITS &amp; GLOSSARY
              </Link>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-1.5 transition-colors hover:text-cyber"
              >
                TOP <ArrowUp className="size-3" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {shutdown ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pointer-events-none fixed inset-0 z-90 flex items-center justify-center bg-ink/95 px-6"
          role="status"
        >
          <div className="w-full max-w-md border border-chrome/25 bg-[#0c0d12] p-6 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-hotpink">SHUTTING DOWN</p>
            <p className="mt-4 font-mono text-[11px] leading-relaxed tracking-[0.14em] text-chrome/70">
              CLOSING MEMORY SECTOR 04...
              <br />
              ARCHIVE INDEX SEALED.
              <br />
              <span className="text-cyber">THE FUTURE NEVER LOOKED SO GOOD.</span>
            </p>
            <div className="mt-5 h-1 w-full bg-chrome/15">
              <motion.div
                className="h-full bg-gradient-to-r from-cyber to-hotpink"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 4 }}
              />
            </div>
            <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-chrome/60">
              Decorative sequence — nothing is actually closed.
            </p>
          </div>
        </motion.div>
      ) : null}
    </footer>
  )
}
