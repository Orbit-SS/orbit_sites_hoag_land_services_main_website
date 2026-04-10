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

function generateTreeContext(loc: Location, county: string, zips: string): string {
  const paras: string[] = []

  if (loc.character === 'coastal') {
    paras.push(
      `<p>${loc.name} sits along Florida's Atlantic coast in ${county}, where salt-laden winds, sandy soils, and seasonal storms create a demanding environment for trees. Live oaks, sabal palms, slash pines, and southern red cedars are common throughout the area, and many properties in the ${zips} zip code area feature mature canopies that require regular professional care. Salt spray accelerates dieback in species not adapted to coastal conditions, and hurricane-force winds can turn unmaintained trees into serious hazards for homes, vehicles, and power lines.</p>`
    )
    paras.push(
      `<p>Hoag Land Services provides ISA Certified Arborist tree care to ${loc.name} residential and commercial properties. Whether you need dead limb removal to reduce storm risk, crown reduction to clear structures and sight lines, full tree removal for hazardous or declining trees, or palm pruning to keep your property maintained, our crew handles the job with the equipment, training, and insurance to do it right. As an ISA Tree Risk Assessment Qualified (TRAQ) arborist, Tyler Hoag evaluates every tree we touch for structural defects, root stability, and species-specific risks before any work begins.</p>`
    )
    paras.push(
      `<p>${county} tree ordinances may require permits for removal of certain protected species or trees above specific diameter thresholds. We can advise you on local requirements and help guide you through the permitting process when needed. If you have trees near your home, along your fence line, overhanging a neighbor's property, or showing signs of decline, call Hoag Land Services for an honest assessment and a no-pressure estimate.</p>`
    )
  } else if (loc.character === 'rural') {
    paras.push(
      `<p>${loc.name} is a ${loc.popBracket === 'tiny' ? 'small, close-knit' : 'rural'} community in ${county} where properties often sit on larger lots with mature hardwoods, dense understory, and trees that have grown unchecked for years. Water oaks, laurel oaks, slash pines, and cabbage palms are common across the ${zips} zip code area, and without regular maintenance, these species can develop structural problems, deadwood accumulation, and excessive canopy spread that threatens roofs, fences, driveways, and outbuildings.</p>`
    )
    paras.push(
      `<p>Hoag Land Services provides professional tree care to ${loc.name} property owners who need more than a handyman with a chainsaw. As an ISA Certified Arborist and Tree Risk Assessment Qualified (TRAQ) professional, Tyler Hoag assesses every tree for health, structural integrity, and risk before recommending any work. Our services include tree removal, tree trimming, palm pruning, stump grinding, storm damage cleanup, and new tree installation — all performed with the proper equipment to handle rural access, large trees, and difficult terrain.</p>`
    )
    paras.push(
      `<p>Many ${loc.name} properties are in unincorporated ${county}, which may have different tree removal requirements than incorporated municipalities. We will advise you on any permits or approvals needed before starting work. Whether you have a single problem tree or a property full of overgrowth, call Hoag Land Services for an honest estimate and dependable service.</p>`
    )
  } else {
    paras.push(
      `<p>${loc.name} is a ${loc.popBracket === 'large' ? 'growing' : 'well-established'} community in ${county} with a diverse mix of residential neighborhoods, commercial corridors, and developing areas. Properties in the ${zips} zip code area feature a range of tree species common to Central Florida — live oaks, water oaks, laurel oaks, slash pines, sabal palms, and a variety of ornamental and fruit trees. As the area continues to grow, maintaining healthy trees while managing risk to homes, power lines, and infrastructure becomes increasingly important.</p>`
    )
    paras.push(
      `<p>Hoag Land Services brings ISA Certified Arborist expertise to ${loc.name} homeowners, property managers, and commercial clients. Our services include tree removal for hazardous, dead, or unwanted trees, precision trimming and pruning to promote health and reduce storm risk, palm pruning, stump grinding, storm damage response, and tree installation with species suited to Central Florida soils and climate. As an ISA Tree Risk Assessment Qualified (TRAQ) professional, Tyler Hoag evaluates structural integrity, root health, and species-specific risks before recommending any course of action.</p>`
    )
    paras.push(
      `<p>${loc.name} falls within ${county} jurisdiction, where tree removal permits may be required for protected species or trees exceeding certain size thresholds. We can advise you on local ordinances and help navigate the permitting process. For an honest assessment and a no-pressure estimate on any tree work in ${loc.name}, give Hoag Land Services a call.</p>`
    )
  }

  return paras.join('\n')
}

