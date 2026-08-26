/**
 * Content generator for location pages.
 * Produces unique LocationPageData for each location × service combination.
 *
 * Hand-crafted content from the existing 9 Tier 1 pages is preserved.
 * All other locations use template-based generation with location-specific details.
 */

import type { LocationPageData } from '@/types/location'
import type { Location, ServiceCategory } from './locations'
import { SERVICE_CATEGORIES, ALL_LOCATIONS, getLocation } from './locations'
import {
  PHONE,
  PHONE_HREF,
  COMPANY,
  REVIEW_STATS,
  CERTS,
  EST_YEAR,
  REVIEWS,
} from '@/shared/constants'

// ──────────────────────────────────────────────────────
// HAND-CRAFTED LOCAL CONTEXT (from Tier 1 agent builds)
// ──────────────────────────────────────────────────────

const HAND_CRAFTED_CONTEXT: Record<string, string> = {}

// These will be populated by reading the existing page files.
// For now, the generator produces template-based content for all locations.

// ──────────────────────────────────────────────────────
// CONTENT GENERATION
// ──────────────────────────────────────────────────────

const PROCESS_STEPS = {
  tree: [
    { title: 'Call or Request an Estimate', desc: 'Give us a call or fill out the form on this page. Tell us about your trees, your property, and what you need done. We will ask a few questions to understand the scope before scheduling a visit.' },
    { title: 'We Walk Your Property', desc: 'We visit your property in person, assess every tree involved, and give you an honest, no-pressure estimate on the spot. Our ISA Certified Arborist evaluates risk, health, and the safest approach for your specific situation.' },
    { title: 'We Get It Done Right', desc: 'Once you approve the estimate, we schedule the work at a time that works for you. Our crew shows up on time, completes the job safely and cleanly, and leaves your property better than we found it.' },
  ],
  site: [
    { title: 'Call or Request an Estimate', desc: 'Reach out by phone or through the form on this page. Describe your property, the acreage involved, and what you are looking to accomplish. The more detail, the better we can prepare.' },
    { title: 'We Walk Your Property', desc: 'We come out to your site, walk the full area, evaluate terrain, vegetation, access points, and any environmental considerations. You get a straightforward estimate with no hidden costs.' },
    { title: 'We Complete the Work', desc: 'We bring the right equipment for your specific project and get it done on schedule. From single lots to multi-acre clearings, we handle the full scope from clearing through final grading.' },
  ],
  fence: [
    { title: 'Call or Request an Estimate', desc: 'Give us a call or submit a request through this page. Tell us about your property, the type of fencing you are considering, and the approximate footage. We will follow up promptly.' },
    { title: 'We Walk Your Property', desc: 'We visit your property, measure the fence line, discuss material options, and provide an honest estimate. We will help you choose the right fencing for your needs, budget, and local requirements.' },
    { title: 'Professional Installation', desc: 'Our crew installs your fence with quality materials and careful workmanship. We respect your property, clean up after ourselves, and make sure the finished product is something you are proud of.' },
  ],
}

function generateDifferentiators(loc: Location, service: ServiceCategory) {
  const base = [
    { title: 'ISA Certified Arborist', desc: `Tyler Hoag holds ISA Certified Arborist credentials (FL-9491A) and is Tree Risk Assessment Qualified (TRAQ). Every project is backed by professional knowledge, not guesswork.` },
    { title: `${new Date().getFullYear() - EST_YEAR}+ Years of Experience`, desc: `Since ${EST_YEAR}, Hoag Land Services has built a reputation on honest work, fair pricing, and showing up when we say we will. Our repeat customers and referrals speak for themselves.` },
    { title: 'Licensed, Insured & Screened', desc: `We carry full liability insurance and are HomeAdvisor Screened and Approved. Your property and your peace of mind are protected on every job.` },
  ]

  // Hyper-local block — unique per location
  const localBlock = {
    title: `Serving ${loc.name} Properties`,
    desc: getLocalDifferentiator(loc, service),
  }

  return [...base, localBlock]
}

function getLocalDifferentiator(loc: Location, service: ServiceCategory): string {
  const countyRef = `${loc.county} County`

  if (service === 'tree') {
    if (loc.character === 'coastal') {
      return `${loc.name} coastal properties face unique challenges from salt spray, wind exposure, and sandy soil. Our arborist understands the species and conditions specific to ${countyRef} shoreline communities.`
    }
    if (loc.character === 'rural') {
      return `${loc.name} acreage properties often have mature trees that need professional assessment. We work with large rural lots, agricultural parcels, and wooded homesteads throughout ${countyRef}.`
    }
    return `From established neighborhoods to newer developments, ${loc.name} properties feature a mix of native oaks, pines, palms, and ornamentals that benefit from certified arborist care.`
  }

  if (service === 'site') {
    if (loc.character === 'rural') {
      return `${loc.name} land often requires clearing of dense vegetation, palmetto, and overgrown timber before construction or agricultural use. We handle lots of all sizes in ${countyRef}.`
    }
    if (loc.character === 'coastal') {
      return `${loc.name} development projects require attention to coastal building codes, stormwater management, and environmental setbacks. We work within ${countyRef} permitting requirements.`
    }
    return `Whether you are clearing a residential lot, preparing a commercial site, or developing acreage in ${loc.name}, we bring the right equipment and experience for ${countyRef} soil and terrain.`
  }

  // fence
  if (loc.character === 'coastal') {
    return `${loc.name} coastal properties benefit from corrosion-resistant materials like vinyl and aluminum. We understand ${countyRef} fence codes, HOA requirements, and the demands of salt air exposure.`
  }
  if (loc.character === 'rural') {
    return `${loc.name} property owners need fencing that works — from livestock containment and agricultural boundaries to residential privacy. We install wood, vinyl, and aluminum fencing across ${countyRef} acreage.`
  }
  return `${loc.name} neighborhoods include a mix of privacy fencing, pool enclosures, and property boundaries. We install wood, vinyl, and aluminum fencing that meets ${countyRef} codes and HOA guidelines.`
}

