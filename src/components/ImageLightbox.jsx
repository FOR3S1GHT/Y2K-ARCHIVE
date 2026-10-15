import { useEffect, useMemo, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, X, ExternalLink, Keyboard } from 'lucide-react'
import SmartImage from './SmartImage'
import DigitalLabel from './DigitalLabel'
import { useScrollLock } from '../hooks/useScrollLock'

/**
 * Keyboard-accessible lightbox.
 *
 * Supports ArrowLeft / ArrowRight navigation, Escape to close, and focus
 * trapping while open. Every record shows its real credit and licence with a
 * link to the original file page.
 */
export default function ImageLightbox({ items, index, onClose, onNavigate }) {
  const open = index !== null && index >= 0 && index < items.length
  const item = open ? items[index] : null
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  useScrollLock(open)

  const meta = useMemo(() => {
    if (!item) return []
    return [
      ['Record', item.id?.toUpperCase() || '—'],
      ['Category', item.category?.toUpperCase() || '—'],
      ['Date', item.yearLabel || 'Not recorded'],
      ['File date', item.year ? String(item.year) : 'Not recorded'],
      ['Credit', item.credit || 'Unknown author'],
      ['Licence', item.licence || 'See file page'],
    ]
  }, [item])

  useEffect(() => {
    if (!open) return undefined

    const onKey = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key === 'ArrowRight') onNavigate(1)
      if (event.key === 'ArrowLeft') onNavigate(-1)
      if (event.key === 'Tab') {
        const focusable = panelRef.current?.querySelectorAll(
          'button, a[href], [tabindex]:not([tabindex="-1"])',
        )
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose, onNavigate])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-70 flex flex-col bg-ink/97 backdrop-blur-lg"
          role="dialog"
          aria-modal="true"
          aria-label={`${item.title} — image viewer`}
          ref={panelRef}
        >
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-chrome/20 px-3 py-2.5 sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <DigitalLabel tone="cyber" marker="box">
                {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </DigitalLabel>
              <p className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-chrome/70">
                IMAGE_MEMORY // {item.category?.toUpperCase()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-chrome/60 lg:flex">
                <Keyboard className="size-3" aria-hidden="true" />
                ← → navigate · ESC close
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="flex items-center gap-2 border border-chrome/35 bg-gradient-to-b from-[#33363f] to-[#16181e] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-metallic transition-colors hover:border-hotpink/70 hover:text-hotpink"
              >
                <X className="size-3.5" aria-hidden="true" />
                CLOSE
              </button>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-3 sm:p-5 lg:flex-row lg:overflow-hidden">
            <div className="relative flex min-h-0 flex-1 items-center justify-center">
              <button
                type="button"
                onClick={() => onNavigate(-1)}
                aria-label="Previous image"
                className="absolute left-0 z-10 -translate-x-1 border border-chrome/30 bg-ink/90 p-2.5 text-chrome transition-colors hover:border-cyber hover:text-cyber sm:-translate-x-3"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className="flex max-h-full w-full items-center justify-center"
                >
                  <SmartImage
                    src={item.src}
                    alt={item.alt}
                    ratio={item.ratio}
                    priority
                    className="max-h-[62vh] w-auto max-w-full lg:max-h-[calc(100vh-13rem)]"
                    imgClassName="object-contain"
                    sizes="(max-width: 1024px) 100vw, 70vw"
                  />
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={() => onNavigate(1)}
                aria-label="Next image"
                className="absolute right-0 z-10 translate-x-1 border border-chrome/30 bg-ink/90 p-2.5 text-chrome transition-colors hover:border-cyber hover:text-cyber sm:translate-x-3"
              >
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </div>

            <aside className="w-full shrink-0 border border-chrome/20 bg-[#0c0d12]/92 p-4 lg:w-80 lg:overflow-y-auto">
              <h2 className="font-display text-xl leading-tight tracking-tight text-metallic">
                {item.title}
              </h2>
              {item.note ? (
                <p className="mt-2 font-editorial text-sm italic leading-relaxed text-chrome/60">{item.note}</p>
              ) : null}

              <dl className="mt-5 divide-y divide-chrome/12 border-t border-chrome/15">
                {meta.map(([term, value]) => (
                  <div key={term} className="flex items-baseline justify-between gap-4 py-2">
                    <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-chrome/65">
                      {term}
                    </dt>
                    <dd className="text-right font-mono text-[10px] uppercase tracking-[0.1em] text-metallic/85">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              {item.filePage ? (
                <a
                  href={item.filePage}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-5 flex items-center justify-between gap-2 border border-chrome/25 px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-chrome/70 transition-colors hover:border-cyber/70 hover:text-cyber"
                >
                  Source file page
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              ) : null}

              {item.note ? null : (
                <p className="mt-4 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-chrome/60">
                  No editorial note recorded for this record.
                </p>
              )}
            </aside>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
