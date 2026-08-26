#!/usr/bin/env node
/**
 * Publish the DNS-AID SVCB records into the delegated `_agents` child zone at
 * deSEC, then verify them over the two DoH resolvers the readiness scanner
 * actually queries.
 *
 * Prerequisites, both done by hand — see seo/dns-aid-records.md:
 *   1. GoDaddy accepts NS records on the `_agents` label, and both deSEC
 *      nameservers are delegated there.
 *   2. The zone `_agents.hlsdeland.com` exists in a deSEC account.
 *
 * Usage:
 *   DESEC_TOKEN=xxxx node scripts/publish-dns-aid.mjs            # publish + verify
 *   DESEC_TOKEN=xxxx node scripts/publish-dns-aid.mjs --dry-run  # show, change nothing
 *   node scripts/publish-dns-aid.mjs --verify-only               # no token needed
 */

const ZONE = '_agents.hlsdeland.com'
const TARGET = 'www.hlsdeland.com.'
const TTL = 3600

// deSEC enforces a minimum TTL (3600 on free accounts). Do not lower this
// without checking the account's limit, or the API rejects the whole request.
const RRSETS = [
  {
    subname: '_index',
    type: 'SVCB',
    ttl: TTL,
    records: [`1 ${TARGET} alpn="h2,http/1.1" port=443 mandatory=alpn,port`],
  },
  {
    subname: '_mcp',
    type: 'SVCB',
    ttl: TTL,
    records: [`1 ${TARGET} alpn="h2,http/1.1" port=443 mandatory=alpn,port`],
  },
]

const API = `https://desec.io/api/v1/domains/${ZONE}/rrsets/`

const args = new Set(process.argv.slice(2))
const dryRun = args.has('--dry-run')
const verifyOnly = args.has('--verify-only')

function die(message) {
  console.error(`\n  ${message}\n`)
  process.exit(1)
}

async function publish() {
  console.log(`Publishing ${RRSETS.length} RRsets into ${ZONE}\n`)
  for (const rr of RRSETS) {
    console.log(`  ${rr.subname}.${ZONE}  ${rr.type}  ${rr.ttl}`)
    console.log(`    ${rr.records[0]}`)
  }

  // Checked after the preview so --dry-run works without a token.
  if (dryRun) {
    console.log('\n--dry-run: nothing sent.\n')
    return
  }

  const token = process.env.DESEC_TOKEN
  if (!token) {
    die('DESEC_TOKEN is not set. Create a token in the deSEC account under\n  Token Management, then re-run with DESEC_TOKEN=... in the environment.')
  }

  // Bulk PUT upserts the whole set in one atomic request, so a partial
  // failure cannot leave one record published and the other missing.
  const res = await fetch(API, {
    method: 'PUT',
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(RRSETS),
  })

  const text = await res.text()

  if (!res.ok) {
    console.error(`\ndeSEC returned ${res.status}:\n${text}\n`)
    if (res.status === 404) {
      die(`The zone ${ZONE} does not exist in this deSEC account.\n  Create it first, then re-run.`)
    }
    if (res.status === 401 || res.status === 403) {
      die('Token rejected. Check DESEC_TOKEN, and that the token has write scope.')
    }
    die('Publish failed. Nothing was changed if the status was 4xx.')
  }

  console.log(`\nPublished. deSEC returned ${res.status}.\n`)
}

/** Query a DoH resolver the same way the readiness scanner does. */
async function resolve(endpoint, name) {
  const url = `${endpoint}?name=${encodeURIComponent(name)}&type=SVCB`
  try {
    const res = await fetch(url, { headers: { accept: 'application/dns-json' } })
    if (!res.ok) return { ok: false, note: `HTTP ${res.status}` }
    const json = await res.json()
    const answers = (json.Answer ?? []).filter(a => a.type === 64)
    return { ok: answers.length > 0, answers, note: json.Status === 3 ? 'NXDOMAIN' : '' }
  } catch (error) {
    return { ok: false, note: error instanceof Error ? error.message : String(error) }
  }
}

async function verify() {
  const endpoints = [
    ['Cloudflare', 'https://cloudflare-dns.com/dns-query'],
    ['Google', 'https://dns.google/resolve'],
  ]

  console.log('Verifying over the resolvers the scanner uses:\n')
  let allGood = true

  for (const rr of RRSETS) {
    const name = `${rr.subname}.${ZONE}`
    for (const [label, endpoint] of endpoints) {
      const result = await resolve(endpoint, name)
      const status = result.ok ? 'OK  ' : 'MISS'
      if (!result.ok) allGood = false
      console.log(`  ${status} ${label.padEnd(10)} ${name} ${result.note}`)
      if (result.ok) {
        for (const answer of result.answers) console.log(`         ${answer.data}`)
      }
    }
  }

  console.log()
  if (allGood) {
    console.log('All records resolve on both resolvers. Safe to rescan.\n')
  } else {
    console.log(
      'Not resolving everywhere yet. Delegation can take up to the parent TTL\n' +
        'to propagate — wait and re-run with --verify-only before changing anything.\n',
    )
    process.exitCode = 1
  }
}

if (!verifyOnly) await publish()
await verify()
