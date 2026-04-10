'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

/**
 * Sticky back arrow button that appears on all subpages.
 * Automatically determines the parent route to navigate back to.
 */
export default function BackButton() {
  const pathname = usePathname()

  // Don't show on homepage or top-level pages
  if (!pathname || pathname === '/') return null

  // Determine parent path and label
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length <= 1) return null

  const parentSegments = segments.slice(0, -1)
  const parentPath = '/' + parentSegments.join('/')

  // Friendly labels for parent routes
  const labelMap: Record<string, string> = {
    '/services': 'All Services',
    '/services/site-work': 'Site Work',
    '/services/tree-services': 'Tree Services',
    '/services/fencing': 'Fencing',
  }

  const label = labelMap[parentPath] || 'Back'

  return (
    <div className="fixed top-4 left-4 z-50">
      <Link
        href={parentPath}
        className="group flex items-center gap-2 bg-[#1a1c1a]/90 backdrop-blur-md border border-white/10 hover:border-[#4a7c59]/50 text-white px-4 py-2.5 rounded-full shadow-lg transition-all duration-200 hover:bg-[#1a1c1a]"
      >
        <svg
          className="w-4 h-4 text-[#4a7c59] group-hover:-translate-x-0.5 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="text-sm font-medium">{label}</span>
      </Link>
    </div>
  )
}
