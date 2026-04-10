export const PHONE = '(386) 561-0003'
export const PHONE_HREF = 'tel:+13865610003'
export const EMAIL = 'tyler@hlsdeland.com'
export const COMPANY = 'Hoag Land Services'
export const COMPANY_LLC = 'Hoag Land Services, LLC'
export const EST_YEAR = 2017
export const OWNER = 'Tyler Hoag'
export const LOCATION = 'DeLeon Springs, FL 32130'
export const SERVICE_AREA = 'DeLand, DeLeon Springs & Central Florida'
export const FACEBOOK = 'https://facebook.com/hoaglandservices'
export const INSTAGRAM = 'https://instagram.com/hls_deland'

// Real certifications
export const CERTS = [
  'ISA Certified Arborist (FL-9491A)',
  'ISA Tree Risk Assessment Qualified (TRAQ)',
  'Licensed & Insured',
  'HomeAdvisor Screened & Approved',
]

// Google review stats
export const REVIEW_STATS = { stars: 5.0, count: 33 }

// All 51 confirmed photos from hlsdeland.com
export const IMAGES = {
  logo: '/photos/HLSlogo-nobackground.png',
  og: '/photos/site7.JPG',
  // Site work (18)
  site1: '/photos/site1.JPEG',
  site2: '/photos/site2.jpeg',
  site3: '/photos/site3.jpeg',
  site4: '/photos/site4.PNG',
  site5: '/photos/site5.PNG',
  site6: '/photos/site6.JPG',
  site7: '/photos/site7.JPG',
  site8: '/photos/site8.JPG',
  site9: '/photos/site9.JPG',
  site10: '/photos/site10.JPG',
  site11: '/photos/site11.JPG',
  site12: '/photos/site12.jpeg',
  site13: '/photos/site13.jpg',
  site14: '/photos/site14.jpeg',
  site15: '/photos/site15.jpeg',
  site16: '/photos/site16.jpeg',
  site17: '/photos/site17.jpeg',
  site18: '/photos/site18.JPEG',
  // Tree work (19)
  tree1: '/photos/tree1.jpeg',
  tree2: '/photos/tree2.jpeg',
  tree3: '/photos/tree3.jpeg',
  tree4: '/photos/tree4.JPEG',
  tree5: '/photos/tree5.JPEG',
  tree6: '/photos/tree6.jpeg',
  tree7: '/photos/tree7.jpeg',
  tree8: '/photos/tree8.jpeg',
  tree9: '/photos/tree9.jpeg',
  tree10: '/photos/tree10.jpeg',
  tree11: '/photos/tree11.jpeg',
  tree12: '/photos/tree12.JPG',
  tree13: '/photos/tree13.png',
  tree14: '/photos/tree14.JPEG',
  tree15: '/photos/tree15.JPEG',
  tree16: '/photos/tree16.jpeg',
  tree17: '/photos/tree17.jpeg',
  tree18: '/photos/tree18.jpeg',
  tree19: '/photos/tree19.jpeg',
  // Fencing (12)
  fence1: '/photos/fence1.jpeg',
  fence2: '/photos/fence2.JPEG',
  fence3: '/photos/fence3.jpeg',
  fence4: '/photos/fence4.jpeg',
  fence5: '/photos/fence5.jpeg',
  fence6: '/photos/fence6.jpeg',
  fence7: '/photos/fence7.jpeg',
  fence8: '/photos/fence8.jpeg',
  fence9: '/photos/fence9.jpeg',
  fence10: '/photos/fence10.JPEG',
  fence11: '/photos/fence11.png',
  fence12: '/photos/fence12.jpg',
}

