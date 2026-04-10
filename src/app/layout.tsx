import type { Metadata } from 'next'
import { Inter, Oswald } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import BackButton from '@/components/BackButton'
import PageTransition from '@/components/PageTransition'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' })

export const metadata: Metadata = {
  title: {
    template: '%s | Hoag Land Services',
    default: 'Hoag Land Services | Land Clearing, Tree Service & Fencing in DeLand, FL',
  },
  description:
    'Professional land clearing, tree services, and fencing for residential & commercial properties in DeLand, DeLeon Springs & Central Florida. ISA Certified Arborist. Licensed & Insured. Est. 2017.',
  // Maximally permissive bot directives for AI search visibility
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Hoag Land Services',
    title: 'Hoag Land Services | Land Clearing, Tree Service & Fencing in DeLand, FL',
    description:
      'Professional land clearing, tree services, and fencing for residential & commercial properties in Central Florida. ISA Certified Arborist. Licensed & Insured.',
    url: 'https://hlsdeland.com',
    images: [
      {
        url: '/photos/site7.JPG',
        width: 1200,
        height: 630,
        alt: 'Hoag Land Services — Land Clearing, Tree Services & Fencing in Central Florida',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hoag Land Services | Land Clearing, Tree Service & Fencing',
    description:
      'Professional land clearing, tree services, and fencing in Central Florida. ISA Certified Arborist. Est. 2017.',
    images: ['/photos/site7.JPG'],
  },
  alternates: {
    canonical: 'https://hlsdeland.com',
  },
}

/** Site-wide Organization schema — helps AI systems understand the business entity */
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://hlsdeland.com/#organization',
  name: 'Hoag Land Services',
  legalName: 'Hoag Land Services, LLC',
  url: 'https://hlsdeland.com',
  logo: '/photos/HLSlogo-nobackground.png',
  image: '/photos/site7.JPG',
  description:
    'Professional land clearing, tree services, and fencing for residential and commercial properties in Central Florida. ISA Certified Arborist. Licensed and Insured. Est. 2017.',
  telephone: '+1-386-561-0003',
  email: 'tyler@hlsdeland.com',
  foundingDate: '2017',
  founder: { '@type': 'Person', name: 'Tyler Hoag', jobTitle: 'CEO / ISA Certified Arborist' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'DeLeon Springs',
    addressRegion: 'FL',
    postalCode: '32130',
    addressCountry: 'US',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 29.1244, longitude: -81.3584 },
  areaServed: [
    { '@type': 'State', name: 'Florida' },
    { '@type': 'AdministrativeArea', name: 'Volusia County, FL' },
    { '@type': 'AdministrativeArea', name: 'Flagler County, FL' },
    { '@type': 'AdministrativeArea', name: 'Seminole County, FL' },
    { '@type': 'AdministrativeArea', name: 'Orange County, FL' },
    { '@type': 'AdministrativeArea', name: 'Lake County, FL' },
    { '@type': 'AdministrativeArea', name: 'Putnam County, FL' },
    { '@type': 'AdministrativeArea', name: 'St. Johns County, FL' },
    { '@type': 'AdministrativeArea', name: 'Marion County, FL' },
    { '@type': 'AdministrativeArea', name: 'Brevard County, FL' },
  ],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', reviewCount: '33', bestRating: '5' },
  sameAs: ['https://facebook.com/hoaglandservices', 'https://instagram.com/hls_deland'],
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', credentialCategory: 'ISA Certified Arborist', name: 'FL-9491A' },
    { '@type': 'EducationalOccupationalCredential', credentialCategory: 'ISA TRAQ', name: 'Tree Risk Assessment Qualified' },
  ],
  knowsAbout: [
    'Tree Removal', 'Tree Trimming', 'Palm Pruning', 'Stump Grinding',
    'Land Clearing', 'Excavation', 'Grading', 'Erosion Control', 'Forestry Mulching',
    'Wood Fencing', 'Vinyl Fencing', 'Aluminum Fencing', 'Farm Fencing',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} antialiased`}>
      <head>
        {/* Organization JSON-LD — visible to all crawlers on every page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {/* llms.txt discovery — emerging standard for AI crawler site comprehension */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM site description" />
      </head>
      <body className="min-h-screen bg-[#1a1c1a] text-white">
        <Navigation />
        <BackButton />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  )
}
