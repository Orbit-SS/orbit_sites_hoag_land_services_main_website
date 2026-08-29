import Link from 'next/link'
import { ALL_LOCATIONS, SERVICE_CATEGORIES, type ServiceCategory } from '@/data/locations'

/**
 * City links for a SPECIALTY page (land clearing, stump grinding, wood fencing…).
 *
 * Why this exists: an audit found nothing routing authority from the specialty
 * layer down to the location tail. Checking that claim, the city links already
 * appearing on specialty pages turned out to be entirely FOOTER links — present
 * on all 428 pages, so they carry no page-specific relevance signal. Above the
 * footer, specialty pages had zero city links.
 *
 * ServiceAreaLinks (the hub version) groups every city by county, which suits a
 * hub. A specialty page wants fewer links with anchor text naming the specialty,
 * so the anchor tells a crawler what the target page is about.
 *
 * Targets are the category × city pages, because city pages exist per category,
 * not per specialty. "Stump Grinding in Deltona" points at the tree-services
 * Deltona page — the closest real page to that intent.
 */
export default function SpecialtyAreaLinks({
  service,
  specialty,
  limit = 14,
}: {
  service: ServiceCategory
  /** Human name of the specialty, used as anchor text: "Stump Grinding" */
  specialty: string
  limit?: number
}) {
  const cat = SERVICE_CATEGORIES[service]

  // Highest-priority cities first, then alphabetical, so every specialty page
  // links the markets that matter rather than an arbitrary slice.
  const rank = { high: 0, medium: 1, low: 2 } as const
  const cities = [...ALL_LOCATIONS]
    .sort((a, b) => {
      const d = rank[a.priority] - rank[b.priority]
      return d !== 0 ? d : a.name.localeCompare(b.name)
    })
    .slice(0, limit)

  return (
    <section className="bg-[#141614] py-16 sm:py-20 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <p className="text-[#c2a878] font-display uppercase tracking-[0.2em] text-sm mb-3 text-center">
          Where We Work
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-center mb-4 text-white">
          {specialty} Across Central Florida
        </h2>
        <p className="text-white/50 text-center max-w-2xl mx-auto mb-10">
          We run {specialty.toLowerCase()} jobs throughout the region. Pick your
          area for local details, or call and we&apos;ll tell you straight away
          whether we cover you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {cities.map(loc => (
            <Link
              key={loc.slug}
              href={`/services/${cat.slug}/${loc.slug}`}
              className="group flex items-center justify-between bg-[#1a1c1a] border border-white/5 hover:border-[#4a7c59]/50 px-5 py-3.5 rounded-lg transition-colors"
            >
              <span className="text-white/80 group-hover:text-white transition-colors text-sm">
                {specialty} in {loc.name}
              </span>
              <svg className="w-4 h-4 text-[#5d9c70] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/service-areas"
            className="inline-flex items-center gap-2 text-[#c2a878] hover:text-white font-semibold uppercase tracking-wider text-sm transition-colors"
          >
            View all service areas
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
