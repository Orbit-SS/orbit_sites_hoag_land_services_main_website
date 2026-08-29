'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { sendGAEvent } from '@next/third-parties/google'
import type { LocationPageData } from '@/types/location'
import {
  PHONE,
  PHONE_HREF,
  EMAIL,
  COMPANY,
  COMPANY_LLC,
  OWNER,
  CERTS,
  REVIEW_STATS,
  REVIEWS,
  IMAGES,
  EST_YEAR,
  FACEBOOK,
  INSTAGRAM,
  FULL_SERVICES,
} from '@/shared/constants'

/* ─────────────────────────────────────────────
   LOCATION PAGE TEMPLATE — Ironclad Theme
   Dark bg (#1a1c1a, #141614, #0d0f0d)
   Forest green accent (#4a7c59), warm tan (#c2a878)
   ───────────────────────────────────────────── */

/* ── Icon Components ── */

function StarIcon() {
  return (
    <svg className="w-5 h-5 text-[#c2a878]" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <StarIcon key={i} />
      ))}
    </div>
  )
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-5 h-5 text-[#4a7c59] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg className="w-6 h-6 text-[#4a7c59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className="w-6 h-6 text-[#4a7c59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function AwardIcon() {
  return (
    <svg className="w-6 h-6 text-[#4a7c59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg className="w-6 h-6 text-[#4a7c59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function GreenCheck() {
  return (
    <svg className="w-6 h-6 text-[#4a7c59] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

function StepNumber({ n }: { n: number }) {
  return (
    <div className="w-14 h-14 rounded-full border-2 border-[#4a7c59] flex items-center justify-center shrink-0">
      <span className="font-display text-xl font-bold text-[#4a7c59]">{n}</span>
    </div>
  )
}

/* ── FAQ Accordion ── */

function FAQAccordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="font-display text-lg font-bold uppercase">{q}</span>
        <ChevronDown open={open} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 pb-5' : 'max-h-0'}`}>
        <p className="text-gray-400 leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

/* ── Contact Form ── */

function ContactForm({ location, zipCode, serviceCategory }: { location: string; zipCode: string; serviceCategory: string }) {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: serviceCategory,
    zip: zipCode,
    message: '',
  })
  const startedRef = useRef(false)

  const serviceOptions = ['Site Services', 'Tree Services', 'Fencing Services']
  const FORM_TYPE = 'location_estimate'
  const sourcePage = typeof window !== 'undefined' ? window.location.pathname : ''
  const eventContext = {
    form_type: FORM_TYPE,
    form_page: sourcePage,
    source_page: sourcePage,
    content_group: serviceCategory,
    location: location,
  }

  const trackStart = () => {
    if (startedRef.current) return
    startedRef.current = true
    sendGAEvent('event', 'form_start', eventContext)
  }

  // form_start must mean "typed something", not "focus landed here". React's
  // onFocus bubbles, so wiring it on the <form> counted anyone tabbing past.
  const updateField = (field: keyof typeof form, value: string) => {
    trackStart()
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('sending')
    setErrorMsg('')
    sendGAEvent('event', 'form_submit', eventContext)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service,
          propertyLocation: form.zip,
          message: form.message || `Estimate request from ${location} ${serviceCategory} page.`,
          sourcePage,
          locationContext: `${location} - ${serviceCategory}`,
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        sendGAEvent('event', 'form_error', eventContext)
        setErrorMsg(body?.error || 'Something went wrong. Please call us instead.')
        setFormState('error')
        return
      }
      sendGAEvent('event', 'generate_lead', eventContext)
      setFormState('sent')
    } catch (err) {
      console.error('[LocationPage form error]', err)
      sendGAEvent('event', 'form_error', eventContext)
      setErrorMsg('Could not reach our server. Please call us instead.')
      setFormState('error')
    }
  }

  if (formState === 'sent') {
    return (
      <div className="bg-[#141614] rounded-lg p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-[#4a7c59]/20 flex items-center justify-center mx-auto mb-4">
          <GreenCheck />
        </div>
        <h3 className="font-display text-2xl font-bold uppercase mb-2">Request Received</h3>
        <p className="text-gray-400">We will follow up shortly to discuss your {location} project.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#141614] rounded-lg p-6 sm:p-8 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="loc-name" className="block text-sm text-gray-400 mb-1">Name</label>
          <input
            id="loc-name"
            type="text"
            required
            value={form.name}
            onChange={e => updateField('name', e.target.value)}
            className="w-full bg-[#0d0f0d] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#4a7c59]"
          />
        </div>
        <div>
          <label htmlFor="loc-phone" className="block text-sm text-gray-400 mb-1">Phone</label>
          <input
            id="loc-phone"
            type="tel"
            required
            value={form.phone}
            onChange={e => updateField('phone', e.target.value)}
            className="w-full bg-[#0d0f0d] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#4a7c59]"
          />
        </div>
      </div>
      <div>
        <label htmlFor="loc-email" className="block text-sm text-gray-400 mb-1">Email</label>
        <input
          id="loc-email"
          type="email"
          required
          value={form.email}
          onChange={e => updateField('email', e.target.value)}
          className="w-full bg-[#0d0f0d] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#4a7c59]"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="loc-service" className="block text-sm text-gray-400 mb-1">Service Type</label>
          <select
            id="loc-service"
            value={form.service}
            onChange={e => updateField('service', e.target.value)}
            className="w-full bg-[#0d0f0d] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#4a7c59]"
          >
            {serviceOptions.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="loc-zip" className="block text-sm text-gray-400 mb-1">Zip Code</label>
          <input
            id="loc-zip"
            type="text"
            value={form.zip}
            onChange={e => updateField('zip', e.target.value)}
            className="w-full bg-[#0d0f0d] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#4a7c59]"
          />
        </div>
      </div>
      <div>
        <label htmlFor="loc-message" className="block text-sm text-gray-400 mb-1">Message</label>
        <textarea
          id="loc-message"
          rows={3}
          value={form.message}
          onChange={e => updateField('message', e.target.value)}
          className="w-full bg-[#0d0f0d] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#4a7c59] resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={formState === 'sending'}
        className="w-full bg-[#4a7c59] hover:bg-[#3d6b4a] text-white font-display font-bold uppercase tracking-wide py-4 rounded transition-colors duration-200 min-h-[48px] disabled:opacity-60"
      >
        {formState === 'sending' ? 'Sending...' : 'Get Your Free Estimate'}
      </button>
      {formState === 'error' && (
        <p className="text-sm text-red-400 mt-2 text-center" role="alert">
          {errorMsg || 'Something went wrong. Please call us instead.'}
        </p>
      )}
    </form>
  )
}

/* ── Reviewer Avatar ── */

function ReviewerAvatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#4a7c59]/30 border border-[#4a7c59]/50 flex items-center justify-center">
        <span className="text-xs sm:text-sm font-bold text-[#4a7c59]">{initials}</span>
      </div>
      <span className="text-[10px] sm:text-xs text-gray-400">{name.split(' ')[0]}</span>
    </div>
  )
}

