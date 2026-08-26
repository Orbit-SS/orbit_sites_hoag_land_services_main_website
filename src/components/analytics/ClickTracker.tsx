'use client'

import { useEffect } from 'react'
import { sendGAEvent } from '@next/third-parties/google'

/**
 * Global click tracker. Mounts once from the root layout and attaches a single
 * delegated document click listener. Fires GA4 events for:
 *
 *   phone_click        - any <a href="tel:...">
 *   email_click        - any <a href="mailto:...">
 *   estimate_cta_click - any anchor with data-cta="estimate" OR text matching a
 *                        free-estimate / get-quote / get-started phrase
 *
 * All events include source_page (window.location.pathname) and cta_label (the
 * anchor's trimmed text, capped at 60 chars). No PII is ever transmitted.
 */

const ESTIMATE_CTA_TEXT = /free estimate|get.*estimate|get.*quote|get.*started|request.*estimate/i

function ctaLabel(el: HTMLAnchorElement): string {
  const t = (el.getAttribute('aria-label') || el.innerText || '').trim().replace(/\s+/g, ' ')
  return t.slice(0, 60)
}

export default function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null
      if (!target || !(target as HTMLElement).closest) return
      const anchor = (target as HTMLElement).closest('a') as HTMLAnchorElement | null
      if (!anchor) return

      const href = anchor.getAttribute('href') || ''
      const label = ctaLabel(anchor)
      const sourcePage = window.location.pathname

      if (href.startsWith('tel:')) {
        sendGAEvent('event', 'phone_click', {
          source_page: sourcePage,
          cta_label: label,
        })
        return
      }

      if (href.startsWith('mailto:')) {
        sendGAEvent('event', 'email_click', {
          source_page: sourcePage,
          cta_label: label,
        })
        return
      }

      const isCta = anchor.dataset.cta === 'estimate' || ESTIMATE_CTA_TEXT.test(label)
      if (isCta) {
        sendGAEvent('event', 'estimate_cta_click', {
          source_page: sourcePage,
          cta_label: label,
          cta_destination: href,
        })
      }
    }

    document.addEventListener('click', onClick, { capture: true, passive: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  return null
}
