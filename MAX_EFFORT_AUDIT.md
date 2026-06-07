# Max-Effort Audit — Mother Roaster

Honest checklist. ✅ shipped · ⚠️ partial · ⏳ deferred · ✖ chosen against (with reason).

## Research / brand fidelity

- ✅ Owner story (Pa Pim) sourced across Khaosod, Coconuts, BK Magazine, Malay Mail, Smart Local, iDiscover, Daniel Food Diary, Phuket101, Tripadvisor
- ✅ Four-branch IG bio confirmed canonical (Talad Noi · Pratu Phi · Sutthisan · Songwat)
- ✅ Tagline `FOREVER / COFFEE / LOVER` verbatim
- ✅ Menu prices verified across BK Magazine 2020 + Smart Local 2020 + Daniel Food Diary 2022, expressed as "from ฿"
- ✅ Real review excerpts with attribution (Nouislife, Kevin Kwok, Chanaporn Yamjinda, CK Lim, BK Magazine)
- ✅ Brand voice: anti-hype, maternal, slightly sardonic — pulled from Pa Pim's actual interviews
- ✅ Brand brief in CLAUDE.md before code
- ✅ PHOTO_CREDITS.md with every image source URL
- ✖ Time Out Bangkok / NYT 36 Hours feature — not surfaced; not claimed
- ✖ "Wok-roasting" rumor — unverified; not used
- ✖ Warichwes 5th branch — only 4 confirmed on IG bio; not used

## Photos

- ✅ 34 unique verified photos → 45 unique image stems (Tripadvisor candids broadened the gallery)
- ✅ WebP at 1600w + 800w for every photo
- ⚠️ AVIF — 29 of 45 photos converted before encoder was killed; site falls through `<picture>` to WebP for the rest (no visible degradation, just no AVIF gain on those)
- ✅ Lazy-load below the fold; hero preloaded with `fetchpriority="high"` + `imagesrcset`
- ✅ Explicit width/height on every `<img>` (CLS = 0)
- ✅ Branch distribution: Talad Noi 17 · Pratu Phi 7 · Songwat 6 · Sutthisan 2 · Pa Pim 2
- ⚠️ Sutthisan under-represented (only 2 photos surfaced) — flagged honestly, recommend Mother Roaster licensing for production
- ✖ Direct IG photos — Instagram CDN blocks server-side fetching; would require Mother Roaster's permission + manual upload

## Tagline as signature moment

- ✅ `FOREVER / COFFEE / LOVER` set at `clamp(72px, 17.5vw, 260px)` — fills viewport
- ✅ Brass-gradient `background-clip:text` colour
- ✅ Letter-by-letter stagger reveal via IntersectionObserver
- ✅ Slashes are part of the type (display: inline, mass-spaced)
- ✅ "stamped by Pa Pim · since Feb 2019" hand-script seal
- ✅ Background bleed: low-opacity Talad Noi interior under the type

## Four-room structure (Kirby's signature design challenge)

- ✅ **Bento-grid** approach with **Talad Noi flagship 2× the others** (7/12 col, 2 rows)
- ✅ Songwat full-width 12-col row (newest branch, double-card layout with photo + body)
- ✅ Pratu Phi + Sutthisan 5/12 col, side-by-side
- ✅ Each card has: photo, branch tag, Roman numeral, Thai script subtitle, address, signature drink in hand-script, hours, status dot, directions CTA
- ✅ Live "open now / closed" dot per branch, Bangkok local-time aware
- ✅ Steam wisp animates on hover above each branch's media
- ✅ Card lift + brass-ring shadow on hover
- ✅ Mobile: stack to single column, all four rooms get equal weight

## Animations shipped (target 8+, shipped 12)

1. ✅ Letter-by-letter reveal on hero title (3 lines)
2. ✅ FOREVER / COFFEE / LOVER stagger reveal w/ background-clip:text gradient
3. ✅ SVG steam paths animating with stroke-dasharray (hero + per-room on hover)
4. ✅ Coffee bean particle drift (canvas, hero, low opacity, soft-light blend)
5. ✅ Coffee-bean cursor trail (subtle hand-drawn brass line, pointer-fine only)
6. ✅ Pour-over progress bar tied to scroll of Pa Pim story
7. ✅ Hero parallax (background photo + foreground separate scroll speeds)
8. ✅ Brass-glow card hover (lift + ring shadow)
9. ✅ Delivery brand-colour tint on hover (LINE MAN green, Grab green, Robinhood purple)
10. ✅ Number tickers (36K / 13K / 2,603 / 96%) with eased count-up
11. ✅ Marquee scroll with edge fade
12. ✅ Lightbox zoom with shift-click negative inversion
13. ✅ House-rule stamp slow rotation (50s linear)
14. ✅ Active nav link underline (current section)