/* ── TRUST ICONS ── */

const TRUST_ICONS = [ShieldIcon, ClockIcon, AwardIcon, MapPinIcon, ShieldIcon, ClockIcon]

/* ════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════ */

export default function LocationPage({ data }: { data: LocationPageData }) {
  const currentYear = new Date().getFullYear()
  const yearsSince = currentYear - EST_YEAR

  const trustSignals = [
    `ISA Certified Arborist (FL-9491A)`,
    `${yearsSince}+ Years Experience`,
    `${REVIEW_STATS.stars} Stars on Google`,
    `Licensed & Insured`,
    `TRAQ Qualified`,
    `Free Estimates`,
  ]

  const allReviews = REVIEWS

  return (
    <>
      {/* ── JSON-LD Schema ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data.schema.localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data.schema.breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data.schema.faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data.schema.webPage) }}
      />
      {data.schema.service && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data.schema.service) }}
        />
      )}
      {data.schema.howTo && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data.schema.howTo) }}
        />
      )}

      {/* ════════ SECTION 1 — HERO ════════ */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <Image
          src={data.heroImage}
          alt={`${data.serviceCategoryName} in ${data.location} ${data.stateAbbr}`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1c1a]/80 via-[#1a1c1a]/70 to-[#1a1c1a]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-20">
          {/* Reviewer avatars */}
          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-3">
              Join {Math.floor(REVIEW_STATS.count / 10) * 10}+ {data.location} property owners who trust {COMPANY}
            </p>
            <div className="flex justify-center gap-3 sm:gap-4 mb-2">
              {allReviews.slice(0, 3).map((r) => (
                <ReviewerAvatar key={r.name} name={r.name} />
              ))}
            </div>
            <div className="flex items-center justify-center gap-2">
              <Stars />
              <span className="text-sm text-[#c2a878] font-semibold">{REVIEW_STATS.stars} stars on Google</span>
            </div>
          </div>

          {/* H1 */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4 leading-tight">
            {data.h1}
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            {data.subheadline}
          </p>

          {/* Primary CTA */}
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-3 bg-[#4a7c59] hover:bg-[#3d6b4a] text-white font-display font-bold uppercase tracking-wide px-8 py-4 rounded transition-colors duration-200 text-lg min-h-[48px]"
          >
            <PhoneIcon />
            {data.ctaText}
          </a>

          {/* Trust micro-copy */}
          <p className="text-sm text-gray-400 mt-4">
            ISA Certified Arborist FL-9491A &middot; Est. {EST_YEAR} &middot; Licensed &amp; Insured
          </p>
        </div>
      </section>

      {/* ════════ SECTION 2 — TRUST BAR ════════ */}
      <section className="bg-[#141614] border-y border-white/5 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {trustSignals.map((label, i) => {
              const Icon = TRUST_ICONS[i % TRUST_ICONS.length]
              return (
                <div key={label} className="flex items-center gap-2 justify-center text-center">
                  <Icon />
                  <span className="text-xs sm:text-sm text-gray-300 font-medium">{label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════ SECTION 3 — SERVICES OVERVIEW ════════ */}
      <section className="bg-[#1a1c1a] py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-center mb-6">
            {data.serviceCategoryName} in {data.location}, {data.stateAbbr}
          </h2>

          {/* Unique intro paragraph per location */}
          <p className="text-gray-400 leading-relaxed text-center max-w-3xl mx-auto mb-12">
            {data.services.length > 0 && data.services[0].desc.split('.').slice(0, 3).join('.') + '.'}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.services.map((svc) => (
              <Link
                key={svc.name}
                href={svc.href}
                className="bg-[#141614] border border-white/5 rounded-lg p-6 hover:border-[#4a7c59]/30 transition-colors group"
              >
                <h3 className="font-display text-lg font-bold uppercase mb-2 group-hover:text-[#4a7c59] transition-colors">
                  {svc.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{svc.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SECTION 4 — HOW IT WORKS ════════ */}
      <section className="bg-[#0d0f0d] py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-center mb-12">
            How It Works
          </h2>

          <div className="grid sm:grid-cols-3 gap-8 sm:gap-6 mb-12">
            {data.processSteps.map((step, i) => (
              <div key={step.title} className="flex flex-col items-center text-center gap-4">
                <StepNumber n={i + 1} />
                <h3 className="font-display text-lg font-bold uppercase">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-3 bg-[#4a7c59] hover:bg-[#3d6b4a] text-white font-display font-bold uppercase tracking-wide px-8 py-4 rounded transition-colors duration-200 min-h-[48px]"
            >
              <PhoneIcon />
              {data.ctaText}
            </a>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 5 — WHY CHOOSE US ════════ */}
      <section className="bg-[#1a1c1a] py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-center mb-12">
            Why {data.location} Property Owners Choose {COMPANY}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.differentiators.map((diff) => (
              <div key={diff.title} className="bg-[#141614] border border-white/5 rounded-lg p-6">
                <GreenCheck />
                <h3 className="font-display text-base font-bold uppercase mt-3 mb-2">{diff.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{diff.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SECTION 7 — REVIEWS ════════ */}
      <section className="bg-[#0d0f0d] py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-center mb-12">
            What {data.location} Property Owners Say About {COMPANY}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {allReviews.map((review) => (
              <div key={review.name} className="bg-[#141614] border border-white/5 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <ReviewerAvatar name={review.name} />
                  <div>
                    <p className="font-semibold text-sm">{review.name}</p>
                    <p className="text-xs text-gray-400">{review.source}</p>
                  </div>
                </div>
                <Stars count={review.rating} />
                <p className="text-gray-400 text-sm leading-relaxed mt-3">{review.text}</p>
              </div>
            ))}
          </div>

          <p className="text-center">
            <a
              href="https://www.google.com/search?q=Hoag+Land+Services+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4a7c59] hover:text-[#5a9c6d] font-semibold text-sm transition-colors"
            >
              Read all {REVIEW_STATS.count} reviews on Google &rarr;
            </a>
          </p>
        </div>
      </section>

      {/* ════════ SECTION 8 — LOCAL AREA CONTEXT ════════ */}
      <section className="bg-[#1a1c1a] py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-center mb-8">
            {data.serviceCategoryName} for {data.location}, {data.stateAbbr} Properties
          </h2>

          <div
            className="text-gray-400 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: data.localContext }}
          />
        </div>
      </section>

      {/* ════════ SECTION 8B — WHAT'S INCLUDED (optional) ════════ */}
      {data.whatsIncluded && (
        <section className="bg-[#141614] py-16 sm:py-20 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            {data.whatsIncluded.eyebrow && (
              <p className="text-[#c2a878] font-display uppercase tracking-[0.2em] text-sm mb-3 text-center">
                {data.whatsIncluded.eyebrow}
              </p>
            )}
            <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-center mb-4">
              {data.whatsIncluded.heading ?? `What's Included in ${data.serviceCategoryName} in ${data.location}`}
            </h2>
            {data.whatsIncluded.intro && (
              <p className="text-gray-400 text-center max-w-2xl mx-auto mb-10">
                {data.whatsIncluded.intro}
              </p>
            )}
            <div className="grid sm:grid-cols-2 gap-4">
              {data.whatsIncluded.items.map((item) => {
                const inner = (
                  <div className="flex gap-3 items-start bg-[#1a1c1a] p-5 border border-white/5 hover:border-[#4a7c59]/40 transition-all h-full">
                    <svg className="w-5 h-5 text-[#4a7c59] mt-1 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h3 className="font-display font-bold uppercase text-base mb-1">{item.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                )
                return item.href ? (
                  <Link key={item.title} href={item.href} className="group">{inner}</Link>
                ) : (
                  <div key={item.title}>{inner}</div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ════════ SECTION 8C — RECENT PROJECTS (optional photo evidence) ════════ */}
      {data.recentProjects && data.recentProjects.items.length > 0 && (
        <section className="bg-[#0d0f0d] py-16 sm:py-20 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            {data.recentProjects.eyebrow && (
              <p className="text-[#c2a878] font-display uppercase tracking-[0.2em] text-sm mb-3 text-center">
                {data.recentProjects.eyebrow}
              </p>
            )}
            <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-center mb-4">
              {data.recentProjects.heading ?? `Recent ${data.serviceCategoryName} Projects in ${data.location}`}
            </h2>
            {data.recentProjects.intro && (
              <p className="text-gray-400 text-center max-w-2xl mx-auto mb-10">
                {data.recentProjects.intro}
              </p>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.recentProjects.items.map((p) => (
                <figure key={p.title} className="bg-[#141614] border border-white/5 overflow-hidden rounded-sm">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#0d0f0d]">
                    <Image
                      src={p.image}
                      alt={p.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                      style={p.imagePos ? { objectPosition: p.imagePos } : undefined}
                    />
                  </div>
                  <figcaption className="p-4">
                    {(p.location || p.service) && (
                      <p className="text-[#4a7c59] font-display uppercase tracking-[0.14em] text-[0.68rem] mb-1.5">
                        {[p.location, p.service].filter(Boolean).join(' · ')}
                      </p>
                    )}
                    <h3 className="font-display font-bold uppercase text-base mb-1.5 leading-tight">{p.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════ SECTION 9 — FAQ ════════ */}
      <section className="bg-[#0d0f0d] py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div>
            {data.faqs.map((faq) => (
              <FAQAccordion key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SECTION 10 — FINAL CTA ════════ */}
      <section className="bg-[#1a1c1a] py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-center mb-4">
            Ready to Get Started in {data.location}?
          </h2>
          <p className="text-gray-400 text-center mb-8 max-w-xl mx-auto leading-relaxed">
            Tell us about your property and we will follow up with an honest, no-pressure estimate.
            Call us directly or fill out the form below.
          </p>

          {/* Phone number */}
          <div className="text-center mb-8">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-3 text-2xl sm:text-3xl font-display font-bold text-[#4a7c59] hover:text-[#5a9c6d] transition-colors"
            >
              <PhoneIcon />
              {PHONE}
            </a>
          </div>

          <ContactForm
            location={data.location}
            zipCode={data.zipCodes[0] || ''}
            serviceCategory={data.serviceCategoryName}
          />

          {/* Trust restatement */}
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-gray-400">
            <span>ISA Certified Arborist FL-9491A</span>
            <span>&middot;</span>
            <span>{REVIEW_STATS.stars} Stars ({REVIEW_STATS.count} Reviews)</span>
            <span>&middot;</span>
            <span>Est. {EST_YEAR}</span>
          </div>
        </div>
      </section>

      {/* ════════ FOOTER — NEARBY LOCATIONS ════════ */}
      <section className="bg-[#0d0f0d] border-t border-white/5 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
            {/* NAP */}
            <div>
              <p className="font-display font-bold uppercase text-[#c2a878] mb-2">{COMPANY_LLC}</p>
              <p className="text-gray-400">DeLeon Springs, FL 32130</p>
              <p className="text-gray-400">
                <a href={PHONE_HREF} className="hover:text-white transition-colors">{PHONE}</a>
              </p>
              <p className="text-gray-400">
                <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">{EMAIL}</a>
              </p>
            </div>

            {/* Licenses */}
            <div>
              <p className="font-display font-bold uppercase text-[#c2a878] mb-2">Credentials</p>
              {CERTS.map(c => (
                <p key={c} className="text-gray-400 text-xs mb-1">{c}</p>
              ))}
            </div>

            {/* Nearby locations */}
            <div>
              <p className="font-display font-bold uppercase text-[#c2a878] mb-2">Nearby Areas</p>
              <p className="text-gray-400 text-xs mb-2">
                Proudly serving {data.location} and surrounding areas
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {data.nearbyLocations.map((loc) => (
                  <Link
                    key={loc.name}
                    href={loc.href}
                    className="text-gray-400 hover:text-[#4a7c59] transition-colors text-xs"
                  >
                    {loc.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <p className="font-display font-bold uppercase text-[#c2a878] mb-2">Quick Links</p>
              <div className="space-y-1">
                <Link href="/" className="block text-gray-400 hover:text-white transition-colors text-xs">Home</Link>
                <Link href="/services" className="block text-gray-400 hover:text-white transition-colors text-xs">All Services</Link>
                <Link href="/services/tree-services" className="block text-gray-400 hover:text-white transition-colors text-xs">Tree Services</Link>
                <Link href="/services/site-work" className="block text-gray-400 hover:text-white transition-colors text-xs">Site Services</Link>
                <Link href="/services/fencing" className="block text-gray-400 hover:text-white transition-colors text-xs">Fencing</Link>
                <Link href="/portfolio" className="block text-gray-400 hover:text-white transition-colors text-xs">Portfolio</Link>
                <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors text-xs">Contact</Link>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-400 text-xs mt-8">
            &copy; {currentYear} {COMPANY_LLC}. All rights reserved.
          </p>
        </div>
      </section>

      {/* ── Sticky Mobile CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0d0f0d]/95 backdrop-blur border-t border-white/10 p-3 flex items-center justify-between gap-3 sm:hidden z-50">
        <a
          href={PHONE_HREF}
          className="flex items-center gap-2 text-white font-display font-bold text-sm"
        >
          <PhoneIcon />
          {PHONE}
        </a>
        <a
          href={PHONE_HREF}
          className="bg-[#4a7c59] text-white font-display font-bold uppercase text-sm px-4 py-2.5 rounded min-h-[48px] flex items-center"
        >
          Call Now
        </a>
      </div>
    </>
  )
}
