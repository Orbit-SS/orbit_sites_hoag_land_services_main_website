import { NextRequest, NextResponse } from 'next/server'

const BREVO_API_KEY = process.env.BREVO_API_KEY || ''
// Vercel egress IPs are dynamic and the Brevo account is IP-allowlisted,
// so when these are set we send via the InterServer relay (allowlisted IP).
const MAIL_RELAY_URL = process.env.MAIL_RELAY_URL || ''
const MAIL_RELAY_TOKEN = process.env.MAIL_RELAY_TOKEN || ''
const USE_RELAY = Boolean(MAIL_RELAY_URL && MAIL_RELAY_TOKEN)
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'tyler@hlsdeland.com'
// Agency copy so leads are not lost if the client mailbox misses one.
const CC_EMAIL = process.env.CONTACT_CC_EMAIL ?? 'spencer@servicestorm.io'

function esc(v: unknown): string {
  const s = String(v ?? '')
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      email,
      phone,
      service,
      propertyLocation,
      message,
      sourcePage,
      locationContext,
    } = await request.json()

    if (!name || !email || !service || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const subjectContext = locationContext
      ? `${esc(name)} - ${esc(service)} in ${esc(locationContext)}`
      : `${esc(name)} - ${esc(service)}`

    const htmlContent = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: #1a1c1a; color: white; padding: 24px; border-radius: 12px 12px 0 0;">
    <h1 style="margin: 0; font-size: 22px; color: #c2a878;">New Estimate Request</h1>
    <p style="margin: 8px 0 0; color: #9ca3af; font-size: 14px;">hlsdeland.com</p>
  </div>
  <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 10px 0; color: #64748b; font-size: 14px; width: 160px;">Name</td><td style="padding: 10px 0; font-weight: 600;">${esc(name)}</td></tr>
      <tr><td style="padding: 10px 0; color: #64748b; font-size: 14px;">Email</td><td style="padding: 10px 0;"><a href="mailto:${esc(email)}" style="color: #2563eb;">${esc(email)}</a></td></tr>
      ${phone ? `<tr><td style="padding: 10px 0; color: #64748b; font-size: 14px;">Phone</td><td style="padding: 10px 0;"><a href="tel:${esc(phone)}" style="color: #2563eb;">${esc(phone)}</a></td></tr>` : ''}
      <tr><td style="padding: 10px 0; color: #64748b; font-size: 14px;">Service</td><td style="padding: 10px 0; font-weight: 600;">${esc(service)}</td></tr>
      ${propertyLocation ? `<tr><td style="padding: 10px 0; color: #64748b; font-size: 14px;">Property ZIP / Location</td><td style="padding: 10px 0;">${esc(propertyLocation)}</td></tr>` : ''}
      ${locationContext ? `<tr><td style="padding: 10px 0; color: #64748b; font-size: 14px;">City / Page Context</td><td style="padding: 10px 0; font-weight: 600;">${esc(locationContext)}</td></tr>` : ''}
      ${sourcePage ? `<tr><td style="padding: 10px 0; color: #64748b; font-size: 14px;">Source Page</td><td style="padding: 10px 0;"><a href="${esc(sourcePage)}" style="color: #2563eb;">${esc(sourcePage)}</a></td></tr>` : ''}
    </table>
  </div>
  <div style="background: white; padding: 24px; border: 1px solid #e2e8f0; border-top: none;">
    <h2 style="margin: 0 0 12px; font-size: 16px; color: #0f172a;">Message</h2>
    <p style="color: #475569; margin: 0; white-space: pre-wrap; line-height: 1.6;">${esc(message)}</p>
  </div>
  <div style="background: #f8fafc; padding: 16px 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px; text-align: center;">
    <p style="margin: 0; color: #94a3b8; font-size: 12px;">Sent from hlsdeland.com estimate request form</p>
  </div>
</div>`.trim()

    const recipients = [{ email: TO_EMAIL, name: 'Tyler Hoag' }]
    if (CC_EMAIL && CC_EMAIL !== TO_EMAIL) {
      recipients.push({ email: CC_EMAIL, name: 'Service Storm' })
    }

    const endpoint = USE_RELAY
      ? MAIL_RELAY_URL
      : 'https://api.brevo.com/v3/smtp/email'
    const authHeader: Record<string, string> = USE_RELAY
      ? { Authorization: `Bearer ${MAIL_RELAY_TOKEN}` }
      : { 'api-key': BREVO_API_KEY }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        ...authHeader,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'HLS Website', email: 'leads@servicestorm.io' },
        to: recipients,
        replyTo: { email, name },
        subject: `New Estimate Request: ${subjectContext}`,
        htmlContent,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('[CONTACT] Brevo error:', res.status, err)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    console.log(`[CONTACT] Email sent for ${name} (${email}) - ${service}${locationContext ? ` @ ${locationContext}` : ''}`)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[CONTACT ERROR]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
