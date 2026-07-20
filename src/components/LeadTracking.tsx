'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

export default function LeadTracking() {
  useEffect(() => {
    const trackLeadClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return

      const link = event.target.closest<HTMLAnchorElement>('a[href]')
      if (!link) return

      const href = link.getAttribute('href') || ''
      const sharedParameters = {
        link_url: link.href,
        page_location: window.location.href,
      }

      if (href.startsWith('tel:')) {
        trackEvent('phone_click', {
          ...sharedParameters,
          lead_type: 'phone',
        })
      } else if (href.startsWith('mailto:')) {
        trackEvent('email_click', {
          ...sharedParameters,
          lead_type: 'email',
        })
      } else if (new URL(link.href, window.location.href).pathname === '/contact') {
        trackEvent('estimate_cta_click', {
          ...sharedParameters,
          lead_type: 'estimate',
        })
      }
    }

    document.addEventListener('click', trackLeadClick, { capture: true })
    return () =>
      document.removeEventListener('click', trackLeadClick, { capture: true })
  }, [])

  return null
}
