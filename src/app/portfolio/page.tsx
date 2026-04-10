'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FULL_GALLERY, IMAGES, PHONE, PHONE_HREF } from '@/shared/constants'

const CATEGORIES = ['All', 'Site Work', 'Tree Work', 'Fencing'] as const
type Category = (typeof CATEGORIES)[number]

const categoryMap: Record<Exclude<Category, 'All'>, { key: keyof typeof FULL_GALLERY; label: string }> = {
  'Site Work': { key: 'site', label: 'Site Work' },
  'Tree Work': { key: 'tree', label: 'Tree Work' },
  Fencing: { key: 'fence', label: 'Fencing' },
}

function getAllImages() {
  return [
    ...FULL_GALLERY.site.map((img) => ({ ...img, category: 'Site Work' as const })),
    ...FULL_GALLERY.tree.map((img) => ({ ...img, category: 'Tree Work' as const })),
    ...FULL_GALLERY.fence.map((img) => ({ ...img, category: 'Fencing' as const })),
  ]
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('All')

  const allImages = getAllImages()

  const filtered =
    activeFilter === 'All'
      ? allImages
      : allImages.filter((img) => img.category === activeFilter)

  return (
    <div className="min-h-screen bg-[#1a1c1a] text-white font-sans">
      {/* ── HERO ── */}
      <section className="relative h-[40vh] min-h-[320px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.site8}
            alt="Hoag Land Services project site"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1
            className="text-4xl md:text-6xl font-bold uppercase tracking-wider mb-4"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            Our Work
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-xl mx-auto">
            Browse a few recent jobs by service type.
          </p>
        </div>
      </section>

      {/* ── FILTER TABS ── */}
      <section className="bg-[#141614] sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-3 justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2.5 rounded text-sm font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeFilter === cat
                  ? 'bg-[#4a7c59] text-white shadow-lg shadow-[#4a7c59]/20'
                  : 'bg-[#1a1c1a] text-white/50 hover:text-white hover:bg-[#1a1c1a]/80'
              }`}
            >
              {cat}
              <span className="ml-2 text-xs opacity-70">
                ({cat === 'All'
                  ? allImages.length
                  : allImages.filter((i) => i.category === cat).length})
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ── GALLERY GRID ── */}
      <section className="bg-[#1a1c1a] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((img, idx) => (
              <div
                key={`${img.src}-${idx}`}
                className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-[#0d0f0d]"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                  <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span
                      className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded"
                      style={{ backgroundColor: '#c2a878', color: '#1a1c1a' }}
                    >
                      {img.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Count indicator */}
          <div className="text-center mt-10">
            <p className="text-white/30 text-sm">
              Showing {filtered.length} of {allImages.length} projects
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0d0f0d] py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-6"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            Have a Similar Project in Mind?
          </h2>
          <p className="text-white/50 mb-8 text-lg">
            Let us know what you need and we will get back to you with a free estimate.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-[#4a7c59] hover:bg-[#3d6b4a] text-white font-bold uppercase tracking-wider text-sm rounded transition-all duration-300 shadow-lg shadow-[#4a7c59]/20 hover:shadow-[#4a7c59]/30"
          >
            Start a Conversation
          </Link>
        </div>
      </section>

      {/* ── FOOTER BAR ── */}
      <div className="bg-[#141614] py-6 text-center">
        <a
          href={PHONE_HREF}
          className="text-[#c2a878] hover:text-white text-sm font-semibold tracking-wider transition-colors"
        >
          {PHONE}
        </a>
      </div>
    </div>
  )
}
