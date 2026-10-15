import { motion, useReducedMotion } from 'motion/react'
import DigitalLabel from './DigitalLabel'

/**
 * Editorial section heading: index number, oversized title, standfirst,
 * and an optional technical aside. Kept deliberately asymmetric.
 */
export default function SectionHeading({
  index,
  title,
  kicker,
  standfirst,
  aside,
  tone = 'chrome',
  align = 'left',
  className = '',
}) {
  const reduce = useReducedMotion()

  return (
    <div className={`${align === 'right' ? 'text-right' : ''} ${className}`}>
      <div
        className={`flex flex-wrap items-center gap-3 ${align === 'right' ? 'justify-end' : ''}`}
      >
        {index ? (
          <span className="font-display text-4xl leading-none text-chrome/60 sm:text-5xl">{index}</span>
        ) : null}
        {kicker ? <DigitalLabel tone={tone}>{kicker}</DigitalLabel> : null}
      </div>

      <motion.h2
        initial={reduce ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4 max-w-5xl font-display text-4xl leading-[0.92] tracking-tight text-metallic sm:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h2>

      <div
        className={`mt-6 grid gap-6 border-t border-chrome/15 pt-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end ${
          align === 'right' ? 'text-right' : ''
        }`}
      >
        {standfirst ? (
          <p className="max-w-3xl font-editorial text-lg italic leading-relaxed text-chrome/70 sm:text-xl">
            {standfirst}
          </p>
        ) : (
          <span />
        )}
        {aside ? (
          <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-chrome/65">
            {aside}
          </p>
        ) : null}
      </div>
    </div>
  )
}