function generateLocalContext(loc: Location, service: ServiceCategory): string {
  // Check for hand-crafted content first
  const key = `${loc.slug}-${service}`
  if (HAND_CRAFTED_CONTEXT[key]) return HAND_CRAFTED_CONTEXT[key]

  const countyRef = `${loc.county} County`
  const zips = loc.zipCodes.join(', ')

  if (service === 'tree') {
    return generateTreeContext(loc, countyRef, zips)
  }
  if (service === 'site') {
    return generateSiteContext(loc, countyRef, zips)
  }
  return generateFenceContext(loc, countyRef, zips)
}

// Stable per-slug variant index so each city consistently gets the same opener.
// Different slugs in the same character bucket get different opening patterns.
function variant(slug: string, mod: number): number {
  return Math.abs(hashCode(slug)) % mod
}

function generateTreeContext(loc: Location, county: string, zips: string): string {
  const paras: string[] = []
  const v = variant(loc.slug, 5)

  // ── Opening paragraph: 5 patterns per character bucket ──
  if (loc.character === 'coastal') {
    const openers = [
      `<p>${loc.name} sits along Florida's Atlantic coast in ${county}, where salt-laden winds, sandy soils, and seasonal storms create a demanding environment for trees. Live oaks, sabal palms, slash pines, and southern red cedars are common throughout the area, and many properties in the ${zips} zip code area feature mature canopies that require regular professional care.</p>`,
      `<p>Trees in ${loc.name} have to earn their keep. Coastal ${county} weather — salt spray, summer storms, hurricane-force gusts — punishes anything that hasn't been kept healthy. The mature oaks, palms, and pines lining the ${zips} streets and yards are part of what makes the area beautiful, but they need professional care to stay that way.</p>`,
      `<p>If you own property in ${loc.name}, your trees are doing battle with the Atlantic every day. Salt, wind, and seasonal storms wear down even the toughest live oaks and sabal palms. The species that thrive here in ${county} — coastal hardwoods, native palms, slash pines — all benefit from regular arborist attention to catch decline before it becomes danger.</p>`,
      `<p>${loc.name}, ${county}, sits where Florida's wild Atlantic meets the mainland canopy. Properties across the ${zips} area carry a mix of established live oaks, towering palms, and second-growth pines — beautiful when maintained, hazardous when ignored. Coastal trees age differently than inland ones, and the calls we get most often start with "I noticed something off after the last storm."</p>`,
      `<p>Coastal ${loc.name} property owners know that a healthy tree canopy isn't optional — it's the difference between a property that holds value and one that becomes a liability after a single storm. Across ${county}, the live oaks, palms, and pines on residential lots and commercial sites in the ${zips} area need regular professional attention to stay safe and structurally sound.</p>`,
    ]
    paras.push(openers[v])
  } else if (loc.character === 'rural') {
    const openers = [
      `<p>${loc.name} is a ${loc.popBracket === 'tiny' ? 'small, close-knit' : 'rural'} community in ${county} where properties often sit on larger lots with mature hardwoods, dense understory, and trees that have grown unchecked for years. Water oaks, laurel oaks, slash pines, and cabbage palms are common across the ${zips} zip code area.</p>`,
      `<p>Out in ${loc.name}, the lots are bigger and the trees have had time to do what they do. ${county}'s rural corridors are full of mature hardwoods, palmettos, and pine stands that have grown for decades — sometimes generations — without anyone in particular looking after them. The ${zips} area sees a lot of properties where the back acreage is essentially wild.</p>`,
      `<p>${loc.name} property owners in ${county} tend to have more land and bigger trees than their suburban neighbors. Mature water oaks shading homes, slash pines along driveways, palmetto thick along fence lines — it's the look that defines rural Central Florida. Without periodic professional attention, those same trees become hazards.</p>`,
      `<p>If you own acreage in ${loc.name}, your tree work is a different animal. ${county} rural properties in the ${zips} area carry the full Central Florida mix — hardwoods, conifers, palms, invasives — often on a scale that demands real equipment and an experienced crew. We're set up for it.</p>`,
      `<p>${loc.name}, in ${county}, is the kind of rural community where the property lines disappear into trees and the back of the lot has been doing whatever it wants for years. Mature oaks, pines, sweetgums, and cabbage palms make these properties beautiful — but also mean ongoing tree care work most homeowner-grade gear can't handle.</p>`,
    ]
    paras.push(openers[v])
  } else {
    const openers = [
      `<p>${loc.name} is a ${loc.popBracket === 'large' ? 'growing' : 'well-established'} community in ${county} with a diverse mix of residential neighborhoods, commercial corridors, and developing areas. Properties in the ${zips} zip code area feature a range of tree species common to Central Florida — live oaks, water oaks, laurel oaks, slash pines, sabal palms, and a variety of ornamentals.</p>`,
      `<p>Across ${loc.name}, ${county}, the mix of older neighborhoods and newer subdivisions has produced a wide variety of tree care needs. Homes in the ${zips} area sit under mature live oak canopies, beside slash pines, alongside palm-lined driveways — each species with its own maintenance cycle and its own failure modes.</p>`,
      `<p>${loc.name} property owners deal with the typical Central Florida tree mix: live oaks that need crown reduction, palms that need fronds cleaned, sweetgums dropping limbs in storms, the occasional pine threatening a roof. ${county} weather and soils mean even healthy trees in the ${zips} area need a professional eye every few years.</p>`,
      `<p>Whether your ${loc.name} home is in an older neighborhood with established trees or a newer subdivision still growing in, ${county}'s climate keeps tree care on the to-do list. The ${zips} area's oaks, pines, palms, and ornamentals all want different things — and getting it right takes someone who actually knows the species.</p>`,
      `<p>${loc.name} sits in the middle of ${county}, where Florida's most common tree species — live oak, water oak, sand pine, slash pine, sabal palm — are both the area's biggest aesthetic asset and its most common source of expensive surprises. Properties in the ${zips} area benefit from preventive care long before they need emergency removal.</p>`,
    ]
    paras.push(openers[v])
  }

  // ── Middle paragraph: what we do (rotates across 3 phrasings) ──
  const middles = [
    `<p>Hoag Land Services provides ISA Certified Arborist tree care to ${loc.name} residential and commercial properties. Whether you need dead limb removal to reduce storm risk, crown reduction to clear structures and sight lines, full tree removal for hazardous or declining trees, or palm pruning to keep your property maintained, our crew handles the job with the equipment, training, and insurance to do it right. As an ISA Tree Risk Assessment Qualified (TRAQ) arborist, Tyler Hoag evaluates every tree we touch for structural defects, root stability, and species-specific risks before any work begins.</p>`,
    `<p>We bring ISA Certified Arborist work to ${loc.name} — tree removal, trimming, palm pruning, stump grinding, storm cleanup, and new tree installation. Tyler Hoag is ISA Certified (FL-9491A) and Tree Risk Assessment Qualified (TRAQ), which means every tree we touch gets a real evaluation for health, structure, and species-specific failure risk before any cutting happens. Licensed, insured, and accountable from quote through cleanup.</p>`,
    `<p>What we do in ${loc.name}: tree removal (small to giant), tree trimming and crown reduction, palm pruning and fruit-cluster cleanup, hazard assessments by a TRAQ-qualified arborist, storm response when conditions allow, and tree installation done right the first time. Tyler runs the assessments personally. Our crew brings the equipment and the insurance to handle anything Central Florida throws at us.</p>`,
  ]
  paras.push(middles[variant(loc.slug, 3)])

  // ── Closing paragraph: permits + CTA ──
  const closers = [
    `<p>${county} tree ordinances may require permits for removal of certain protected species or trees above specific diameter thresholds. We can advise you on local requirements and help guide you through the permitting process when needed. If you have trees near your home, along your fence line, overhanging a neighbor's property, or showing signs of decline, call Hoag Land Services for an honest assessment and a no-pressure estimate.</p>`,
    `<p>Tree work in ${county} sometimes involves permits — especially for protected species, larger diameters, or trees in environmentally sensitive areas. We'll tell you upfront if your project needs one and help you through the paperwork. For everything else, just call. We give honest estimates, show up when we say we will, and leave the place cleaner than we found it.</p>`,
    `<p>Depending on your specific ${loc.name} address, ${county} may require a permit for the work you have in mind. We've been through the process plenty of times and will tell you what's required during the estimate. No pressure, no upsell — just an honest read on what your trees need and what it costs to do it right.</p>`,
  ]
  paras.push(closers[variant(loc.slug, 3)])

  return paras.join('\n')
}

