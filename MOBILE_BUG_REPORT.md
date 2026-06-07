# Mobile Bug Report — Mother Roaster

Real-device audit via Playwright Chromium on iPhone 14 Pro viewport (393×660) against the live URL `https://mother-roaster-draft.vercel.app/`. 32 scroll-position screenshots captured plus full image-load / console / network report.

## Summary

| # | Section | Symptom | Root cause | Fix |
|---|---|---|---|---|
| 1 | Songwat room card (#room-sw) | Photo missing; alt text bleeds over the dark card background | `images/optimized/phuket101_sw_01_1600.avif` was 0 bytes on disk — incomplete write during initial AVIF batch | Regenerated the AVIF from raw; verified 195 KB |
| 2 | (Latent — gallery would have hit it) | A second AVIF (`phuket101_sw_03_1600.avif`) also 0 bytes | Same root cause | Regenerated; 122 KB |
| 3 | Tagline `FOREVER / COFFEE / LOVER` (#tagline) | Huge type completely invisible; only the eyebrow + body text below show | Letters initialised with `transform: translateY(105%)` and revealed only after `IntersectionObserver` fires `.is-in`. Threshold was 0.22 — high enough that fast scroll past + iOS Safari quirks could miss it, leaving letters permanently parked off-screen below their `overflow:hidden` masks. | Three changes: (a) move the `transform: translateY(105%)` initial state behind a `.js-armed` class added on page load — without JS, letters are visible by default; (b) lower IO threshold to 0.05 with `rootMargin: -10%`; (c) belt-and-braces 2.4 s `setTimeout` that adds `.is-in` to every tagline no matter what. Also added `-webkit-text-fill-color: transparent` for iOS Safari `background-clip:text` correctness. |
| 4 | Junkyard reveal pair (#reveal) | Two photos crammed side-by-side at ~157 px wide each, captions and tag pills overlapping the photo edges, alley + room visually unreadable | `.reveal__pair` stayed `grid-template-columns: 1fr 1fr` on mobile — I had a mobile rule for `.reveal__head` / `.reveal__copy` but forgot the pair itself | Added mobile media-query: `.reveal__pair { grid-template-columns: 1fr; gap: 18px }`, switched `aspect-ratio` to 5/4 for landscape on small screens, tightened `::before` tag-pill type so it fits at 393 px width |

## What was NOT broken (verified)

- 0 console errors, 0 network errors across the live page
- All other 24 images decoded (`naturalWidth > 0`) and rendered at correct displayed sizes
- Hero, story (Pa Pim), stats tickers, menu receipt, four-room cards (Talad Noi, Pratu Phi, Sutthisan), press quotes, gallery, visit, pre-footer bleed, footer — all render correctly on mobile
- No horizontal overflow on any section (`overflow-x: hidden` on body + every section measured at exactly 393 px wide)
- AVIF `<picture>` source fallback to WebP works for all gallery `<img>` not wrapped in `<picture>` — the gallery `<button class="bento">` uses raw `<img src="...800.webp">` which is the correct mobile-friendly choice

## Files changed

- `index.html` — three edits in CSS + JS, no structural changes
- `images/optimized/phuket101_sw_01_1600.avif` — regenerated (195 KB)
- `images/optimized/phuket101_sw_03_1600.avif` — regenerated (122 KB)

## Verification plan

1. Push commit `Fix mobile rendering bugs (images + sections from real-device audit)`
2. Vercel auto-redeploys (~30 s static build)
3. Re-run the same Playwright iPhone-14 audit
4. Confirm: 0 broken images, 0 console errors, tagline FOREVER/COFFEE/LOVER fully readable at scroll ~3300, reveal-pair stacks 1-col with captions readable
