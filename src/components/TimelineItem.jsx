import { motion, useReducedMotion } from 'motion/react'
import { ShieldAlert, ShieldCheck, Clock } from 'lucide-react'
import SmartImage from './SmartImage'

/**
 * Timeline milestone. The rail position, chapter tone and verification
 * status are all carried by the record itself.
 */
export default function TimelineItem({ milestone, image, index, align = 'left', isActive = false, onOpenImage }) {
  const reduce = useReducedMotion()

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, x: align === 'left' ? -18 : 18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* node */}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-6 z-10 hidden size-2.5 -translate-x-1/2 border lg:block ${
          isActive ? 'border-cyber bg-cyber' : 'border-chrome/50 bg-ink'
        }`}
      />

      <div
        className={[
          'ml-0 border bg-[#0b0c11]/75 transition-colors lg:w-[calc(50%-2rem)]',
          align === 'left' ? 'lg:ml-0' : 'lg:ml-auto',
          isActive ? 'border-cyber/50' : 'border-chrome/20 hover:border-chrome/40',
        ].join(' ')}
      >
        <div className="flex flex-col sm:flex-row">
          {image ? (
            <div className="w-full shrink-0 sm:w-40 lg:w-36">
              {onOpenImage ? (
                <button
                  type="button"
                  onClick={onOpenImage}
                  aria-label={`View image for ${milestone.title} full size`}
                  className="block w-full cursor-zoom-in"
                >
                  <SmartImage
                    src={image.src}
                    alt={image.alt}
                    ratio={1}
                    className="border-0 border-b border-chrome/15 sm:border-b-0 sm:border-r"
                    sizes="160px"
                  />
                </button>
              ) : (
                <SmartImage
                  src={image.src}
                  alt={image.alt}
                  ratio={1}
                  className="border-0 border-b border-chrome/15 sm:border-b-0 sm:border-r"
                  sizes="160px"
                />
              )}
            </div>
          ) : (
            <div className="hidden w-36 shrink-0 items-center justify-center border-r border-chrome/15 bg-gradient-to-br from-graphite to-ink sm:flex">
              <span className="px-3 text-center font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-chrome/60">
                NO IMAGE ON RECORD
              </span>
            </div>
          )}

          <div className="min-w-0 flex-1 p-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <time
                dateTime={String(milestone.year)}
                className="font-display text-2xl leading-none tracking-tight text-metallic"
              >
                {milestone.year}
              </time>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyber/80">{milestone.date}</span>
            </div>

            <h3 className="mt-2.5 font-display text-lg leading-tight tracking-tight text-metallic sm:text-xl">
              {milestone.title}
            </h3>

            <p className="mt-2.5 text-sm leading-relaxed text-chrome/65">{milestone.body}</p>

            <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-chrome/12 pt-2.5">
              <span
                className={`flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] ${
                  milestone.verified ? 'text-cyber/70' : 'text-hotpink/100'
                }`}
              >
                {milestone.verified ? (
                  <ShieldCheck className="size-3" aria-hidden="true" />
                ) : (
                  <ShieldAlert className="size-3" aria-hidden="true" />
                )}
                {milestone.verified ? 'DATED EVENT' : 'INTERPRETATION'}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-chrome/60">
                {milestone.tag}
              </span>
              {milestone.coda ? (
                <span className="flex items-center gap-1.5 border border-holo/30 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-holo">
                  <Clock className="size-3" aria-hidden="true" />
                  POST-ARCHIVE CODA
                </span>
              ) : null}
            </div>

            {milestone.caveat ? (
              <p className="mt-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-chrome/65">
                {milestone.caveat}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {/* index marker on the rail */}
      <span
        aria-hidden="true"
        className={`absolute left-4 top-5 hidden font-mono text-[9px] uppercase tracking-[0.2em] text-chrome/60 lg:block ${
          align === 'left' ? '' : ''
        }`}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
    </motion.li>
  )
}
