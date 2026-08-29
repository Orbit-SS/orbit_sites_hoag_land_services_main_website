import type { Metadata } from 'next'
import Link from 'next/link'
import {
  SITE_URL,
  COMPANY,
  REVIEWS,
  REVIEW_STATS,
  EST_YEAR,
  PHONE,
  PHONE_HREF,
} from '@/shared/constants'
import { breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import Breadcrumbs from '@/components/Breadcrumbs'

const PAGE_URL = '/reviews'
const TITLE = 'Reviews: 5-Star Land, Tree & Fence Contractor in DeLand, FL'
const DESCRIPTION =
  `Read ${REVIEW_STATS.count} verified 5-star Google reviews for land clearing, tree service, and fencing across DeLand and Central Florida.`
const OG_IMAGE = '/photos/site7.JPG'
const GOOGLE_REVIEWS_URL = 'https://www.google.com/search?q=Hoag+Land+Services+DeLand+FL+reviews'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PAGE_URL}` },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Hoag Land Services',
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${PAGE_URL}`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${COMPANY} 5-star Google reviews` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
}

// Reviews page schema — LocalBusiness with aggregateRating + review array
const reviewsPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}${PAGE_URL}#business`,
  name: COMPANY,
  url: SITE_URL,
  image: `${SITE_URL}${OG_IMAGE}`,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: String(REVIEW_STATS.stars),
    reviewCount: String(REVIEW_STATS.count),
    bestRating: '5',
    worstRating: '1',
  },
  review: REVIEWS.map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.name },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(r.rating),
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody: r.text,
    publisher: r.source ? { '@type': 'Organization', name: r.source } : undefined,
  })),
}

const schemas = [
  reviewsPageSchema,
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Reviews', url: PAGE_URL },
  ]),
  webPageSchema({ name: TITLE, description: DESCRIPTION, url: PAGE_URL, image: OG_IMAGE }),
]

function StarRow({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-1" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} className="w-5 h-5 text-[#c2a878]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function ReviewsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
      <main className="bg-[#0d0f0d] text-gray-100 min-h-screen">
        <Breadcrumbs crumbs={[
          { name: 'Home', url: '/' },
          { name: 'Reviews', url: '/reviews' },
        ]} />

        {/* Hero */}
        <section className="bg-[#141614] py-20 border-b border-white/5">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-[#c2a878] font-display uppercase tracking-[0.2em] text-sm mb-4">
              Customer Reviews
            </p>
            <h1 className="font-display text-4xl md:text-6xl uppercase tracking-tight text-white mb-6">
              5-Star Reviews Across<br />Central Florida
            </h1>
            <p className="font-sans text-lg text-gray-300 max-w-2xl mx-auto mb-10">
              Real feedback from real property owners we&rsquo;ve worked with on land clearing, tree service, and fencing since {EST_YEAR}.
            </p>
            <div className="inline-flex flex-col items-center gap-3 bg-[#1a1c1a] border border-white/10 px-8 py-6 rounded-sm">
              <div className="flex items-center gap-4">
                <span className="font-display text-6xl text-[#c2a878] font-bold leading-none">{REVIEW_STATS.stars.toFixed(1)}</span>
                <div className="flex flex-col items-start gap-1">
                  <StarRow n={5} />
                  <span className="font-sans text-sm text-gray-400">out of 5 stars</span>
                </div>
              </div>
              <p className="font-sans text-sm text-gray-400">
                {REVIEW_STATS.count} verified Google Reviews
              </p>
            </div>
          </div>
        </section>

        {/* Featured Reviews */}
        <section className="bg-[#0d0f0d] py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-4">
              What Our Customers Say
            </h2>
            <p className="font-sans text-gray-400 text-center max-w-2xl mx-auto mb-14">
              A few of the reviews we&rsquo;re most grateful for. See all {REVIEW_STATS.count} on our Google profile.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {REVIEWS.map((r, i) => (
                <article
                  key={i}
                  className="bg-[#141614] border border-white/5 p-6 flex flex-col gap-4"
                  itemScope
                  itemType="https://schema.org/Review"
                >
                  <StarRow n={r.rating} />
                  <blockquote
                    className="font-sans text-gray-300 italic leading-relaxed flex-1"
                    itemProp="reviewBody"
                  >
                    &ldquo;{r.text}&rdquo;
                  </blockquote>
                  <footer className="pt-4 border-t border-white/5">
                    <p
                      className="font-display uppercase text-[#c2a878] text-sm tracking-wider"
                      itemProp="author"
                      itemScope
                      itemType="https://schema.org/Person"
                    >
                      <span itemProp="name">{r.name}</span>
                    </p>
                    <p className="font-sans text-xs text-gray-400 mt-1">
                      Verified {r.source} Review
                    </p>
                  </footer>
                </article>
              ))}
            </div>
            <div className="text-center mt-12">
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wide px-8 py-4 transition-colors"
              >
                Read All {REVIEW_STATS.count} Reviews on Google &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="bg-[#141614] py-16 border-y border-white/5">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-display text-2xl md:text-3xl uppercase text-white text-center mb-10">
              Why the Rating Sticks
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { label: 'Est.', value: String(EST_YEAR) },
                { label: 'ISA Certified', value: 'Arborist' },
                { label: 'Licensed', value: '& Insured' },
                { label: 'HomeAdvisor', value: 'Screened' },
              ].map((t) => (
                <div key={t.label}>
                  <p className="font-display text-3xl uppercase text-[#c2a878] mb-1">{t.value}</p>
                  <p className="font-sans text-xs text-gray-400 uppercase tracking-widest">{t.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leave a review CTA */}
        <section className="bg-[#0d0f0d] py-20">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-display text-3xl md:text-4xl uppercase text-white mb-4">
              Recently Worked With Us?
            </h2>
            <p className="font-sans text-gray-400 mb-8 max-w-xl mx-auto">
              If we did the job right, a quick Google review helps other Central Florida property owners find us. Even one sentence goes a long way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wide px-8 py-4 transition-colors"
              >
                Leave a Google Review
              </a>
              <a
                href={PHONE_HREF}
                className="inline-block border-2 border-[#c2a878] text-[#c2a878] hover:bg-[#c2a878] hover:text-[#0d0f0d] font-display uppercase tracking-wide px-8 py-4 transition-colors"
              >
                Or Call {PHONE}
              </a>
            </div>
          </div>
        </section>

        {/* Related pages */}
        <section className="bg-[#141614] py-16 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-4">
            <p className="text-[#c2a878] font-display uppercase tracking-[0.2em] text-sm mb-3 text-center">
              Ready to Get Started?
            </p>
            <h2 className="font-display text-2xl md:text-3xl uppercase text-white text-center mb-10">
              Services Central Florida Property Owners Trust Us With
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { name: 'Site Work & Land Clearing', href: '/services/site-work' },
                { name: 'Tree Service (ISA Certified)', href: '/services/tree-services' },
                { name: 'Fencing', href: '/services/fencing' },
              ].map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="block bg-[#1a1c1a] border border-[#4a7c59]/10 hover:border-[#4a7c59]/40 p-6 rounded text-center transition-colors"
                >
                  <span className="font-display text-lg uppercase text-[#c2a878]">{s.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
