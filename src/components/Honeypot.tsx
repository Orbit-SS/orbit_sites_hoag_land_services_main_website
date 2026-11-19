'use client'

import { HONEYPOT_NAME } from '@/lib/antispam'

/**
 * Hidden field that only a bot will fill. Render inside every public form.
 *
 * Positioned off-screen rather than `display:none`, because some bots skip
 * display-none fields and would sail past the trap. aria-hidden keeps it out
 * of the accessibility tree and tabIndex={-1} keeps it out of keyboard order.
 *
 * Nothing here names a real-world data type. The label used to read "Company
 * website" and the field was called `company_website`, so on 19 Nov 2026
 * Chrome autofilled a customer's employer into it and his lead was blocked.
 * `autoComplete="off"` was already set; Chrome is free to ignore it, and did.
 * `autoComplete="new-password"` is honoured far more consistently, and a
 * meaningless name gives autofill nothing to match in the first place.
 *
 * Controlled, because this site's forms post JSON from React state rather
 * than a FormData scrape of the DOM.
 */
export function Honeypot({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '-9999px',
        top: '-9999px',
        height: 0,
        width: 0,
        overflow: 'hidden',
      }}
    >
      <label>
        Leave this field empty
        <input
          type="text"
          name={HONEYPOT_NAME}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          tabIndex={-1}
          autoComplete="new-password"
          data-lpignore="true"
          data-form-type="other"
        />
      </label>
    </div>
  )
}
