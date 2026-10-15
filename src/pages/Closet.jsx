import { motion, useReducedMotion } from 'motion/react'
import { Beaker, Info, Keyboard, MousePointerClick } from 'lucide-react'

import DigitalLabel from '../components/DigitalLabel'
import Marquee from '../components/Marquee'
import OutfitBuilder from '../components/OutfitBuilder'
import SystemWindow from '../components/SystemWindow'
import TechDivider from '../components/TechDivider'

import { STYLES, CLOSET_SLOTS } from '../data/closet'

export default function Closet() {
  const reduce = useReducedMotion()

  return (
    <>
      {/* ------------------------------------------------------------ MASTHEAD */}
      <section className="relative overflow-hidden border-b border-chrome/20">
        <div className="absolute inset-0 tech-grid opacity-60" aria-hidden="true" />
        <div
          className="absolute -left-32 top-10 size-[26rem] rounded-full bg-holo/10 blur-[130px]"
          aria-hidden="true"
        />
        <div
          className="absolute -right-32 bottom-0 size-[26rem] rounded-full bg-cyber/10 blur-[130px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1800px] px-4 pb-10 pt-10 sm:px-6 lg:pt-14 xl:px-10">
          <div className="flex flex-wrap items-center gap-2">
            <DigitalLabel tone="holo" marker="box">
              STYLE_LAB.exe
            </DigitalLabel>
            <DigitalLabel tone="cyber">6 STYLE MODULES</DigitalLabel>
            <DigitalLabel tone="chrome">LOCAL STORAGE ENABLED</DigitalLabel>
          </div>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 font-display text-[2.8rem] leading-[0.86] tracking-tight sm:text-[4rem] lg:text-[4.8rem]"
          >
            <span className="block chrome-plate">COMPOSE A LOOK.</span>
            <span className="block text-metallic">
              SAVE IT TO <span className="text-cyber">MEMORY.</span>
            </span>
          </motion.h1>

          <div className="mt-7 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <p className="max-w-2xl font-editorial text-lg italic leading-relaxed text-chrome/70">
              Choose a style module, then a top, a bottom, footwear and an accessory. The laboratory writes a look for
              the combination, assembles a reference board from real garment photographs, and lets you save, randomise
              or copy the result.
            </p>

            <div className="border border-chrome/20 bg-[#0b0c11]/70 p-4">
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-cyber">
                <Info className="size-3.5" aria-hidden="true" />
                WHAT THIS TOOL ACTUALLY DOES
              </p>
              <ul className="mt-3 space-y-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-chrome/70">
                <li className="flex gap-2">
                  <span aria-hidden="true" className="mt-1.5 size-1 shrink-0 bg-cyber" />
                  Composes a written description from your selections.
                </li>
                <li className="flex gap-2">
                  <span aria-hidden="true" className="mt-1.5 size-1 shrink-0 bg-cyber" />
                  Assembles a reference board from real archive photographs.
                </li>
                <li className="flex gap-2">
                  <span aria-hidden="true" className="mt-1.5 size-1 shrink-0 bg-hotpink" />
                  It does not perform virtual try-on. No image is composited onto a body.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Marquee
          items={[
            'MODULE CYB · VINYL, HARDWARE, REFLECTIVE',
            'MODULE POP · CRYSTAL, SKIN, STAGE',
            'MODULE STR · OVERSIZED, GRAPHIC, BAGGY',
            'MODULE SPT · TECHNICAL, TRACK, COURT',
            'MODULE MIN · ONE LINE, ONE SURFACE',
            'MODULE GLM · EMBELLISHMENT AS THE POINT',
          ]}
          tone="cyber"
        />
      </section>

      {/* ------------------------------------------------------------ BUILDER */}
      <section className="mx-auto max-w-[1800px] px-4 py-12 sm:px-6 xl:px-10">
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            { icon: MousePointerClick, label: 'Select', body: `${CLOSET_SLOTS.length + 1} controls, all live.` },
            { icon: Beaker, label: 'Compose', body: 'Description and board update immediately.' },
            { icon: Keyboard, label: 'Store', body: 'Favourites persist in this browser after a refresh.' },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3 border border-chrome/20 bg-[#0b0c11]/70 p-4">
              <item.icon className="mt-0.5 size-4 shrink-0 text-cyber" aria-hidden="true" />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-metallic/85">{item.label}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-chrome/70">{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        <OutfitBuilder />
      </section>

      <TechDivider label="STYLE MODULES // REFERENCE" code="MOD-06" className="mx-auto max-w-[1800px] px-4 sm:px-6 xl:px-10" />

      {/* ------------------------------------------------------------ MODULE NOTES */}
      <section className="mx-auto max-w-[1800px] px-4 py-14 sm:px-6 xl:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-start">
          <div className="grid gap-px bg-chrome/15 sm:grid-cols-2 lg:grid-cols-3">
            {STYLES.map((style) => (
              <article key={style.id} className="bg-ink p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-chrome/65">{style.code}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-cyber/70">
                    {style.refs.length} REF
                  </span>
                </div>
                <h2 className="mt-3 font-display text-2xl leading-none tracking-tight text-metallic">{style.label}</h2>
                <p className="mt-3 text-sm leading-relaxed text-chrome/60">{style.blurb}</p>
              </article>
            ))}
          </div>

          <SystemWindow
            title="STYLE_LAB//NOTES"
            status="READ ONLY"
            tone="chrome"
            footer="Archive module documentation"
          >
            <p className="text-sm leading-relaxed text-chrome/65">
              The style modules are drawn from the same trend records as the rest of the archive, so a look you build
              here can be traced back to the historical entry it comes from.
            </p>
            <ul className="mt-4 space-y-2 border-t border-chrome/15 pt-4 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-chrome/70">
              <li>· All selection state lives in React state.</li>
              <li>· Favourites are stored in localStorage under y2k-archive-favourites.</li>
              <li>· Copy uses the Clipboard API with a fallback for older browsers.</li>
              <li>· Reduced-motion preferences disable every animation here.</li>
            </ul>
          </SystemWindow>
        </div>
      </section>
    </>
  )
}
