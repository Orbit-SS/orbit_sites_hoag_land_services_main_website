'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  IMAGES,
  PHONE,
  PHONE_HREF,
  COMPANY,
  EST_YEAR,
  REVIEW_STATS,
  REVIEWS,
  ABOUT,
  SERVICES,
} from '@/shared/constants'

/* ─── Hero ─── */
function Hero() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', 'translate-y-0')
          el.classList.remove('opacity-0', 'translate-y-8')
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.site1}
          alt="Land clearing project"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0f0d]/80 via-[#0d0f0d]/60 to-[#1a1c1a]" />
      </div>

      {/* Content */}
      <div
        ref={ref}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto opacity-0 translate-y-8 transition-all duration-1000 ease-out"
      >
        <p className="text-[#c2a878] text-sm uppercase tracking-[0.3em] mb-6 font-semibold">
          Central Florida&apos;s Trusted Land Pros
        </p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-wider text-white leading-tight mb-6">
          Land Clearing.
          <br />
          Tree Service.
          <br />
          Fencing.
        </h1>
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Site work, tree services, and fencing for residential &amp; commercial
          properties.
        </p>
        <a
          href={PHONE_HREF}
          className="inline-flex items-center gap-3 bg-[#4a7c59] hover:bg-[#3d6a4a] text-white px-8 py-4 rounded-lg text-lg font-bold uppercase tracking-wider transition-colors duration-200 shadow-lg shadow-[#4a7c59]/25"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call {PHONE}
        </a>
      </div>

      {/* Social proof IN the hero — visible immediately */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#141614]/90 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {/* Stars + rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-[#c2a878]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white font-bold text-sm sm:text-base">{REVIEW_STATS.stars}</span>
              <span className="text-white/60 text-xs sm:text-sm">({REVIEW_STATS.count} Google Reviews)</span>
            </div>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="text-white/70 text-xs sm:text-sm font-medium">ISA Certified Arborist</span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="text-white/70 text-xs sm:text-sm font-medium">Licensed &amp; Insured</span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="text-white/70 text-xs sm:text-sm font-medium">Est. {EST_YEAR}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Trust Strip ─── */
function TrustStrip() {
  const items = [
    { label: `Est. ${EST_YEAR}`, icon: 'shield' },
    { label: 'ISA Certified Arborist', icon: 'cert' },
    { label: `${REVIEW_STATS.stars} Stars (${REVIEW_STATS.count} Reviews)`, icon: 'star' },
    { label: 'Licensed & Insured', icon: 'check' },
  ]

  return (
    <section className="bg-[#141614] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              {item.icon === 'star' && (
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#c2a878]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              )}
              {item.icon === 'shield' && (
                <svg className="w-5 h-5 text-[#4a7c59]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              )}
              {item.icon === 'cert' && (
                <svg className="w-5 h-5 text-[#4a7c59]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              )}
              {item.icon === 'check' && (
                <svg className="w-5 h-5 text-[#4a7c59]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
              <span className="text-sm text-white/70 font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Services Overview ─── */
function ServicesOverview() {
  const cards = [
    {
      image: IMAGES.site1,
      name: SERVICES.site.name,
      desc: SERVICES.site.tagline,
      href: '/services/site-work',
    },
    {
      image: IMAGES.tree5,
      name: SERVICES.tree.name,
      desc: SERVICES.tree.tagline,
      href: '/services/tree-services',
    },
    {
      image: IMAGES.fence5,
      name: SERVICES.fence.name,
      desc: SERVICES.fence.tagline,
      href: '/services/fencing',
    },
  ]

  return (
    <section className="bg-[#1a1c1a] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#c2a878] text-sm uppercase tracking-[0.3em] mb-3 font-semibold">
            What We Do
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-wider text-white">
            Our Services
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Link
              key={card.name}
              href={card.href}
              className="group relative rounded-xl overflow-hidden bg-[#141614] border border-white/5 hover:border-[#4a7c59]/30 transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141614] to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold uppercase tracking-wider text-white mb-2">
                  {card.name}
                </h3>
                <p className="text-white/50 text-sm mb-4">{card.desc}</p>
                <span className="inline-flex items-center gap-1 text-[#4a7c59] text-sm font-semibold uppercase tracking-wider group-hover:gap-2 transition-all duration-200">
                  View Services
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── About Teaser ─── */
function AboutTeaser() {
  return (
    <section className="bg-[#141614] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={IMAGES.og}
              alt={COMPANY}
              className="w-full h-80 md:h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#141614]/40 to-transparent" />
          </div>

          {/* Text */}
          <div>
            <p className="text-[#c2a878] text-sm uppercase tracking-[0.3em] mb-3 font-semibold">
              About Us
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wider text-white mb-6">
              {ABOUT.headline}
            </h2>
            <p className="text-white/60 leading-relaxed mb-8">
              {ABOUT.paragraphs[0]}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border-2 border-[#4a7c59] text-[#4a7c59] hover:bg-[#4a7c59] hover:text-white px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-200"
            >
              Learn More
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Reviews ─── */
function ReviewsSection() {
  return (
    <section className="bg-[#1a1c1a] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-8 h-8 sm:w-10 sm:h-10 text-[#c2a878]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-wider text-white mb-2">
            {REVIEW_STATS.stars} Stars
          </h2>
          <p className="text-white/50 text-lg">
            {REVIEW_STATS.count} Verified Google Reviews
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.name}
              className="bg-[#141614] border border-white/5 rounded-xl p-6 md:p-8"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#c2a878]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Text */}
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4a7c59]/20 flex items-center justify-center text-[#4a7c59] font-bold text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{review.name}</p>
                  <p className="text-white/40 text-xs">{review.source} Review</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CTA ─── */
function CTASection() {
  return (
    <section className="bg-[#141614] py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-[#c2a878] text-sm uppercase tracking-[0.3em] mb-3 font-semibold">
          Get In Touch
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-wider text-white mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
          Call us today for a free estimate, or fill out our contact form and
          we&apos;ll follow up promptly.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-3 bg-[#4a7c59] hover:bg-[#3d6a4a] text-white px-8 py-4 rounded-lg text-lg font-bold uppercase tracking-wider transition-colors duration-200 shadow-lg shadow-[#4a7c59]/25"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {PHONE}
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border-2 border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-lg text-lg font-bold uppercase tracking-wider transition-all duration-200"
          >
            Request an Estimate
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ─── Sticky Mobile CTA ─── */
function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-[#141614]/95 backdrop-blur-md border-t border-white/10 p-3">
      <a
        href={PHONE_HREF}
        className="flex items-center justify-center gap-2 w-full bg-[#4a7c59] hover:bg-[#3d6a4a] text-white py-3.5 rounded-lg font-bold uppercase tracking-wider text-sm transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        Call Now — Free Estimate
      </a>
    </div>
  )
}

/* ─── Page ─── */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <AboutTeaser />
      <ReviewsSection />
      <CTASection />
      <StickyMobileCTA />
    </>
  )
}
