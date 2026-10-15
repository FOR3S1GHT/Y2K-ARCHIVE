import { useMemo } from 'react'

/**
 * Horizontal scrolling text strip. Motion can be paused by the user and is
 * disabled entirely under reduced-motion, in which case the content is
 * static but still readable.
 */
export default function Marquee({
  items = [],
  separator = '◆',
  speed = 'normal',
  reverse = false,
  tone = 'chrome',
  className = '',
  ariaLabel = 'Archive ticker',
}) {
  const sequence = useMemo(() => {
    const list = items.length ? items : ['']
    // 4 x the list keeps the loop visually seamless at any viewport width.
    return [...list, ...list, ...list, ...list]
  }, [items])

  const tones = {
    chrome: 'text-chrome/70',
    cyber: 'text-cyber/70',
    pink: 'text-hotpink/100',
    electric: 'text-electric-soft/100',
  }

  const animation =
    speed === 'slow' ? 'animate-marquee-slow' : speed === 'none' ? '' : 'animate-marquee'

  return (
    <div
      role="marquee"
      aria-label={ariaLabel}
      className={`group relative flex w-full overflow-hidden border-y border-chrome/15 bg-[#0b0c11]/80 py-2 ${className}`}
    >
      <div
        className={`flex w-max shrink-0 items-center gap-8 whitespace-nowrap pr-8 font-mono text-[10px] uppercase tracking-[0.28em] group-hover:[animation-play-state:paused] motion-reduce:animate-none sm:text-[11px] ${animation} ${tones[tone] || tones.chrome}`}
        style={{ animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {sequence.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-8">
            <span>{item}</span>
            <span aria-hidden="true" className="text-chrome/60">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
