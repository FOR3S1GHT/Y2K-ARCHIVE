# Y2K//ARCHIVE — THE FUTURE WAS OURS.

A digital fashion archive covering **1997–2006**, presented as a fictional computer
operating system from the year 2000.

Nine routed pages, a shared design system, real sourced photography and fully working
interactions. No backend, no database, no TypeScript, no separate stylesheets.

---

## Running the project

```bash
npm install     # install dependencies
npm run dev     # development server → http://localhost:5173
npm run build   # production build → dist/
npm run preview # serve the production build → http://localhost:4173
npm run lint    # oxlint
```

Deep links such as `/closet` or `/archive` resolve correctly on refresh in both the
development and preview servers (`historyApiFallback` is enabled in `vite.config.js`).

---

## The nine sections

| Route       | Section                | What it is                                                        |
| ----------- | ---------------------- | ----------------------------------------------------------------- |
| `/`         | Home                   | Cinematic portal: layered hero, floating system windows, 6 sections |
| `/trends`   | Trends                 | Magazine: cover story plus 17 expandable trend records             |
| `/brands`   | Brands                 | Searchable encyclopaedia, grouped into 5 categories                |
| `/timeline` | Timeline               | Interactive 1997–2006 archive with a year selector                 |
| `/icons`    | Style Icons            | Celebrity contact sheet, 15 profiles                               |
| `/closet`   | Cyber Closet           | Styling laboratory: outfit builder with saved favourites           |
| `/culture`  | Culture                | 10 long-form features, each with its own layout                    |
| `/archive`  | Archive                | Visual museum: 106 records, search, filters, lightbox              |
| `/about`    | About                  | Control room: editorial principles, credits, glossary              |

---

## Technology

- **React 19** with JavaScript and JSX only
- **Vite 8** for development and bundling
- **Tailwind CSS 4** via `@tailwindcss/vite` — design tokens live in `@theme` inside
  `src/index.css`. There are no handwritten `.css` or `.scss` stylesheets.
- **React Router 7** for routing, with route-level code splitting via `React.lazy`
- **Motion** (`motion/react`) for animation
- **Lucide React** for icons

No other runtime dependencies.

---

## Project structure

```
src/
  components/     Reusable UI: Navbar, Footer, SystemWindow, MetallicButton,
                  SmartImage, ImageLightbox, OutfitBuilder, TrendCard,
                  BrandEntry, IconCard, TimelineItem, Marquee, and others
  pages/          One file per route
  data/           Content: brands, trends, timeline, icons, archive, culture,
                  glossary, closet, site constants, stats
  hooks/          useLocalStorage, useCopy, useClock, useScrollLock
  index.css       Tailwind import + @theme design tokens
scripts/          Research helpers used to source and verify imagery (not bundled)
```

---

## Design system

Colour tokens are defined once in `src/index.css` and used as Tailwind utilities:

| Token             | Value     | Role                                    |
| ----------------- | --------- | --------------------------------------- |
| `ink`             | `#09090D` | Foundation background                   |
| `graphite`        | `#18191F` | Secondary surface                       |
| `chrome`          | `#C8CDD3` | Primary text and metallic edges         |
| `metallic`        | `#F4F4F6` | Headlines                               |
| `electric`        | `#2855FF` | Interactive states, borders, gradients  |
| `electric-soft`   | `#6B8CFF` | Electric blue safe for small text       |
| `cyber`           | `#00F0FF` | Digital labels and system states        |
| `hotpink`         | `#FF3CAC` | Editorial accents                       |
| `holo`            | `#B6A4FF` | Secondary accents and metadata          |

Fonts: **Anton** (display), **Inter** (sans), **JetBrains Mono** (technical metadata),
**Playfair Display** italic (editorial captions).

`electric-soft` exists because `#2855FF` reaches only 3.63:1 against the ink background,
which fails WCAG AA for body text. The brand blue is still used at full strength for
backgrounds, borders and gradients.

---

## Photography and provenance

Every photograph in the archive is a real file hosted on **Wikimedia Commons**.

- `src/data/imageRegistry.json` holds 117 curated records. Each one keeps the file's own
  `artist`, `licence`, `date` and `page` (source URL).
- `src/data/images.js` adds editorial `alt` text, a caption, and a `note` describing what
  kind of image it is.
- Nothing is fabricated: no invented photographer, publication, date or credit appears
  anywhere in the project.
- Uploaded images were resolved through the Commons `imageinfo` API rather than derived by
  hand, so every URL is a thumbnail the server has actually generated.

### Honest labelling

The interface distinguishes clearly between:

- **Period photographs** (1997–2009) — e.g. Aaliyah 2000, Beyoncé 2001, Britney Spears 2003
- **Museum object photographs** — e.g. Auckland Museum garments catalogued 1998–2002
- **Product photographs** — e.g. first-generation iPod, Motorola Razr V3
- **Later material** — every image from after 2009 carries its own year and a note saying
  so, and is never presented as a document of the period

Where no suitable licensed image exists — Nicole Richie's portrait, for example — the
archive prints a **typographic plate and explains why**, rather than borrowing an
unrelated photograph.