// Each concept gets its OWN set of images — no sharing across concepts
export const CONCEPT_IMAGES = {
  // Concept 1: Ironclad
  c1: {
    hero: IMAGES.tree8,
    site: IMAGES.site7, tree: IMAGES.tree2, fence: IMAGES.fence6,
    gallery: [IMAGES.site10, IMAGES.tree9, IMAGES.fence7, IMAGES.site12, IMAGES.tree3, IMAGES.fence8],
    about: IMAGES.og,
  },
  // Concept 2: Clearcut
  c2: {
    hero: IMAGES.fence3,
    site: IMAGES.site3, tree: IMAGES.tree3, fence: IMAGES.fence8,
    gallery: [IMAGES.site15, IMAGES.tree10, IMAGES.fence5, IMAGES.site8, IMAGES.tree5, IMAGES.fence7],
    about: IMAGES.site4,
  },
  // Concept 3: Groundwork
  c3: {
    hero: IMAGES.site8,
    site: IMAGES.site1, tree: IMAGES.tree9, fence: IMAGES.fence7,
    gallery: [IMAGES.site7, IMAGES.tree8, IMAGES.fence6, IMAGES.site12, IMAGES.tree2, IMAGES.fence3, IMAGES.site15, IMAGES.tree10],
    about: IMAGES.site3,
  },
  // Concept 4: Local Pro
  c4: {
    hero: IMAGES.site3,
    site: IMAGES.site15, tree: IMAGES.tree10, fence: IMAGES.fence5,
    gallery: [IMAGES.site1, IMAGES.tree5, IMAGES.fence8, IMAGES.site7, IMAGES.tree8, IMAGES.fence6],
    about: IMAGES.og,
  },
  // Concept 5: Direct Line
  c5: {
    hero: IMAGES.site15,
    site: IMAGES.site1, tree: IMAGES.tree5, fence: IMAGES.fence3,
    gallery: [IMAGES.site3, IMAGES.tree2, IMAGES.fence7, IMAGES.site10, IMAGES.tree9, IMAGES.fence5],
    about: IMAGES.site8,
  },
}

// Legacy gallery (kept for existing pages)
export const GALLERY = [
  { src: IMAGES.site1, cat: 'Site' },
  { src: IMAGES.tree5, cat: 'Tree' },
  { src: IMAGES.fence5, cat: 'Fence' },
  { src: IMAGES.site7, cat: 'Site' },
  { src: IMAGES.tree2, cat: 'Tree' },
  { src: IMAGES.fence3, cat: 'Fence' },
  { src: IMAGES.site8, cat: 'Site' },
  { src: IMAGES.tree8, cat: 'Tree' },
  { src: IMAGES.fence6, cat: 'Fence' },
  { src: IMAGES.site10, cat: 'Site' },
  { src: IMAGES.tree9, cat: 'Tree' },
  { src: IMAGES.fence7, cat: 'Fence' },
]