function generateSiteContext(loc: Location, county: string, zips: string): string {
  const paras: string[] = []
  const v = variant(loc.slug, 5)

  if (loc.character === 'coastal') {
    const openers = [
      `<p>${loc.name} properties in ${county} present unique site preparation challenges due to sandy coastal soils, high water tables, and strict environmental regulations. The ${zips} zip code area includes a mix of established lots that may need reclearing, undeveloped parcels with decades of overgrowth, and new development sites requiring full preparation.</p>`,
      `<p>Site work near the coast plays by different rules. ${loc.name} sits in ${county} where stormwater regs, buffer setbacks, and sandy fill conditions all change how clearing and grading have to be done. The ${zips} area includes everything from infill lots in older neighborhoods to multi-acre parcels still being built out.</p>`,
      `<p>If you're preparing land in ${loc.name}, ${county}, the soil and the rules both want attention. Coastal lots in the ${zips} area sit on sand that drains fast but settles unevenly, often inside drainage districts with specific requirements. Getting the prep right the first time saves expensive rework when permits and inspections come around.</p>`,
      `<p>Coastal ${loc.name} development isn't the same as inland clearing. Between ${county}'s building codes, FEMA flood zone considerations, and the practical reality of working in sandy soils with shallow groundwater, properties in the ${zips} area need a contractor who understands how the conditions affect every step from clearing through final grade.</p>`,
      `<p>${loc.name} property owners and builders working in ${county} face a particular set of site-work realities: tidal influence on water tables, stricter stormwater management requirements, and lots that may have been graded once and need to be reworked because of subsidence or drainage changes. The ${zips} area sees this regularly.</p>`,
    ]
    paras.push(openers[v])
  } else if (loc.character === 'rural') {
    const openers = [
      `<p>${loc.name} sits in the ${loc.popBracket === 'tiny' ? 'rural heart' : 'agricultural corridor'} of ${county}, where land clearing projects range from reclaiming overgrown homestead lots to preparing multi-acre parcels for agriculture, construction, or habitat management. Properties in the ${zips} zip code area are often densely vegetated with palmetto, pine, scrub oak, and invasive species.</p>`,
      `<p>Rural ${loc.name} land clearing is acreage work. Property owners in ${county}'s ${zips} area routinely call us about lots that haven't been touched in 20 years — palmetto, pine, oak scrub, and assorted invasives all jockeying for space. The work needs heavy equipment, real planning, and someone who's done it on this scale before.</p>`,
      `<p>${loc.name} is the kind of ${county} community where land clearing means clearing land — not trimming a yard. The ${zips} area is full of properties with 5, 10, 40 acres of overgrowth waiting to be turned into pasture, building site, or habitat. The mix of sandy uplands and wet bottoms makes equipment selection and approach matter.</p>`,
      `<p>Out in ${loc.name}, site work usually starts with clearing — sometimes lots of it. ${county}'s rural parcels in the ${zips} area can carry years of palmetto, scrub oak, and pine that need to come out before grading, drainage, or building can begin. We handle full sweeps from initial clear through final grade.</p>`,
      `<p>${loc.name} land in ${county} doesn't behave like a suburban lot. Properties in the ${zips} area often need full forestry mulching or grub-and-grade before anything else can happen. We bring the equipment built for it and the experience to know when mulching beats hauling, when bermed swales beat culverts, and when to slow down for wetlands.</p>`,
    ]
    paras.push(openers[v])
  } else {
    const openers = [
      `<p>${loc.name} is a ${loc.popBracket === 'large' ? 'rapidly growing' : 'developing'} community in ${county} where new construction, lot development, and property improvement projects keep site work in steady demand. The ${zips} zip code area includes residential subdivisions with buildable lots, older properties needing reclearing, and commercial parcels requiring full site preparation.</p>`,
      `<p>${loc.name} sits in a steady-growth corner of ${county} where lots are clearing, neighborhoods are filling in, and contractors are always looking for a site-prep partner who shows up. The ${zips} area mixes infill construction, light commercial, and residential improvements — all of which start with clean, graded, drained ground.</p>`,
      `<p>Site work demand in ${loc.name} reflects ${county}'s broader growth. Builders need lots cleared, homeowners need overgrowth removed, and commercial projects need full prep from initial clearing through compaction. Central Florida sand and the ${zips} area's flat terrain create predictable drainage challenges if the grading isn't done right the first time.</p>`,
      `<p>If you're building, expanding, or just trying to make a lot useful in ${loc.name}, ${county}, site work is the first step that has to go right. The ${zips} area's mix of older neighborhoods and newer development means every project starts a little differently — but the fundamentals of clearing, drainage, and grade don't change.</p>`,
      `<p>${loc.name} property work in ${county} ranges from single-day lot clearing to multi-week development prep. The ${zips} area sees both — homeowners reclaiming neglected backyards, contractors prepping for ground-up builds, and businesses expanding existing sites. All of it depends on doing the dirt work right.</p>`,
    ]
    paras.push(openers[v])
  }

  // Middle: what we do (3 variants)
  const middles = [
    `<p>Hoag Land Services provides complete site work and land clearing services to ${loc.name} property owners, builders, and developers. Our capabilities include full vegetation clearing, forestry mulching, stump grinding, excavation, grading, drainage solutions, and erosion control. We bring the right equipment for the scope — single residential lots through multi-acre commercial sites — and work within ${county} permitting requirements from start to finish.</p>`,
    `<p>We do site work the way builders want it done: full vegetation clearing, forestry mulching for environmentally sensitive areas, stump grinding, excavation, building pads, road and drive prep, drainage installation, and erosion control. ${loc.name} projects in ${county} get our own equipment and our own crew — no sub-out, no scheduling games, no surprise change orders.</p>`,
    `<p>What we bring to ${loc.name} site work: heavy equipment for clearing and grubbing, forestry mulching machines for low-disturbance work, excavators and dozers for grading and pads, and the experience to handle ${county} permitting. We've been doing this since ${EST_YEAR} and our repeat builder clients are the best advertisement we have.</p>`,
  ]
  paras.push(middles[variant(loc.slug, 3)])

  // Closing
  const closers = [
    `<p>Whether you need a lot cleared for new construction, overgrown vegetation removed from an existing property, or a full site development package in ${loc.name}, Hoag Land Services delivers honest estimates and reliable execution. Call us or submit a request through the form above to schedule a site walk.</p>`,
    `<p>If your ${loc.name} project needs site work — clearing, grading, drainage, the whole package — call us or fill out the form on this page. We'll come walk it with you, talk through what's needed, and give you a real estimate. No pressure.</p>`,
    `<p>${county} site work projects sometimes need permits from the county, water management district, or local municipality. We'll tell you what's required before you sign anything. For an honest walk-through and an estimate on your ${loc.name} project, reach out by phone or form.</p>`,
  ]
  paras.push(closers[variant(loc.slug, 3)])

  return paras.join('\n')
}

