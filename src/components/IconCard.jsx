import { motion, useReducedMotion } from 'motion/react'
import { Star, Quote } from 'lucide-react'
import SmartImage from './SmartImage'

const FIELD_TONES = {
  pop: { id: 'pink', text: 'text-hotpink/100' },
  rnb: { id: 'electric', text: 'text-electric-soft/90' },
  fame: { id: 'holo', text: 'text-holo/80' },
  design: { id: 'chrome', text: 'text-chrome/70' },
  sport: { id: 'cyber', text: 'text-cyber/80' },
}

/**
 * Celebrity editorial plate, laid out like a contact sheet frame:
 * the portrait is stamped with its own frame number and date,
 * and the styling notes run alongside rather than beneath.
 */
export default function IconCard({ icon, image, index, variant = 'portrait' }) {
  const reduce = useReducedMotion()
  const tone = FIELD_TONES[icon.field] || FIELD_TONES.design
  const wide = variant === 'wide'

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative ${wide ? 'lg:col-span-2' : ''}`}
    >
      <div
        className={`flex flex-col border border-chrome/20 bg-[#0b0c11]/70 ${
          wide ? 'lg:flex-row lg:items-stretch' : ''
        }`}
      >
        {/* Frame */}
        <div className={`relative ${wide ? 'lg:w-[46%] lg:shrink-0' : ''}`}>
          {image ? (
            <SmartImage
              src={image.src}
              alt={image.alt}
              ratio={wide ? Math.max(image.ratio || 1, 1.1) : image.ratio}
              className="border-0"
              imgClassName="transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] grayscale-[18%] group-hover:grayscale-0"
              priority={index === 0}
              sizes={wide ? '(max-width: 1024px) 100vw, 44vw' : '(max-width: 640px) 100vw, 33vw'}
            />
          ) : (
            <div
              aria-label={`${icon.name} — no photograph available`}
              role="img"
              style={{ aspectRatio: wide ? 1.1 : 0.75 }}
              className="relative flex w-full items-center justify-center overflow-hidden border border-chrome/20 bg-gradient-to-br from-graphite via-ink to-graphite"
            >
              <div className="absolute inset-0 tech-grid opacity-70" aria-hidden="true" />
              <div className="relative px-6 text-center">
                <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-hotpink/100">
                  NO LICENSED PORTRAIT
                </p>
                <p className="mt-3 font-display text-2xl leading-tight tracking-tight chrome-plate">
                  {icon.name}
                </p>
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-chrome/65">
                  FIELD · {icon.field.toUpperCase()}
                </p>
              </div>
            </div>
          )}

          {/* contact-sheet stamps */}
          <span className="pointer-events-none absolute left-0 top-0 flex items-center gap-2 bg-ink/85 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-metallic/90 backdrop-blur-sm">
            <Star className="size-2.5 text-cyber" aria-hidden="true" />
            FRAME {String(index + 1).padStart(2, '0')}
          </span>
          <span className="pointer-events-none absolute bottom-0 right-0 bg-ink/85 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-metallic/70 backdrop-blur-sm">
            {icon.years}
          </span>
        </div>

        {/* Record */}
        <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
          <span className={`font-mono text-[10px] uppercase tracking-[0.24em] ${tone.text}`}>
            {icon.field.toUpperCase()}
          </span>
          <h3 className="mt-2 font-display text-2xl leading-[0.95] tracking-tight text-metallic sm:text-3xl">
            {icon.name}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-chrome/65">{icon.bio}</p>

          <div className="mt-4 border-t border-chrome/15 pt-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-chrome/65">Signature elements</p>
            <ul className="mt-2 space-y-1.5">
              {icon.signature.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-snug text-chrome/70">
                  <span aria-hidden="true" className="mt-1.5 size-1 shrink-0 bg-cyber/70" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 border-l-2 border-hotpink/50 pl-3">
            <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-hotpink/100">
              <Quote className="size-3" aria-hidden="true" />
              Iconic moment
            </p>
            <p className="mt-1.5 font-editorial text-sm italic leading-relaxed text-chrome/70">{icon.moment}</p>
          </div>

          <p className="mt-4 border-t border-chrome/15 pt-3 text-sm leading-relaxed text-chrome/60">
            <span className="mr-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-chrome/65">
              Influence —
            </span>
            {icon.influence}
          </p>

          {icon.portraitNote ? (
            <p className="mt-3 border border-chrome/12 bg-[#0e0f14] p-2.5 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-chrome/65">
              {icon.portraitNote}
            </p>
          ) : null}
        </div>
      </div>
    </motion.article>
  )
}
