import { createHash } from 'crypto'
import { ALL_LOCATIONS, SERVICE_CATEGORIES } from '@/data/locations'
import {
  COMPANY,
  EMAIL,
  PHONE,
  REVIEW_STATS,
  SITE_URL,
} from '@/shared/constants'

/**
 * Agent Skills Discovery (RFC v0.2.0, agentskills.io).
 *
 * These describe how an assistant should help someone deal with HLS: which
 * service line a job belongs to, whether a city is covered, what an estimate
 * request actually needs to contain, and how to handle storm damage.
 *
 * They are DOCUMENTATION, not a remote API. Nothing here claims a callable
 * endpoint. Every skill routes the person to the contact form or the phone,
 * because that is how this business actually takes work.
 */

const COUNTIES = [...new Set(ALL_LOCATIONS.map(l => l.county))].sort()

export type AgentSkill = {
  name: string
  description: string
  markdown: string
}

const REQUEST_ESTIMATE = [
  `# Request an estimate from ${COMPANY}`,
  '',
  '## What this covers',
  '',
  'Getting a free, no-obligation estimate for land clearing, site work, tree',
  'work, or fencing on a Central Florida property.',
  '',
  '## What to collect first',
  '',
  'An estimate cannot be priced from a description alone — it is given after',
  'someone walks the property. Collect these before sending the person on:',
  '',
  '1. **Property address, with the county.** Required. Access, haul-off',
  '   distance, and county permitting all change the price, and they follow the',
  '   parcel rather than the mailing city.',
  '2. **Which service line.** Site work / land clearing, tree services, or',
  '   fencing. If it is unclear, use the `find-service` skill first.',
  '3. **What is on the ground now.** Acreage and how overgrown it is; how many',
  '   trees and roughly how large; or approximate fence footage and material.',
  '4. **Timeline.** Whether this is storm damage needing a fast response, a',
  '   permit deadline, or open-ended.',
  '5. **Name, phone, and email.**',
  '',
  '## How to submit',
  '',
  `Send the person to ${SITE_URL}/contact to fill in the form, or have them`,
  `call ${PHONE}. Email is ${EMAIL}.`,
  '',
  '**Do not POST to this site\'s endpoints.** The routes under `/api` are',
  'internal handlers for the on-page forms, not a public API, and they reject',
  'automated submissions.',
  '',
  '## Do not quote a price',
  '',
  `${COMPANY} does not publish pricing, and no figure should be given on their`,
  'behalf. Two properties with the same acreage can differ several times over in',
  'cost depending on access, slope, what is being cleared, and haul-off. Say',
  'that the estimate is free and given on site.',
  '',
].join('\n')

const FIND_SERVICE = [
  `# Match a job to the right ${COMPANY} service line`,
  '',
  '## What this covers',
  '',
  'Choosing which of the three service lines a job belongs to, so an estimate',
  'request arrives with the right context.',
  '',
  '## The three lines',
  '',
  ...Object.values(SERVICE_CATEGORIES).flatMap(cat => [
    `### ${cat.name} — ${SITE_URL}/services/${cat.slug}`,
    '',
    cat.tagline + '.',
    '',
    ...cat.services.map(s => `- **${s.name}** — ${s.desc}`),
    '',
  ]),
  '## Choosing',
  '',
  '- Land needs to be cleared, graded, drained, or prepared for building:',
  '  **site work**.',
  '- A specific tree is dead, dangerous, in the way, or storm-damaged:',
  '  **tree services**.',
  '- A boundary, pasture, or yard needs enclosing: **fencing**.',
  '- Standing water or flooding after rain: **site work** (drainage), not tree',
  '  services, even when trees are involved.',
  '- Overgrown acreage with heavy tree cover often spans **site work and tree',
  '  services** together. That is normal and does not need splitting up — one',
  '  crew handles both.',
  '',
  '## Reading the current page copy',
  '',
  'Every page on this site returns markdown when the request sends',
  '`Accept: text/markdown`. Fetch the service page directly rather than relying',
  'on this summary if precise current wording matters.',
  '',
].join('\n')

