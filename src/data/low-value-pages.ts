// Pages that have never appeared in Google in 90 days, and will not.
//
// Small or distant towns in Lake, Marion, Brevard, Orange and outer Flagler
// counties. They were generated to cover keyword variations and they are
// 52-62% the same text as their siblings, which is the shape Google's guidance
// on scaled content targets. Left indexable they dilute the pages that do work.
//
// They stay live and reachable: anyone who lands on one still gets a real page
// and a real form. They are simply removed from the index and the sitemap.
//
// Deliberately NOT in this list: real towns near base that have never appeared,
// such as Deltona, Ormond Beach, New Smyrna Beach and Sanford. Those are not
// low value, they are unwritten. They get hand-written copy instead.
//
// Key format is `${service}:${slug}`. Generated 2026-10-13 from 90 days of Search
// Console data; re-check before trusting it a year from now.
// Re-scoped 23 Oct 2026 to Tyler's stated service area: 50 miles, and the
// counties of Volusia, Flagler, Seminole and Lake, plus Crescent City which
// he named. A page is hidden only if it is BOTH outside that area AND has
// never appeared. Inside it, a page with no impressions is not low value, it
// is unwritten, and site work is the service he is trying to grow.
//
// Only town pages belong here. Service pages such as land-clearing-permits
// are not towns and must never be listed: six of them were caught by the first
// pass of the generator because it keyed on the third URL segment without
// checking it was a location.
export const LOW_VALUE_PAGES: ReadonlySet<string> = new Set([
  'fence:hollister',
  'fence:scottsmoor',
  'fence:st-augustine',
  'fence:titusville',
  'site:apopka',
  'site:bostwick',
  'site:christmas',
  'site:cocoa',
  'site:dunnellon',
  'site:east-palatka',
  'site:eatonville',
  'site:elkton',
  'site:fort-mccoy',
  'site:fruitland',
  'site:georgetown',
  'site:grandin',
  'site:hastings',
  'site:melrose',
  'site:merritt-island',
  'site:mims',
  'site:ocklawaha',
  'site:orlando',
  'site:palatka',
  'site:salt-springs',
  'site:san-mateo',
  'site:satsuma',
  'site:scottsmoor',
  'site:silver-springs',
  'site:silver-springs-shores',
  'site:st-augustine',
  'site:st-augustine-beach',
  'site:tangerine',
  'site:titusville',
  'site:welaka',
  'site:winter-garden',
  'site:winter-park',
  'tree:fruitland',
  'tree:grandin',
  'tree:hastings',
  'tree:mims',
  'tree:ocala',
  'tree:silver-springs',
])

export function isLowValuePage(service: 'tree' | 'site' | 'fence', slug: string): boolean {
  return LOW_VALUE_PAGES.has(`${service}:${slug}`)
}
