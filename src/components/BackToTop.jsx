import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUp, Terminal } from 'lucide-react'

/** Appears once the reader is deep enough into a page to want it. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setVisible(scrolled > 700)
      setProgress(total > 0 ? Math.min(1, scrolled / total) : 0)
    }
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 14 }}
          transition={{ duration: 0.25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}
          aria-label="Return to the top of the archive"
          className="group fixed bottom-4 left-4 z-40 flex items-center gap-2 border border-chrome/35 bg-ink/95 px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-metallic shadow-[0_18px_40px_-18px_rgba(0,0,0,1)] backdrop-blur transition-colors hover:border-cyber/70 hover:text-cyber sm:bottom-6 sm:left-6"
        >
          <span className="relative flex size-6 items-center justify-center">
            <svg viewBox="0 0 36 36" className="absolute size-6 -rotate-90" aria-hidden="true">
              <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" />
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={`${progress * 94.2} 94.2`}
              />
            </svg>
            <ArrowUp className="size-3" aria-hidden="true" />
          </span>
          <span className="hidden sm:inline">TOP</span>
          <Terminal className="hidden size-3 text-chrome/65 group-hover:text-cyber sm:inline" aria-hidden="true" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  )
}
