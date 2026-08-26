# Agent readiness — what this site actually exposes

Hoag Land Services is a local land clearing, tree service, and fencing contractor
in DeLand, Florida. The site is a marketing and lead-generation site that now also
exposes a small read-only public API and an MCP server.

**Last verified against production: 2026-08-15.** Every status below was probed,
not assumed.

## The governing principle

Build the capability, or do not publish the document.

Discovery metadata describing capabilities that do not exist is not a neutral
box-tick — it tells agents "authenticate here" or "call this server" when both are
fiction. This file previously recorded most of the standards below as *rejected*,
on the grounds that a marketing site had no API, no MCP server, and nothing to
authenticate against. That reasoning was sound at the time. It was resolved in the
other direction: the capabilities were built, so the documents are now true.

## Live and verified

| Surface | Endpoint | Status |
|---|---|---|
| MCP server | `/api/mcp` | JSON-RPC. `tools/list` returns real tools with input schemas. POST-only (GET returns 405). |
| MCP server card | `/.well-known/mcp/server-card.json` | 200, `application/json` |
| API catalog (RFC 9727) | `/.well-known/api-catalog` | 200, `application/linkset+json` |
| OpenAPI description | `/openapi.json` | 200, `application/json` |
| Public API — services | `/api/v1/services` | 200, real data |
| Public API — service areas | `/api/v1/service-areas` | 200, real data |
| Public API — health | `/api/v1/health` | 200 |
| Agent skills index | `/.well-known/agent-skills/index.json` | 200 |
| ARD manifest | `/.well-known/ai-catalog.json` | 200 |
| auth.md | `/auth.md` | 200, `text/markdown` |
| Markdown negotiation | any page + `Accept: text/markdown` | 200, `text/markdown`, `X-Markdown-Tokens` header present. HTML remains the default for browsers. |
| Content Signals | `/robots.txt` | `search=yes, ai-input=yes, ai-train=no`, emitted into all 26 user-agent groups |
| RFC 8288 Link header | all routes | `rel="describedby"` → `/llms.txt`, `/llms-full.txt` |
| llms.txt / llms-full.txt | `/llms.txt`, `/llms-full.txt` | 200, `text/plain` |
| Schema.org JSON-LD | all pages | LocalBusiness, Service, FAQPage, BreadcrumbList, WebPage, HowTo |

The MCP server declares `"authentication": {"type": "none"}` with the note that all
tools are read-only public data and there is no protected resource. That is the
honest declaration for this site and should stay that way unless a protected
resource genuinely appears.

## Known defect

**`/api/v1` returns 404.** It is the `anchor` of the api-catalog linkset, so an
agent following the catalog to the API root hits a 404 HTML page (~47KB). Every
other href in the catalog resolves — `service-desc`, `service-doc`, `status` and
`author` are all 200. Fix would be a small JSON index at `/api/v1` listing the
available endpoints.

## Documented but not published

**DNS-AID** (`draft-mozleywilliams-dnsop-dnsaid`). No SVCB records exist for
`_index._agents`, `_a2a._agents`, or `_mcp._agents` under `hlsdeland.com` — checked,
all absent. The repo contains a runbook and a publish/verify script. GoDaddy cannot
publish SVCB records, so the two viable routes are documented rather than executed.
This is the correct state: documented, not falsely advertised.

## Still deliberately absent

| Standard | Why |
|---|---|
| OAuth / OIDC discovery | There is no protected resource. `auth.md` describes agent access to public read-only data; there is nothing to obtain a token for. Do not publish `openid-configuration` or `oauth-authorization-server` unless something is actually protected. |
| WebMCP | A `WebMCP` component exists in the layout. Note that `navigator.modelContext` is a Chrome Early Preview API with no broad support, so treat browser-side tool exposure as experimental. |
| `rel="sitemap"` Link relation | Not in the IANA registry (checked — 236 entries). Sitemap discovery works via `robots.txt`. |

## Known tension

