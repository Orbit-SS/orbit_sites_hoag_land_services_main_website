'use client'

import { useState, useRef } from 'react'
import { sendGAEvent } from '@next/third-parties/google'
import { Honeypot } from '@/components/Honeypot'
import { HONEYPOT_NAME } from '@/lib/antispam'

/*
 * Extracted from LocationPage on 2026-09-30 so specialty pages can carry a real
 * form instead of only a link to /contact. The land-clearing page ranked at
 * position 1.7 for its main DeLand phrase and had no way to convert on the
 * page itself; three of five competing pages do.
 *
 * Keeps the two anti-spam measures that are a standing requirement on every
 * public form: the honeypot field, and the elapsed-time trap the API route
 * checks to reject instant submits.
 */

const SERVICE_OPTIONS = ['Site Services', 'Tree Services', 'Fencing Services']

function GreenCheck() {
  return (
    <svg className="w-8 h-8 text-[#5d9c70]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default function EstimateForm({
  /** Pre-selects the service dropdown. */
  defaultService = 'Site Services',
  /** Pre-fills the zip/location field. */
  defaultZip = '',
  /** Distinguishes this form's events from the location-page ones in GA4. */
  formType = 'specialty_estimate',
  /** Human label for the page, used in the fallback message and GA4 context. */
  context = '',
  /** Prefix for the field ids, so two forms can never collide on one page. */
  idPrefix = 'est',
  /** Copy for the confirmation state. */
  sentMessage = 'We will follow up shortly to talk through your project.',
}: {
  defaultService?: string
  defaultZip?: string
  formType?: string
  context?: string
  idPrefix?: string
  sentMessage?: string
}) {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: defaultService,
    zip: defaultZip,
    message: '',
  })
  const startedRef = useRef(false)
  const [honeypot, setHoneypot] = useState('')
  const renderedAt = useRef(Date.now())

  const sourcePage = typeof window !== 'undefined' ? window.location.pathname : ''
  const eventContext = {
    form_type: formType,
    form_page: sourcePage,
    source_page: sourcePage,
    content_group: defaultService,
    location: context,
  }

  const trackStart = () => {
    if (startedRef.current) return
    startedRef.current = true
    sendGAEvent('event', 'form_start', eventContext)
  }

  // form_start means "typed something", not "focus landed here".
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
          message: form.message || `Estimate request from the ${context || 'website'} page.`,
          sourcePage,
          locationContext: context,
          [HONEYPOT_NAME]: honeypot,
          _elapsedMs: Date.now() - renderedAt.current,
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
      console.error('[EstimateForm error]', err)
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
        <p className="text-gray-400">{sentMessage}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#141614] rounded-lg p-6 sm:p-8 space-y-4">
      <Honeypot value={honeypot} onChange={setHoneypot} />
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${idPrefix}-name`} className="block text-sm text-gray-400 mb-1">Name</label>
          <input
            id={`${idPrefix}-name`}
            type="text"
            required
            value={form.name}
            onChange={e => updateField('name', e.target.value)}
            className="w-full bg-[#0d0f0d] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#4a7c59]"
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-phone`} className="block text-sm text-gray-400 mb-1">Phone</label>
          <input
            id={`${idPrefix}-phone`}
            type="tel"
            required
            value={form.phone}
            onChange={e => updateField('phone', e.target.value)}
            className="w-full bg-[#0d0f0d] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#4a7c59]"
          />
        </div>
      </div>
      <div>
        <label htmlFor={`${idPrefix}-email`} className="block text-sm text-gray-400 mb-1">Email <span className="text-gray-600">(optional)</span></label>
        <input
          id={`${idPrefix}-email`}
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={e => updateField('email', e.target.value)}
          className="w-full bg-[#0d0f0d] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#4a7c59]"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${idPrefix}-service`} className="block text-sm text-gray-400 mb-1">Service Type</label>
          <select
            id={`${idPrefix}-service`}
            value={form.service}
            onChange={e => updateField('service', e.target.value)}
            className="w-full bg-[#0d0f0d] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#4a7c59]"
          >
            {SERVICE_OPTIONS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${idPrefix}-zip`} className="block text-sm text-gray-400 mb-1">Property Location</label>
          <input
            id={`${idPrefix}-zip`}
            type="text"
            placeholder="Town or zip code"
            value={form.zip}
            onChange={e => updateField('zip', e.target.value)}
            className="w-full bg-[#0d0f0d] border border-white/10 rounded px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#4a7c59]"
          />
        </div>
      </div>
      <div>
        <label htmlFor={`${idPrefix}-message`} className="block text-sm text-gray-400 mb-1">
          Tell us about the property <span className="text-gray-600">(optional)</span>
        </label>
        <textarea
          id={`${idPrefix}-message`}
          rows={3}
          placeholder="Acreage, what is on it now, and what you need it ready for."
          value={form.message}
          onChange={e => updateField('message', e.target.value)}
          className="w-full bg-[#0d0f0d] border border-white/10 rounded px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#4a7c59] resize-none"
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
