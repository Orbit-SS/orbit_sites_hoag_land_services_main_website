'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import {
  PHONE,
  PHONE_HREF,
  EMAIL,
  LOCATION,
  SERVICE_AREA,
  CONTACT_CONTENT,
  IMAGES,
} from '@/shared/constants'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    propertyLocation: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    // Simulate submission
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-[#1a1c1a] text-white font-sans">
      {/* ── HERO ── */}
      <section className="relative h-[36vh] min-h-[280px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0d0f0d]" />
        <div className="absolute inset-0 opacity-20">
          <img
            src={IMAGES.site7}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1
            className="text-4xl md:text-6xl font-bold uppercase tracking-wider mb-4"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            Contact Us
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            {CONTACT_CONTENT.intro}
          </p>
        </div>
      </section>

      {/* ── CONTACT FORM + INFO ── */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-6">
          {submitted ? (
            <div className="max-w-xl mx-auto text-center py-16">
              <div className="w-20 h-20 rounded-full bg-[#4a7c59]/20 flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-[#4a7c59]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2
                className="text-3xl font-bold uppercase tracking-wide mb-4"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                Message Sent
              </h2>
              <p className="text-white/50 mb-8">
                Thank you, {formData.name}. We will follow up within 1 business
                day.
              </p>
              <Link
                href="/"
                className="inline-block px-8 py-3 bg-[#4a7c59] hover:bg-[#3d6b4a] text-white font-bold uppercase tracking-wider text-sm rounded transition-all duration-300"
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Left: Form (3 cols) */}
              <div className="lg:col-span-3">
                <h2
                  className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-8"
                  style={{ fontFamily: 'var(--font-oswald)' }}
                >
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#c2a878] mb-2 font-semibold">
                        Name <span className="text-[#4a7c59]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        placeholder="Your full name"
                        className="w-full bg-[#1a1c1a] border border-white/10 rounded px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-[#4a7c59] transition-colors text-sm"
                      />
                    </div>
                    {/* Email */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#c2a878] mb-2 font-semibold">
                        Email <span className="text-[#4a7c59]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-[#1a1c1a] border border-white/10 rounded px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-[#4a7c59] transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#c2a878] mb-2 font-semibold">
                        Phone
                      </label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        placeholder="(xxx) xxx-xxxx"
                        className="w-full bg-[#1a1c1a] border border-white/10 rounded px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-[#4a7c59] transition-colors text-sm"
                      />
                    </div>
                    {/* Service */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#c2a878] mb-2 font-semibold">
                        Service Needed <span className="text-[#4a7c59]">*</span>
                      </label>
                      <select
                        required
                        value={formData.service}
                        onChange={(e) => updateField('service', e.target.value)}
                        className="w-full bg-[#1a1c1a] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#4a7c59] transition-colors text-sm appearance-none cursor-pointer"
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        {CONTACT_CONTENT.serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Property Location */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#c2a878] mb-2 font-semibold">
                      Property Location
                    </label>
                    <input
                      type="text"
                      value={formData.propertyLocation}
                      onChange={(e) =>
                        updateField('propertyLocation', e.target.value)
                      }
                      placeholder="City or address of the property"
                      className="w-full bg-[#1a1c1a] border border-white/10 rounded px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-[#4a7c59] transition-colors text-sm"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#c2a878] mb-2 font-semibold">
                      How Can We Help?{' '}
                      <span className="text-[#4a7c59]">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      placeholder="Tell us about your project..."
                      className="w-full bg-[#1a1c1a] border border-white/10 rounded px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-[#4a7c59] transition-colors text-sm resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-10 py-4 bg-[#4a7c59] hover:bg-[#3d6b4a] disabled:opacity-50 text-white font-bold uppercase tracking-wider text-sm rounded transition-all duration-300 shadow-lg shadow-[#4a7c59]/20 cursor-pointer"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>

              {/* Right: Contact info (2 cols) */}
              <div className="lg:col-span-2">
                <div className="bg-[#1a1c1a] rounded-lg p-8 space-y-8">
                  <h3
                    className="text-xl font-bold uppercase tracking-wide"
                    style={{ fontFamily: 'var(--font-oswald)' }}
                  >
                    Direct Contact
                  </h3>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded bg-[#4a7c59]/15 flex items-center justify-center shrink-0">
                      <svg
                        className="w-5 h-5 text-[#4a7c59]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#c2a878] mb-1 font-semibold">
                        Phone
                      </p>
                      <a
                        href={PHONE_HREF}
                        className="text-white hover:text-[#4a7c59] transition-colors font-medium"
                      >
                        {PHONE}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded bg-[#4a7c59]/15 flex items-center justify-center shrink-0">
                      <svg
                        className="w-5 h-5 text-[#4a7c59]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#c2a878] mb-1 font-semibold">
                        Email
                      </p>
                      <a
                        href={`mailto:${EMAIL}`}
                        className="text-white hover:text-[#4a7c59] transition-colors font-medium"
                      >
                        {EMAIL}
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded bg-[#4a7c59]/15 flex items-center justify-center shrink-0">
                      <svg
                        className="w-5 h-5 text-[#4a7c59]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#c2a878] mb-1 font-semibold">
                        Location
                      </p>
                      <p className="text-white/80">{LOCATION}</p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/10 pt-6">
                    <h4
                      className="text-lg font-bold uppercase tracking-wide mb-3"
                      style={{ fontFamily: 'var(--font-oswald)' }}
                    >
                      Prefer to Talk Directly?
                    </h4>
                    <p className="text-white/50 text-sm leading-relaxed mb-4">
                      {CONTACT_CONTENT.directContact}
                    </p>
                    <a
                      href={PHONE_HREF}
                      className="inline-flex items-center gap-2 px-6 py-3 border border-[#4a7c59] text-[#4a7c59] hover:bg-[#4a7c59] hover:text-white font-bold uppercase tracking-wider text-xs rounded transition-all duration-300"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── SERVICE AREA ── */}
      <section className="bg-[#1a1c1a] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c2a878] mb-4 font-semibold">
            Service Area
          </p>
          <h2
            className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-10"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            Where We Work
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {CONTACT_CONTENT.serviceArea.map((area, i) => (
              <div
                key={i}
                className="bg-[#141614] rounded-lg p-6 border border-white/5"
              >
                <div className="w-3 h-3 rounded-full bg-[#4a7c59] mx-auto mb-4" />
                <p className="text-white/70 text-sm">{area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER BAR ── */}
      <div className="bg-[#0d0f0d] py-6 text-center">
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
