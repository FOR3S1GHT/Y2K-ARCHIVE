import { useMemo } from 'react'

/**
 * Technical divider: a hairline rule with a centred coordinate readout.
 * Used to break long editorial pages without adding decoration for its own sake.
 */
export default function TechDivider({ label, code, align = 'center', className = '' }) {
  const marks = useMemo(() => ['//', '◆', '/', '◆', '//'], [])

  return (
    <div
      className={`flex items-center gap-4 ${align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : ''} ${className}`}
      role="separator"
    >
      {align !== 'left' ? <span className="h-px flex-1 bg-gradient-to-r from-transparent to-chrome/25" /> : null}
      <span className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em] text-chrome/60">
        {code ? <span className="text-cyber/70">{code}</span> : null}
        {label}
        <span aria-hidden="true" className="hidden gap-1.5 sm:flex">
          {marks.map((m, i) => (
            <span key={i} className="text-chrome/60">
              {m}
            </span>
          ))}
        </span>
      </span>
      {align !== 'right' ? <span className="h-px flex-1 bg-gradient-to-l from-transparent to-chrome/25" /> : null}
    </div>
  )
}