`Content-Signal: ai-train=no` sits alongside an allow-list permitting `CCBot`,
`Google-Extended` and `Applebot-Extended` — crawlers that exist for training. This
is a deliberate choice: those tokens allow crawling for search while opting out of
training, and Content Signals states the preference. Making it airtight would mean
`Disallow: /` for those three, at some cost to AI-search visibility.

## Implementation notes

- `robots.txt` is a Route Handler, not a `robots.ts` metadata route: the typed
  `MetadataRoute.Robots` shape cannot express a `Content-Signal` directive.
- `Content-Signal` is repeated in every user-agent group deliberately. robots.txt
  matching is most-specific-wins, so a directive only under `*` would never reach
  `GPTBot` or `ClaudeBot`.
- Next 16 renamed `middleware.ts` to `proxy.ts`. The shipped docs describe proxy as
  a last resort; keep `src/proxy.ts` tightly matcher-scoped.

## Coordination — read this before changing anything

As of 2026-08-15 **three parties have been working on this site in parallel, and
none of them could see what the others shipped.** A lot of duplicated effort came
out of that. Check here before starting.

| Party | Where | What |
|---|---|---|
| Claude Code (this repo) | `Oscaredgeiv/StormSiteDesigns` | Apr→Aug feature work, schema scoping, canonical host, review count, Content Signals, Link header, React fixes ported from Spencer. |
| Another Claude session | same repo | Agent discovery: markdown negotiation, public API, MCP server, agent skills, ARD, DNS-AID runbook. Shipped in `b787745` and the four `DNS-AID:` commits. |
| Spencer Smith | `Orbit-SS/orbit_sites_hoag_land_services_main_website` | Five unmerged branches, Jun 23 → Aug 10. Canonical, metadata, client/server splits, lead forms, title/CTR cleanup. All preserved as `pre-migration-*` tags. |

### Duplicated work that actually happened

- **Canonical apex → www** solved twice: Spencer in July, this repo in August.
- **Duplicate brand titles in `<title>`** solved twice, differently. Spencer used
  `title: { absolute: ... }`, which preserves the keyword-targeted title text.
  This repo rewrote the title copy instead. **Spencer's approach is better** and
  should win in the merge.
- **Client/server splits for metadata** done twice, with different filenames:
  `page-client.tsx` (Spencer) vs `PageClient.tsx` (here).
- **The fake location-page form** (a `setTimeout` that faked success and dropped
  every submission) fixed twice — Spencer in June, this repo in July.

### Live defects known at time of writing

- 7 hand-built city pages still double the brand in `<title>` on production.
  Spencer's Aug 10 branch fixes exactly these.

### Deploy path — important

The `hoag-site` Vercel project was repointed from Orbit-SS to
`Oscaredgeiv/StormSiteDesigns` on 2026-08-15. Two consequences:

1. **A push to `main` here deploys to production.** There is no staging gate.
2. **Spencer's branch previews are broken.** He pushes to branches on Orbit-SS
   and previously got preview deployments; those now silently produce nothing.
   This needs raising with him.

See `MIGRATION-PLAN.md` for the consolidation plan. Orbit-SS is the intended
source of truth, which means everything in this repo — including the MCP server
and public API — has to survive the migration into it.

### Migration completed 2026-08-15

Orbit-SS is now the source of truth and the deploy source. `main` here carries the
current production tree; the April history is preserved as its parent. Vercel's
`hoag-site` project is git-linked to this repo, `main` branch, so **a push to main
is a production release** — there is no staging gate.

`Oscaredgeiv/StormSiteDesigns` has been archived read-only so nobody deploys from
it by accident. Spencer's five branches remain here untouched, with matching
`pre-migration-*` tags. Their work is already present in this tree in equivalent
or better form, so most can likely be closed rather than merged — his call.

One thing to know: `NEXT_PUBLIC_MAPBOX_TOKEN` now lives on the Vercel project
rather than in source. It is a Mapbox publishable token, so it ships in the client
bundle regardless; protect it with URL restrictions in the Mapbox dashboard.
