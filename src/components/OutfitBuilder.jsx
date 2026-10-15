import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Check, Copy, Dices, RotateCcw, Save, Star, Trash2, Download, Heart } from 'lucide-react'
import SmartImage from './SmartImage'
import DigitalLabel from './DigitalLabel'
import MetallicButton from './MetallicButton'
import {
  ACCESSORIES,
  BOTTOMS,
  CLOSET_SLOTS,
  EMPTY_LOOK,
  FOOTWEAR,
  STYLES,
  TOPS,
  findOption,
  findStyle,
  lookDescription,
  lookName,
  randomLook,
  slotImage,
} from '../data/closet'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useCopy } from '../hooks/useCopy'

const TONE_TEXT = {
  chrome: 'text-chrome/70',
  cyber: 'text-cyber',
  pink: 'text-hotpink',
  holo: 'text-holo',
}

const SLOT_OPTIONS = { top: TOPS, bottom: BOTTOMS, footwear: FOOTWEAR, accessory: ACCESSORIES }

/**
 * Futuristic styling laboratory.
 *
 * This is an editorial mood-board tool, not virtual try-on: it composes a
 * written look and a reference board from real garment photographs. The
 * interface says so rather than implying a fitting simulation.
 */
export default function OutfitBuilder() {
  const [look, setLook] = useState(EMPTY_LOOK)
  const [favourites, setFavourites] = useLocalStorage('y2k-archive-favourites', [])
  const [feedback, setFeedback] = useState(null)
  const { copy, status: copyStatus } = useCopy()
  const reduce = useReducedMotion()

  const style = findStyle(look.style)
  const name = useMemo(() => lookName(look), [look])
  const description = useMemo(() => lookDescription(look), [look])

  const selected = useMemo(
    () =>
      CLOSET_SLOTS.map((slot) => ({
        slot,
        option: findOption(slot.id, look[slot.id]),
        image: slotImage(findOption(slot.id, look[slot.id])?.ref),
      })),
    [look],
  )

  const flash = useCallback((message, tone = 'ok') => {
    setFeedback({ message, tone })
    setTimeout(() => setFeedback(null), 2600)
  }, [])

  const update = (slotId, optionId) => {
    setLook((prev) => ({ ...prev, [slotId]: optionId }))
  }

  const save = () => {
    const entry = { ...look, name, description, savedAt: Date.now() }
    setFavourites((prev) => {
      const exists = prev.some((item) => item.name === name && item.description === description)
      if (exists) {
        flash('This exact look is already saved', 'warn')
        return prev
      }
      flash(`Saved as “${name}” — stored in this browser`, 'ok')
      return [entry, ...prev].slice(0, 24)
    })
  }

  const remove = (savedAt) => {
    setFavourites((prev) => prev.filter((item) => item.savedAt !== savedAt))
    flash('Look removed from favourites')
  }

  const loadFavourite = (entry) => {
    setLook({
      style: entry.style,
      top: entry.top,
      bottom: entry.bottom,
      footwear: entry.footwear,
      accessory: entry.accessory,
    })
    flash('Favourite loaded into the board')
  }

  const copyDescription = async () => {
    const ok = await copy(`${name} — ${description}`)
    if (ok) flash('Look description copied to clipboard')
    else flash('Clipboard unavailable — select the text and copy manually', 'warn')
  }

  const reset = () => {
    setLook(EMPTY_LOOK)
    flash('Board reset to the default look')
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_26rem]">
      {/* ---------------------------------------------------------- CONTROLS */}
      <div className="space-y-5">
        {/* Style selector */}
        <fieldset className="border border-chrome/20 bg-[#0b0c11]/70 p-4">
          <legend className="px-1 font-mono text-[10px] uppercase tracking-[0.22em] text-chrome/70">
            01 · STYLE MODULE
          </legend>
          <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            {STYLES.map((option) => {
              const active = option.id === look.style
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => update('style', option.id)}
                  className={[
                    'flex flex-col gap-1 border px-3 py-3 text-left transition-colors duration-200',
                    active
                      ? 'border-cyber/70 bg-gradient-to-b from-cyber/20 to-transparent'
                      : 'border-chrome/20 hover:border-chrome/50',
                  ].join(' ')}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-chrome/65">
                      {option.code}
                    </span>
                    {active ? <Check className="size-3 text-cyber" aria-hidden="true" /> : null}
                  </span>
                  <span
                    className={`font-display text-lg leading-none tracking-tight ${
                      active ? 'text-metallic' : 'text-chrome/70'
                    }`}
                  >
                    {option.label}
                  </span>
                </button>
              )
            })}
          </div>
          <p className="mt-3 font-editorial text-sm italic leading-relaxed text-chrome/70">{style.blurb}</p>
        </fieldset>

        {/* Slot pickers */}
        {CLOSET_SLOTS.map((slot, i) => (
          <fieldset key={slot.id} className="border border-chrome/20 bg-[#0b0c11]/70 p-4">
            <legend className="px-1 font-mono text-[10px] uppercase tracking-[0.22em] text-chrome/70">
              {String(i + 2).padStart(2, '0')} · {slot.label.toUpperCase()}
            </legend>
            <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
              {SLOT_OPTIONS[slot.id].map((option) => {
                const active = option.id === look[slot.id]
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => update(slot.id, option.id)}
                    className={[
                      'flex items-start gap-3 border p-2.5 text-left transition-colors duration-200',
                      active
                        ? 'border-electric/70 bg-gradient-to-b from-electric/20 to-transparent'
                        : 'border-chrome/20 hover:border-chrome/50',
                    ].join(' ')}
                  >
                    <span className="relative size-12 shrink-0 overflow-hidden border border-chrome/20">
                      {slotImage(option.ref) ? (
                        <SmartImage
                          src={slotImage(option.ref)?.src}
                          alt=""
                          ratio={1}
                          className="border-0"
                          sizes="48px"
                        />
                      ) : (
                        <span className="flex size-full items-center justify-center bg-graphite font-mono text-[8px] text-chrome/60">
                          {option.label.slice(0, 3).toUpperCase()}
                        </span>
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5">
                        <span
                          className={`font-mono text-[10px] uppercase leading-tight tracking-[0.12em] ${
                            active ? 'text-metallic' : 'text-chrome/70'
                          }`}
                        >
                          {option.label}
                        </span>
                        {active ? <Check className="size-3 shrink-0 text-electric-soft" aria-hidden="true" /> : null}
                      </span>
                      <span className="mt-1 block font-mono text-[9px] uppercase leading-relaxed tracking-[0.1em] text-chrome/65">
                        {option.note}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>
        ))}

        {/* Controls */}
        <div className="flex flex-wrap gap-2 border border-chrome/20 bg-[#0b0c11]/70 p-4">
          <MetallicButton onClick={save} tone="electric" Icon={Save} size="md">
            SAVE LOOK
          </MetallicButton>
          <MetallicButton onClick={() => setLook(randomLook(look))} tone="cyan" Icon={Dices} size="md">
            RANDOMIZE
          </MetallicButton>
          <MetallicButton onClick={copyDescription} tone="chrome" Icon={Copy} size="md">
            {copyStatus === 'copied' ? 'COPIED' : 'COPY DESCRIPTION'}
          </MetallicButton>
          <MetallicButton onClick={reset} tone="ghost" Icon={RotateCcw} size="md">
            RESET
          </MetallicButton>
        </div>
      </div>

      {/* ---------------------------------------------------------- BOARD */}
      <div className="space-y-5 xl:sticky xl:top-28 xl:self-start">
        <div className="border border-chrome/25 bg-[#0c0d12]/92">
          <div className="flex items-center justify-between gap-3 border-b border-chrome/15 bg-gradient-to-b from-[#1d1f27] to-[#111219] px-3 py-2">
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-metallic/85">
              <span className="size-1.5 animate-signal bg-cyber motion-reduce:animate-none" aria-hidden="true" />
              OUTFIT BOARD
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-chrome/65">
              {selected.filter((s) => s.image).length}/4 IMG
            </span>
          </div>

          <div className="tech-grid p-4">
            {/* Keyed re-mount gives the same fade as an exit animation without
                retaining a detached node if frames are throttled. */}
            <motion.div
              key={name}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-chrome/65">GENERATED LOOK</p>
              <h2 className="mt-1.5 font-display text-3xl leading-none tracking-tight chrome-plate">{name}</h2>
              <p className={`mt-2 font-mono text-[10px] uppercase tracking-[0.2em] ${TONE_TEXT[style.tone]}`}>
                {style.label} · {findOption('top', look.top)?.label} · {findOption('bottom', look.bottom)?.label}
              </p>
            </motion.div>

            {/* Composition grid */}
            <div className="mt-4 grid grid-cols-2 gap-1.5">
              {selected.map(({ slot, option, image }) => (
                <motion.div
                  key={`${slot.id}-${option?.id}`}
                  initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.28 }}
                  className="relative border border-chrome/20"
                >
                  {image ? (
                    <SmartImage src={image.src} alt={image.alt} ratio={1} className="border-0" sizes="180px" />
                  ) : (
                    <div className="flex aspect-square items-center justify-center bg-graphite">
                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-chrome/60">
                        {option?.label}
                      </span>
                    </div>
                  )}
                  <span className="absolute left-0 top-0 bg-ink/85 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-chrome/70 backdrop-blur-sm">
                    {slot.code}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-ink via-ink/85 to-transparent px-1.5 pb-1 pt-4 font-mono text-[8px] uppercase tracking-[0.12em] text-chrome/80">
                    {option?.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <p className="mt-4 border-t border-chrome/15 pt-3 text-sm leading-relaxed text-chrome/65">
              {description}
            </p>

            <p className="mt-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-chrome/60">
              Board tool only — this composes a written look and a reference set from real garment photographs. No
              try-on simulation is performed.
            </p>
          </div>
        </div>

        {/* Favourites */}
        <div className="border border-chrome/20 bg-[#0b0c11]/70">
          <div className="flex items-center justify-between gap-3 border-b border-chrome/15 px-3 py-2">
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-chrome/60">
              <Heart className="size-3 text-hotpink" aria-hidden="true" />
              FAVOURITES
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-chrome/60">
              {favourites.length} SAVED · LOCAL
            </span>
          </div>

          {favourites.length === 0 ? (
            <p className="p-4 font-editorial text-sm italic leading-relaxed text-chrome/70">
              Nothing saved yet. Build a look and press SAVE LOOK — favourites are stored in this browser only and will
              still be here after a refresh.
            </p>
          ) : (
            <ul className="max-h-96 divide-y divide-chrome/10 overflow-y-auto">
              {favourites.map((entry) => (
                <li key={entry.savedAt} className="flex items-start gap-3 p-3">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center border border-chrome/20 font-mono text-[9px] text-chrome/70">
                    {String(entry.savedAt).slice(-3)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-metallic/85">
                      {entry.name}
                    </span>
                    <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.1em] text-chrome/65">
                      {findStyle(entry.style).label} · {findOption('top', entry.top)?.label} ·{' '}
                      {findOption('bottom', entry.bottom)?.label}
                    </span>
                  </span>
                  <span className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      onClick={() => loadFavourite(entry)}
                      aria-label={`Load ${entry.name} into the board`}
                      className="border border-chrome/20 p-1.5 text-chrome/70 transition-colors hover:border-cyber/60 hover:text-cyber"
                    >
                      <Download className="size-3" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(entry.savedAt)}
                      aria-label={`Remove ${entry.name} from favourites`}
                      className="border border-chrome/20 p-1.5 text-chrome/70 transition-colors hover:border-hotpink/60 hover:text-hotpink"
                    >
                      <Trash2 className="size-3" aria-hidden="true" />
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Reference plate */}
        <div className="border border-chrome/20 bg-[#0b0c11]/70 p-4">
          <DigitalLabel tone="holo">STYLE REFERENCES</DigitalLabel>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {style.refs.map((ref) => {
              const image = slotImage(ref)
              if (!image) return null
              return (
                <SmartImage key={ref} src={image.src} alt={image.alt} ratio={1} className="border-0" sizes="120px" />
              )
            })}
          </div>
          <p className="mt-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-chrome/65">
            Reference photographs for the {style.label} module. These are the real garments the archive holds for this
            style, not the items selected above.
          </p>
        </div>
      </div>

      {/* Feedback toast */}
      <AnimatePresence>
        {feedback ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.24 }}
            role="status"
            aria-live="polite"
            className="fixed bottom-20 left-1/2 z-60 flex -translate-x-1/2 items-center gap-3 border border-chrome/30 bg-ink/96 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] shadow-[0_24px_60px_-20px_rgba(0,0,0,1)] backdrop-blur sm:bottom-8"
          >
            {feedback.tone === 'warn' ? (
              <Star className="size-3.5 text-hotpink" aria-hidden="true" />
            ) : (
              <Check className="size-3.5 text-cyber" aria-hidden="true" />
            )}
            <span className={feedback.tone === 'warn' ? 'text-hotpink' : 'text-metallic'}>{feedback.message}</span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
