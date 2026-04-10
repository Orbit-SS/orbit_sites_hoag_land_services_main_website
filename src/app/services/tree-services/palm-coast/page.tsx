import LocationPage from '@/components/LocationPage'
import type { LocationPageData } from '@/types/location'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tree Service Palm Coast FL | Hoag Land Services',
  description:
    'ISA Certified Arborist serving Palm Coast, FL. Tree removal, trimming & palm pruning. 5.0-star reviews. TRAQ qualified. Call for your free estimate now.',
  alternates: { canonical: 'https://hlsdeland.com/services/tree-services/palm-coast' },
  openGraph: {
    type: 'website',
    title: 'Tree Service Palm Coast FL | Hoag Land Services',
    description:
      'ISA Certified Arborist serving Palm Coast, FL. Tree removal, trimming & palm pruning. 5.0-star reviews. TRAQ qualified. Call for your free estimate now.',
    url: 'https://hlsdeland.com/services/tree-services/palm-coast',
    siteName: 'Hoag Land Services',
    locale: 'en_US',
    images: [{ url: '/photos/tree5.JPEG' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tree Service Palm Coast FL | Hoag Land Services',
    description:
      'ISA Certified Arborist serving Palm Coast, FL. Tree removal, trimming & palm pruning. 5.0-star reviews. TRAQ qualified. Call for your free estimate now.',
    images: ['/photos/tree5.JPEG'],
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1 as unknown as undefined,
    'max-image-preview': 'large' as unknown as undefined,
    'max-video-preview': -1 as unknown as undefined,
  },
  other: {
    'geo.region': 'US-FL',
    'geo.placename': 'Palm Coast',
    'geo.position': '29.5846;-81.2079',
    ICBM: '29.5846, -81.2079',
  },
}

const faqItems = [
  {
    q: 'Do I need a permit to remove a tree in Palm Coast?',
    a: 'Yes. Palm Coast requires a permit to remove any tree with a trunk diameter of six inches or greater measured at four and a half feet above grade. Trees previously surveyed for credit have a four-inch threshold. Dead trees may be exempt, but we recommend confirming current requirements with the City of Palm Coast Building Services at 386-986-3780. We are happy to guide you through this.',
  },
  {
    q: 'What tree service does Hoag Land Services provide in Palm Coast, FL?',
    a: 'We provide tree removal, tree trimming, palm pruning, tree installation, and storm damage cleanup throughout Palm Coast. Every project is led by ISA Certified Arborist Tyler Hoag (FL-9491A) who is also TRAQ qualified for tree risk assessment.',
  },
  {
    q: 'How much does tree removal cost in Palm Coast?',
    a: 'Tree removal costs depend on the size, species, location, and access conditions on your property. A small palm is very different from a mature live oak near a canal-front home. We provide free on-site estimates so you receive an accurate, honest price with no hidden fees.',
  },
  {
    q: 'What is a TRAQ qualified arborist?',
    a: 'TRAQ stands for Tree Risk Assessment Qualification, an advanced credential from the International Society of Arboriculture. A TRAQ qualified arborist can formally evaluate whether a tree poses a structural risk to people or property. This is especially valuable in Palm Coast where hurricane winds regularly stress large trees.',
  },
  {
    q: 'Can you handle storm damage tree cleanup in Palm Coast?',
    a: 'Yes. After every major storm we mobilize to help Palm Coast residents with emergency tree removal, hanging limb hazards, and debris cleanup. Flagler County experienced significant tree damage from Hurricanes Milton and Helene in 2024, and we have the equipment and crew to respond quickly.',
  },
  {
    q: 'What palm species do you prune in Palm Coast?',
    a: 'We prune all palm species common in Palm Coast including sabal palms, Washingtonia palms, queen palms, date palms, and Canary Island palms. Our pruning follows ISA best practices: we remove dead fronds and fruit clusters without over-pruning, which weakens the palm.',
  },
  {
    q: 'Does Hoag Land Services serve all of Palm Coast including the canal sections?',
    a: 'We serve every section of Palm Coast from the F and C Section canal homes near the Intracoastal to Pine Lakes, Belle Terre, Seminole Woods, and Cypress Knoll. We are familiar with access challenges on canal-front lots and have the rigging experience to work safely near waterways and structures.',
  },
]

const data: LocationPageData = {
  location: 'Palm Coast',
  state: 'Florida',
  stateAbbr: 'FL',
  zipCodes: ['32137', '32164'],
  canonicalUrl: 'https://hlsdeland.com/services/tree-services/palm-coast',
  primaryKeyword: 'tree service palm coast fl',
  secondaryKeywords: [
    'tree removal palm coast',
    'palm tree trimming palm coast',
    'arborist palm coast',
  ],

  title: 'Tree Service Palm Coast FL | Hoag Land Services',
  metaDescription:
    'ISA Certified Arborist serving Palm Coast, FL. Tree removal, trimming & palm pruning. 5.0-star reviews. TRAQ qualified. Call for your free estimate now.',
  ogImage: '/photos/tree5.JPEG',

  heroImage: '/photos/tree5.JPEG',
  h1: 'Tree Service in Palm Coast, FL \u2014 ISA Certified Arborist',
  subheadline:
    'Palm Coast properties carry thousands of mature live oaks, slash pines, and palms shaped by decades of coastal storms. When those trees need expert care or safe removal, Flagler County homeowners trust the ISA Certified Arborist team at Hoag Land Services.',
  ctaText: 'Call for a Free Estimate',
  ctaHref: 'tel:+13865610003',

  serviceCategory: 'tree',
  serviceCategoryName: 'Tree Services',

  services: [
    {
      name: 'Tree Removal',
      desc: 'Safe, certified tree removal for Palm Coast properties. Whether it is a hazardous oak leaning over your home in the P Section or a storm-damaged pine in Seminole Woods, we remove it without damage to your property.',
      href: '/services/tree-services/tree-removal',
    },
    {
      name: 'Tree Trimming',
      desc: 'Removal of weak, dead, or dying limbs. Canopy lifting for clearance over roofs, driveways, and walkways. Reduction cuts for overgrown trees encroaching on structures or power lines throughout Palm Coast.',
      href: '/services/tree-services/tree-trimming',
    },
    {
      name: 'Palm Pruning',
      desc: 'Dead frond removal, fruit cluster cleanup, and sprout management for the sabal, queen, and Washingtonia palms lining Palm Coast boulevards and residential lots. Proper pruning keeps palms healthy and hurricane-resistant.',
      href: '/services/tree-services/palm-pruning',
    },
    {
      name: 'Tree Installation',
      desc: 'Palms, hardwoods, and evergreens installed in the right place for Palm Coast soil conditions. We select species suited to Flagler County\'s sandy soils and saltwater proximity so your new trees thrive long term.',
      href: '/services/tree-services/tree-installation',
    },
    {
      name: 'Storm Damage Cleanup',
      desc: 'Rapid response after tropical storms and hurricanes. We remove downed trees, hanging limbs, and debris from Palm Coast residential and commercial properties. Equipped for emergency access in the hardest-hit sections.',
      href: '/services/tree-services/storm-damage',
    },
    {
      name: 'Dangerous Tree Assessment',
      desc: 'TRAQ-qualified risk assessments for trees showing signs of structural failure, root damage, or storm stress. We evaluate the hazard and recommend the safest course of action for your Palm Coast property.',
      href: '/services/tree-services/dangerous-trees',
    },
  ],

  processSteps: [
    {
      title: 'Call or Submit a Request',
      desc: 'Reach out by phone or through our contact form and describe your Palm Coast property and the trees you need help with. Tell us about any urgency, access issues, or concerns and we will take it from there.',
    },
    {
      title: 'On-Site Property Walk',
      desc: 'Our ISA Certified Arborist visits your property, inspects the trees, assesses risk and access, and provides an honest estimate. You get expert advice and a clear price with no obligation.',
    },
    {
      title: 'Schedule and Complete',
      desc: 'We schedule the work at a time that fits your calendar and complete it efficiently. Our crew handles everything from rigging and removal to debris cleanup, leaving your property clean.',
    },
  ],

  differentiators: [
    {
      title: 'ISA Certified Arborist',
      desc: 'Owner Tyler Hoag holds ISA Certification FL-9491A, the gold standard in professional tree care. Every Palm Coast project is overseen by a credentialed arborist who understands tree biology, species identification, and safe work practices.',
    },
    {
      title: 'TRAQ Risk Assessment',
      desc: 'Tyler is Tree Risk Assessment Qualified through the ISA, meaning he can formally evaluate whether a tree is structurally compromised. This is critical in Palm Coast where hurricane exposure puts stress on mature oaks and pines annually.',
    },
    {
      title: 'Licensed & Insured',
      desc: 'Hoag Land Services carries full liability insurance and holds HomeAdvisor Screened & Approved status. You are protected from start to finish, and our 5.0-star Google rating across 33 reviews reflects the care we bring to every job.',
    },
    {
      title: 'Flagler County Storm Experience',
      desc: 'Palm Coast has weathered Hurricanes Milton, Helene, Nicole, and Matthew in recent years. We have mobilized after each event to help Flagler County residents recover. Our crew knows the urgency, the tree species, and the access challenges unique to this area.',
    },
  ],

  localContext: `<p>Palm Coast sits along the Atlantic coast of Flagler County, roughly 30 miles north of Daytona Beach and 80 miles south of Jacksonville. Developed beginning in 1969 by ITT Community Development Corporation as one of the largest master-planned communities in the United States, the city spans approximately 42,000 acres of former timberland and coastal scrub. The original development preserved significant tree canopy, and today Palm Coast properties are defined by mature live oaks, slash pines, laurel oaks, and sabal palms that have grown for decades in the area\'s well-drained Pomona and Immokalee fine sands.</p>

<p>The city\'s lettered sections each have distinct tree service needs. In the F and C Sections of Palm Harbor, large oaks overhang canal-front homes and seawalls, requiring careful rigging to avoid dropping limbs into the saltwater channels that connect to the Intracoastal Waterway. The interior W Section around Pine Lakes Parkway and the P Section along Belle Terre Parkway feature densely wooded lots where canopy reduction and dead-limb removal protect roofs and driveways. Cypress Knoll in the E Section and Seminole Woods to the south have properties backing up to natural preserve areas where protected trees require permit compliance before any work begins.</p>

<p>Palm Coast\'s location in the Atlantic hurricane corridor means tree damage is a recurring concern. Hurricane Milton in October 2024 brought 58 mph winds to northeast Palm Coast and 92 mph gusts at Marineland just to the south. Damaged, weakened, and leaning trees become safety hazards that require prompt professional removal. Hoag Land Services provides tree removal in Palm Coast, tree trimming, palm pruning, and storm damage cleanup across zip codes 32137 and 32164. Call (386) 561-0003 for a free on-site assessment from an ISA Certified Arborist who knows Flagler County.</p>`,

  faqs: faqItems,

  nearbyLocations: [
    { name: 'DeLand', href: '/services/tree-services/deland' },
    { name: 'Daytona Beach', href: '/services/tree-services/daytona-beach' },
    { name: 'Bunnell', href: '/services/tree-services/bunnell' },
    { name: 'Ormond Beach', href: '/services/tree-services/ormond-beach' },
  ],

  schema: {
    localBusiness: {
      '@context': 'https://schema.org',
      '@type': 'TreeService',
      name: 'Hoag Land Services',
      url: 'https://hlsdeland.com',
      logo: '/photos/HLSlogo-nobackground.png',
      image: '/photos/tree5.JPEG',
      description:
        'Hoag Land Services is an ISA Certified Arborist tree service in Palm Coast, FL providing tree removal, tree trimming, palm pruning, and storm damage cleanup throughout Flagler County.',
      telephone: '+1-386-561-0003',
      email: 'tyler@hlsdeland.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'DeLeon Springs',
        addressRegion: 'FL',
        postalCode: '32130',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 29.5846,
        longitude: -81.2079,
      },
      areaServed: {
        '@type': 'City',
        name: 'Palm Coast',
        sameAs: 'https://en.wikipedia.org/wiki/Palm_Coast,_Florida',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '33',
        bestRating: '5',
      },
      review: [
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Juliene Kaidor' },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5',
          },
          reviewBody:
            'Tyler is a certified arborist and his knowledge shows in every aspect of their work. From tree trimming and large tree removal to complete land clearing, his team is thorough and professional.',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Andrea Cittadino' },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5',
          },
          reviewBody:
            "We've used Hoag Land Services multiple times over the years for land clearing and tree removal. Always reliable, always honest, and the quality of work speaks for itself.",
        },
      ],
      sameAs: [
        'https://facebook.com/hoaglandservices',
        'https://instagram.com/hls_deland',
      ],
      priceRange: '$$',
      foundingDate: '2017',
      slogan: 'Built on Hard Work',
    },
    breadcrumbs: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://hlsdeland.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Tree Services',
          item: 'https://hlsdeland.com/services/tree-services',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Palm Coast',
          item: 'https://hlsdeland.com/services/tree-services/palm-coast',
        },
      ],
    },
    faqPage: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
    webPage: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Tree Service Palm Coast FL | Hoag Land Services',
      description:
        'ISA Certified Arborist serving Palm Coast, FL. Tree removal, trimming & palm pruning. 5.0-star reviews. TRAQ qualified. Call for your free estimate now.',
      url: 'https://hlsdeland.com/services/tree-services/palm-coast',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Hoag Land Services',
        url: 'https://hlsdeland.com',
      },
      about: {
        '@type': 'LocalBusiness',
        name: 'Hoag Land Services',
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: '/photos/tree5.JPEG',
      },
      dateModified: '2026-04-10T00:00:00-04:00',
      inLanguage: 'en-US',
    },
  },
}

export default function PalmCoastTreeServicesPage() {
  return <LocationPage data={data} />
}