function generateSiteContext(loc: Location, county: string, zips: string): string {
  const paras: string[] = []

  if (loc.character === 'coastal') {
    paras.push(
      `<p>${loc.name} properties in ${county} present unique site preparation challenges due to sandy coastal soils, high water tables, and strict environmental regulations. The ${zips} zip code area includes a mix of established lots that may need reclearing, undeveloped parcels with decades of overgrowth, and new development sites requiring full preparation from initial clearing through final grading. Coastal building codes, stormwater management requirements, and environmental buffer zones all factor into how site work must be approached in this area.</p>`
    )
    paras.push(
      `<p>Hoag Land Services provides complete site work and land clearing services to ${loc.name} property owners, builders, and developers. Our capabilities include full vegetation clearing, forestry mulching, stump grinding, excavation, grading, drainage solutions, and erosion control. We bring the right equipment for the job — whether that is a single residential lot or a multi-acre commercial development — and we work within ${county} permitting requirements from start to finish.</p>`
    )
    paras.push(
      `<p>If you are preparing land for construction, clearing an overgrown lot, improving drainage on an existing property, or managing vegetation on acreage in ${loc.name}, Hoag Land Services has the experience, equipment, and local knowledge to get the job done right. Call us or fill out the form above for an honest, no-pressure estimate on your project.</p>`
    )
  } else if (loc.character === 'rural') {
    paras.push(
      `<p>${loc.name} sits in the ${loc.popBracket === 'tiny' ? 'rural heart' : 'agricultural corridor'} of ${county}, where land clearing projects range from reclaiming overgrown homestead lots to preparing multi-acre parcels for agriculture, construction, or habitat management. Properties in the ${zips} zip code area are often densely vegetated with palmetto, pine, scrub oak, and invasive species that have established over years or decades of inactivity. The sandy soils, variable drainage, and mix of upland and wetland terrain in this area require equipment and experience suited to the conditions.</p>`
    )
    paras.push(
      `<p>Hoag Land Services handles land clearing projects of all sizes in ${loc.name} and surrounding ${county}. We provide full clearing, forestry mulching, stump removal, root raking, excavation, grading, drainage installation, and erosion control. For environmentally sensitive areas, our forestry mulching approach clears vegetation while returning organic material to the soil and minimizing ground disturbance. For full-scale development preparation, we handle everything from initial clearing through final grade.</p>`
    )
    paras.push(
      `<p>${county} land clearing projects may require permits depending on the scope, location relative to wetlands, and local zoning. We work with property owners and builders to ensure projects comply with county and water management district requirements. Contact Hoag Land Services for a site walk and straightforward estimate on your ${loc.name} land clearing project.</p>`
    )
  } else {
    paras.push(
      `<p>${loc.name} is a ${loc.popBracket === 'large' ? 'rapidly growing' : 'developing'} community in ${county} where new construction, lot development, and property improvement projects keep site work in steady demand. The ${zips} zip code area includes residential subdivisions with buildable lots, older properties in need of reclearing, and commercial parcels requiring full site preparation. Central Florida's sandy soils, flat terrain, and seasonal heavy rains create specific challenges for drainage, grading, and erosion control that require local experience to handle correctly.</p>`
    )
    paras.push(
      `<p>Hoag Land Services provides professional land clearing and site preparation to ${loc.name} homeowners, builders, and developers. From single residential lots to larger commercial and agricultural projects, we handle clearing, forestry mulching, stump grinding, excavation, grading, drainage, and erosion control with the right equipment for the scope of work. Our team has been serving Central Florida since ${EST_YEAR}, and we understand the soil conditions, permitting requirements, and environmental considerations specific to ${county}.</p>`
    )
    paras.push(
      `<p>Whether you need a lot cleared for new construction, overgrown vegetation removed from an existing property, or a full site development package in ${loc.name}, Hoag Land Services delivers honest estimates and reliable execution. Call us or submit a request through the form above to schedule a site walk.</p>`
    )
  }

  return paras.join('\n')
}

