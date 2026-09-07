import { NextRequest, NextResponse } from 'next/server'
import { esc, sendFormEmail, isResendConfigured } from '@/lib/form-email'
import { spamReason } from '@/lib/antispam'

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()

    // Invisible anti-spam. Runs before validation and before any send, so junk
    // never reaches Tyler or burns a Resend send. A 200 keeps a bot from
    // learning which layer caught it.
    const spam = spamReason(payload)
    if (spam) {
      console.log('[CONTACT:spam-blocked]', spam)
      return NextResponse.json({ success: true })
    }

    const {
      name,
      email,
      phone,
      service,
      propertyLocation,
      message,
      sourcePage,
      locationContext,
    } = payload

    if (!name || !email || !service || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!isResendConfigured()) {
      console.error('[CONTACT] RESEND_API_KEY missing — submission not delivered')
      return NextResponse.json({ error: 'Email is not configured' }, { status: 503 })
    }

    const subjectContext = locationContext
      ? `${name} - ${service} in ${locationContext}`
      : `${name} - ${service}`

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

    const textContent = [
      'New Estimate Request — hlsdeland.com',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      `Service: ${service}`,
      propertyLocation ? `Property ZIP / Location: ${propertyLocation}` : null,
      locationContext ? `City / Page Context: ${locationContext}` : null,
      sourcePage ? `Source Page: ${sourcePage}` : null,
      '',
      'Message:',
      message,
    ]
      .filter((line) => line !== null)
      .join('\n')

    const sent = await sendFormEmail({
      subject: `New Estimate Request: ${subjectContext}`,
      html: htmlContent,
      text: textContent,
      replyTo: email,
    })

    if (!sent.ok) {
      console.error('[CONTACT] Resend error:', sent.status, sent.error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 502 })
    }

    console.log(`[CONTACT] Email sent for ${name} (${email}) - ${service}${locationContext ? ` @ ${locationContext}` : ''}`)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[CONTACT ERROR]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