// Full gallery organized by category — all 49 project photos (excludes logo & og)
export const FULL_GALLERY = {
  site: [
    { src: IMAGES.site1, alt: 'Site work project' },
    { src: IMAGES.site2, alt: 'Site work project' },
    { src: IMAGES.site3, alt: 'Site work project' },
    { src: IMAGES.site4, alt: 'Site work project' },
    { src: IMAGES.site5, alt: 'Site work project' },
    { src: IMAGES.site6, alt: 'Site work project' },
    { src: IMAGES.site7, alt: 'Site work project' },
    { src: IMAGES.site8, alt: 'Site work project' },
    { src: IMAGES.site9, alt: 'Site work project' },
    { src: IMAGES.site10, alt: 'Site work project' },
    { src: IMAGES.site11, alt: 'Site work project' },
    { src: IMAGES.site12, alt: 'Site work project' },
    { src: IMAGES.site13, alt: 'Site work project' },
    { src: IMAGES.site14, alt: 'Site work project' },
    { src: IMAGES.site15, alt: 'Site work project' },
    { src: IMAGES.site16, alt: 'Site work project' },
    { src: IMAGES.site17, alt: 'Site work project' },
    { src: IMAGES.site18, alt: 'Site work project' },
  ],
  tree: [
    { src: IMAGES.tree1, alt: 'Tree work project' },
    { src: IMAGES.tree2, alt: 'Tree work project' },
    { src: IMAGES.tree3, alt: 'Tree work project' },
    { src: IMAGES.tree4, alt: 'Tree work project' },
    { src: IMAGES.tree5, alt: 'Tree work project' },
    { src: IMAGES.tree6, alt: 'Tree work project' },
    { src: IMAGES.tree7, alt: 'Tree work project' },
    { src: IMAGES.tree8, alt: 'Tree work project' },
    { src: IMAGES.tree9, alt: 'Tree work project' },
    { src: IMAGES.tree10, alt: 'Tree work project' },
    { src: IMAGES.tree11, alt: 'Tree work project' },
    { src: IMAGES.tree12, alt: 'Tree work project' },
    { src: IMAGES.tree13, alt: 'Tree work project' },
    { src: IMAGES.tree14, alt: 'Tree work project' },
    { src: IMAGES.tree15, alt: 'Tree work project' },
    { src: IMAGES.tree16, alt: 'Tree work project' },
    { src: IMAGES.tree17, alt: 'Tree work project' },
    { src: IMAGES.tree18, alt: 'Tree work project' },
    { src: IMAGES.tree19, alt: 'Tree work project' },
  ],
  fence: [
    { src: IMAGES.fence1, alt: 'Fencing project' },
    { src: IMAGES.fence2, alt: 'Fencing project' },
    { src: IMAGES.fence3, alt: 'Fencing project' },
    { src: IMAGES.fence4, alt: 'Fencing project' },
    { src: IMAGES.fence5, alt: 'Fencing project' },
    { src: IMAGES.fence6, alt: 'Fencing project' },
    { src: IMAGES.fence7, alt: 'Fencing project' },
    { src: IMAGES.fence8, alt: 'Fencing project' },
    { src: IMAGES.fence9, alt: 'Fencing project' },
    { src: IMAGES.fence10, alt: 'Fencing project' },
    { src: IMAGES.fence11, alt: 'Fencing project' },
    { src: IMAGES.fence12, alt: 'Fencing project' },
  ],
}

// Legacy services (kept for existing pages)
export const SERVICES = {
  site: {
    name: 'Site Services',
    tagline: 'Land clearing, grading, driveways and drainage',
    items: [
      { name: 'Land Clearing', desc: 'From single lots to hundreds of acres' },
      { name: 'Earthworks & Excavation', desc: 'Soil removal, grading, building pads, roads, ponds' },
      { name: 'Erosion Control', desc: 'Silt fences, swales, culverts' },
      { name: 'Environmental Services', desc: 'Forestry mulching, invasive tree mitigation, herbicide treatments' },
    ],
  },
  tree: {
    name: 'Tree Services',
    tagline: 'Trimming, removals and storm clean-up',
    items: [
      { name: 'Tree Removal', desc: 'Safe removal by certified arborist' },
      { name: 'Tree Trimming', desc: 'Weak/dead limb removal, reduction cuts' },
      { name: 'Palm Pruning', desc: 'Frond removal, fruit cluster removal' },
      { name: 'Tree Installation', desc: 'Palms, hardwoods, evergreens' },
    ],
  },
  fence: {
    name: 'Fencing Services',
    tagline: 'Perimeter, pasture and privacy fencing',
    items: [
      { name: 'Wood Fencing', desc: 'Board, privacy, barbed wire, horse fence' },
      { name: 'Vinyl Fencing', desc: 'Privacy, picket, ranch style' },
      { name: 'Aluminum Fencing', desc: 'Estates, pools, residential, commercial' },
    ],
  },
}

