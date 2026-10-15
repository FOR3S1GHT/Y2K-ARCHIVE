import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, ORG } from '../data/site'
import { useClock } from '../hooks/useClock'
import DigitalLabel from './DigitalLabel'
import MobileMenu from './MobileMenu'

const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

export default function Navbar() {
  const [openFor, setOpenFor] = useState(null)
  const [scrolled, setScrolled] = useState(
    () => typeof window !== 'undefined' && window.scrollY > 24,
  )
  const location = useLocation()
  const now = useClock()
  const reduce = useReducedMotion()

  // The menu is tied to the route it was opened on, so navigating away closes
  // it without needing a synchronising effect.
  const open = openFor === location.pathname
  const toggleOpen = () => setOpenFor(open ? null : location.pathname)
  const closeMenu = () => setOpenFor(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const active = NAV_LINKS.find((l) => l.path === location.pathname)

  return (
    <>
      <a
        href="#archive-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-100 focus:border focus:border-cyber focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-[0.2em] focus:text-cyber"
      >
        Skip to archive content
      </a>

      {/* Masthead */}
      <div className="hidden border-b border-chrome/15 bg-ink lg:block">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-6 px-6 py-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-chrome/70 xl:px-10">
          <span className="flex items-center gap-4">
            <span className="text-cyber">{ORG.status}</span>
            <span className="text-chrome/60">|</span>
            <span>{ORG.build}</span>
          </span>
          <span className="flex items-center gap-4">
            <span>ARCHIVE INDEX // {ORG.range}</span>
            <span className="text-chrome/60">|</span>
            <span>LOCAL TIME {timeFormatter.format(now)}</span>
          </span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          scrolled ? 'border-chrome/25 bg-ink/92 backdrop-blur-lg' : 'border-chrome/15 bg-ink/70 backdrop-blur-sm'
        }`}
      >
        <nav
          aria-label="Archive sections"
          className="mx-auto flex max-w-[1800px] items-stretch justify-between gap-4 px-4 xl:px-10"
        >
          <NavLink
            to="/"
            end
            className="group flex shrink-0 flex-col justify-center py-2.5 pr-2"
          >
            <span className="font-display text-xl leading-none tracking-tight text-metallic sm:text-2xl">
              Y2K
              <span className="text-electric-soft">//</span>
              ARCHIVE
            </span>
            <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.34em] text-chrome/70 transition-colors group-hover:text-cyber">
              {ORG.tagline}
            </span>
          </NavLink>

          <div className="hidden items-stretch lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.id}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  [
                    'group relative flex flex-col justify-center gap-1 border-l border-chrome/12 px-4 py-2.5 first:border-l-0',
                    'font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-200',
                    isActive ? 'text-metallic' : 'text-chrome/70 hover:text-metallic',
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="flex items-center gap-1.5">
                      <span className={`text-[8px] ${isActive ? 'text-cyber' : 'text-chrome/60'}`}>{link.code}</span>
                      {link.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`h-px w-full origin-left transition-transform duration-300 ${
                        isActive
                          ? 'scale-x-100 bg-gradient-to-r from-cyber via-electric to-transparent'
                          : 'scale-x-0 bg-chrome/40 group-hover:scale-x-100'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <DigitalLabel tone="cyber" marker="none" className="hidden sm:inline-flex">
              {timeFormatter.format(now)}
            </DigitalLabel>
            <button
              type="button"
              onClick={toggleOpen}
              aria-expanded={open}
              aria-controls="archive-mobile-menu"
              className="flex items-center gap-2 border border-chrome/35 bg-gradient-to-b from-[#33363f] to-[#16181e] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-metallic transition-colors hover:border-cyber/70"
            >
              {open ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
              {open ? 'CLOSE' : 'MENU'}
            </button>
          </div>

          {/* Desktop module readout */}
          <div className="hidden items-center gap-4 pl-4 lg:flex">
            <span className="hidden flex-col items-end xl:flex">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-chrome/65">ACTIVE MODULE</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyber">
                {active ? active.module : 'PORTAL.SYS'}
              </span>
            </span>
            <span className="flex items-center gap-2 border border-chrome/20 px-2.5 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-chrome/70">
              <span className="size-1.5 animate-signal rounded-full bg-cyber motion-reduce:animate-none" aria-hidden="true" />
              ONLINE
            </span>
          </div>
        </nav>

        {/* Section progress rail */}
        <div className="relative h-px w-full bg-chrome/12">
          <motion.span
            key={location.pathname}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyber to-electric"
            initial={reduce ? { width: '100%' } : { width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <MobileMenu onClose={closeMenu} activePath={location.pathname} />
        ) : null}
      </AnimatePresence>
    </>
  )
}
