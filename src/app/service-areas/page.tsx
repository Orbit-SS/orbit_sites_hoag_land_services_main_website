import Link from 'next/link'
import type { Metadata } from 'next'
import { ALL_LOCATIONS, SERVICE_CATEGORIES, type ServiceCategory } from '@/data/locations'
import {
  PHONE,
  PHONE_HREF,
  COMPANY,
  REVIEW_STATS,
  EST_YEAR,
} from '@/shared/constants'
import ServiceAreasMap from '@/components/ServiceAreasMap'

export const metadata: Metadata = {
  title: 'Service Areas | Hoag Land Services',
  description:
    'Hoag Land Services provides tree services, land clearing, and fencing across 9 Florida counties and 123 communities. Explore the interactive map to find your area.',
  alternates: { canonical: 'https://hlsdeland.com/service-areas' },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
}

// Group locations by county for the SEO fallback section
function getLocationsByCounty() {
  const grouped: Record<string, typeof ALL_LOCATIONS> = {}
  for (const loc of ALL_LOCATIONS) {
    if (!grouped[loc.county]) grouped[loc.county] = []
    grouped[loc.county].push(loc)
  }
  const countyOrder = Object.keys(grouped).sort((a, b) => {
    const diff = grouped[b].length - grouped[a].length
    return diff !== 0 ? diff : a.localeCompare(b)
  })
  return { grouped, countyOrder }
}

const serviceKeys: ServiceCategory[] = ['tree', 'site', 'fence']

export default function ServiceAreasPage() {
  const { grouped, countyOrder } = getLocationsByCounty()
  const totalLocations = ALL_LOCATIONS.length

  return (
    <div className="min-h-screen bg-[#1a1c1a] text-white font-sans">
      {/* Breadcrumb */}
      <nav className="bg-[#0d0f0d] py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#c2a878] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#c2a878]">Service Areas</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#141614] py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#c2a878] font-display uppercase tracking-[0.2em] text-sm mb-4">
            {COMPANY} Coverage
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight mb-5">
            {totalLocations} Communities Across Central Florida
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto mb-6">
            From DeLeon Springs to Orlando, {COMPANY} provides professional tree services,
            land clearing, and fencing across {countyOrder.length} Florida counties. Click a pin
            to explore your area.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span>ISA Certified Arborist FL-9491A</span>
            <span>&middot;</span>
            <span>{REVIEW_STATS.stars} Stars ({REVIEW_STATS.count} Reviews)</span>
            <span>&middot;</span>
            <span>Est. {EST_YEAR}</span>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="bg-[#1a1c1a] py-10 sm:py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <ServiceAreasMap locations={ALL_LOCATIONS} />
        </div>
      </section>

      {/* SEO Fallback — full text links for crawlers (always in DOM) */}
      <section className="bg-[#141614] py-16 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-center mb-3">
            All Service Areas
          </h2>
          <p className="text-gray-500 text-center text-sm mb-10">
            Browse all {totalLocations} communities we serve, grouped by county.
          </p>

          {countyOrder.map(county => {
            const locations = grouped[county].sort((a, b) => {
              const p = { high: 0, medium: 1, low: 2 }
              return (p[a.priority] - p[b.priority]) || a.name.localeCompare(b.name)
            })

            return (
              <div key={county} className="mb-8">
                <h3 className="font-display text-lg font-bold uppercase text-[#c2a878] mb-3 border-b border-white/10 pb-2">
                  {county} County
                  <span className="text-sm font-normal text-gray-600 ml-2">
                    ({locations.length})
                  </span>
                </h3>
                <div className="flex flex-wrap gap-x-1 gap-y-1">
                  {locations.map((loc, i) => (
                    <span key={loc.slug}>
                      <Link
                        href={`/services/tree-services/${loc.slug}`}
                        className="text-sm text-gray-400 hover:text-[#4a7c59] transition-colors"
                      >
                        {loc.name}
                      </Link>
                      {i < locations.length - 1 && (
                        <span className="text-gray-600 mx-1">&middot;</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0d0f0d] py-16 px-4 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase mb-4">
            Don&rsquo;t See Your Area?
          </h2>
          <p className="text-gray-400 mb-6">
            We may still be able to help. Give us a call and we&rsquo;ll let you know if your
            property is within our service range.
          </p>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-3 bg-[#4a7c59] hover:bg-[#3d6b4a] text-white font-display font-bold uppercase tracking-wide px-8 py-4 rounded transition-colors duration-200 text-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call {PHONE}
          </a>
        </div>
      </section>
    </div>
  )
}