function generateFenceContext(loc: Location, county: string, zips: string): string {
  const paras: string[] = []
  const v = variant(loc.slug, 5)

  if (loc.character === 'coastal') {
    const openers = [
      `<p>${loc.name} coastal properties in ${county} demand fencing materials and installation methods that can withstand salt air, high winds, and sandy soils. The ${zips} zip code area includes beachside homes, canal-front properties, and mainland neighborhoods where fencing serves purposes ranging from pool safety barriers to full perimeter privacy.</p>`,
      `<p>Coastal fence work in ${loc.name} is its own discipline. Salt air eats unprotected hardware, sand undercuts shallow posts, and ${county} pool-code requirements make a lot of fence-store DIY kits non-starters. The ${zips} area sees vinyl and aluminum used heavily for that exact reason — both shrug off salt and Florida sun the way wood can't.</p>`,
      `<p>If you're fencing a ${loc.name} property near the Atlantic, materials matter more than they do inland. ${county} coastal lots in the ${zips} area get punished by salt spray, gusts, and a sun that doesn't quit. Vinyl and aluminum hold up; wood needs to be the right species, sealed properly, and set deep.</p>`,
      `<p>${loc.name} fence installations face the realities of coastal ${county} living — salt, wind, soil that won't always hold a post the first try. The ${zips} area is mostly residential with a mix of pool barriers, privacy fences, and property-line work, plus the occasional commercial estate. Material selection drives most decisions here.</p>`,
      `<p>Fencing in ${loc.name} comes down to two things: surviving the salt, and meeting ${county}'s pool code. The ${zips} area sees aluminum used heavily around pools and on estates, vinyl for residential privacy, and wood mostly for inland or larger lots away from direct salt exposure. We install all three.</p>`,
    ]
    paras.push(openers[v])
  } else if (loc.character === 'rural') {
    const openers = [
      `<p>${loc.name} property owners in ${county} rely on fencing for a wide range of purposes — from residential privacy and pool enclosures to livestock containment, pasture boundaries, and property line definition on larger acreage. The ${zips} zip code area includes homesteads, agricultural parcels, equestrian properties, and wooded lots where fencing needs go well beyond a standard suburban privacy fence.</p>`,
      `<p>Rural ${loc.name} fencing is real fencing. Property owners in the ${zips} area of ${county} need barbed wire and field fence for cattle, horse fence for paddocks, board fence for the front of the property, and sometimes all three on one parcel. We install everything from a single gate replacement to perimeter fencing across multi-acre tracts.</p>`,
      `<p>${loc.name} ranch and homestead properties in ${county} have fencing needs that suburb-only contractors aren't set up for. The ${zips} area's lots run from a few acres to a few hundred, and the fence specs change accordingly: woven wire for livestock, board fence for visual, barbed for the back, vinyl or aluminum for the residential portion near the house.</p>`,
      `<p>Out in ${loc.name}, fencing solves real problems — keeping cattle in, keeping coyotes out, defining a property line that runs through woods. ${county} rural properties in the ${zips} area need fence built right for sandy soil and seasonal flooding, set deep enough to hold against animals and weather both.</p>`,
      `<p>${loc.name} fence work in ${county} covers the full agricultural spectrum: horse fence, livestock fence, perimeter fence, gate work, and the residential privacy/picket fencing closer to the house. The ${zips} area is largely unincorporated, which usually means fewer code restrictions but the same physics — posts have to be set right or the fence fails.</p>`,
    ]
    paras.push(openers[v])
  } else {
    const openers = [
      `<p>${loc.name} is a ${loc.popBracket === 'large' ? 'growing' : 'well-established'} community in ${county} where property owners install fencing for privacy, security, pool safety, pet containment, and property line definition. The ${zips} zip code area includes a mix of single-family neighborhoods, newer subdivisions with HOA requirements, and larger lots where fencing serves both residential and boundary purposes.</p>`,
      `<p>Fencing demand in ${loc.name} reflects what you'd expect from a ${county} community of its size — privacy fence going up between neighbors, pool barriers required by code, pet containment for new dogs, the occasional full perimeter replacement. The ${zips} area mixes older neighborhoods with newer HOA-governed subdivisions, each with its own material and style restrictions.</p>`,
      `<p>${loc.name} property owners install fence for the same reasons everyone does — privacy, security, code compliance, curb appeal — but ${county} adds its own wrinkles: HOA architectural reviews, pool-code requirements under Florida Building Code Chapter 3109, and setback rules that vary by zoning. The ${zips} area is mostly residential with the occasional commercial project.</p>`,
      `<p>If you're fencing a ${loc.name} property, you've probably already noticed how much the answer depends on the lot. ${county} HOAs in the ${zips} area can be picky about material and color. Older neighborhoods are looser. Pool barriers have their own rules. We've worked through all of it and will steer you toward what works for your specific situation.</p>`,
      `<p>${loc.name} fence projects in ${county} cover privacy, security, pets, pools, and curb appeal — sometimes all on the same property. The ${zips} area runs the gamut from suburban lots needing 6-foot wood privacy to estates wanting aluminum perimeter with custom gate hardware. We install wood, vinyl, and aluminum across all of it.</p>`,
    ]
    paras.push(openers[v])
  }

  // Middle: what we do
  const middles = [
    `<p>Hoag Land Services installs wood, vinyl, and aluminum fencing for ${loc.name} residential and commercial properties. We handle the full scope — from clearing the fence line and removing old fencing to installing posts at proper depth for ${county}'s soil conditions and completing the job with quality materials built to last. For HOA communities, we work within architectural guidelines for approved styles, heights, and materials.</p>`,
    `<p>What we install in ${loc.name}: wood board, privacy, barbed wire, field fence, and horse fence; vinyl privacy, picket, and ranch-style; aluminum for pools, estates, and commercial perimeters. We're one of the few contractors who'll clear the fence line ourselves first — most companies require you to have the line clear before they show up. We don't.</p>`,
    `<p>${loc.name} fence installation, the way we do it: we walk the line with you, recommend the material that actually fits the job (not the most expensive one), pull or modify any existing fence, set posts at proper depth for ${county} soils, and finish the job clean. We carry the insurance and license to do it right, and we'll handle any permits the project needs.</p>`,
  ]
  paras.push(middles[variant(loc.slug, 3)])

  // Closing
  const closers = [
    `<p>${county} fence codes typically regulate height, setback from property lines, and requirements for pool barriers under Florida Building Code Chapter 3109. Many ${loc.name} neighborhoods also have HOA architectural guidelines for approved materials, colors, and styles. We'll walk your property, discuss your options, and provide an estimate that accounts for local requirements. Call Hoag Land Services to get started.</p>`,
    `<p>Most ${loc.name} fence projects need a permit, and HOA-governed neighborhoods in ${county} usually need architectural review too. We'll tell you upfront what's required and handle as much of the back-and-forth as you want us to. For a site walk and honest estimate, call or use the form on this page.</p>`,
    `<p>Whether your ${loc.name} project is a single gate, a 200-foot privacy fence, or perimeter for a multi-acre property, the process starts the same way: we come out, walk the line, talk material and timeline, and give you a real number. No high-pressure sales pitch, no upsell games. Call Hoag Land Services or submit a request above.</p>`,
  ]
  paras.push(closers[variant(loc.slug, 3)])

  return paras.join('\n')
}

