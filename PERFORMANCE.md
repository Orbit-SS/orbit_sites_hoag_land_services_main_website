# Image delivery and performance

**Measured against production, 2026-08-29.** Every figure here was taken by
direct fetch or in a real browser, not estimated.

## What was wrong

An external audit (Karl, Aug 28) found every photograph on the site served raw
from `/photos/`, bypassing the Next image optimizer entirely. Verified: the
homepage carried four raw photos totalling **18.4 MB**, and the only
`/_next/image` reference on the page was the 19 KB logo.

The optimizer was working the whole time. Nothing was using it.

## What changed

| | Before | After |
|---|---|---|
| Photo library (`public/photos`, top level) | 293.6 MB | **26.2 MB** |
| Homepage image payload | 18.4 MB | **348 KB** |
| Site Work hub raw photos | 6.70 MB | **0** |
| Tree Services hub | 3.63 MB | **0** |
| Fencing hub | 5.33 MB | **0** |
| Files over 800 KB | 47 | 6 |
| `images.formats` | `['image/webp']` (Next default) | `['image/avif','image/webp']` |

A modern browser now receives the hero at **32.9 KB in AVIF**. The original file
was 5,004 KB.

Two changes produced this: re-encoding the source library, then routing images
through `next/image`.

## Re-encoding the library

`scripts/reencode-photo-library.mjs`. 1920px longest edge, quality 80 mozjpeg.

Two rules that must not be broken if it is run again:

1. **JPEG-family files keep their exact filename, including case.** The library
   mixes `.JPG`, `.JPEG`, `.jpeg`, `.jpg`. Over a hundred `<img>` references
   point at these paths, mostly through `src={IMAGES.x}`. Renaming them means
   chasing every reference. Only photographs stored as `.png` were renamed to
   `.jpeg`, and their references updated by hand.
2. **`HLSlogo-nobackground.png` is excluded.** It needs alpha and is already
   19 KB. Converting it to JPEG would put a black box behind the logo.

`public/photos/hoag/` is also excluded — already compressed in July.

sharp strips metadata by default, which removes the GPS coordinates of customer
properties that camera originals carry.

**Do not re-run the script over already-compressed output.** Restore the
originals from git first (`git checkout <commit>~1 -- public/photos/`),
otherwise each pass stacks generational JPEG loss. The first attempt ran at
2400px, left 23 files over threshold, and was redone from source rather than
re-compressed.

## Converting to next/image

Done for the homepage, portfolio, and all three service hubs. Every conversion
uses `fill`, which requires a parent that is **both positioned and sized**.

Four recurring shapes and what each needs:

| Shape | Parent | Handling |
|---|---|---|
| Hero / CTA background | `relative min-h-[600px]`, img already `absolute inset-0` | direct `fill`, plus `priority` on the hero |
| Alternating service block | `relative overflow-hidden`, height on the **img** | move the height class up to the wrapper first |
| Gallery tile | `aspect-square` — sized, not positioned | add `relative` |
| Small thumbnail | `w-20 h-20` — sized, not positioned | add `relative` |

`sizes` must describe the width the image actually renders at, not the viewport.
Getting it wrong ships a derivative far larger than needed. Current values:
`100vw` for full-bleed heroes, `50vw` for `md:w-1/2` blocks,
`(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 17vw` for the 2/3/6 column
galleries, `80px` for fixed thumbnails.

### Roughly 90 tags remain unconverted

On the deep location and subservice pages. They do **not** have a positioned
parent, so each needs a layout change rather than a mechanical edit. Two
scripted passes during this work introduced syntax errors that the build caught
— a regex that stopped at the first `}` and dropped ` : undefined` from a
ternary. Treat these as per-page work with browser verification, not a sweep.

## Security headers

`Strict-Transport-Security` was already set. Added `X-Content-Type-Options`,
`X-Frame-Options` and `Referrer-Policy` enforcing, plus CSP **report-only**.

Report-only immediately earned its place: it caught Mapbox GL fetching its
stylesheet from `api.mapbox.com`, which the initial `style-src` did not allow.
Enforcing that policy would have rendered the service-areas map unstyled on the
live site. Fixed in `a18c74f`; the policy now reports clean on homepage,
`/contact` and `/service-areas`, and is a candidate for promotion.

CSP note: the single quotes inside keywords (`'self'`, `'unsafe-inline'`)
collide with a single-quoted TypeScript string. The directives are built as an
array for that reason.

## Review count

`public/llms.txt` and `llms-full.txt` published "33 reviews" while
`REVIEW_STATS` said 40, so AI engines reading llms.txt got a stale number.
`scripts/sync-llms-review-count.mjs` runs on `prebuild` and keeps them in step.
`REVIEW_STATS` is the single source of truth.

## Measured result (2026-08-29)

Like-for-like against Karl's Aug 28 baseline. Both sides are Lighthouse mobile
under the same simulated throttling: Moto G Power, 150ms RTT, 1,638 kbps, 4x CPU.

| URL | Perf before | Perf after | LCP before | LCP after |
|---|---|---|---|---|
| `/` | 68 | **79** | 61.2s | **4.8s** |
| `/portfolio` | 67 | **78** | 153.3s | **4.9s** |
| `/services/tree-services` | — | **97** | — | **2.5s** |
| `/services/tree-services/deland` | — | **95** | — | **2.9s** |

Homepage total transfer: 19,397 KiB -> **778 KiB**. CLS is 0.00 on all four.

The LCP element on `/` is now an `<img data-nimg="fill">`, which is the direct
confirmation the hero is being served through the optimizer rather than raw.

**One caveat on the comparison.** Karl's run came from Google's PSI
infrastructure; this one ran locally. Lighthouse simulates network throttling
(Lantern) so that part normalises, but the 4x CPU multiplier is relative to the
host machine. The order of magnitude is solid; treat the last digit as
approximate.

**What the numbers still say to do.** The two pages that did not reach the 90s
are the two with large hero photography, and in both the LCP element is an
image. `/portfolio` is now the heaviest page on the site at 1,336 KiB. Google's
"good" threshold for LCP is 2.5s, so `/` at 4.8s is still rated
needs-improvement. The service pages, which carry less imagery, already sit at
97 and 95.

## Still open

- **~90 remaining `<img>` tags**, as above.
- **CSP promotion** from report-only to enforcing.