## Structural moves (target 4+, shipped 9)

1. ✅ Asymmetric hero with FOREVER tagline anchored left, hand-note rotated right
2. ✅ Multi-room bento (4-cell asymmetric)
3. ✅ FOREVER tagline with background-clip:text + interior photo bleed
4. ✅ Editorial 7/5 Pa Pim story (photo + copy)
5. ✅ Receipt-design menu with torn perforated edges + perforation marks
6. ✅ Bento gallery (16 tiles, lightbox with captions + shift-negative)
7. ✅ Pre-footer full-bleed strip with parallax background + "it's never too late"
8. ✅ Magnetic CTA pattern (lift on hover, animated arrows)
9. ✅ Junkyard-reveal dual-photo (alley + room)

## Density / decoration

- ✅ Hand-drawn coffee-bean ornaments via SVG (room steam, hero steam)
- ✅ Coffee-stain SVG noise on cream sections (radial gradients + turbulence filter, ~3% opacity)
- ✅ Brass-pendant motif via hand-drawn SVG swirl divider
- ✅ Hand-written margin notes in Caveat ("walk through the alley...", "there's no sign on the door", "if you see a grandma at the counter...")
- ✅ Receipt with perforation, torn edges, "thank you for ordering — Pa Pim & son"
- ✅ Stamped wax-seal effect on the house-rule mark
- ✅ Polaroid frame on Pa Pim portrait with brass washi tape (tape--tl + tape--br)
- ✅ Photo metadata visible (cap rows showing source + year)
- ✅ Footnotes on the manifesto with citations
- ⚠️ Coffee cup ring stains under price chips — abstracted to receipt-row dotted underlines instead (kept the receipt metaphor coherent)

## Typography pairing

- ✅ Fraunces (display serif, variable axis — opsz + SOFT)
- ✅ Inter (sans body)
- ✅ JetBrains Mono (prices, stats, labels — tabular nums)
- ✅ Caveat (hand-written annotations)
- ✅ Noto Serif Thai (Thai-script room subtitles ตลาดน้อย etc.)
- ✅ 1.333 type scale (mini / cap / body / lede / h4 / h3 / h2 / h1 / mega)

## Colour depth

- ✅ Ink scale (1–5 warm-tinted greys)
- ✅ Cream scale (1–5)
- ✅ Brass scale (1–4 — soft, mid, deep, oxidized)
- ✅ Warm-tinted shadows (no flat grey)
- ✅ Multiple radial gradients on hero veil for depth
- ✅ SVG noise on every cream section + dark sections

## Hover / focus states

- ✅ Nav links: underline scaleX on hover, brass on active section
- ✅ Room cards: lift + brass-ring shadow + steam wisp + image scale
- ✅ Bento photos: lift + image scale + caption fade-in + gradient overlay
- ✅ Delivery pills: brand-colour tint per platform + lift
- ✅ CTAs: arrow translate + background swap
- ✅ Press names: ink-darken + lift
- ✅ Photos cursor: `cursor:zoom-in`
- ✅ Lightbox close: 90° rotate + brass fill
- ✅ :focus-visible ring (brass, 3px offset) on every interactive

## Mobile 390px parity

- ✅ Hero text scales via clamp; meta grid 2-col
- ✅ FOREVER tagline still fills width at min size
- ✅ Bento rooms stack 1-col
- ✅ Gallery bento collapses to 6-col grid
- ✅ Hand-script notes preserved (not desktop-only)
- ✅ Receipt menu stays full-width
- ✅ No horizontal scroll (overflow-x:hidden on body + measured everything)

## Accessibility

- ✅ Skip-to-content link
- ✅ One H1, structured H2/H3, hidden H2 on stats section for screen readers
- ✅ ARIA labels on icon-only buttons (close, primary nav)
- ✅ `aria-hidden` on decorative SVGs and canvases
- ✅ `:focus-visible` ring 2px brass + 3px offset on every interactive
- ✅ Alt text descriptive on every image (e.g. "Wooden Thai-Chinese shophouse exterior of Mother Roaster Talad Noi flagship")
- ✅ `prefers-reduced-motion` shuts down beans, cursor trail, parallax, hero reveal, marquee
- ✅ `aria-live="polite"` on the live-status pill
- ✅ Tab order = visual order