function generateFAQs(loc: Location, service: ServiceCategory): LocationPageData['faqs'] {
  const cat = SERVICE_CATEGORIES[service]

  if (service === 'tree') {
    return [
      { q: `How much does tree removal cost in ${loc.name}?`, a: `It depends on the size, species, location, and complexity of the tree. A small tree in an open yard costs significantly less than a large oak next to your house or power lines. We provide free on-site estimates with honest, no-pressure pricing for all tree work in ${loc.name}.` },
      { q: 'Are you a certified arborist?', a: `Yes. Tyler Hoag is an ISA Certified Arborist (FL-9491A) and ISA Tree Risk Assessment Qualified (TRAQ). Every tree we assess and every job we perform is backed by professional credentials and over ${new Date().getFullYear() - EST_YEAR} years of hands-on experience.` },
      { q: `Do I need a permit to remove a tree in ${loc.name}?`, a: `${loc.county} County may require permits for certain protected species or trees above specific diameter thresholds. Requirements can differ between incorporated cities and unincorporated areas. We can advise you on whether your project requires a permit and help guide you through the process.` },
      { q: 'Do you offer stump grinding?', a: 'Yes. We can grind stumps down below grade so you can replant, resod, or repurpose the area. Stump grinding can be included in your tree removal estimate or performed as a standalone service.' },
      { q: 'Do you provide emergency storm damage service?', a: 'Yes. Storm damage, fallen trees, and hazardous limbs do not wait for business hours. Call us and we will respond as soon as conditions safely allow. We handle leaning trees, split trunks, uprooted root plates, and debris removal.' },
      { q: `What areas near ${loc.name} do you serve?`, a: `We serve ${loc.name} and surrounding communities throughout ${loc.county} County and Central Florida, including ${loc.nearby.slice(0, 3).map(s => { const n = getLocation(s); return n ? n.name : s }).join(', ')}, and more. If you are in the area, give us a call.` },
    ]
  }

  if (service === 'site') {
    return [
      { q: `How much does land clearing cost in ${loc.name}?`, a: `Cost depends on acreage, density of vegetation, terrain, access, and what needs to happen after clearing — stump removal, grading, drainage, etc. We provide free on-site estimates for all land clearing projects in ${loc.name} and surrounding ${loc.county} County.` },
      { q: 'What is forestry mulching?', a: 'Forestry mulching uses specialized equipment to grind standing vegetation — trees, brush, and stumps — into mulch in a single pass. It is faster and more environmentally friendly than traditional clearing because it eliminates the need for burning, hauling, or disposal, and the mulch protects the soil from erosion.' },
      { q: `Do I need a permit for land clearing in ${loc.name}?`, a: `${loc.county} County typically requires permits for land clearing depending on the size of the project, proximity to wetlands, and local zoning. Stormwater management requirements from the water management district may also apply. We can advise you on what is needed for your specific property.` },
      { q: 'How long does land clearing take?', a: 'Timeline depends on the size of the area, density of vegetation, and scope of work. A single residential lot may take one to two days. Larger multi-acre projects can take a week or more. We will give you a realistic timeline during your estimate.' },
      { q: 'Do you handle grading and drainage?', a: 'Yes. We provide complete site preparation including clearing, grading, drainage installation, and erosion control. Proper grading and drainage are critical in Central Florida where sandy soils and flat terrain can create standing water issues.' },
      { q: `What areas near ${loc.name} do you serve?`, a: `We serve ${loc.name} and surrounding ${loc.county} County, including ${loc.nearby.slice(0, 3).map(s => { const n = getLocation(s); return n ? n.name : s }).join(', ')}, and more. Whether your project is a half-acre lot or a large-scale development, give us a call.` },
    ]
  }

  // fence
  return [
    { q: `How much does fence installation cost in ${loc.name}?`, a: `Cost depends on the type of material (wood, vinyl, or aluminum), total linear footage, terrain, and any existing fencing that needs removal. We provide free on-site estimates for all fencing projects in ${loc.name} and surrounding ${loc.county} County.` },
    { q: 'What types of fencing do you install?', a: 'We install wood fencing (board, privacy, barbed wire, field fence, horse fence), vinyl fencing (privacy, picket, ranch style), and aluminum fencing (estates, pools, residential and commercial communities). We will help you choose the right material for your needs and budget.' },
    { q: `Do I need a permit for a fence in ${loc.name}?`, a: `${loc.county} County and local municipalities may have requirements for fence height, setback from property lines, and pool barrier compliance. Requirements vary between incorporated cities and unincorporated areas. We can advise you on what applies to your specific property.` },
    { q: 'How long does fence installation take?', a: 'Most residential fence projects are completed in one to three days depending on the total footage, material type, and site conditions. Larger commercial or agricultural projects may take longer. We will give you a realistic timeline with your estimate.' },
    { q: 'Do you remove old fencing?', a: 'Yes. We can remove and dispose of existing fencing as part of your installation project. If your old fence is damaged, leaning, or deteriorated, we handle the full replacement from removal through new installation.' },
    { q: `What areas near ${loc.name} do you serve?`, a: `We serve ${loc.name} and surrounding communities throughout ${loc.county} County and Central Florida, including ${loc.nearby.slice(0, 3).map(s => { const n = getLocation(s); return n ? n.name : s }).join(', ')}, and more. Contact us for a free estimate.` },
  ]
}

