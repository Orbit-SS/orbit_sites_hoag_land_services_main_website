/**
 * Master location registry for all service area pages.
 * Each location × 3 services = 3 pages.
 * Total pages = locations.length × 3
 */

export interface Location {
  /** URL slug: "deland", "daytona-beach", "palm-coast" */
  slug: string
  /** Display name: "DeLand", "Daytona Beach", "Palm Coast" */
  name: string
  /** State abbreviation */
  stateAbbr: string
  /** County name */
  county: string
  /** Primary zip codes */
  zipCodes: string[]
  /** SEO priority */
  priority: 'high' | 'medium' | 'low'
  /** Geographic character for content generation */
  character: 'coastal' | 'inland' | 'rural' | 'suburban' | 'urban'
  /** Population bracket for content relevance */
  popBracket: 'large' | 'medium' | 'small' | 'tiny'
  /** Nearby location slugs for cross-linking (3-5) */
  nearby: string[]
}

export type ServiceCategory = 'tree' | 'site' | 'fence'

export const SERVICE_CATEGORIES: Record<ServiceCategory, {
  name: string
  slug: string
  tagline: string
  heroImages: string[]
  services: { name: string; desc: string; href: string }[]
}> = {
  tree: {
    name: 'Tree Services',
    slug: 'tree-services',
    tagline: 'Trimming, removals and storm clean-up',
    heroImages: [
      '/photos/tree8.jpeg',
      '/photos/tree2.jpeg',
      '/photos/tree5.JPEG',
      '/photos/tree9.jpeg',
      '/photos/tree3.jpeg',
    ],
    services: [
      { name: 'Tree Removal', desc: 'Safe removal by ISA Certified Arborist to ensure the safety of the jobsite and no damage to your property.', href: '/services/tree-services/tree-removal' },
      { name: 'Tree Trimming', desc: 'Removal of weak, dead or dying limbs. Lifting of branches for clearance of pedestrians, buildings and vehicles. Reduction cuts for shortening stems and branches.', href: '/services/tree-services/tree-trimming' },
      { name: 'Palm Pruning', desc: 'Remove dead and dying lower fronds, removal of fruit clusters, remove sprouts at base. Keep your palms healthy and your property looking sharp.', href: '/services/tree-services/palm-pruning' },
      { name: 'Tree Installation', desc: 'Palms, hardwoods, evergreens. Installation of the right tree in the right place for Central Florida soil and climate.', href: '/services/tree-services/tree-installation' },
      { name: 'Storm Damage Cleanup', desc: 'Leaning trees, split trunks, and uprooted root plates require a certified professional. We respond as soon as conditions safely allow.', href: '/services/tree-services/storm-damage' },
      { name: 'Dangerous Tree Assessment', desc: 'ISA Tree Risk Assessment Qualified (TRAQ) evaluation of hazardous trees threatening your property, structures, or family.', href: '/services/tree-services/dangerous-trees' },
    ],
  },
  site: {
    name: 'Site Services',
    slug: 'site-work',
    tagline: 'Land clearing, grading, driveways and drainage',
    heroImages: [
      '/photos/site7.JPG',
      '/photos/site10.JPG',
      '/photos/site3.jpeg',
      '/photos/site8.JPG',
      '/photos/site1.JPEG',
    ],
    services: [
      { name: 'Land Clearing', desc: 'From single residential lots to hundreds of acres of commercial or agricultural land. Complete vegetation and debris removal.', href: '/services/site-work/land-clearing' },
      { name: 'Forestry Mulching', desc: 'Environmentally responsible clearing that mulches vegetation in place, reducing erosion and returning nutrients to the soil.', href: '/services/site-work/environmental-services' },
      { name: 'Earthworks & Excavation', desc: 'Soil removal and replacement, grading, building pads, roads, ponds, and right of ways for your development project.', href: '/services/site-work/earthworks-excavation' },
      { name: 'Drainage & Grading', desc: 'Proper site drainage and grading to protect your property from standing water and erosion issues.', href: '/services/site-work/drainage-grading' },
      { name: 'Erosion Control', desc: 'Installation and maintenance of silt fences, swales, and culverts to meet county and state environmental requirements.', href: '/services/site-work/erosion-control' },
      { name: 'Land Preparation', desc: 'Complete lot preparation for new construction, including clearing, grading, and utility access.', href: '/services/site-work/land-preparation' },
    ],
  },
  fence: {
    name: 'Fencing Services',
    slug: 'fencing',
    tagline: 'Perimeter, pasture and privacy fencing',
    heroImages: [
      '/photos/fence6.jpeg',
      '/photos/fence3.jpeg',
      '/photos/fence5.jpeg',
      '/photos/fence8.jpeg',
      '/photos/fence7.jpeg',
    ],
    services: [
      { name: 'Wood Fencing', desc: 'Wood board, privacy, barbed wire, field fence, and horse fence for residential and agricultural properties.', href: '/services/fencing/wood-fencing' },
      { name: 'Vinyl Fencing', desc: 'Low-maintenance privacy, picket, and ranch style vinyl fencing built to withstand Florida weather.', href: '/services/fencing/vinyl-fencing' },
      { name: 'Aluminum Fencing', desc: 'Great for estates, pools, and residential or commercial communities. Durable and attractive.', href: '/services/fencing/aluminum-fencing' },
      { name: 'Privacy Fencing', desc: 'Create a private, secure outdoor space for your family with professionally installed privacy fencing.', href: '/services/fencing/privacy-fencing' },
      { name: 'Property Boundary', desc: 'Define your property lines clearly with durable boundary fencing suited to your lot and local codes.', href: '/services/fencing/property-boundary' },
      { name: 'Fence Replacement', desc: 'Remove old, damaged, or deteriorating fencing and replace it with quality materials installed to last.', href: '/services/fencing/fence-replacement' },
    ],
  },
}

