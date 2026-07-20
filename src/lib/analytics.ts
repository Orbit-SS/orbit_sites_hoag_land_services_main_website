'use client'

type EventParameters = Record<string, string | number | boolean>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function trackEvent(
  eventName: string,
  parameters: EventParameters = {}
) {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    ((...args: unknown[]) => {
      window.dataLayer?.push(args)
    })

  window.gtag('event', eventName, parameters)
}
