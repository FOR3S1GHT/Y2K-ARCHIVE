/**
 * Small uppercase technical label with a leading indicator dot —
 * the repeated vocabulary of the archive interface.
 */
export default function DigitalLabel({
  children,
  tone = 'chrome',
  marker = 'dot',
  className = '',
  as: Tag = 'span',
}) {
  const tones = {
    chrome: 'text-chrome/70 border-chrome/20',
    cyber: 'text-cyber border-cyber/30',
    pink: 'text-hotpink border-hotpink/30',
    electric: 'text-electric-soft border-electric/40',
    holo: 'text-holo border-holo/30',
  }
  const markers = {
    dot: <span aria-hidden="true" className="size-1 rounded-full bg-current" />,
    bar: <span aria-hidden="true" className="h-2.5 w-px bg-current" />,
    box: <span aria-hidden="true" className="size-1.5 border border-current" />,
    none: null,
  }

  return (
    <Tag
      className={`inline-flex items-center gap-2 border px-2 py-1 font-mono text-[9px] uppercase leading-none tracking-[0.2em] sm:text-[10px] ${tones[tone] || tones.chrome} ${className}`}
    >
      {markers[marker] ?? markers.dot}
      {children}
    </Tag>
  )
}
