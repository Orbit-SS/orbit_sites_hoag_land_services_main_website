# Repo consolidation plan — Hoag Land Services

**Status: PLAN ONLY. Nothing in here has been executed.**
Written 2026-08-15. Target: make `Orbit-SS/orbit_sites_hoag_land_services_main_website`
the single source of truth without losing work from either side.

---

## 1. Why this is not a merge

The two repos have **no common ancestor**. Orbit-SS was seeded in April by pushing
files, not by forking or cloning with history. `git merge-base` returns nothing.

That rules out fast-forward, rebase, and ordinary PR merge. Any reconciliation is a
**content decision per file**, not a git operation. `--allow-unrelated-histories`
would technically run but would conflict across ~128 files and produce a history
that misrepresents who wrote what.

## 2. Current state

| | Repo | Tip | Contains |
|---|---|---|---|
| A | `Oscaredgeiv/StormSiteDesigns` | `565182d` | Everything Apr→Aug. Matches production. |
| B | `Orbit-SS/orbit_sites_hoag_land_services_main_website` `main` | `e795797` (Apr 10) | Stale. |
| C | Orbit-SS branch `seo/service-hub-metadata-2026-06-23` | `3f5cad1` | Spencer, Jun 23, 35 files, never merged. |

Vercel `hoag-site` was git-linked to **B**, so a push there would have deployed April
code over production. Temporarily repointed to **A** on 2026-08-15. This must be
pointed back at Orbit-SS as the final step.

Production domain: `hlsdeland.com` 308-redirects to `www.hlsdeland.com`.

## 3. What Spencer's branch (C) contains

**Duplicated — solved independently in A, his came first (Jun 23 vs Aug 15):**
- Canonical apex → www across `robots.ts`, `sitemap.ts`, `layout.tsx`,
  `service-areas`, all three `[location]` routes, hand-built city pages
- `metadataBase` added to root layout
- Server/client splits for metadata on fencing / site-work / tree-services /
  wrong-tree-wrong-place. **Naming differs**: he used `page-client.tsx`,
  A uses `PageClient.tsx`. Pick one before merging or you get both.

**Unique to C:**
- `src/app/api/contact/route.ts` — new file (129 lines)
- `src/app/contact/layout.tsx` — new file
- `LocationPage.tsx` — replaces the fake `setTimeout` form success with a real
  `fetch('/api/contact')` incl. `propertyLocation`, adds error state.
  **A fixed the same bug independently in July.** Compare implementations.
- `next.config.ts` — adds `www.hlsdeland.com` to remote image hosts
- `llms.txt` / `llms-full.txt` updates
- 3 React fixes — **already ported to A in `565182d`, do not re-apply**

**Unique to A (must survive):** everything Apr→Aug — bush-hogging/brush-mowing page,
flooding & drainage page, demolition page, /reviews page, Port Orange rewrite,
GA4 + ClickTracker, 51 local photos + 14 Hoag photos, aggregateRating scoping,
review count 40, title/description hygiene, `/service-areas` schema.

## 4. Sequence

Each step is independently revertible. Do not batch.

**Step 1 — Preserve C before anything touches Orbit-SS.**
Tag it: `git push orbit 3f5cad1:refs/tags/pre-migration-spencer-2026-06-23`.
Non-destructive, guarantees the work is recoverable regardless of what follows.

**Step 2 — Confirm Spencer's status.** Blocking. If he is still working in Orbit-SS,
everything below needs coordinating with him first. If not, proceed.

**Step 3 — Decide the two collisions.** Needs a human call, not a merge tool:
  1. `page-client.tsx` vs `PageClient.tsx` — pick one convention.
  2. Contact-form implementation — his June version vs A's July version. Diff them
     and choose on merit; do not assume newer is better.

**Step 4 — Land A's tree into Orbit-SS as a reviewable branch.**
Push A's `main` tree to Orbit-SS as `sync/from-stormsitedesigns-2026-08-15`.
Non-destructive; `main` untouched; produces a reviewable PR.
Because histories are unrelated this is a new root, not a merge — expected.

**Step 5 — Reconcile C into that branch.** Apply only the items listed "Unique to C"
above, minus the React fixes. Build must pass after each file group.

**Step 6 — Verify parity before promoting.** Against a preview build of the sync
branch, confirm: 414 pages build clean; `aggregateRating` on `/reviews` only;
`reviewCount` 40; all canonicals on www; GA4 `G-L55DS1N9GQ` present; all 65 photos
in `public/photos/`; `/api/contact` and `/api/join` present; sitemap ~415 URLs.

**Step 7 — Land on Orbit-SS `main`.** Only after Step 6 passes. This is the only
destructive step. Requires explicit approval because it rewrites `main`.

**Step 8 — Repoint Vercel back to Orbit-SS** and set production branch `main`.
Then a git push deploys, and CLI deploys are no longer needed.

