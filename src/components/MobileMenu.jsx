import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'motion/react'
import { X, ArrowUpRight } from 'lucide-react'
import { NAV_LINKS, ORG, TICKER_ITEMS } from '../data/site'
import { useScrollLock } from '../hooks/useScrollLock'

export default function MobileMenu({ onClose, activePath }) {
  const panelRef = useRef(null)
  useScrollLock(true)

  // Close on Escape and move focus into the panel for keyboard users.
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    panelRef.current?.querySelector('a, button')?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      id="archive-mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Archive index"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-60 overflow-y-auto bg-ink/97 backdrop-blur-xl lg:hidden"
    >
      <div className="tech-grid min-h-full">
        <div className="flex items-center justify-between border-b border-chrome/20 px-4 py-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyber">{ORG.build} // INDEX</span>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 border border-chrome/35 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-metallic"
          >
            <X className="size-3.5" aria-hidden="true" />
            CLOSE
          </button>
        </div>

        <nav aria-label="Archive sections" className="divide-y divide-chrome/12">
          {NAV_LINKS.map((link, index) => {
            const isActive = link.path === activePath
            return (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * index, duration: 0.3 }}
              >
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  onClick={onClose}
                  className={`flex items-center justify-between gap-4 px-4 py-4 transition-colors ${
                    isActive ? 'bg-chrome/8' : 'hover:bg-chrome/5'
                  }`}
                >
                  <span className="flex items-baseline gap-3">
                    <span
                      className={`font-mono text-[10px] tracking-[0.2em] ${
                        isActive ? 'text-cyber' : 'text-chrome/60'
                      }`}
                    >
                      {link.code}
                    </span>
                    <span
                      className={`font-display text-2xl leading-none tracking-tight ${
                        isActive ? 'chrome-plate' : 'text-chrome/70'
                      }`}
                    >
                      {link.label}
                    </span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="hidden font-mono text-[9px] uppercase tracking-[0.16em] text-chrome/60 sm:inline">
                      {link.module}
                    </span>
                    <ArrowUpRight
                      className={`size-4 ${isActive ? 'text-cyber' : 'text-chrome/60'}`}
                      aria-hidden="true"
                    />
                  </span>
                </NavLink>
              </motion.div>
            )
          })}
        </nav>

        <div className="border-t border-chrome/15 px-4 py-5">
          <p className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-chrome/65">
            {ORG.status} // ARCHIVE INDEX {ORG.range} // {ORG.revision}
          </p>
          <p className="mt-3 font-editorial text-sm italic text-chrome/70">
            A fictional archive operating system containing a real history of the years 1997–2006.
          </p>
          <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-chrome/60">
            {TICKER_ITEMS[0]}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
