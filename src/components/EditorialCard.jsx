import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, ZoomIn } from 'lucide-react'
import SmartImage from './SmartImage'
import DigitalLabel from './DigitalLabel'

/**
 * Editorial image card. Four visual variants keep the archive from turning
 * into a grid of identical tiles: `plate`, `bleed`, `split`, and `stack`.
 */
export default function EditorialCard({
  image,
  index,
  title,
  kicker,
  meta,
  caption,
  variant = 'plate',
  onOpen,
  delay = 0,
  className = '',
  imageClassName = '',
  priority = false,
}) {
  const reduce = useReducedMotion()

  const animationProps = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
      }

  const isBleed = variant === 'bleed'
  const isSplit = variant === 'split'

  return (
    <motion.figure
      {...animationProps}
      className={`group relative ${isBleed ? 'overflow-hidden' : 'border border-chrome/20 bg-[#0b0c11]/70'} ${className}`}
    >
      <div className={`relative ${isBleed ? '' : 'p-0'}`}>
        {onOpen ? (
          <button
            type="button"
            onClick={onOpen}
            aria-label={`Open ${title} at full size`}
            className="block w-full cursor-zoom-in text-left focus-visible:outline-offset-4"
          >
            <SmartImage
              src={image?.src}
              alt={image?.alt || title}
              ratio={image?.ratio}
              priority={priority}
              className={`${isBleed ? 'border-0' : ''} ${imageClassName}`}
              imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          </button>
        ) : (
          <SmartImage
            src={image?.src}
            alt={image?.alt || title}
            ratio={image?.ratio}
            priority={priority}
            className={`${isBleed ? 'border-0' : ''} ${imageClassName}`}
            imgClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        )}

        {/* corner coordinate labels */}
        <span className="pointer-events-none absolute left-2 top-2 font-mono text-[8px] uppercase tracking-[0.2em] text-metallic/70 mix-blend-difference">
          {index ? String(index).padStart(3, '0') : 'ARC'}
        </span>
        {meta ? (
          <span className="pointer-events-none absolute right-2 top-2 border border-metallic/25 bg-ink/70 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-metallic/85 backdrop-blur-sm">
            {meta}
          </span>
        ) : null}

        {onOpen ? (
          <span className="pointer-events-none absolute bottom-2 right-2 flex size-7 items-center justify-center border border-chrome/30 bg-ink/80 text-chrome opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            <ZoomIn className="size-3.5" aria-hidden="true" />
          </span>
        ) : null}
      </div>

      <figcaption className={isBleed ? 'p-4' : 'border-t border-chrome/15 p-4'}>
        <div className={`flex gap-4 ${isSplit ? 'sm:items-start' : ''}`}>
          <div className="min-w-0 flex-1">
            {kicker ? <DigitalLabel tone="chrome" marker="bar">{kicker}</DigitalLabel> : null}
            {title ? (
              <p className="mt-2.5 font-display text-lg leading-tight tracking-tight text-metallic">{title}</p>
            ) : null}
            {caption ? (
              <p className="mt-2 font-editorial text-sm italic leading-relaxed text-chrome/60">{caption}</p>
            ) : null}
          </div>
          {isSplit && image?.credit ? (
            <p className="max-w-[10rem] shrink-0 font-mono text-[8px] uppercase leading-relaxed tracking-[0.14em] text-chrome/60">
              {image.credit} · {image.licence}
            </p>
          ) : null}
        </div>

        {image?.note ? (
          <p className="mt-3 border-t border-chrome/10 pt-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-chrome/65">
            {image.note}
          </p>
        ) : null}
      </figcaption>
    </motion.figure>
  )
}

/** Compact image tile used for dense archive strips. */
export function MiniPlate({ image, label, onOpen, className = '' }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group relative block overflow-hidden border border-chrome/20 text-left ${className}`}
      aria-label={`Open ${label} at full size`}
    >
      <SmartImage
        src={image?.src}
        alt={image?.alt || label}
        ratio={image?.ratio}
        className="border-0"
        imgClassName="transition-transform duration-700 group-hover:scale-105"
        sizes="20vw"
      />
      <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-ink via-ink/80 to-transparent px-2 pb-1.5 pt-5 font-mono text-[8px] uppercase tracking-[0.16em] text-chrome/70">
        <span className="truncate">{label}</span>
        <ArrowUpRight className="size-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
      </span>
    </button>
  )
}
