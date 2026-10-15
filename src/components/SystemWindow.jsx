import { motion, useReducedMotion } from 'motion/react'
import { Minus, X } from 'lucide-react'

const TONES = {
  chrome: 'border-chrome/25',
  cyber: 'border-cyber/35',
  pink: 'border-hotpink/35',
  electric: 'border-electric/45',
  holo: 'border-holo/35',
}

/**
 * A floating interface panel from the fictional Y2K//ARCHIVE OS.
 *
 * These are decorative display surfaces — they deliberately do NOT imitate
 * browser chrome, window traffic lights or real desktop controls. The single
 * `onDismiss` affordance is an archive-specific "collapse" action, and every
 * panel that can be collapsed can be restored by the caller.
 */
export default function SystemWindow({
  title = 'SYSTEM',
  status,
  tone = 'chrome',
  children,
  footer,
  onDismiss,
  dismissLabel = 'Collapse panel',
  className = '',
  float = false,
  delay = 0,
  as: Tag = 'div',
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={[
        'relative overflow-hidden border bg-[#0c0d12]/92 backdrop-blur-md',
        'shadow-[0_1px_0_0_rgba(255,255,255,0.09)_inset,0_24px_60px_-30px_rgba(0,0,0,1)]',
        TONES[tone] || TONES.chrome,
        float && !reduce ? 'animate-drift' : '',
        className,
      ].join(' ')}
    >
      <Tag className="flex items-center justify-between gap-3 border-b border-chrome/15 bg-gradient-to-b from-[#1d1f27] to-[#111219] px-3 py-1.5">
        <span className="flex min-w-0 items-center gap-2">
          <span aria-hidden="true" className="flex gap-1">
            <span className="size-1.5 bg-chrome/45" />
            <span className="size-1.5 bg-chrome/25" />
            <span className="size-1.5 bg-chrome/15" />
          </span>
          <span className="truncate font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-metallic/85">
            {title}
          </span>
        </span>
        {status ? (
          <span className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.16em] text-cyber/80 sm:inline">
            {status}
          </span>
        ) : null}
        {onDismiss ? (
          <button
            type="button"
            onClick={onDismiss}
            aria-label={dismissLabel}
            title={dismissLabel}
            className="shrink-0 border border-chrome/20 p-0.5 text-chrome/60 transition-colors hover:border-hotpink/60 hover:text-hotpink"
          >
            <Minus className="size-3" aria-hidden="true" />
          </button>
        ) : null}
      </Tag>

      <div className="tech-grid p-3 sm:p-4">{children}</div>

      {footer ? (
        <div className="flex items-center gap-2 border-t border-chrome/15 bg-[#101116] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-chrome/70">
          <X className="size-2.5 shrink-0" aria-hidden="true" />
          <span className="truncate">{footer}</span>
        </div>
      ) : null}
    </motion.div>
  )
}
