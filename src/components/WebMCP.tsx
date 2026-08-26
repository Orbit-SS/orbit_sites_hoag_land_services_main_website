'use client'

import { useEffect } from 'react'

/**
 * WebMCP — exposes this site's tools to an agent driving the browser.
 *
 * Registers with `navigator.modelContext.provideContext()`. The API is a
 * Chrome Early Preview at time of writing, so everything here is behind a
 * feature check and the site is unaffected where it is absent.
 *
 * WHY THESE TOOLS AND NOT OTHERS
 *
 * Every tool is read-only, plus one that navigates. There is deliberately no
 * tool that submits the estimate form. An agent that could submit unattended
 * would put unreviewed lead submissions into a real person's inbox, and the
 * form is already the spam-hardened path with a honeypot and a timing trap.
 * `open_estimate_form` navigates the person to the form and lets them fill and
 * submit it themselves.
 *
 * Nothing here accepts personal data as an argument, so nothing personal ends
 * up in a tool call, a URL, or an agent transcript.
 */

type WebMCPTool = {
  name: string
  description: string
  inputSchema: Record<string, unknown>
  execute: (args: Record<string, unknown>) => Promise<{ content: Array<{ type: string; text: string }> }>
}

declare global {
  interface Navigator {
    modelContext?: {
      provideContext: (context: { tools: WebMCPTool[] }) => void
    }
  }
}

function text(value: unknown) {
  return {
    content: [
      { type: 'text', text: typeof value === 'string' ? value : JSON.stringify(value, null, 2) },
    ],
  }
}

export default function WebMCP() {
  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.modelContext) return

    const tools: WebMCPTool[] = [
      {
        name: 'check_service_area',
        description:
          'Check whether Hoag Land Services covers a Central Florida city, and get the page URLs for it. Accepts a city name, a city slug, or a ZIP code.',
        inputSchema: {
          type: 'object',
          properties: {
            location: {
              type: 'string',
              description: 'City name, slug, or ZIP. Example: "Palm Coast" or "32164".',
            },
          },
          required: ['location'],
        },
        execute: async args => {
          const query = encodeURIComponent(String(args.location ?? ''))
          const res = await fetch(`/api/v1/service-areas?q=${query}`)
          return text(await res.json())
        },
      },
      {
        name: 'list_services',
        description:
          'List the three service lines — site work and land clearing, tree services, fencing — and every sub-service under each, with page URLs.',
        inputSchema: { type: 'object', properties: {} },
        execute: async () => {
          const res = await fetch('/api/v1/services')
          return text(await res.json())
        },
      },
      {
        name: 'get_contact_details',
        description:
          'Phone number, email, credentials, and rating for Hoag Land Services, plus how estimates are actually requested. Prices are never quoted without walking the property.',
        inputSchema: { type: 'object', properties: {} },
        execute: async () => {
          const res = await fetch('/api/v1/company')
          return text(await res.json())
        },
      },
      {
        name: 'open_estimate_form',
        description:
          'Navigate to the free estimate request form so the person can fill it in themselves. Does not submit anything and does not accept any personal details as arguments.',
        inputSchema: { type: 'object', properties: {} },
        execute: async () => {
          window.location.href = '/contact'
          return text('Navigated to the estimate request form at /contact. The person fills it in and submits it themselves.')
        },
      },
    ]

    navigator.modelContext.provideContext({ tools })
  }, [])

  return null
}