function generateSchema(loc: Location, service: ServiceCategory, title: string, metaDesc: string, url: string, heroImage: string, faqs: LocationPageData['faqs']) {
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': service === 'tree' ? ['LocalBusiness', 'TreeService'] : service === 'fence' ? ['LocalBusiness', 'FenceContractor'] : ['LocalBusiness', 'GeneralContractor'],
    name: COMPANY,
    url: 'https://www.hlsdeland.com',
    logo: '/photos/HLSlogo-nobackground.png',
    image: heroImage,
    description: `${SERVICE_CATEGORIES[service].name} in ${loc.name}, ${loc.stateAbbr} by ${COMPANY}. ISA Certified Arborist (FL-9491A). Licensed and insured. ${REVIEW_STATS.stars} stars on Google.`,
    telephone: PHONE,
    email: 'tyler@hlsdeland.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'DeLeon Springs',
      addressRegion: 'FL',
      postalCode: '32130',
      addressCountry: 'US',
    },
    areaServed: { '@type': 'City', name: loc.name },
    // No aggregateRating/review here. This block renders on ~360 city pages;
    // the rating belongs on /reviews, where the reviews are actually shown.
    sameAs: [
      'https://facebook.com/hoaglandservices',
      'https://instagram.com/hls_deland',
    ],
    priceRange: '$$',
    foundingDate: String(EST_YEAR),
    slogan: 'Built on Hard Work',
  }

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.hlsdeland.com' },
      { '@type': 'ListItem', position: 2, name: SERVICE_CATEGORIES[service].name, item: `https://www.hlsdeland.com/services/${SERVICE_CATEGORIES[service].slug}` },
      { '@type': 'ListItem', position: 3, name: loc.name, item: url },
    ],
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: metaDesc,
    url,
    isPartOf: { '@type': 'WebSite', url: 'https://www.hlsdeland.com', name: COMPANY },
    about: { '@type': 'LocalBusiness', name: COMPANY },
    primaryImageOfPage: { '@type': 'ImageObject', url: heroImage },
    dateModified: new Date().toISOString().split('T')[0],
    inLanguage: 'en-US',
  }

  return { localBusiness, breadcrumbs, faqPage, webPage }
}

