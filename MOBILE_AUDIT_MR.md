# Mobile Audit — Mother Roaster (round 2)

Audit run with Playwright Chromium at iPhone 14 viewport (390 × 844, dpr 2, isMobile, touch enabled), iOS Safari user-agent. Every section scrolled into view individually with a 900 ms settle before each screenshot so IntersectionObserver, lazy-load, and ticker count-ups all fire.

## Results — every section, deployed live URL

| Section | Renders on mobile? | Notes |
|---|---|---|
| Hero `#top` | ✅ | Storefront hero photo loads at 390×259, title reveal completes, lede + 4-cell meta grid stack correctly, "FIND US" CTA + hand-script note + scroll cue all visible |
| Marquee | ✅ | Continuous translate; edge fade renders |
| Pa Pim story `#story` | ✅ | Portrait loads with brass washi tape, pull-quote renders, footnote in JetBrains Mono visible |
| **Tagline `#tagline`** | ❌ (currently deployed) → ✅ (staged) | `background-clip:text` + `-webkit-text-fill-color:transparent` renders nothing on iOS / mobile Chromium. Solid cream-3 colour at base, gradient only on desktop (≥781 px) via `@media`. |
| Stats | ✅ | All four tickers animate to target (36K · 13K · 2,603 · 96 %); hand-script captions render below each |
| **Junkyard reveal `#reveal`** | ✅ (fixed previous round) | 1-col stack, full-width landscape photos, "01 · THE ALLEY" / "02 · THE ROOM" pills, captions readable |
| Menu `#menu` | ✅ | Slowly rotating "house rule" stamp, receipt with perforated edges, single-column item rows, ฿ prices tabular |
| Four rooms `#rooms` | ✅ | All four cards stack to single column on mobile; flagship no longer takes 2× weight (correct on small screens — it would crowd otherwise); photos load, brass tags, signature drink in hand-script, "GET DIRECTIONS →" CTA |
| Press `#press` | ✅ | Feature dark card (Tripadvisor) + 4 cream cards with hanging quote marks; press logos row at bottom |
| Gallery `#gallery` | ✅ | Hero tile full-width, remaining 15 tiles flow in a 6-col grid stacking 3 tiles per row; tap-to-zoom works |
| **Visit / open right now** | ⚠ (currently deployed) → ✅ (staged) | The 4-row "open right now" panel had Sutthisan row wrapping awkwardly: branch name on one line, status pill on a second with bad spacing. Fix: `flex-wrap: wrap` + clamp letter-spacing, status pill stays nowrap right-aligned; smaller text under 480 px. |
| Pre-footer bleed | ✅ | "It's never *too late* to begin. Pa Pim was seventy." headline + lede + "PICK A ROOM →" CTA, parallax background photo |
| Footer | ✅ | 4-col → 2-col on mobile (`@media max-width:780px`), Rooms / Bar / Find Us / brand columns all readable |

## Bugs found this round (and fix applied to disk)

### 1. Visit "open right now" rows wrap awkwardly on narrow screens
- **Symptom (screenshot `visit_hours_16880`):** Sutthisan row at 390 px shows "SUTTHISAN ·" on one line, "NEIGHBOURHOOD ● OPENS AT 10AM" on a second, breaking the rhythm and visually drowning the status colour.
- **Root cause:** `.visit__hours-now > div` was `flex; justify-content: space-between; gap: 14px` with no `flex-wrap`. When the branch label widened past available space, the status `<span>` pushed below but the branch text wrapped mid-name. Letter-spacing of `.14em` made it worse.
- **Fix applied:** added `flex-wrap: wrap`, gave the branch span `flex: 1 1 auto; min-width: 0`, gave the status span `flex: 0 0 auto; white-space: nowrap`. Tightened `letter-spacing` to `.12em` (and `.08em` under 480 px), font size to 11 px under 480 px.

### 2. FOREVER / COFFEE / LOVER tagline invisible on mobile (regression already staged)
- **Symptom (screenshots `sec_tagline` and `m_03600`):** the eyebrow and body text below the headline render, but the giant editorial type itself paints nothing — leaves a dark void of ~360 px height.
- **Root cause:** `background-image: linear-gradient(...)` + `background-clip: text` + `-webkit-text-fill-color: transparent` produces no visible glyphs on Playwright Chromium's mobile rendering path and (per Kirby's report) some real iOS Safari contexts. The fill is transparent, but the clipped gradient never paints. Confirmed by `getComputedStyle`: color is `rgba(0,0,0,0)`, fill is `rgba(0,0,0,0)`, gradient is set, clip is `text/text` — every pixel is transparent.
- **Fix applied:** base text colour is now `var(--cream-3)` (solid cream). The brass-gradient `background-clip:text` is moved inside `@media (min-width: 781px)` — desktop only. On mobile the giant headline always renders in solid cream, sliding up from off-screen via the existing animation. Looks consistent with the marquee that runs above it.
- Also: the slide-in animation was rewritten to target only `.w > span` (direct child) — previous selector `.w span` also grabbed `.slash` and forced it `display:block`, which would have stacked each "/" on its own line had the text been visible.

### 3. Tagline IntersectionObserver could silently fail to fire
- **Symptom:** even with the visibility fix above, a fast scroll past could leave letters parked off-screen because the IO threshold was 0.22 and the animation set initial state via CSS.
- **Fix applied (previous round, kept):** JS adds `.js-armed` only after page load; without JS, letters are visible by default. IO threshold lowered to 0.05 with `rootMargin: -10%`. Bounding-rect check at JS init reveals immediately if already in viewport. 2.4 s `setTimeout` safety net adds `.is-in` no matter what.

## Things that LOOK like bugs but are correct

- Hero background image and beans canvas measured at 406 px / 600 px wide via `getBoundingClientRect`: both live inside `overflow: hidden` containers and never cause horizontal scroll. (Hero parallax uses `transform: scale(1.04)`; bean canvas internal width is `offsetWidth × dpr` for crisp drawing but its CSS width stays at 100 % of parent.)
- Number tickers showing "1,646" / "61 %" mid-screenshot: animation in progress; final values 2,603 / 96 % render correctly when scrolled to and settled.
- "Open right now" showing all four branches CLOSED at audit time: Bangkok local time was 23:38 ICT, which is after 5 PM close. Status logic is correct.

## Staged fixes ready for push

- `index.html` — three CSS edits, no JS changes beyond the previous round
- All other files unchanged
- Files already pushed earlier: `phuket101_sw_01_1600.avif` and `phuket101_sw_03_1600.avif` (regenerated from 0 bytes)

## Verification plan

1. Push commit (the staged FOREVER + visit-row fixes)
2. Vercel auto-redeploys (~30 s)
3. Re-run this same Playwright audit
4. Confirm: tagline `getComputedStyle.color` reports `rgb(241, 227, 203)` on mobile (not transparent), no visit-hours row wraps, all 11 sections render