**Step 9 — Retire A.** Archive `StormSiteDesigns` or leave read-only, so nobody
deploys from it again.

## 5. Risks

- **Both repos have unique work.** Neither can simply overwrite the other.
- **Overlapping subject matter.** Canonical and metadata were solved twice; a naive
  merge yields duplicate/conflicting metadata exports.
- **Vercel env vars** (`BREVO_API_KEY`, `CONTACT_TO_EMAIL`, `NEXT_PUBLIC_MAPBOX_TOKEN`,
  GA4) live on the project, not the repo — repointing does not move them, but verify.
- **Deployment Protection** is on for previews; verification needs a signed-in browser.
- **Photos** are ~65 files in `public/photos/`. Confirm they survive the sync; the
  site broke once before when `public/` was left out of a deploy sync.

## 6. Explicitly not decided

- Whether Spencer is active (Step 2)
- The two Step 3 collisions
- Whether Orbit-SS `main` history should be replaced or built on top of

---

## CORRECTION — 2026-08-15, after pushing the preservation tag

The inventory above was wrong. Orbit-SS has **five** unmerged branches, not one.
I missed four because I truncated the output of the initial `git fetch`.

| Branch | Date | Commits | Size |
|---|---|---|---|
| `seo/service-hub-metadata-2026-06-23` | Jun 23 | 2 | 35 files, +3290/-2619 |
| `codex/deland-land-clearing-routing-2026-06-29` | Jun 29 | 1 | 9 files, +197/-13 |
| `codex/seo-lead-canonical-2026-07-20` | Jul 20 | 1 | 28 files, +598/-149 |
| `codex/seo-title-ctr-2026-08-03` | Aug 3 | 1 | 2 files, +2/-2 |
| `codex/seo-static-title-cleanup-2026-08-10` | **Aug 10** | 1 | 8 files, +8/-8 |

All authored by Spencer Smith. The `codex/` prefix suggests agent-generated work.

### What this changes

**Spencer is active.** Step 2 of the plan ("confirm Spencer's status") is answered:
there is work in this repo from Aug 10, five days before this migration started.
Everything downstream that assumed a dormant repo needs revisiting.

**The overlap is worse than described.** Two of these branches target the exact
work done in StormSiteDesigns on Aug 15:
- `codex/seo-title-ctr-2026-08-03` and `codex/seo-static-title-cleanup-2026-08-10`
  are title/CTR cleanup — the same ground as the Aug 15 title-length and
  duplicate-brand fixes.
- `codex/seo-lead-canonical-2026-07-20` is canonical + lead-form work, overlapping
  both the canonical host change and the contact-form fix.

Two people have been solving the same problems in two repos without knowing it.

**The Vercel repoint may have consequences.** On Aug 15 the `hoag-site` project was
repointed from Orbit-SS to `Oscaredgeiv/StormSiteDesigns` to remove the rollback
trap. If Spencer deploys by pushing to Orbit-SS, that path is now silently dead
for him. This needs raising with him before it wastes his time.

### Revised blocking step

Do not proceed with any consolidation until Spencer has been contacted. The
question is no longer "is he active" but "what is he working on, and which of
these five branches are live." Preservation tag `pre-migration-spencer-2026-06-23`
covers only the Jun 23 branch; the other four are still only on their branch refs.

---

## Closed item — like-for-like re-measurement (2026-08-29)

The PSI anonymous API stayed rate-limited (HTTP 429), so this was captured with
the Lighthouse CLI instead. Same engine PSI runs, same default mobile preset
Karl's baseline used, so the comparison holds. Full table in `PERFORMANCE.md`.

| URL | Perf before | Perf after | LCP before | LCP after |
|---|---|---|---|---|
| `/` | 68 | **79** | 61.2s | **4.8s** |
| `/portfolio` | 67 | **78** | 153.3s | **4.9s** |

Homepage transfer 19,397 KiB -> 778 KiB. Desktop scores 100 with LCP 0.8s.

**On Karl's crawler-timeout theory (05.6):** the delivery half is now settled —
a page that took 61s under throttled mobile takes 4.8s, so "the crawler never
finishes loading" no longer holds as an explanation. Whether AI Visibility moves
off 14/100 as a result is the open half, and it needs a re-score in a few weeks,
not another measurement here. If it does move, the agent-readiness work was
blocked rather than wasted. If it does not, the theory was wrong and the score
is driven by something else.

**Reproduce:**
```
npx lighthouse@12 https://www.hlsdeland.com/ --only-categories=performance   --chrome-flags="--headless=new" --output=json --output-path=./lh-mobile.json
```
Add `--preset=desktop` for the desktop figure. On Windows the run ends with an
`EPERM` on Chrome's temp directory; that is cleanup only and the report is
already written.