// ──────────────────────────────────────────────────────
// MAIN GENERATOR
// ──────────────────────────────────────────────────────

export function generateLocationPageData(loc: Location, service: ServiceCategory): LocationPageData {
  const cat = SERVICE_CATEGORIES[service]
  const heroImage = cat.heroImages[Math.abs(hashCode(loc.slug)) % cat.heroImages.length]
  const canonicalUrl = `https://www.hlsdeland.com/services/${cat.slug}/${loc.slug}`

  // Title: max 60 chars. Rotate across 4 patterns per service so we don't ship
  // 122 cities with identical-shape titles. The variant index is stable per slug.
  // NOTE: the root layout's title template auto-appends " | Hoag Land Services",
  // so these patterns must NOT include the brand suffix themselves.
  const serviceLabel = service === 'tree' ? 'Tree Service' : service === 'site' ? 'Land Clearing' : 'Fence Company'
  const titleVariant = variant(loc.slug, 4)
  const titlePatterns: Record<ServiceCategory, string[]> = {
    tree: [
      `Tree Service in ${loc.name}, ${loc.stateAbbr}`,
      `${loc.name} Tree Removal & Trimming`,
      `Tree Care in ${loc.name}, ${loc.stateAbbr} — ISA Certified Arborist`,
      `${loc.name}, FL Tree Service & Storm Cleanup`,
    ],
    site: [
      `Land Clearing in ${loc.name}, ${loc.stateAbbr}`,
      `${loc.name} Land Clearing & Site Prep`,
      `Site Work in ${loc.name}, ${loc.stateAbbr} — Forestry Mulching & Grading`,
      `${loc.name}, FL Excavation & Land Clearing`,
    ],
    fence: [
      `Fence Installation in ${loc.name}, ${loc.stateAbbr}`,
      `${loc.name} Fence Installation — Wood, Vinyl & Aluminum`,
      `Fencing in ${loc.name}, ${loc.stateAbbr}`,
      `${loc.name}, FL Fence Contractor — Privacy & Boundary`,
    ],
  }
  const title = titlePatterns[service][titleVariant]

  // Meta description: 140-155 chars
  const metaDesc = generateMetaDescription(loc, service, serviceLabel)

  // H1 \u2014 rotate across 3 patterns per service so the visible headline isn't
  // identical across all cities. Keeps brand voice ("Built on Hard Work")
  // visible on most but not all pages.
  const h1Variant = variant(loc.slug, 3)
  const h1Patterns: Record<ServiceCategory, string[]> = {
    tree: [
      `${serviceLabel} in ${loc.name}, ${loc.stateAbbr} \u2014 Built on Hard Work`,
      `${loc.name} ${serviceLabel} by an ISA Certified Arborist`,
      `Trusted ${serviceLabel} in ${loc.name}, ${loc.stateAbbr}`,
    ],
    site: [
      `${serviceLabel} in ${loc.name}, ${loc.stateAbbr} \u2014 Built on Hard Work`,
      `${loc.name} ${serviceLabel} & Site Preparation`,
      `Land Clearing & Site Work in ${loc.name}, ${loc.stateAbbr}`,
    ],
    fence: [
      `${serviceLabel} in ${loc.name}, ${loc.stateAbbr} \u2014 Built on Hard Work`,
      `${loc.name} Fence Installation You Can Count On`,
      `Wood, Vinyl & Aluminum Fencing in ${loc.name}, ${loc.stateAbbr}`,
    ],
  }
  const h1 = h1Patterns[service][h1Variant]

  // Subheadline
  const subheadline = generateSubheadline(loc, service)

  const faqs = generateFAQs(loc, service)
  const schema = generateSchema(loc, service, title, metaDesc, canonicalUrl, heroImage, faqs)

  const nearbyLocations = loc.nearby
    .map(slug => {
      const n = getLocation(slug)
      if (!n) return null
      return { name: n.name, href: `/services/${cat.slug}/${slug}` }
    })
    .filter((n): n is { name: string; href: string } => n !== null)

  return {
    location: loc.name,
    state: 'Florida',
    stateAbbr: loc.stateAbbr,
    zipCodes: loc.zipCodes,
    canonicalUrl,
    primaryKeyword: `${serviceLabel.toLowerCase()} ${loc.name.toLowerCase()} fl`,
    secondaryKeywords: generateSecondaryKeywords(loc, service),
    title,
    metaDescription: metaDesc,
    ogImage: heroImage,
    heroImage,
    h1,
    subheadline,
    ctaText: 'Call For a Free Estimate',
    ctaHref: PHONE_HREF,
    serviceCategory: service,
    serviceCategoryName: cat.name,
    services: cat.services,
    processSteps: PROCESS_STEPS[service],
    differentiators: generateDifferentiators(loc, service),
    localContext: generateLocalContext(loc, service),
    faqs,
    nearbyLocations,
    schema: {
      localBusiness: schema.localBusiness,
      breadcrumbs: schema.breadcrumbs,
      faqPage: schema.faqPage,
      webPage: schema.webPage,
    },
  }
}

