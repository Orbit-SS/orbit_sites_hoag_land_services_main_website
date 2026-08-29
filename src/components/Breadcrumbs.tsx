import Link from 'next/link'

export interface Crumb {
  name: string
  url: string
}

/**
 * Visible breadcrumb nav. The matching BreadcrumbList JSON-LD must be injected
 * separately via the page's server component (use `breadcrumbSchema` from
 * `@/lib/schema`).
 *
 * Pass the full chain from Home → … → current page. The last crumb is
 * rendered as plain text with aria-current.
 */
export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    // pt-20 md:pt-24 clears the fixed Navigation (h-16 md:h-20).
    // Without it, the first crumb hides behind the translucent nav bar.
    <nav aria-label="Breadcrumb" className="bg-[#0d0f0d] border-b border-white/5 pt-20 md:pt-24">
      <ol className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white/60">
        {crumbs.map((c, i) => (
          <li key={c.url} className="flex items-center gap-2">
            {i > 0 && <span className="text-white/30" aria-hidden="true">/</span>}
            {i === crumbs.length - 1 ? (
              <span className="text-[#c2a878]" aria-current="page">
                {c.name}
              </span>
            ) : (
              <Link href={c.url} className="hover:text-[#579269] transition-colors">
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
