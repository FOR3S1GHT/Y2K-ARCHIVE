import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { SkipForward } from 'lucide-react'
import { ORG } from '../data/site'

const STEPS = [
  'INITIALIZING ARCHIVE...',
  'MOUNTING MEMORY SECTOR 04...',
  'STYLE DATABASE ONLINE',
  'SIGNAL RECEIVED',
]

/**
 * Restrained boot sequence, shown once per session and skippable at any
 * point. It never blocks: the button is always available and the whole
 * sequence is disabled under reduced-motion.
 */
export default function LoadingScreen() {
  const reduce = useReducedMotion()
  const [done, setDone] = useState(() => {
    if (typeof window === 'undefined') return true
    // Honour the OS reduced-motion setting before the sequence is ever shown.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return true
    try {
      return window.sessionStorage.getItem('y2k-archive-booted') === '1'
    } catch {
      return true
    }
  })
  const [progress, setProgress] = useState(0)
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (done || reduce) return undefined

    let raf = 0
    const started = performance.now()
    const DURATION = 1750

    const tick = (now) => {
      const ratio = Math.min(1, (now - started) / DURATION)
      setProgress(ratio)
      setStep(Math.min(STEPS.length - 1, Math.floor(ratio * STEPS.length)))
      if (ratio < 1) raf = requestAnimationFrame(tick)
      else finish()
    }

    const finish = () => {
      try {
        window.sessionStorage.setItem('y2k-archive-booted', '1')
      } catch {
        /* sessionStorage unavailable — the sequence will simply run again */
      }
      setProgress(1)
      setDone(true)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [done, reduce])

  const skip = () => {
    try {
      window.sessionStorage.setItem('y2k-archive-booted', '1')
    } catch {
      /* ignore */
    }
    setDone(true)
  }

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-ink px-5"
          role="status"
          aria-live="polite"
        >
          <div className="absolute inset-0 tech-grid opacity-40" aria-hidden="true" />
          <div className="absolute inset-0 scanlines opacity-70" aria-hidden="true" />

          <div className="relative w-full max-w-md">
            <p className="font-mono text-[9px] uppercase tracking-[0.34em] text-chrome/65">{ORG.build}</p>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="mt-4 font-display text-4xl leading-none tracking-tight text-metallic sm:text-5xl"
            >
              Y2K<span className="text-electric-soft">//</span>ARCHIVE
            </motion.p>

            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-cyber/80">
              {ORG.tagline}
            </p>

            <div className="mt-8 h-[3px] w-full overflow-hidden bg-chrome/15">
              <div
                className="h-full bg-gradient-to-r from-electric via-cyber to-hotpink transition-[width] duration-100 ease-linear"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>

            <div className="mt-3 flex items-baseline justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.22em]">
              <span className="text-chrome/70">{STEPS[step]}</span>
              <span className="text-chrome/60">{String(Math.round(progress * 100)).padStart(3, '0')}%</span>
            </div>

            <button
              type="button"
              onClick={skip}
              className="mt-8 flex items-center gap-2 border border-chrome/25 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome/60 transition-colors hover:border-cyber/60 hover:text-cyber"
            >
              <SkipForward className="size-3.5" aria-hidden="true" />
              SKIP BOOT SEQUENCE
            </button>

            <p className="mt-6 font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-chrome/60">
              Fictional interface sequence. Shown once per session.
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