// ── Helpers ──

function hashCode(s: string): number {
  let hash = 0
  for (let i = 0; i < s.length; i++) {
    const char = s.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return hash
}

function generateMetaDescription(loc: Location, service: ServiceCategory, label: string): string {
  const v = variant(loc.slug, 4)
  if (service === 'tree') {
    const opts = [
      `ISA Certified Arborist tree service in ${loc.name}, FL. Tree removal, trimming & storm cleanup. ${REVIEW_STATS.stars} stars. Free estimates.`,
      `Tree removal, trimming, palm pruning & storm cleanup in ${loc.name}, ${loc.county} County. ISA Certified Arborist. Licensed & insured.`,
      `${loc.name} tree service by an ISA Certified Arborist. Removal, trimming, palm pruning & emergency storm work. Free, honest estimates.`,
      `Professional tree care for ${loc.name} homes & businesses. ISA Certified Arborist, fully insured. Removal, trimming & palm work. Call today.`,
    ]
    return opts[v]
  }
  if (service === 'site') {
    const opts = [
      `Professional land clearing in ${loc.name}, FL. Forestry mulching, grading, drainage & site prep. Licensed & insured. Free estimates.`,
      `${loc.name} land clearing, forestry mulching, grading, and drainage work. Single lots to multi-acre commercial projects. Free estimates.`,
      `Site work in ${loc.name}, ${loc.county} County: clearing, mulching, excavation, grading, drainage. Heavy equipment, licensed crew. Call today.`,
      `Land clearing and site preparation for ${loc.name} builders and property owners. Forestry mulching, drainage, and grading done right.`,
    ]
    return opts[v]
  }
  const opts = [
    `Trusted fence installation in ${loc.name}, FL. Wood, vinyl & aluminum fencing. ${REVIEW_STATS.stars} stars on Google. Free estimates.`,
    `${loc.name} fence installation — wood, vinyl, and aluminum. Privacy, pool, agricultural, and boundary fencing. Free estimates.`,
    `Wood, vinyl, and aluminum fencing for ${loc.name} homes, ranches, and commercial properties. Licensed, insured. Free site walks.`,
    `Fence installation and replacement in ${loc.name}, ${loc.county} County. Privacy, livestock, pool barrier, and boundary work. Free estimates.`,
  ]
  return opts[v]
}

function generateSubheadline(loc: Location, service: ServiceCategory): string {
  if (service === 'tree') {
    if (loc.character === 'coastal') return `Professional tree care for ${loc.name} coastal properties. ISA Certified Arborist serving ${loc.county} County homes and businesses.`
    if (loc.character === 'rural') return `Dependable tree care for ${loc.name} acreage and homesteads. ISA Certified Arborist serving rural ${loc.county} County.`
    return `Professional tree care for ${loc.name} homes and businesses. ISA Certified Arborist serving ${loc.county} County since ${EST_YEAR}.`
  }
  if (service === 'site') {
    if (loc.character === 'rural') return `Land clearing, forestry mulching, and site preparation for ${loc.name} properties. From single lots to hundreds of acres.`
    return `Professional land clearing and site preparation for ${loc.name} residential and commercial properties. From single lots to full-scale development.`
  }
  if (loc.character === 'coastal') return `Wood, vinyl, and aluminum fencing for ${loc.name} coastal properties. Built to handle salt air and Florida weather.`
  if (loc.character === 'rural') return `Residential, agricultural, and property boundary fencing for ${loc.name} homeowners and landowners.`
  return `Professional wood, vinyl, and aluminum fence installation for ${loc.name} homes and properties.`
}

function generateSecondaryKeywords(loc: Location, service: ServiceCategory): string[] {
  const name = loc.name.toLowerCase()
  if (service === 'tree') {
    return [`tree removal ${name}`, `tree trimming ${name}`, `arborist ${name}`, `stump grinding ${name}`, `palm pruning ${name}`]
  }
  if (service === 'site') {
    return [`land clearing ${name}`, `forestry mulching ${name}`, `lot clearing ${name}`, `site preparation ${name}`, `grading ${name}`]
  }
  return [`fence installation ${name}`, `fencing ${name} fl`, `vinyl fence ${name}`, `wood fence ${name}`, `fence contractor ${name}`]
}