/**
 * Existing static sub-service slugs that must NOT be treated as locations.
 * The dynamic [location] route must skip these.
 */
export const STATIC_SERVICE_SLUGS: Record<ServiceCategory, string[]> = {
  tree: [
    'tree-removal', 'tree-trimming', 'palm-pruning', 'tree-installation',
    'storm-damage', 'dangerous-trees', 'overgrown-trees', 'wrong-tree-wrong-place',
  ],
  site: [
    'land-clearing', 'land-preparation', 'earthworks-excavation', 'drainage-grading',
    'erosion-control', 'invasive-vegetation-removal', 'overgrown-land-clearing',
    'environmental-services',
  ],
  fence: [
    'wood-fencing', 'vinyl-fencing', 'aluminum-fencing', 'privacy-fencing',
    'property-boundary', 'fence-replacement', 'livestock-containment',
  ],
}

/**
 * MASTER LOCATION LIST
 * This will be populated with 100+ locations from the geographer research.
 * Locations are keyed by slug for O(1) lookup.
 */
export const LOCATIONS: Location[] = [
  // ═══════════════════════════════════════
  // VOLUSIA COUNTY — Primary Service Area
  // ═══════════════════════════════════════
  { slug: 'deland', name: 'DeLand', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32720', '32724'], priority: 'high', character: 'suburban', popBracket: 'medium', nearby: ['deleon-springs', 'orange-city', 'deltona', 'lake-helen', 'daytona-beach'] },
  { slug: 'deleon-springs', name: 'DeLeon Springs', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32130'], priority: 'high', character: 'rural', popBracket: 'small', nearby: ['deland', 'pierson', 'barberville', 'seville', 'lake-helen'] },
  { slug: 'orange-city', name: 'Orange City', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32763', '32774'], priority: 'high', character: 'suburban', popBracket: 'medium', nearby: ['deland', 'deltona', 'debary', 'lake-helen', 'enterprise'] },
  { slug: 'deltona', name: 'Deltona', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32725', '32738', '32739'], priority: 'high', character: 'suburban', popBracket: 'large', nearby: ['orange-city', 'debary', 'deland', 'enterprise', 'sanford'] },
  { slug: 'lake-helen', name: 'Lake Helen', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32744'], priority: 'medium', character: 'rural', popBracket: 'small', nearby: ['deland', 'orange-city', 'cassadaga', 'deleon-springs', 'deltona'] },
  { slug: 'pierson', name: 'Pierson', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32180'], priority: 'medium', character: 'rural', popBracket: 'tiny', nearby: ['deleon-springs', 'barberville', 'seville', 'deland', 'crescent-city'] },
  { slug: 'barberville', name: 'Barberville', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32105'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['deleon-springs', 'pierson', 'seville', 'astor', 'deland'] },
  { slug: 'seville', name: 'Seville', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32190'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['pierson', 'deleon-springs', 'barberville', 'deland', 'crescent-city'] },
  { slug: 'daytona-beach', name: 'Daytona Beach', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32114', '32117', '32118', '32119', '32124'], priority: 'high', character: 'coastal', popBracket: 'large', nearby: ['ormond-beach', 'south-daytona', 'port-orange', 'holly-hill', 'deland'] },
  { slug: 'ormond-beach', name: 'Ormond Beach', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32174', '32176'], priority: 'high', character: 'coastal', popBracket: 'medium', nearby: ['daytona-beach', 'holly-hill', 'palm-coast', 'flagler-beach', 'deland'] },
  { slug: 'port-orange', name: 'Port Orange', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32127', '32128', '32129'], priority: 'high', character: 'suburban', popBracket: 'large', nearby: ['daytona-beach', 'south-daytona', 'new-smyrna-beach', 'edgewater', 'deland'] },
  { slug: 'new-smyrna-beach', name: 'New Smyrna Beach', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32168', '32169'], priority: 'high', character: 'coastal', popBracket: 'medium', nearby: ['edgewater', 'port-orange', 'oak-hill', 'daytona-beach', 'deland'] },
  { slug: 'debary', name: 'DeBary', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32713'], priority: 'medium', character: 'suburban', popBracket: 'medium', nearby: ['deltona', 'orange-city', 'sanford', 'enterprise', 'deland'] },
  { slug: 'edgewater', name: 'Edgewater', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32132', '32141'], priority: 'medium', character: 'coastal', popBracket: 'medium', nearby: ['new-smyrna-beach', 'oak-hill', 'port-orange', 'titusville', 'deland'] },
  { slug: 'holly-hill', name: 'Holly Hill', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32117'], priority: 'medium', character: 'suburban', popBracket: 'small', nearby: ['daytona-beach', 'ormond-beach', 'south-daytona', 'port-orange', 'deland'] },
  { slug: 'south-daytona', name: 'South Daytona', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32119'], priority: 'medium', character: 'suburban', popBracket: 'small', nearby: ['daytona-beach', 'port-orange', 'holly-hill', 'daytona-beach-shores', 'deland'] },
  { slug: 'daytona-beach-shores', name: 'Daytona Beach Shores', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32118'], priority: 'low', character: 'coastal', popBracket: 'small', nearby: ['daytona-beach', 'south-daytona', 'port-orange', 'ponce-inlet', 'deland'] },
  { slug: 'ponce-inlet', name: 'Ponce Inlet', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32127'], priority: 'low', character: 'coastal', popBracket: 'small', nearby: ['port-orange', 'new-smyrna-beach', 'daytona-beach-shores', 'south-daytona', 'deland'] },
  { slug: 'cassadaga', name: 'Cassadaga', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32706'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['lake-helen', 'deland', 'orange-city', 'deltona', 'deleon-springs'] },
  { slug: 'osteen', name: 'Osteen', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32764'], priority: 'medium', character: 'rural', popBracket: 'small', nearby: ['deltona', 'enterprise', 'debary', 'sanford', 'deland'] },
  { slug: 'enterprise', name: 'Enterprise', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32725'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['deltona', 'debary', 'osteen', 'orange-city', 'deland'] },
  { slug: 'oak-hill', name: 'Oak Hill', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32759'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['edgewater', 'new-smyrna-beach', 'titusville', 'mims', 'deland'] },
  { slug: 'samsula-spruce-creek', name: 'Samsula-Spruce Creek', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32168'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['new-smyrna-beach', 'port-orange', 'edgewater', 'daytona-beach', 'deland'] },
  { slug: 'de-bary', name: 'De Bary', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32713'], priority: 'low', character: 'suburban', popBracket: 'medium', nearby: ['deltona', 'sanford', 'orange-city', 'enterprise', 'deland'] },
  // ═══════════════════════════════════════
  // FLAGLER COUNTY
  // ═══════════════════════════════════════
  { slug: 'palm-coast', name: 'Palm Coast', stateAbbr: 'FL', county: 'Flagler', zipCodes: ['32137', '32164'], priority: 'high', character: 'suburban', popBracket: 'large', nearby: ['bunnell', 'flagler-beach', 'ormond-beach', 'daytona-beach', 'deland'] },
  { slug: 'flagler-beach', name: 'Flagler Beach', stateAbbr: 'FL', county: 'Flagler', zipCodes: ['32136'], priority: 'medium', character: 'coastal', popBracket: 'small', nearby: ['palm-coast', 'bunnell', 'ormond-beach', 'beverly-beach', 'deland'] },
  { slug: 'bunnell', name: 'Bunnell', stateAbbr: 'FL', county: 'Flagler', zipCodes: ['32110'], priority: 'medium', character: 'rural', popBracket: 'small', nearby: ['palm-coast', 'flagler-beach', 'ormond-beach', 'deland', 'pierson'] },
  { slug: 'beverly-beach', name: 'Beverly Beach', stateAbbr: 'FL', county: 'Flagler', zipCodes: ['32136'], priority: 'low', character: 'coastal', popBracket: 'tiny', nearby: ['flagler-beach', 'palm-coast', 'marineland', 'bunnell', 'deland'] },
  { slug: 'marineland', name: 'Marineland', stateAbbr: 'FL', county: 'Flagler', zipCodes: ['32080'], priority: 'low', character: 'coastal', popBracket: 'tiny', nearby: ['flagler-beach', 'palm-coast', 'beverly-beach', 'st-augustine-beach', 'deland'] },
  { slug: 'hammock', name: 'Hammock', stateAbbr: 'FL', county: 'Flagler', zipCodes: ['32137'], priority: 'low', character: 'coastal', popBracket: 'tiny', nearby: ['palm-coast', 'flagler-beach', 'bunnell', 'ormond-beach', 'deland'] },
  // ═══════════════════════════════════════
  // SEMINOLE COUNTY
  // ═══════════════════════════════════════
  { slug: 'sanford', name: 'Sanford', stateAbbr: 'FL', county: 'Seminole', zipCodes: ['32771', '32773'], priority: 'high', character: 'suburban', popBracket: 'large', nearby: ['debary', 'deltona', 'lake-mary', 'longwood', 'deland'] },
  { slug: 'lake-mary', name: 'Lake Mary', stateAbbr: 'FL', county: 'Seminole', zipCodes: ['32746'], priority: 'medium', character: 'suburban', popBracket: 'medium', nearby: ['sanford', 'longwood', 'altamonte-springs', 'heathrow', 'deland'] },
  { slug: 'longwood', name: 'Longwood', stateAbbr: 'FL', county: 'Seminole', zipCodes: ['32750', '32779'], priority: 'medium', character: 'suburban', popBracket: 'medium', nearby: ['lake-mary', 'altamonte-springs', 'winter-springs', 'casselberry', 'sanford'] },
  { slug: 'altamonte-springs', name: 'Altamonte Springs', stateAbbr: 'FL', county: 'Seminole', zipCodes: ['32701', '32714'], priority: 'medium', character: 'suburban', popBracket: 'medium', nearby: ['longwood', 'casselberry', 'maitland', 'winter-springs', 'lake-mary'] },
  { slug: 'winter-springs', name: 'Winter Springs', stateAbbr: 'FL', county: 'Seminole', zipCodes: ['32708'], priority: 'medium', character: 'suburban', popBracket: 'medium', nearby: ['oviedo', 'casselberry', 'longwood', 'altamonte-springs', 'sanford'] },
  { slug: 'oviedo', name: 'Oviedo', stateAbbr: 'FL', county: 'Seminole', zipCodes: ['32765', '32766'], priority: 'medium', character: 'suburban', popBracket: 'medium', nearby: ['winter-springs', 'chuluota', 'geneva', 'casselberry', 'sanford'] },
  { slug: 'casselberry', name: 'Casselberry', stateAbbr: 'FL', county: 'Seminole', zipCodes: ['32707', '32730'], priority: 'medium', character: 'suburban', popBracket: 'medium', nearby: ['winter-springs', 'altamonte-springs', 'longwood', 'fern-park', 'sanford'] },
  { slug: 'geneva', name: 'Geneva', stateAbbr: 'FL', county: 'Seminole', zipCodes: ['32732'], priority: 'low', character: 'rural', popBracket: 'small', nearby: ['oviedo', 'chuluota', 'sanford', 'osteen', 'deland'] },
  { slug: 'chuluota', name: 'Chuluota', stateAbbr: 'FL', county: 'Seminole', zipCodes: ['32766'], priority: 'low', character: 'rural', popBracket: 'small', nearby: ['oviedo', 'geneva', 'winter-springs', 'sanford', 'deland'] },
  { slug: 'heathrow', name: 'Heathrow', stateAbbr: 'FL', county: 'Seminole', zipCodes: ['32746'], priority: 'low', character: 'suburban', popBracket: 'small', nearby: ['lake-mary', 'sanford', 'longwood', 'altamonte-springs', 'deland'] },
  { slug: 'fern-park', name: 'Fern Park', stateAbbr: 'FL', county: 'Seminole', zipCodes: ['32730'], priority: 'low', character: 'suburban', popBracket: 'small', nearby: ['casselberry', 'altamonte-springs', 'winter-springs', 'maitland', 'sanford'] },
  // ═══════════════════════════════════════
  // ORANGE COUNTY (Northern portion)
  // ═══════════════════════════════════════
  { slug: 'apopka', name: 'Apopka', stateAbbr: 'FL', county: 'Orange', zipCodes: ['32703', '32712'], priority: 'medium', character: 'suburban', popBracket: 'large', nearby: ['altamonte-springs', 'mount-dora', 'sanford', 'maitland', 'deland'] },
  { slug: 'maitland', name: 'Maitland', stateAbbr: 'FL', county: 'Orange', zipCodes: ['32751', '32794'], priority: 'medium', character: 'suburban', popBracket: 'medium', nearby: ['altamonte-springs', 'winter-park', 'casselberry', 'eatonville', 'sanford'] },
  { slug: 'winter-park', name: 'Winter Park', stateAbbr: 'FL', county: 'Orange', zipCodes: ['32789', '32792'], priority: 'medium', character: 'suburban', popBracket: 'medium', nearby: ['maitland', 'orlando', 'casselberry', 'altamonte-springs', 'sanford'] },
  { slug: 'orlando', name: 'Orlando', stateAbbr: 'FL', county: 'Orange', zipCodes: ['32801', '32803', '32806', '32807', '32808', '32809', '32810', '32811', '32812', '32817', '32819', '32822', '32824', '32825', '32826', '32827', '32828', '32829', '32832', '32833', '32835', '32836', '32837', '32839'], priority: 'high', character: 'urban', popBracket: 'large', nearby: ['winter-park', 'maitland', 'apopka', 'sanford', 'deland'] },
  { slug: 'eatonville', name: 'Eatonville', stateAbbr: 'FL', county: 'Orange', zipCodes: ['32751'], priority: 'low', character: 'suburban', popBracket: 'small', nearby: ['maitland', 'winter-park', 'orlando', 'altamonte-springs', 'sanford'] },
  { slug: 'winter-garden', name: 'Winter Garden', stateAbbr: 'FL', county: 'Orange', zipCodes: ['34787'], priority: 'medium', character: 'suburban', popBracket: 'medium', nearby: ['apopka', 'ocoee', 'orlando', 'clermont', 'sanford'] },
  { slug: 'ocoee', name: 'Ocoee', stateAbbr: 'FL', county: 'Orange', zipCodes: ['34761'], priority: 'low', character: 'suburban', popBracket: 'medium', nearby: ['winter-garden', 'apopka', 'orlando', 'clermont', 'sanford'] },
  // ═══════════════════════════════════════
  // LAKE COUNTY (Eastern portion)
  // ═══════════════════════════════════════
  { slug: 'mount-dora', name: 'Mount Dora', stateAbbr: 'FL', county: 'Lake', zipCodes: ['32757'], priority: 'medium', character: 'suburban', popBracket: 'medium', nearby: ['eustis', 'tavares', 'apopka', 'sanford', 'deland'] },
  { slug: 'eustis', name: 'Eustis', stateAbbr: 'FL', county: 'Lake', zipCodes: ['32726', '32736'], priority: 'medium', character: 'suburban', popBracket: 'medium', nearby: ['mount-dora', 'tavares', 'umatilla', 'leesburg', 'deland'] },
  { slug: 'tavares', name: 'Tavares', stateAbbr: 'FL', county: 'Lake', zipCodes: ['32778'], priority: 'medium', character: 'suburban', popBracket: 'medium', nearby: ['mount-dora', 'eustis', 'leesburg', 'apopka', 'deland'] },
  { slug: 'leesburg', name: 'Leesburg', stateAbbr: 'FL', county: 'Lake', zipCodes: ['34748', '34788'], priority: 'medium', character: 'suburban', popBracket: 'medium', nearby: ['tavares', 'eustis', 'the-villages', 'mount-dora', 'deland'] },
  { slug: 'clermont', name: 'Clermont', stateAbbr: 'FL', county: 'Lake', zipCodes: ['34711', '34714'], priority: 'medium', character: 'suburban', popBracket: 'large', nearby: ['winter-garden', 'leesburg', 'tavares', 'apopka', 'deland'] },
  { slug: 'umatilla', name: 'Umatilla', stateAbbr: 'FL', county: 'Lake', zipCodes: ['32784'], priority: 'low', character: 'rural', popBracket: 'small', nearby: ['eustis', 'mount-dora', 'astor', 'altoona', 'deland'] },
  { slug: 'astor', name: 'Astor', stateAbbr: 'FL', county: 'Lake', zipCodes: ['32102'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['deleon-springs', 'barberville', 'umatilla', 'paisley', 'deland'] },
  { slug: 'paisley', name: 'Paisley', stateAbbr: 'FL', county: 'Lake', zipCodes: ['32767'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['astor', 'umatilla', 'altoona', 'deleon-springs', 'deland'] },
  { slug: 'altoona', name: 'Altoona', stateAbbr: 'FL', county: 'Lake', zipCodes: ['32702'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['umatilla', 'paisley', 'eustis', 'astor', 'deland'] },
  { slug: 'sorrento', name: 'Sorrento', stateAbbr: 'FL', county: 'Lake', zipCodes: ['32776'], priority: 'low', character: 'rural', popBracket: 'small', nearby: ['mount-dora', 'apopka', 'sanford', 'eustis', 'deland'] },
  { slug: 'the-villages', name: 'The Villages', stateAbbr: 'FL', county: 'Lake', zipCodes: ['32159', '32162', '32163'], priority: 'medium', character: 'suburban', popBracket: 'large', nearby: ['leesburg', 'tavares', 'ocala', 'eustis', 'deland'] },
  { slug: 'lady-lake', name: 'Lady Lake', stateAbbr: 'FL', county: 'Lake', zipCodes: ['32159'], priority: 'low', character: 'suburban', popBracket: 'medium', nearby: ['the-villages', 'leesburg', 'tavares', 'ocala', 'deland'] },
  { slug: 'fruitland-park', name: 'Fruitland Park', stateAbbr: 'FL', county: 'Lake', zipCodes: ['34731'], priority: 'low', character: 'suburban', popBracket: 'small', nearby: ['leesburg', 'the-villages', 'lady-lake', 'tavares', 'deland'] },
  { slug: 'groveland', name: 'Groveland', stateAbbr: 'FL', county: 'Lake', zipCodes: ['34736'], priority: 'low', character: 'suburban', popBracket: 'medium', nearby: ['clermont', 'leesburg', 'tavares', 'winter-garden', 'deland'] },
  { slug: 'minneola', name: 'Minneola', stateAbbr: 'FL', county: 'Lake', zipCodes: ['34715'], priority: 'low', character: 'suburban', popBracket: 'small', nearby: ['clermont', 'winter-garden', 'apopka', 'mount-dora', 'deland'] },
  { slug: 'howey-in-the-hills', name: 'Howey-in-the-Hills', stateAbbr: 'FL', county: 'Lake', zipCodes: ['34737'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['tavares', 'leesburg', 'eustis', 'clermont', 'deland'] },
  { slug: 'astatula', name: 'Astatula', stateAbbr: 'FL', county: 'Lake', zipCodes: ['34705'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['tavares', 'leesburg', 'mount-dora', 'eustis', 'deland'] },
  { slug: 'montverde', name: 'Montverde', stateAbbr: 'FL', county: 'Lake', zipCodes: ['34756'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['clermont', 'minneola', 'winter-garden', 'apopka', 'deland'] },
  // ═══════════════════════════════════════
  // PUTNAM COUNTY
  // ═══════════════════════════════════════
  { slug: 'palatka', name: 'Palatka', stateAbbr: 'FL', county: 'Putnam', zipCodes: ['32177'], priority: 'medium', character: 'suburban', popBracket: 'small', nearby: ['east-palatka', 'crescent-city', 'san-mateo', 'satsuma', 'deland'] },
  { slug: 'east-palatka', name: 'East Palatka', stateAbbr: 'FL', county: 'Putnam', zipCodes: ['32131'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['palatka', 'san-mateo', 'hastings', 'crescent-city', 'deland'] },
  { slug: 'crescent-city', name: 'Crescent City', stateAbbr: 'FL', county: 'Putnam', zipCodes: ['32112'], priority: 'low', character: 'rural', popBracket: 'small', nearby: ['palatka', 'pierson', 'seville', 'welaka', 'deland'] },
  { slug: 'san-mateo', name: 'San Mateo', stateAbbr: 'FL', county: 'Putnam', zipCodes: ['32187'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['palatka', 'east-palatka', 'hastings', 'bunnell', 'deland'] },
  { slug: 'welaka', name: 'Welaka', stateAbbr: 'FL', county: 'Putnam', zipCodes: ['32193'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['crescent-city', 'palatka', 'satsuma', 'pierson', 'deland'] },
  { slug: 'pomona-park', name: 'Pomona Park', stateAbbr: 'FL', county: 'Putnam', zipCodes: ['32181'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['crescent-city', 'palatka', 'welaka', 'pierson', 'deland'] },
  { slug: 'satsuma', name: 'Satsuma', stateAbbr: 'FL', county: 'Putnam', zipCodes: ['32189'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['palatka', 'welaka', 'crescent-city', 'east-palatka', 'deland'] },
  { slug: 'interlachen', name: 'Interlachen', stateAbbr: 'FL', county: 'Putnam', zipCodes: ['32148'], priority: 'low', character: 'rural', popBracket: 'small', nearby: ['palatka', 'crescent-city', 'eustis', 'umatilla', 'deland'] },
  // ═══════════════════════════════════════
  // ST. JOHNS COUNTY (Southern portion)
  // ═══════════════════════════════════════
  { slug: 'st-augustine', name: 'St. Augustine', stateAbbr: 'FL', county: 'St. Johns', zipCodes: ['32080', '32084', '32086', '32092', '32095'], priority: 'medium', character: 'coastal', popBracket: 'medium', nearby: ['st-augustine-beach', 'hastings', 'palm-coast', 'palatka', 'deland'] },
  { slug: 'st-augustine-beach', name: 'St. Augustine Beach', stateAbbr: 'FL', county: 'St. Johns', zipCodes: ['32080'], priority: 'low', character: 'coastal', popBracket: 'small', nearby: ['st-augustine', 'marineland', 'palm-coast', 'hastings', 'deland'] },
  { slug: 'hastings', name: 'Hastings', stateAbbr: 'FL', county: 'St. Johns', zipCodes: ['32145'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['st-augustine', 'east-palatka', 'palatka', 'palm-coast', 'deland'] },
  { slug: 'elkton', name: 'Elkton', stateAbbr: 'FL', county: 'St. Johns', zipCodes: ['32033'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['st-augustine', 'hastings', 'palm-coast', 'palatka', 'deland'] },
  // ═══════════════════════════════════════
  // MARION COUNTY (Eastern portion)
  // ═══════════════════════════════════════
  { slug: 'ocala', name: 'Ocala', stateAbbr: 'FL', county: 'Marion', zipCodes: ['34470', '34471', '34472', '34473', '34474', '34475', '34476', '34480', '34481', '34482'], priority: 'medium', character: 'suburban', popBracket: 'large', nearby: ['silver-springs', 'belleview', 'the-villages', 'dunnellon', 'deland'] },
  { slug: 'silver-springs', name: 'Silver Springs', stateAbbr: 'FL', county: 'Marion', zipCodes: ['34488'], priority: 'low', character: 'rural', popBracket: 'small', nearby: ['ocala', 'salt-springs', 'fort-mccoy', 'belleview', 'deland'] },
  { slug: 'belleview', name: 'Belleview', stateAbbr: 'FL', county: 'Marion', zipCodes: ['34420'], priority: 'low', character: 'suburban', popBracket: 'small', nearby: ['ocala', 'the-villages', 'leesburg', 'silver-springs', 'deland'] },
  { slug: 'fort-mccoy', name: 'Fort McCoy', stateAbbr: 'FL', county: 'Marion', zipCodes: ['32134'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['silver-springs', 'ocala', 'salt-springs', 'pierson', 'deland'] },
  { slug: 'salt-springs', name: 'Salt Springs', stateAbbr: 'FL', county: 'Marion', zipCodes: ['32134'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['fort-mccoy', 'silver-springs', 'astor', 'ocala', 'deland'] },
  { slug: 'dunnellon', name: 'Dunnellon', stateAbbr: 'FL', county: 'Marion', zipCodes: ['34432', '34434'], priority: 'low', character: 'rural', popBracket: 'small', nearby: ['ocala', 'belleview', 'the-villages', 'silver-springs', 'deland'] },
  // ═══════════════════════════════════════
  // BREVARD COUNTY (Northern portion)
  // ═══════════════════════════════════════
  { slug: 'titusville', name: 'Titusville', stateAbbr: 'FL', county: 'Brevard', zipCodes: ['32780', '32796'], priority: 'medium', character: 'suburban', popBracket: 'medium', nearby: ['mims', 'scottsmoor', 'oak-hill', 'edgewater', 'deland'] },
  { slug: 'mims', name: 'Mims', stateAbbr: 'FL', county: 'Brevard', zipCodes: ['32754'], priority: 'low', character: 'rural', popBracket: 'small', nearby: ['titusville', 'scottsmoor', 'oak-hill', 'edgewater', 'deland'] },
  { slug: 'scottsmoor', name: 'Scottsmoor', stateAbbr: 'FL', county: 'Brevard', zipCodes: ['32775'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['mims', 'titusville', 'oak-hill', 'edgewater', 'deland'] },
  { slug: 'cocoa', name: 'Cocoa', stateAbbr: 'FL', county: 'Brevard', zipCodes: ['32922', '32926', '32927'], priority: 'low', character: 'suburban', popBracket: 'medium', nearby: ['titusville', 'rockledge', 'merritt-island', 'mims', 'deland'] },
  { slug: 'rockledge', name: 'Rockledge', stateAbbr: 'FL', county: 'Brevard', zipCodes: ['32955'], priority: 'low', character: 'suburban', popBracket: 'medium', nearby: ['cocoa', 'titusville', 'merritt-island', 'mims', 'deland'] },
  { slug: 'merritt-island', name: 'Merritt Island', stateAbbr: 'FL', county: 'Brevard', zipCodes: ['32952', '32953'], priority: 'low', character: 'suburban', popBracket: 'medium', nearby: ['cocoa', 'titusville', 'rockledge', 'mims', 'deland'] },
  { slug: 'port-st-john', name: 'Port St. John', stateAbbr: 'FL', county: 'Brevard', zipCodes: ['32927'], priority: 'low', character: 'suburban', popBracket: 'small', nearby: ['cocoa', 'titusville', 'rockledge', 'merritt-island', 'mims'] },
  // ═══════════════════════════════════════
  // ADDITIONAL VOLUSIA COUNTY COMMUNITIES
  // ═══════════════════════════════════════
  { slug: 'glenwood', name: 'Glenwood', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32720'], priority: 'medium', character: 'rural', popBracket: 'tiny', nearby: ['deland', 'deleon-springs', 'lake-helen', 'cassadaga', 'orange-city'] },
  { slug: 'north-deland', name: 'North DeLand', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32720'], priority: 'medium', character: 'suburban', popBracket: 'small', nearby: ['deland', 'deleon-springs', 'orange-city', 'glenwood', 'lake-helen'] },
  { slug: 'west-deland', name: 'West DeLand', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32720'], priority: 'medium', character: 'suburban', popBracket: 'small', nearby: ['deland', 'north-deland', 'deland-southwest', 'orange-city', 'lake-helen'] },
  { slug: 'deland-southwest', name: 'DeLand Southwest', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32720'], priority: 'medium', character: 'suburban', popBracket: 'small', nearby: ['deland', 'west-deland', 'orange-city', 'deltona', 'lake-helen'] },
  { slug: 'ormond-by-the-sea', name: 'Ormond-by-the-Sea', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32176'], priority: 'medium', character: 'coastal', popBracket: 'small', nearby: ['ormond-beach', 'daytona-beach', 'flagler-beach', 'holly-hill', 'palm-coast'] },
  { slug: 'wilbur-by-the-sea', name: 'Wilbur-by-the-Sea', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32127'], priority: 'low', character: 'coastal', popBracket: 'tiny', nearby: ['port-orange', 'ponce-inlet', 'daytona-beach-shores', 'south-daytona', 'daytona-beach'] },
  { slug: 'glencoe', name: 'Glencoe', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32168'], priority: 'low', character: 'coastal', popBracket: 'tiny', nearby: ['new-smyrna-beach', 'edgewater', 'samsula-spruce-creek', 'port-orange', 'oak-hill'] },
  { slug: 'bethune-beach', name: 'Bethune Beach', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32169'], priority: 'low', character: 'coastal', popBracket: 'tiny', nearby: ['new-smyrna-beach', 'edgewater', 'oak-hill', 'glencoe', 'port-orange'] },
  { slug: 'emporia', name: 'Emporia', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32180'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['pierson', 'seville', 'deleon-springs', 'barberville', 'deland'] },
  { slug: 'maytown', name: 'Maytown', stateAbbr: 'FL', county: 'Volusia', zipCodes: ['32168'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['osteen', 'samsula-spruce-creek', 'new-smyrna-beach', 'oak-hill', 'edgewater'] },
  // ═══════════════════════════════════════
  // ADDITIONAL FLAGLER COUNTY COMMUNITIES
  // ═══════════════════════════════════════
  { slug: 'espanola', name: 'Espanola', stateAbbr: 'FL', county: 'Flagler', zipCodes: ['32110'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['bunnell', 'palm-coast', 'flagler-beach', 'flagler-estates', 'deland'] },
  { slug: 'flagler-estates', name: 'Flagler Estates', stateAbbr: 'FL', county: 'Flagler', zipCodes: ['32110'], priority: 'low', character: 'rural', popBracket: 'small', nearby: ['bunnell', 'espanola', 'palm-coast', 'hastings', 'deland'] },
  // ═══════════════════════════════════════
  // ADDITIONAL SEMINOLE COUNTY COMMUNITIES
  // ═══════════════════════════════════════
  { slug: 'midway', name: 'Midway', stateAbbr: 'FL', county: 'Seminole', zipCodes: ['32771'], priority: 'low', character: 'suburban', popBracket: 'small', nearby: ['sanford', 'lake-mary', 'longwood', 'debary', 'deltona'] },
  { slug: 'wekiwa-springs', name: 'Wekiwa Springs', stateAbbr: 'FL', county: 'Seminole', zipCodes: ['32779'], priority: 'low', character: 'suburban', popBracket: 'small', nearby: ['longwood', 'altamonte-springs', 'apopka', 'lake-mary', 'sanford'] },
  { slug: 'forest-city', name: 'Forest City', stateAbbr: 'FL', county: 'Seminole', zipCodes: ['32714'], priority: 'low', character: 'suburban', popBracket: 'small', nearby: ['altamonte-springs', 'apopka', 'longwood', 'casselberry', 'maitland'] },
  { slug: 'goldenrod', name: 'Goldenrod', stateAbbr: 'FL', county: 'Seminole', zipCodes: ['32792'], priority: 'low', character: 'suburban', popBracket: 'medium', nearby: ['winter-park', 'casselberry', 'winter-springs', 'oviedo', 'maitland'] },
  { slug: 'black-hammock', name: 'Black Hammock', stateAbbr: 'FL', county: 'Seminole', zipCodes: ['32732'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['geneva', 'oviedo', 'chuluota', 'sanford', 'osteen'] },
  // ═══════════════════════════════════════
  // ADDITIONAL ORANGE COUNTY COMMUNITIES
  // ═══════════════════════════════════════
  { slug: 'zellwood', name: 'Zellwood', stateAbbr: 'FL', county: 'Orange', zipCodes: ['32798'], priority: 'low', character: 'rural', popBracket: 'small', nearby: ['apopka', 'mount-dora', 'sorrento', 'sanford', 'deland'] },
  { slug: 'tangerine', name: 'Tangerine', stateAbbr: 'FL', county: 'Orange', zipCodes: ['32777'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['apopka', 'sorrento', 'mount-dora', 'zellwood', 'sanford'] },
  { slug: 'christmas', name: 'Christmas', stateAbbr: 'FL', county: 'Orange', zipCodes: ['32709'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['bithlo', 'oviedo', 'chuluota', 'titusville', 'geneva'] },
  { slug: 'bithlo', name: 'Bithlo', stateAbbr: 'FL', county: 'Orange', zipCodes: ['32820'], priority: 'low', character: 'rural', popBracket: 'small', nearby: ['christmas', 'oviedo', 'chuluota', 'orlando', 'winter-springs'] },
  // ═══════════════════════════════════════
  // ADDITIONAL LAKE COUNTY COMMUNITIES
  // ═══════════════════════════════════════
  { slug: 'mount-plymouth', name: 'Mount Plymouth', stateAbbr: 'FL', county: 'Lake', zipCodes: ['32776'], priority: 'low', character: 'rural', popBracket: 'small', nearby: ['sorrento', 'mount-dora', 'apopka', 'eustis', 'sanford'] },
  // ═══════════════════════════════════════
  // ADDITIONAL PUTNAM COUNTY COMMUNITIES
  // ═══════════════════════════════════════
  { slug: 'georgetown', name: 'Georgetown', stateAbbr: 'FL', county: 'Putnam', zipCodes: ['32139'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['crescent-city', 'welaka', 'palatka', 'pomona-park', 'satsuma'] },
  { slug: 'florahome', name: 'Florahome', stateAbbr: 'FL', county: 'Putnam', zipCodes: ['32140'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['interlachen', 'palatka', 'crescent-city', 'grandin', 'deland'] },
  { slug: 'hollister', name: 'Hollister', stateAbbr: 'FL', county: 'Putnam', zipCodes: ['32147'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['palatka', 'interlachen', 'florahome', 'east-palatka', 'crescent-city'] },
  { slug: 'bostwick', name: 'Bostwick', stateAbbr: 'FL', county: 'Putnam', zipCodes: ['32007'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['palatka', 'east-palatka', 'hastings', 'st-augustine', 'san-mateo'] },
  { slug: 'grandin', name: 'Grandin', stateAbbr: 'FL', county: 'Putnam', zipCodes: ['32138'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['interlachen', 'florahome', 'palatka', 'crescent-city', 'deland'] },
  { slug: 'lake-como', name: 'Lake Como', stateAbbr: 'FL', county: 'Putnam', zipCodes: ['32148'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['interlachen', 'palatka', 'florahome', 'hollister', 'crescent-city'] },
  { slug: 'putnam-hall', name: 'Putnam Hall', stateAbbr: 'FL', county: 'Putnam', zipCodes: ['32185'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['palatka', 'interlachen', 'hollister', 'florahome', 'crescent-city'] },
  { slug: 'fruitland', name: 'Fruitland', stateAbbr: 'FL', county: 'Putnam', zipCodes: ['32177'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['palatka', 'east-palatka', 'san-mateo', 'crescent-city', 'deland'] },
  { slug: 'melrose', name: 'Melrose', stateAbbr: 'FL', county: 'Putnam', zipCodes: ['32666'], priority: 'low', character: 'rural', popBracket: 'small', nearby: ['interlachen', 'palatka', 'florahome', 'hollister', 'deland'] },
  // ═══════════════════════════════════════
  // ADDITIONAL MARION COUNTY COMMUNITIES
  // ═══════════════════════════════════════
  { slug: 'ocklawaha', name: 'Ocklawaha', stateAbbr: 'FL', county: 'Marion', zipCodes: ['32179'], priority: 'low', character: 'rural', popBracket: 'tiny', nearby: ['silver-springs', 'fort-mccoy', 'salt-springs', 'ocala', 'belleview'] },
  { slug: 'silver-springs-shores', name: 'Silver Springs Shores', stateAbbr: 'FL', county: 'Marion', zipCodes: ['34472'], priority: 'low', character: 'suburban', popBracket: 'medium', nearby: ['ocala', 'silver-springs', 'belleview', 'the-villages', 'deland'] },
]

// Deduplicate: de-bary is same as debary (already listed)
// Remove the duplicate
export const ALL_LOCATIONS = LOCATIONS.filter(l => l.slug !== 'de-bary')

/** Lookup a location by slug. Returns undefined if not found. */
export function getLocation(slug: string): Location | undefined {
  return ALL_LOCATIONS.find(l => l.slug === slug)
}

/** Get all valid location slugs for generateStaticParams */
export function getAllLocationSlugs(): string[] {
  return ALL_LOCATIONS.map(l => l.slug)
}

/** Check if a slug is a static service page (not a location) */
export function isStaticServiceSlug(slug: string, service: ServiceCategory): boolean {
  return STATIC_SERVICE_SLUGS[service].includes(slug)
}