// Full service descriptions from the production site
export const FULL_SERVICES = {
  site: {
    name: 'Site Services',
    tagline: 'Land clearing, grading, driveways and drainage',
    description: 'Simple, straight-forward services for site work.',
    items: [
      { name: 'Land Clearing', desc: 'From an acre to hundreds of acres.' },
      { name: 'Earthworks & Excavation', desc: 'Soil removal and replacement, grading, building pads, roads, ponds, right of ways.' },
      { name: 'Erosion Control', desc: 'Installation and maintenance of silt fences, swales and culverts.' },
      { name: 'Environmental Services', desc: 'Forestry mulching/mowing, invasive tree mitigation, herbicide treatments, right of way wetland access and roads.' },
    ],
  },
  tree: {
    name: 'Tree Services',
    tagline: 'Trimming, removals and storm clean-up',
    description: 'ISA Certified Arborist, ISA Tree Risk Assessment Qualified',
    items: [
      { name: 'Tree Removal', desc: 'Our removals are performed by certified arborist to ensure the safety of the jobsite and no damage to your property.' },
      { name: 'Tree Trimming', desc: 'Removal of weak, dead or dying limbs. Lifting of branches for clearance of pedestrians, buildings and vehicles. Reduction cuts for shortening of the length of the stems and branches.' },
      { name: 'Palm Pruning', desc: 'Remove dead and dying lower fronds, removal of fruit clusters, remove sprouts at base.' },
      { name: 'Tree Installation', desc: 'Palms, hardwoods, evergreens. Installation of the right tree in the right place.' },
    ],
  },
  fence: {
    name: 'Fencing Services',
    tagline: 'Perimeter, pasture and privacy fencing',
    description: 'Professional fencing for residential and commercial properties.',
    items: [
      { name: 'Wood Fencing', desc: 'Wood board, privacy, barbed wire, field fence, horse fence.' },
      { name: 'Vinyl Fencing', desc: 'Privacy, picket, and ranch style.' },
      { name: 'Aluminum Fencing', desc: 'Great for estates, pools, and residential/commercial communities.' },
    ],
  },
}

// Hiring / careers content
export const HIRING = {
  intro: 'We are always interested in connecting with dependable people who take pride in their work and respect customers\' properties. If you have experience with equipment operation, tree work, fencing, or construction-related trades, we would like to hear from you.',
  expectations: [
    'Outdoor work on a variety of properties',
    'Hands-on, equipment-focused projects',
    'Opportunities to grow skills over time',
  ],
  process: 'We review submissions as needed based on current and upcoming projects. If there is a potential fit, we will reach out to talk more about your experience and next steps.',
  positions: ['Equipment operator', 'Tree crew', 'Fence installer', 'General labor', 'Other/mixed experience'],
}

// Contact page content
export const CONTACT_CONTENT = {
  intro: 'Tell us a little about your property and what you\'re hoping to accomplish. We will follow up to ask any additional questions and schedule a time to walk the property if needed.',
  serviceOptions: ['Site Services', 'Tree Services', 'Fencing Services'],
  serviceArea: [
    'DeLand & DeLeon Springs',
    'Surrounding rural Central Florida areas',
    'Residential neighborhoods and acreage properties',
  ],
  directContact: 'If you reach us after hours, leave a brief message with your name, property location, and what you\'re looking to do.',
}

// Real Google reviews
export const REVIEWS = [
  {
    name: 'Juliene Kaidor',
    source: 'Google',
    rating: 5,
    text: 'Tyler is a certified arborist and his knowledge shows in every aspect of their work. From tree trimming and large tree removal to complete land clearing, his team is thorough and professional.',
  },
  {
    name: 'Sarah Meeks',
    source: 'Google',
    rating: 5,
    text: 'HLS cleared our 2.5-acre fence line and installed beautiful fencing. They were punctual, professional, and there were no unexpected costs. The finished product exceeded our expectations.',
  },
  {
    name: 'Andrea Cittadino',
    source: 'Google',
    rating: 5,
    text: "We've used Hoag Land Services multiple times over the years for land clearing and tree removal. Always reliable, always honest, and the quality of work speaks for itself.",
  },
]

// About / story
export const ABOUT = {
  headline: 'Built on Hard Work',
  paragraphs: [
    `Hoag Land Services was formally established in 2019 by CEO Tyler Hoag, though operations began as early as 2017. With over a decade of experience in utility forestry and construction, Tyler built the company from a single tractor serving residential clients in DeLand into a full-service site work, tree care, and fencing operation.`,
    `Today, HLS is known for its knowledgeable, driven, and durable team. As an ISA Certified Arborist, Tyler ensures every project — from a single tree trim to a multi-acre land clearing — is handled with expertise, safety, and care.`,
  ],
}
