# DNS-AID records for hlsdeland.com — prepared, not published

These records cannot ship in this repo. They have to be added at the DNS
provider, and there is a DNSSEC decision to make first. This file is the
handoff.

**Spec status:** `draft-mozleywilliams-dnsop-dnsaid`. The `draft-<author>-`
prefix means this is an individual submission, **not** an adopted working-group
document. Parameter keys can still change between revisions. Check the current
draft before pasting anything below — the record *shape* is stable (RFC 9460
SVCB), the DNS-AID-specific parameter names are not.

## What there is to advertise

One agent endpoint exists on this origin:

| Service | Endpoint | Transport |
|---|---|---|
| MCP server | `https://www.hlsdeland.com/api/mcp` | Streamable HTTP, JSON-RPC 2.0 |

There is no A2A agent, so there is no `_a2a` record to publish. The `_index`
record points at the capability manifest, which is the thing that actually
enumerates everything.

## The records

ServiceMode SVCB records (RFC 9460 — SvcPriority is non-zero, TargetName is the
host serving the endpoint).

Format follows the example in the scanner's own skill document, which shows
`alpn`, `port`, and `mandatory=alpn,port`:

```zone
; ── Discovery index ───────────────────────────────────────────────────────
; Points agents at this origin, whose ARD manifest lists every agent surface.
_index._agents.hlsdeland.com.  3600  IN  SVCB  1 www.hlsdeland.com. alpn="h2,http/1.1" port=443 mandatory=alpn,port

; ── MCP server ────────────────────────────────────────────────────────────
_mcp._agents.hlsdeland.com.    3600  IN  SVCB  1 www.hlsdeland.com. alpn="h2,http/1.1" port=443 mandatory=alpn,port
```

The skill's own example uses `alpn="a2a"`, which is the ALPN token for the A2A
protocol. **There is no A2A agent here**, so `_a2a` is not published and the
ALPN values above are the ordinary HTTP ones, which is what an MCP-over-HTTPS
endpoint actually negotiates.

**The path problem, and what the draft says about it.** RFC 9460 SVCB has no
standard parameter for a URL path, and both endpoints live at a path
(`/api/mcp`, `/.well-known/ai-catalog.json`) rather than at the origin root.
The skill document's answer is to "use numeric `keyNNNNN` SvcParamKey names for
experimental DNS for AI Discovery custom parameters" until formal registration
happens — so the path would ride in a numbered experimental key. **Which number
is not stated in the skill document.** Read the current draft revision for the
assignment before adding it.

Publishing without the path parameter is defensible in the meantime: the records
above advertise the host, and `https://www.hlsdeland.com/.well-known/ai-catalog.json`
— already live — carries the actual routing to every surface. An agent that
resolves the record and then fetches the manifest gets everything.

## DNSSEC — a separate go/no-go

The spec asks for the discovery zone to be signed so validating resolvers get
authenticated answers.

**Do not treat this as a formality.** DNSSEC does not fail gracefully. If the
DS record at the registrar and the signing key at the DNS host fall out of step
— during a key rollover, a provider migration, or an initial misconfiguration —
validating resolvers stop returning answers for the whole domain. Not the
`_agents` subtree: the domain. For a business whose phone rings because people
find the site, that is an outage with revenue attached.

Before signing:

1. Confirm the DNS host supports one-click DNSSEC with automatic key rollover,
   and that the registrar is the same company or supports automatic DS updates.
   If DS records have to be copied by hand between two vendors, the risk goes up
   sharply.
2. Decide who is on the hook if resolution breaks, and how quickly they can
   unsign.
3. Have the client aware it is happening. This is their domain and their phone.

**Decided 2026-08-25 — this is the approved plan:** publish the SVCB records
**without signing** first, confirm they resolve, and treat DNSSEC as its own
separate change with its own rollback plan. The records are useful unsigned; a
broken zone is not.

Do not sign the zone as part of adding these records. Signing is a second,
independent go/no-go that needs the checks in the list above cleared first and
the client aware it is happening.

## Provider: GoDaddy

DNS for `hlsdeland.com` is hosted by GoDaddy — the authoritative nameservers are
`ns25.domaincontrol.com` and `ns26.domaincontrol.com`, which is GoDaddy's DNS
platform. Registrar and DNS host appear to be the same company.

### GoDaddy cannot publish these records. Confirmed.

GoDaddy's DNS management supports **A, AAAA, CNAME, MX, NS, TXT, SRV, CAA** and
nothing else. There is no `SVCB` type, no `HTTPS` type, and no `DS` type.

Source: <https://www.godaddy.com/help/manage-dns-records-680>

