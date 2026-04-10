'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { HIRING, PHONE, PHONE_HREF, EMAIL, IMAGES } from '@/shared/constants'

export default function JoinPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-[#1a1c1a] text-white font-sans">
      {/* ── HERO ── */}
      <section className="relative h-[36vh] min-h-[280px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0d0f0d]" />
        <div className="absolute inset-0 opacity-15">
          <img
            src={IMAGES.site10}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1
            className="text-4xl md:text-6xl font-bold uppercase tracking-wider mb-4"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            Join Our Team
          </h1>
          <p className="text-white/60 text-lg max-w-lg mx-auto">
            We are building a crew of hardworking, dependable professionals.
          </p>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="bg-[#141614] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-white/60 text-lg leading-relaxed">
            {HIRING.intro}
          </p>
        </div>
      </section>

      {/* ── WHAT TO EXPECT ── */}
      <section className="bg-[#1a1c1a] py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2
            className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-10 text-center"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            What to Expect
          </h2>
          <div className="space-y-5">
            {HIRING.expectations.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-[#141614] rounded-lg p-5 border border-white/5"
              >
                <div className="w-8 h-8 rounded bg-[#4a7c59]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-5 h-5 text-[#4a7c59]"
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
                <p className="text-white/70 text-base">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATION PROCESS ── */}
      <section className="bg-[#0d0f0d] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c2a878] mb-4 font-semibold">
            Application Process
          </p>
          <p className="text-white/50 text-lg leading-relaxed">
            {HIRING.process}
          </p>
        </div>
      </section>

      {/* ── APPLICATION FORM ── */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-2xl mx-auto px-6">
          {submitted ? (
            <div className="text-center py-12">
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
                Application Received
              </h2>
              <p className="text-white/50 mb-8">
                Thank you, {formData.name}. We will review your submission and
                reach out if there is a potential fit.
              </p>
              <Link
                href="/"
                className="inline-block px-8 py-3 bg-[#4a7c59] hover:bg-[#3d6b4a] text-white font-bold uppercase tracking-wider text-sm rounded transition-all duration-300"
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <>
              <h2
                className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-8 text-center"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                Apply Now
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
                  {/* Position */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#c2a878] mb-2 font-semibold">
                      Position of Interest{' '}
                      <span className="text-[#4a7c59]">*</span>
                    </label>
                    <select
                      required
                      value={formData.position}
                      onChange={(e) => updateField('position', e.target.value)}
                      className="w-full bg-[#1a1c1a] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#4a7c59] transition-colors text-sm appearance-none cursor-pointer"
                    >
                      <option value="" disabled>
                        Select a position
                      </option>
                      {HIRING.positions.map((pos) => (
                        <option key={pos} value={pos}>
                          {pos}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#c2a878] mb-2 font-semibold">
                    Tell Us About Your Experience{' '}
                    <span className="text-[#4a7c59]">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.experience}
                    onChange={(e) => updateField('experience', e.target.value)}
                    placeholder="Describe your relevant experience, skills, and what kind of work you're looking for..."
                    className="w-full bg-[#1a1c1a] border border-white/10 rounded px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-[#4a7c59] transition-colors text-sm resize-none"
                  />
                </div>

                {/* Submit */}
                <div className="text-center pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-10 py-4 bg-[#4a7c59] hover:bg-[#3d6b4a] disabled:opacity-50 text-white font-bold uppercase tracking-wider text-sm rounded transition-all duration-300 shadow-lg shadow-[#4a7c59]/20 cursor-pointer"
                  >
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </section>

      {/* ── CONTACT FALLBACK ── */}
      <section className="bg-[#1a1c1a] py-12">
        <div className="max-w-xl mx-auto px-6 text-center">
          <p className="text-white/30 text-sm mb-4">
            Questions? Reach us directly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={PHONE_HREF}
              className="text-[#c2a878] hover:text-white text-sm font-semibold tracking-wider transition-colors"
            >
              {PHONE}
            </a>
            <span className="hidden sm:inline text-white/20">|</span>
            <a
              href={`mailto:${EMAIL}`}
              className="text-[#c2a878] hover:text-white text-sm font-semibold tracking-wider transition-colors"
            >
              {EMAIL}
            </a>
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
