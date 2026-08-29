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
| `/` | 68 | **96** | 61.2s | **2.5s** |
| `/portfolio` | 67 | **64** | 153.3s | **6.4s** |

Homepage: FCP 0.9s, TBT 60ms, CLS 0, Speed Index 3.3s.
Portfolio: FCP 3.0s, TBT 210ms, CLS 0, Speed Index 5.4s.

Measured on pagespeed.web.dev, the same tool that produced Karl's baseline, so
these are directly comparable with no adjustment.

**The portfolio result is the finding here.** LCP fell from 153.3s to 6.4s, yet
the score did not move (67 -> 64). Image weight was not the only thing wrong
with that page. LCP 6.4s is still in Google's "poor" band (>4s) and TBT is 3.5x
the homepage. It needs its own diagnosis rather than more of the same fix.

The LCP element on `/` is now an `<img data-nimg="fill">`, which is the direct
confirmation the hero is being served through the optimizer rather than raw.

**A note on local Lighthouse.** A local `npx lighthouse` run of the same page
scored 79, not 96. Lighthouse's 4x CPU throttle is relative to the host machine,
so a local run on a slower CPU reads pessimistically. For any number quoted to
Karl or the client, use pagespeed.web.dev, not a local run.

## After converting the last raw <img> tags (2026-08-29, later same day)

The portfolio puzzle resolved itself once the cause was found. React 19 hoists
every `<img src>` into a `<link rel="preload" as="image">`, so each remaining raw
tag was fetching its full-size original at HIGH priority, ahead of the page's own
CSS and fonts. 29 built pages were doing this. That is why LCP stayed broken on
exactly the pages nobody had converted.

| URL | Karl Aug 28 | Mid-day | After | LCP after |
|---|---|---|---|---|
| `/` | 68 | 96 | 96 | 2.5s |
| `/services` | — | 68 | **81** | 10.9s -> **4.4s** |
| `/portfolio` | 67 | 64 | **89** | 153.3s -> **3.8s** |
| `/about` | — | — | **72** | 5.0s |

Image payload, measured in-browser at the same viewport on both sides:

| Page | Before | After |
|---|---|---|
| `/about` | 21,132 KiB | **229 KiB** |
| `/services` | 1,813 KiB | **451 KiB** |

`/about` was the worst page on the site and nobody had looked at it. Its three
photos live at `/public/` root, not `/public/photos/`, so `reencode-photo-library`
had never walked them. **The source files are still 5-9 MB each** — delivery is
fixed so visitors never see them, but 21.6 MB still sits in the repo.

PSI's "Improve image delivery" note on `/services` fell from 1,441 KiB to 52 KiB.

**Caveat on `/portfolio`.** Its mid-day 64 and its post-push 89 are two runs of a
tool with real run-to-run variance, and the page itself was already converted
before either. Some of that jump is the shared-chunk change, some is noise. The
LCP move (6.4s -> 3.8s) is the part worth trusting.

## Still open

- **~90 remaining `<img>` tags**, as above.
- **CSP promotion** from report-only to enforcing.


## Final state, 2026-08-29 evening

Measured on pagespeed.web.dev, mobile, the same tool as Karl's baseline.

| Page | Perf | A11y | Best Practices | SEO |
|---|---|---|---|---|
| `/` | **97** | **100** | 100 | 92 |
| `/portfolio` | **97** | **100** | 100 | 100 |
| `/services` | 80 | **100** | 100 | 100 |
| `/about` | 79 | **100** | 100 | 100 |

Karl's Aug 28 baseline for comparison: `/` 68, `/portfolio` 67.

### The single biggest win was not an image

Lighthouse named the LCP element on `/portfolio` as the 48x48 **navigation
logo**, lazy-loaded, with a **Load Delay of 4,023ms**. `next/image` lazy-loads
unless told otherwise, and that logo is above the fold on every page of the
site, so every page paid four seconds of dead time waiting on a 2KB image.
Adding `priority` took `/portfolio` from 68 to 97.

Correcting the record: `/portfolio` went 67 -> 64 -> 89 -> 68 -> 68 -> 97
across the day. The 89 was reported here as a win and it was not — that run
recorded FCP 0.9s under Slow 4G, which is not plausible. The honest range
before the logo fix was 64-68.

### How to find this class of problem

`npx lighthouse <url> --only-categories=accessibility` (or performance) writes
JSON that names the failing selector, both colours, and the LCP phase
breakdown. Scraping the pagespeed.web.dev UI does not give you any of that.
Three separate bugs this session were only identifiable from that JSON:

- the `opacity-70` filter counts (element opacity, not colour alpha)
- the logo alt duplicating the brand name beside it
- the lazy-loaded nav logo as LCP element

### The one deliberate failure

`robots-txt is not valid` — Lighthouse does not recognise `Content-Signal:`.
That directive is intentional; it declares `search=yes, ai-input=yes,
ai-train=no` across all 26 user-agent groups. RFC 9309 requires parsers to
ignore unrecognised lines, so it is harmless to real crawlers, and the
Lighthouse SEO score is a checklist rather than a ranking signal. Removing it
would buy 8 points on `/` by giving up a real AI-training preference.