This is not a formatting problem or a hidden setting. The record type does not
exist on the platform, so **DNS-AID cannot be published while DNS stays on
GoDaddy**. Do not spend time in the panel looking for it.

The missing `DS` type matters too: it means a delegated subzone signed elsewhere
cannot have its chain of trust anchored at the parent. See option B below.

## The two ways to actually publish

### Option A — move the whole zone to Cloudflare

Registrar stays at GoDaddy; only the nameservers change.

- Cloudflare supports `SVCB` in the dashboard and the API, documented against
  RFC 9460: <https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/>
- Free, and it also unlocks one-click DNSSEC, so the "sign the zone" half of the
  DNS-AID recommendation becomes satisfiable rather than impossible.
- Cloudflare's DNS is materially better than GoDaddy's regardless of this task.

**The risk is email, not the website.** Every existing record has to arrive
intact — MX, SPF, DKIM, DMARC, and any verification TXT records. Cloudflare's
onboarding scans and imports the existing zone automatically, but the scan is
best-effort and misses records it cannot see. A missing MX record breaks Tyler's
email silently: nothing errors, mail just stops arriving.

Sequence that keeps it safe:

1. Add the domain in Cloudflare, let it import, and **do not change nameservers
   yet**.
2. Export the GoDaddy zone and diff it against what Cloudflare imported, record
   by record. Pay attention to MX, TXT (SPF/DKIM/DMARC), and anything under a
   mail subdomain.
3. Lower TTLs at GoDaddy and wait for the old ones to expire, so a rollback is
   fast.
4. Switch nameservers at GoDaddy to the two Cloudflare ones.
5. Verify mail flow — send a test message to `tyler@hlsdeland.com` from an
   outside address and confirm it arrives — before doing anything else.
6. Then add the SVCB records, and enable DNSSEC as a separate step.

### Option B — delegate only `_agents.hlsdeland.com`

Surgical alternative. Leave the apex zone on GoDaddy untouched and hand off just
the `_agents` subtree to a provider that supports SVCB.

1. At GoDaddy, add `NS` records for the name `_agents` pointing at the subzone
   host's nameservers. GoDaddy supports NS records.
2. Host the child zone `_agents.hlsdeland.com` somewhere that takes arbitrary
   subzones and SVCB — deSEC (free) or Route 53 (about $0.50/month; AWS added
   SVCB support in October 2024).
3. Publish the SVCB records in that child zone.

**Blast radius is the `_agents` subtree and nothing else.** The website, the MX
records, and every email-related record stay exactly where they are and are
never touched. That is the entire appeal.

**The unknown to test first:** whether GoDaddy's panel accepts an `NS` record on
an underscore-prefixed label (`_agents`). Plenty of DNS panels reject underscore
hostnames on record types other than TXT and SRV. This is a two-minute test —
try to save the record; if GoDaddy rejects the name, option B is dead and the
choice is A or park it.

**DNSSEC is not achievable this way.** The child zone could be signed, but the
chain of trust needs a `DS` record in the parent zone at GoDaddy, and GoDaddy
does not support DS records. The subzone would be an island of trust that
validating resolvers treat as unsigned. Acceptable only if DNSSEC is not needed
for the check — see below.

## Runbook — option B, chosen 2026-08-25

Host for the child zone: **deSEC** (desec.io). Free, and its supported record
list includes `SVCB` and `HTTPS` verbatim:
<https://desec.readthedocs.io/en/latest/dns/rrsets.html>. DNSSEC signing is
automatic on their side (it will not chain — see the DNSSEC note above — but it
costs nothing to have).

Route 53 is the paid alternative if an AWS account is preferred; it added SVCB
support in October 2024 and costs about $0.50/month for the hosted zone.

### Step 1 — the test that decides everything (2 minutes)

Before creating any account, find out whether GoDaddy will accept an `NS` record
on an underscore label.

1. GoDaddy → **My Products** → `hlsdeland.com` → **DNS** → **Add New Record**
2. Type: `NS`  ·  Name: `_agents`  ·  Value: `ns1.desec.io`  ·  TTL: 1 hour
3. Try to save.

**If it saves**, continue to step 2. **If GoDaddy rejects the name**, option B is
dead — the only remaining route is option A, moving the zone to Cloudflare.

Enter `_agents`, not `_agents.hlsdeland.com`. GoDaddy appends the zone itself,
and the full name produces `_agents.hlsdeland.com.hlsdeland.com`.

### Step 2 — create the child zone at deSEC

