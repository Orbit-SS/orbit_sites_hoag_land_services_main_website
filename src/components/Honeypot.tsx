'use client'

import { HONEYPOT_NAME } from '@/lib/antispam'

/**
 * Hidden field that only a bot will fill. Render inside every public form.
 *
 * Positioned off-screen rather than `display:none`, because some bots skip
 * display-none fields and would sail past the trap. aria-hidden keeps it out
 * of the accessibility tree, tabIndex={-1} keeps it out of keyboard order, and
 * autoComplete="off" stops a browser autofilling it for a real user, which
 * would get that person's lead dropped.
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
        Company website (leave this empty)
        <input
          type="text"
          name={HONEYPOT_NAME}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </label>
    </div>
  )
}
