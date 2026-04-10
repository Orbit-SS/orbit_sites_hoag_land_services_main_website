import Link from 'next/link'
import { ALL_LOCATIONS, SERVICE_CATEGORIES, type ServiceCategory } from '@/data/locations'

/**
 * Service area links section for service category landing pages.
 * Groups locations by county and links to that service × location page.
 * This creates the crawl path from service pages → location pages.
 */
export default function ServiceAreaLinks({ service }: { service: ServiceCategory }) {
  const cat = SERVICE_CATEGORIES[service]

  // Group by county, sorted by location count desc
  const grouped: Record<string, typeof ALL_LOCATIONS> = {}
  for (const loc of ALL_LOCATIONS) {
    if (!grouped[loc.county]) grouped[loc.county] = []
    grouped[loc.county].push(loc)
  }

  const counties = Object.keys(grouped).sort((a, b) => {
    const diff = grouped[b].length - grouped[a].length
    return diff !== 0 ? diff : a.localeCompare(b)
  })

  return (
    <section className="bg-[#141614] py-16 sm:py-20 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <p className="text-[#c2a878] font-display uppercase tracking-[0.2em] text-sm mb-3 text-center">
          Service Areas
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-center mb-4">
          {cat.name} Across Central Florida
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
          We provide {cat.name.toLowerCase()} to communities across {counties.length} Florida
          counties. Select your area for location-specific information and a free estimate.
        </p>

        <div className="space-y-8">
          {counties.map(county => {
            const locs = grouped[county].sort((a, b) => {
              const p = { high: 0, medium: 1, low: 2 }
              return (p[a.priority] - p[b.priority]) || a.name.localeCompare(b.name)
            })

            return (
              <div key={county}>
                <h3 className="font-display text-lg font-bold uppercase text-[#c2a878] mb-3 border-b border-white/10 pb-2">
                  {county} County
                </h3>
                <div className="flex flex-wrap gap-x-1 gap-y-1">
                  {locs.map((loc, i) => (
                    <span key={loc.slug}>
                      <Link
                        href={`/services/${cat.slug}/${loc.slug}`}
                        className="text-sm text-gray-400 hover:text-[#4a7c59] transition-colors"
                      >
                        {loc.name}
                      </Link>
                      {i < locs.length - 1 && (
                        <span className="text-gray-600 mx-1">&middot;</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/service-areas"
            className="text-[#4a7c59] hover:text-[#5a9c6d] font-display font-bold uppercase tracking-wider text-sm transition-colors"
          >
            View All Service Areas &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