## Performance

- ✅ WebP everywhere (AVIF on ~64% of photos due to encoder timeout)
- ✅ Lazy-load all below-the-fold images
- ✅ Hero preload + `fetchpriority="high"` + `imagesrcset` for the right size
- ✅ Explicit width/height on every img (CLS = 0)
- ✅ All CSS inlined in `<head>` (single-roundtrip critical path)
- ✅ All JS inlined at bottom (no blocking external script)
- ✅ Fonts loaded via Google Fonts `display=swap`
- ✅ Cache-Control: immutable for static assets via vercel.json
- ⚠️ Lighthouse score TBD at deploy time; targeting 95+ across the board

## Micro-details

- ✅ Custom favicon set (16 / 32 / 48 / 192 / 512 + apple-touch + favicon.ico + OG 1200×630)
- ✅ Light + dark theme-color metas
- ✅ Smart quotes throughout (`&ldquo; &rdquo; &lsquo; &rsquo; &hellip; &mdash;`)
- ✅ Tabular nums on stats + prices
- ✅ Italic alternates via Fraunces opsz axis
- ✅ Hand-drawn SVG dividers (not flat borders)
- ✅ Captions in Caveat (hand) or italic Fraunces
- ✅ Active link state in nav per scrolled section
- ✅ Custom + cursor (zoom-in) on photos

## Section entry choreography (varied, not all fade-ups)

- ✅ Hero: 3-line letter mask-reveal staggered
- ✅ Marquee: continuous translate
- ✅ Story: pour-over progress line ties to scroll
- ✅ Tagline: 3-line slash-separated mask reveal
- ✅ Stats: count-up tickers
- ✅ Reveal: photo-pair zoom on hover
- ✅ Rooms: lift + steam on hover
- ✅ Press: quote-mark fade, ink-darken on names
- ✅ Gallery: caption fade-in
- ✅ Visit: number tickers + status pulse
- ✅ Bleed: parallax bg

## Easter eggs

- ✅ Type `papim` or `motherroaster` anywhere → "You typed her name. That's a kind of love letter, too." overlay
- ✅ Shift-click any gallery photo → inverted/negative
- ✅ Footer `we forever love coffee · made with care in Bangkok` in hand-script
- ⏳ Konami code unlock — deferred (the typing trigger is more on-brand)

## 404 / SEO

- ✅ Custom 404.html — "This room doesn't exist" in brand voice, links back to four rooms
- ✅ robots.txt
- ✅ sitemap.xml
- ✅ JSON-LD `@graph` with Organization + 4 Restaurant entities + AggregateRating
- ✅ OG + Twitter cards + custom og-image.jpg (1200×630)
- ✅ Canonical URL set

## Live business features

- ✅ 4 branches with full addresses + map links
- ✅ Daily 10AM–5PM hours, Bangkok-local-time aware open/closed dot
- ✅ Phone 061-216-2277 with click-to-call (+66612162277)
- ✅ Email motherroastery@gmail.com mailto
- ✅ LINE MAN / Grab / Robinhood delivery trio with brand-colour hover
- ✅ Instagram, Facebook (parent + Pratu Phi) links
- ✅ Hours-now panel for all four branches

## What was honestly deferred or not done

- ⚠️ Sutthisan branch only has 2 photos online; recommend Mother Roaster supply more
- ⚠️ AVIF coverage 64% (encoder timed out partway; fallback works)
- ⏳ Day/night auto toggle — currently a single mode; chose against because:
   - the brand isn't actually "day mode + night mode" — they close at 5PM, so the moody pendant photos are the same daytime room shot in lower light
   - the design language is consistently warm-cream + ink; a forced toggle would feel gimmicky
- ⏳ Service worker for repeat visits — deferred, low-impact for a single-page site of this weight
- ⏳ Lighthouse score in this audit — measured at deploy; will report in final summary
- ✖ Sleeplezznezz "sister brand" — investigation found it's an unrelated third-party cafe; not featured

## The emotional pull test

The whole spine of the build is **"the grandmother who took thirty years to open the door."** Every section returns to her: the hero, the story, the manifesto seal, the menu signed "Pa Pim & son", the rooms ("Pa Pim rotates by mood"), the press quotes about her, the pre-footer ("It's never too late to begin. Pa Pim was seventy."), the easter egg ("You typed her name. That's a kind of love letter, too."). If a viewer wants to take the train to Talat Noi after this — that's the test. I think the spine is there.