function generateFenceContext(loc: Location, county: string, zips: string): string {
  const paras: string[] = []

  if (loc.character === 'coastal') {
    paras.push(
      `<p>${loc.name} coastal properties in ${county} demand fencing materials and installation methods that can withstand salt air, high winds, and sandy soils. The ${zips} zip code area includes beachside homes, canal-front properties, and mainland neighborhoods where fencing serves purposes ranging from pool safety barriers to full perimeter privacy. Vinyl and aluminum are popular choices in coastal ${loc.name} due to their resistance to corrosion and low maintenance requirements, while wood fencing remains a strong option for inland properties and larger rural lots in the area.</p>`
    )
    paras.push(
      `<p>Hoag Land Services installs wood, vinyl, and aluminum fencing for ${loc.name} residential and commercial properties. We handle the full scope — from clearing the fence line and removing old fencing to installing posts at proper depth for ${county}'s sandy soil conditions and completing the job with quality materials built to last. For properties in HOA communities, we work within architectural guidelines for approved styles, heights, and materials.</p>`
    )
    paras.push(
      `<p>${county} and the City of ${loc.name} may have specific requirements for fence height, setbacks, and pool barrier compliance under Florida statute. We will advise you on local codes and ensure your installation meets all applicable requirements. Call Hoag Land Services for a property walk, material recommendations, and a straightforward estimate on your ${loc.name} fencing project.</p>`
    )
  } else if (loc.character === 'rural') {
    paras.push(
      `<p>${loc.name} property owners in ${county} rely on fencing for a wide range of purposes — from residential privacy and pool enclosures to livestock containment, pasture boundaries, and property line definition on larger acreage. The ${zips} zip code area includes homesteads, agricultural parcels, equestrian properties, and wooded lots where fencing needs go well beyond a standard suburban privacy fence. Wood board fencing, barbed wire, field fence, and horse fence are common on rural ${loc.name} properties, while vinyl and aluminum serve residential yards and pool areas.</p>`
    )
    paras.push(
      `<p>Hoag Land Services installs all types of fencing for ${loc.name} properties, from heavy-duty agricultural fencing on multi-acre parcels to residential privacy fencing for homes and neighborhoods. We clear fence lines, remove old or damaged fencing, set posts properly for ${county} soil conditions, and complete installations with materials chosen for durability and suitability to the specific application.</p>`
    )
    paras.push(
      `<p>Many ${loc.name} properties are in unincorporated ${county}, where fence regulations may differ from incorporated municipalities. We will advise you on any applicable setback, height, or material requirements for your specific location. For a site visit and honest estimate on fencing in ${loc.name}, contact Hoag Land Services.</p>`
    )
  } else {
    paras.push(
      `<p>${loc.name} is a ${loc.popBracket === 'large' ? 'growing' : 'well-established'} community in ${county} where property owners install fencing for privacy, security, pool safety, pet containment, and property line definition. The ${zips} zip code area includes a mix of single-family neighborhoods, newer subdivisions with HOA requirements, and larger lots where fencing serves both residential and boundary purposes. Wood, vinyl, and aluminum are the most common materials in the area, each suited to different budgets, aesthetics, and maintenance preferences.</p>`
    )
    paras.push(
      `<p>Hoag Land Services provides professional fence installation to ${loc.name} homeowners and commercial clients. We install wood privacy fencing, vinyl privacy and picket fencing, and aluminum fencing for pools, estates, and community perimeters. Our process includes clearing the fence line, removing any existing fencing, setting posts at proper depth and spacing for ${county} soil, and completing the installation with quality materials and workmanship.</p>`
    )
    paras.push(
      `<p>${county} fence codes typically regulate height, setback from property lines, and requirements for pool barriers under Florida Building Code Chapter 3109. Many ${loc.name} neighborhoods also have HOA architectural guidelines that specify approved materials, colors, and styles. We will walk your property, discuss your options, and provide an estimate that accounts for local requirements. Call Hoag Land Services to get started.</p>`
    )
  }

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
    url: 'https://hlsdeland.com',
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(REVIEW_STATS.stars),
      reviewCount: String(REVIEW_STATS.count),
      bestRating: '5',
      worstRating: '1',
    },
    review: REVIEWS.map(r => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      reviewRating: { '@type': 'Rating', ratingValue: String(r.rating), bestRating: '5' },
      reviewBody: r.text,
    })),
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://hlsdeland.com' },
      { '@type': 'ListItem', position: 2, name: SERVICE_CATEGORIES[service].name, item: `https://hlsdeland.com/services/${SERVICE_CATEGORIES[service].slug}` },
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
    isPartOf: { '@type': 'WebSite', url: 'https://hlsdeland.com', name: COMPANY },
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
  const canonicalUrl = `https://hlsdeland.com/services/${cat.slug}/${loc.slug}`

  // Title: max 60 chars
  const serviceLabel = service === 'tree' ? 'Tree Service' : service === 'site' ? 'Land Clearing' : 'Fence Company'
  const title = `${serviceLabel} ${loc.name} ${loc.stateAbbr} | ${COMPANY}`

  // Meta description: 140-155 chars
  const metaDesc = generateMetaDescription(loc, service, serviceLabel)

  // H1
  const h1 = `${serviceLabel} in ${loc.name}, ${loc.stateAbbr} \u2014 Built on Hard Work`

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
  if (service === 'tree') {
    return `ISA Certified Arborist ${label.toLowerCase()} in ${loc.name}, FL. Tree removal, trimming & storm cleanup. ${REVIEW_STATS.stars} stars. Free estimates.`
  }
  if (service === 'site') {
    return `Professional land clearing in ${loc.name}, FL. Forestry mulching, grading, drainage & site prep. Licensed & insured. Free estimates.`
  }
  return `Trusted ${label.toLowerCase()} in ${loc.name}, FL. Wood, vinyl & aluminum fence installation. ${REVIEW_STATS.stars} stars on Google. Free estimates.`
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