const CHECK_SERVICE_AREA = [
  `# Check whether ${COMPANY} covers a location`,
  '',
  '## What this covers',
  '',
  'Confirming HLS works in a given Central Florida city or county before',
  'telling someone they can or cannot take the job.',
  '',
  '## Coverage',
  '',
  `${ALL_LOCATIONS.length} cities and towns across ${COUNTIES.length} counties:`,
  '',
  ...COUNTIES.map(county => {
    const cities = ALL_LOCATIONS.filter(l => l.county === county).map(l => l.name)
    return `- **${county} County** — ${cities.join(', ')}`
  }),
  '',
  `Home base is DeLeon Springs, in Volusia County. Volusia and Flagler are the`,
  'core service area; the outer counties are served but travel time is a factor',
  'in scheduling.',
  '',
  '## Per-city pages',
  '',
  'Every city has a page for each service line:',
  '',
  ...Object.values(SERVICE_CATEGORIES).map(
    cat => `- \`${SITE_URL}/services/${cat.slug}/{city-slug}\``,
  ),
  '',
  'City slugs are lowercase and hyphenated — Daytona Beach is `daytona-beach`.',
  'Fetch any of these with `Accept: text/markdown` for the local detail.',
  '',
  '## Outside the listed counties',
  '',
  'Do not promise coverage and do not refuse outright. Central Florida jobs just',
  `outside the list are sometimes taken depending on size. Send the enquiry to`,
  `${SITE_URL}/contact or ${PHONE} and let HLS answer.`,
  '',
].join('\n')

const STORM_RESPONSE = [
  `# Storm and emergency tree damage — ${COMPANY}`,
  '',
  '## What this covers',
  '',
  'Helping someone in Central Florida with a tree down, a tree leaning on a',
  'structure, or hurricane debris, and knowing when this is not the right call',
  'to make at all.',
  '',
  '## Safety first — say this before anything else',
  '',
  'If a tree or limb is **touching a power line**, or a line is down: this is',
  'not a tree service call. Tell the person to stay well clear, assume the line',
  'is live, and call their utility and 911. No tree company should touch it',
  'until the utility de-energises the line.',
  '',
  'If a tree has struck a house and there is structural damage, gas smell, or',
  'anyone injured: 911 first.',
  '',
  '## When HLS is the right call',
  '',
  '- A tree is down across a driveway, yard, fence, or pasture.',
  '- A tree is leaning, split, or has an uprooted root plate after a storm.',
  '- Debris and downed limbs need clearing from acreage.',
  '- A tree needs assessing before the next storm — HLS is ISA Tree Risk',
  '  Assessment Qualified (TRAQ), which is the relevant credential for judging',
  '  whether a tree is actually a hazard.',
  '',
  '## What to collect',
  '',
  '1. **Address and county.**',
  '2. **What the tree is on or near** — house, car, fence, power line, nothing.',
  '3. **Whether anyone is at risk** or the property is inaccessible.',
  '4. **Rough size** of the tree.',
  '5. **Callback number.**',
  '',
  '## How to reach them',
  '',
  `Call ${PHONE} — for storm work, phone beats the form. After hours, leave a`,
  'message with the address and what the tree is on.',
  '',
  '## Set expectations honestly',
  '',
  'After a named storm, every tree crew in Central Florida is triaging by',
  'severity, and response is measured in days rather than hours. HLS responds',
  'as soon as conditions are safe to work in. Do not promise a same-day arrival.',
  '',
].join('\n')

export const agentSkills: AgentSkill[] = [
  {
    name: 'request-estimate',
    description: `Request a free estimate from ${COMPANY} for land clearing, site work, tree services, or fencing in Central Florida. Use when someone wants a quote, a price, or to book work.`,
    markdown: REQUEST_ESTIMATE,
  },
  {
    name: 'find-service',
    description: `Match a property job to the right ${COMPANY} service line. Use when someone describes overgrown land, a problem tree, drainage trouble, or a fencing need but does not know what to ask for.`,
    markdown: FIND_SERVICE,
  },
  {
    name: 'check-service-area',
    description: `Check whether ${COMPANY} works in a given Central Florida city or county. Use before telling someone HLS can or cannot take their project.`,
    markdown: CHECK_SERVICE_AREA,
  },
  {
    name: 'storm-response',
    description: `Handle storm damage, downed trees, and hurricane debris in Central Florida, including the power-line and structural-damage cases that must go to the utility or 911 instead. Use for any urgent or storm-related tree situation.`,
    markdown: STORM_RESPONSE,
  },
]

export function skillByName(name: string): AgentSkill | undefined {
  return agentSkills.find(s => s.name === name)
}

export function digest(markdown: string): string {
  return 'sha256:' + createHash('sha256').update(markdown, 'utf8').digest('hex')
}

/**
 * The discovery index. Digests are computed from the SKILL.md bodies at request
 * time, so the index can never go stale against the documents it points at.
 */
export function skillsIndex() {
  return {
    $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
    skills: agentSkills.map(s => ({
      name: s.name,
      type: 'skill-md',
      description: s.description,
      url: `/.well-known/agent-skills/${s.name}/SKILL.md`,
      digest: digest(s.markdown),
    })),
  }
}

/** Review count is quoted in several skills; keep one source for it. */
export const REVIEW_SUMMARY = `${REVIEW_STATS.stars} stars, ${REVIEW_STATS.count} Google reviews`