1. Sign up at <https://desec.io> and confirm the account.
2. Create a domain named exactly `_agents.hlsdeland.com`.
3. deSEC shows the nameservers to delegate to — currently `ns1.desec.io` and
   `ns2.desec.org`. Use whatever the panel displays rather than these, in case
   they change.

### Step 3 — finish the delegation at GoDaddy

Add an `NS` record on `_agents` for **each** deSEC nameserver. Two records, same
name, different values. One nameserver is not a delegation.

### Step 4 — add the SVCB records at deSEC

The zone is `_agents.hlsdeland.com`, so the subnames are just `_index` and
`_mcp` — deSEC appends the zone.

| Field | Record 1 | Record 2 |
|---|---|---|
| Subname | `_index` | `_mcp` |
| Type | `SVCB` | `SVCB` |
| TTL | `3600` | `3600` |
| Content | `1 www.hlsdeland.com. alpn="h2,http/1.1" port=443 mandatory=alpn,port` | `1 www.hlsdeland.com. alpn="h2,http/1.1" port=443 mandatory=alpn,port` |

### Step 5 — verify the way the scanner does

Ordinary resolution:

```bash
dig +short _index._agents.hlsdeland.com SVCB
dig +short _mcp._agents.hlsdeland.com SVCB
```

Then over DNS-over-HTTPS, which is what the scanner actually uses — Cloudflare
first, Google as fallback:

```bash
curl -s -H 'accept: application/dns-json' \
  'https://cloudflare-dns.com/dns-query?name=_index._agents.hlsdeland.com&type=SVCB'

curl -s -H 'accept: application/dns-json' \
  'https://dns.google/resolve?name=_index._agents.hlsdeland.com&type=SVCB'
```

Delegation changes can take up to the parent's TTL to become visible. If `dig`
resolves but the DoH endpoints do not yet, wait rather than changing anything.

### Step 6 — rescan

Re-run the readiness scan. If the DNS-AID check still fails with records
resolving over both DoH endpoints, DNSSEC is implicated — and because the parent
zone at GoDaddy cannot hold a `DS` record, that would make option A the only way
to pass.

### Automating steps 4 and 5

`scripts/publish-dns-aid.mjs` does both. Account creation and the GoDaddy NS
records still have to be done by hand; everything after that is one command.

```bash
# Preview the records without a token and show current resolution
node scripts/publish-dns-aid.mjs --dry-run

# Publish into the deSEC zone, then verify over both DoH resolvers
DESEC_TOKEN=xxxx node scripts/publish-dns-aid.mjs

# Re-check resolution later without touching anything
node scripts/publish-dns-aid.mjs --verify-only
```

It publishes with a single bulk `PUT`, so a partial failure cannot leave one
record live and the other missing. It exits non-zero while anything is still
unresolved, which is the signal to wait for propagation rather than to start
changing records. Create the token in the deSEC panel under **Token Management**.

### Which to pick

If the goal is passing the check with the least risk to a live business:
**option B**, after confirming the underscore NS record saves.

If DNSSEC is wanted too, or DNS is due for a move anyway: **option A**, run as
its own scheduled change with the email verification step treated as mandatory.

## Is DNSSEC actually required to pass?

The scanner's own skill document says to sign discovery zones with DNSSEC so
validating resolvers return authenticated data, but **does not state that
DNSSEC is required for the check to pass** — it is written as a recommendation
alongside the record requirement.

The scanner verifies over DNS-over-HTTPS, using Cloudflare's
`https://cloudflare-dns.com/dns-query` with fallback to `https://dns.google/resolve`.

So the working assumption is that publishing the records unsigned is enough to
flip the check, which is what makes option B viable. If a rescan shows the check
still failing with records live and resolving, DNSSEC is implicated and option A
becomes the only path.

## Verifying after publishing

```bash
dig +short _index._agents.hlsdeland.com SVCB
dig +short _mcp._agents.hlsdeland.com SVCB

# DNSSEC validation — the `ad` flag must be present once the zone is signed
dig +dnssec _index._agents.hlsdeland.com SVCB | grep -E "flags:|RRSIG"
```

## What is already live without any of this

Every agent surface is discoverable over HTTP today, with no DNS changes:

- `https://www.hlsdeland.com/.well-known/ai-catalog.json` — manifest of everything
- `https://www.hlsdeland.com/.well-known/mcp/server-card.json` — MCP server card
- `https://www.hlsdeland.com/.well-known/api-catalog` — RFC 9727 catalog
- `https://www.hlsdeland.com/llms.txt` — Agent Interfaces section
- `Link:` header on every response

DNS-AID adds a resolver-level path to the same information. It is additive, not
load-bearing.