---

## Historical method

The archive separates facts that are commonly conflated:

- **Founding year vs. peak year.** Every brand entry shows both. Chanel was founded in
  1910 and peaked as a logo obsession in this period; Juicy Couture was founded in 1997.
- **Discontinued vs. acquired vs. relaunched.** Heatherette closed in 2008. Gadzooks ceased
  operating after 2005. Delia's wound down in 2015 and now operates under licence as a
  Dolls Kill sub-brand. Rocawear was sold in 2007. A brand losing popularity is never
  described as a brand dying.
- **Dated event vs. interpretation.** Every timeline milestone is flagged either
  `DATED EVENT` or `INTERPRETATION`.
- **Contested details are flagged.** The Von Dutch entry carries a `CONTESTED` marker and
  explains the trademark history rather than asserting a single founding date.

---

## Accessibility and quality

Verified with Lighthouse against the **production build**:

| Category       | Score | Note                                                        |
| -------------- | ----- | ----------------------------------------------------------- |
| Accessibility  | 100   | Home and Closet, independently re-run after the final edits  |
| SEO            | 100   |                                                              |
| Best Practices | 77    | Sole cause: Wikimedia's `WMF-Uniq` cookie — see limitation 1  |

An earlier in-harness audit reported all nine routes at 100/100/100. The independent
re-run uses a newer Lighthouse with the third-party-cookie audit enabled, which is what
surfaces the Wikimedia cookie.

Contrast is additionally verified mathematically by `scripts/check-contrast.mjs`, which
blends every `text-<colour>/<opacity>` token the project uses against every surface it
uses and asserts a WCAG 2.1 contrast ratio. All 26 tokens pass, tightest margin 4.73:1.

Also confirmed:

- Exactly one `<h1>` per page, no heading-level skips anywhere
- Every `<img>` has an `alt` attribute
- All text meets WCAG AA contrast (4.5:1) against its own background
- No horizontal overflow at any tested viewport
- Zero console errors or warnings on any route
- Keyboard: skip link, visible focus rings, `←`/`→`/`Esc` in the lightbox, focus trapping
  in modals, `Escape` closes the mobile menu
- `prefers-reduced-motion` disables the boot sequence and all animation

---

## Known limitations

1. **Wikimedia sets a third-party cookie on image requests.** The image CDN
   (`upload.wikimedia.org`) returns its own `WMF-Uniq` identifier cookie. This is
   Wikimedia's analytics and abuse-prevention cookie, not advertising, and blocking it has
   no effect on whether images load. It is the sole cause of the Best Practices score
   (77 rather than 100) in an independent Lighthouse run. Removing it entirely would
   require either a backend proxy — outside this project's scope — or self-hosting roughly
   30 MB of image files, which would also detach the images from their source pages.
   `referrerPolicy="no-referrer"` is set on every image, so Wikimedia does not receive the
   referring URL.

2. **Wikimedia rate limits.** Opening the Archive page requests up to 106 photographs,
   which Wikimedia throttles under burst. `SmartImage` retries twice with a backoff and
   falls back to a labelled "Image unavailable" panel rather than a broken image. All 117
   records are confirmed to exist on the source via the Commons `imageinfo` API.

3. **No period runway photography.** Photographs of 1997–2006 catwalk shows are almost
   entirely under copyright, so this archive holds none. Museum object photography,
   exhibition photography and period press photographs stand in where relevant.

4. **Coverage is not universal.** The trends described circulated most widely through North
   America, Western Europe and Japan. Distinct parallel scenes elsewhere are acknowledged
   in the About and Culture sections but are not described.

5. **Every image credit is checked, but licences are the source's.** Credits and licences
   are copied from each file's own page; anyone reusing this archive commercially should
   verify each licence at its linked source.

6. **The visual result was not eyeballed.** The environment used to build this had no
   display available to a screenshot tool, so the design was verified by measurement —
   Lighthouse audits, computed styles, layout geometry, a mathematical WCAG contrast check
   against every colour/opacity token, and DOM state assertions — rather than by looking at
   it.

---

## Research scripts

`scripts/` documents how the imagery was sourced and can be re-run. They are development
tooling and are excluded from linting and from the application bundle.

```bash
node scripts/gather-images.mjs       # Commons full-text search sweep
node scripts/gather-categories.mjs   # curated Commons categories
node scripts/gather-precise.mjs      # file-title prefixes + person-year categories
node scripts/gather-extra.mjs        # gap-filling pass
node scripts/merge-pool.mjs          # merge all candidates into one pool
node scripts/build-registry.mjs      # emit src/data/imageRegistry.json from picks
node scripts/repair-registry.mjs     # re-resolve URLs through the imageinfo API
node scripts/verify-registry.mjs     # confirm every record still exists on Commons
node scripts/fix-contrast.mjs        # normalise text opacities for WCAG AA
```

`gather-*` scripts write large intermediate JSON files that are git-ignored; run
`merge-pool.mjs` after them to regenerate the pool `build-registry.mjs` reads.
