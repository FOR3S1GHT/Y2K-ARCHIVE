import { useEffect, useRef, useState } from 'react'
import { ImageOff } from 'lucide-react'

/**
 * Image with a reserved aspect box (no layout shift), lazy loading, and a
 * resilient loading strategy.
 *
 * Remote archives such as Wikimedia Commons rate-limit bursts of requests, so
 * a failure is retried twice with a backoff before the fallback panel is shown.
 * The retry is cache-busted so a throttled response is not reused.
 */
const RETRY_DELAYS = [1400, 4200]

export default function SmartImage({
  src,
  alt = '',
  ratio,
  className = '',
  imgClassName = '',
  sizes = '100vw',
  priority = false,
  tone = 'chrome',
}) {
  const [state, setState] = useState('loading')
  const [attempt, setAttempt] = useState(0)
  const [currentSrc, setCurrentSrc] = useState(src)
  const [trackedSrc, setTrackedSrc] = useState(src)
  const timer = useRef(null)

  // Reset when the record changes (the lightbox reuses this component across
  // images). Adjusting state during render is React's documented pattern for
  // this, and avoids a second paint with the previous image's status.
  if (src !== trackedSrc) {
    setTrackedSrc(src)
    setCurrentSrc(src)
    setState('loading')
    setAttempt(0)
  }

  useEffect(() => () => clearTimeout(timer.current), [])

  const fallbackRatio = ratio && ratio > 0 ? ratio : 0.75
  const tones = {
    chrome: 'from-graphite to-ink',
    cyber: 'from-cyber/25 to-graphite',
    pink: 'from-hotpink/25 to-graphite',
  }

  const handleError = () => {
    if (attempt < RETRY_DELAYS.length) {
      const delay = RETRY_DELAYS[attempt]
      setAttempt((n) => n + 1)
      timer.current = setTimeout(() => {
        setState('loading')
        setCurrentSrc(`${src}${src.includes('?') ? '&' : '?'}retry=${attempt + 1}`)
      }, delay)
      return
    }
    setState('error')
  }

  if (!src || state === 'error') {
    return (
      <div
        role="img"
        aria-label={alt || 'Image unavailable'}
        style={{ aspectRatio: fallbackRatio }}
        className={`relative flex w-full items-center justify-center overflow-hidden border border-chrome/30 bg-gradient-to-br ${tones[tone] || tones.chrome} ${className}`}
      >
        <div className="absolute inset-0 scanlines opacity-60" aria-hidden="true" />
        <span className="relative flex flex-col items-center gap-2 px-4 text-center">
          <ImageOff className="size-5 text-chrome/70" aria-hidden="true" />
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-chrome/70">
            Image unavailable
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-chrome/60">
            Source: Wikimedia Commons
          </span>
        </span>
      </div>
    )
  }

  return (
    <div
      className={`relative w-full overflow-hidden border border-chrome/20 bg-graphite ${className}`}
      style={{ aspectRatio: fallbackRatio }}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-gradient-to-br ${tones[tone] || tones.chrome} transition-opacity duration-700 ${
          state === 'loaded' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="absolute inset-0 scanlines opacity-40" />
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 px-2 pb-2">
          <span className="size-1.5 animate-signal bg-cyber/80 motion-reduce:animate-none" />
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-chrome/60">
            {attempt > 0 ? `RETRY ${attempt}/${RETRY_DELAYS.length}` : 'LOADING'}
          </span>
        </div>
      </div>
      <img
        key={currentSrc}
        src={currentSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        referrerPolicy="no-referrer"
        sizes={sizes}
        onLoad={() => setState('loaded')}
        onError={handleError}
        className={`relative size-full object-cover transition-[opacity,transform,filter] duration-700 ${
          state === 'loaded' ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  )
}
