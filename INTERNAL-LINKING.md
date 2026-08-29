# Internal linking

## The finding

An external audit (Aug 28) stated: *"Nothing is routing authority from the
specialty layer down to the location tail, which is why the tail is not being
discovered."*

That was disputed on first measurement and the dispute was wrong. Specialty
pages appeared to carry 7–9 city links each. **Every one of them was in the
footer.** Above the footer, specialty pages had **zero** city links.

Footer links appear on all 428 pages. They give a crawler no signal about what
any particular page is about, so they do not do the job in-content links do.
Counting them as internal linking was the error.

| | Before | After |
|---|---|---|
| City links on a specialty page, total | 7 | 18 |
| **Above the footer** | **0** | **11** |
| In the footer | 7 | 7 |

## How to measure this correctly

**Do not use line-based splitting.** These pages emit almost all of their HTML
on a single line, so:

```sh
awk '/<footer/{exit} {print}' page.html    # WRONG
```

hits `<footer` on the same line as the page content, exits before printing
anything, and yields an empty file. Every page then reads as zero links whether
or not links exist. This produced a false result twice during the work, once
appearing to confirm a conclusion and once appearing to refute it.

**Use byte offsets instead:**

```sh
foot=$(grep -bo '<footer' page.html | head -1 | cut -d: -f1)
grep -bo -E 'href="/services/[a-z-]+/(deland|deltona|...)"' page.html
# compare each match offset against $foot
```

Also match against a **known list of city slugs**. A loose pattern like
`/services/[a-z-]+/[a-z-]+` matches sibling specialty cross-links
(`/services/site-work/erosion-control`) and inflates the count.

## The two components

| | Used on | Shape |
|---|---|---|
| `ServiceAreaLinks` | the 3 category hubs | every city, grouped by county |
| `SpecialtyAreaLinks` | the 26 specialty pages | 14 cities, anchors naming the specialty |

A hub can carry the full county-grouped list. A specialty page wants fewer links
with anchor text that names the specialty — "Land Clearing in DeLand" rather
than "learn more" — so the anchor tells a crawler what the target covers.

Targets are the **category × city** pages. City pages exist per category, not
per specialty, so "Stump Grinding in Deltona" points at the tree-services
Deltona page, which is the closest real page to that intent.

Cities are ordered by the `priority` field in `src/data/locations.ts`, so every
specialty page links the markets that matter rather than an arbitrary slice.
Changing priorities there changes what all 26 pages link, with no page edits.

## Homepage

The homepage carried no link to any city page while its own title competed for
"land clearing deland fl" — the query `/services/site-work/deland` should own.
Fixed by adding a "Serving Central Florida" section with 12 exact-match anchors
and retuning the title from "in DeLand, FL" to "in Central Florida".

The homepage title lives in `src/app/page.tsx`, **not** the layout default. It
also appears in the openGraph block, the twitter block, and the JSON-LD
`WebPage` schema `name`. Change all four or the signals contradict each other.

## Still open

- Category hubs link to specialty pages, and specialty pages now link down to
  cities. Location pages linking laterally to neighbouring cities has not been
  verified.
- Whether the homepage title change costs its position-4 ranking for
  "land clearing deland fl" before the DeLand page picks it up. Reversible.
