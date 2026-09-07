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
      console.log('[JOIN:spam-blocked]', spam)
      return NextResponse.json({ success: true })
    }

    const { name, email, phone, position, experience } = payload

    if (!name || !email || !position || !experience) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!isResendConfigured()) {
      console.error('[JOIN] RESEND_API_KEY missing — submission not delivered')
      return NextResponse.json({ error: 'Email is not configured' }, { status: 503 })
    }

    const htmlContent = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: #1a1c1a; color: white; padding: 24px; border-radius: 12px 12px 0 0;">
    <h1 style="margin: 0; font-size: 22px; color: #c2a878;">New Job Application</h1>
    <p style="margin: 8px 0 0; color: #9ca3af; font-size: 14px;">hlsdeland.com/join</p>
  </div>
  <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 10px 0; color: #64748b; font-size: 14px; width: 140px;">Name</td><td style="padding: 10px 0; font-weight: 600;">${esc(name)}</td></tr>
      <tr><td style="padding: 10px 0; color: #64748b; font-size: 14px;">Email</td><td style="padding: 10px 0;"><a href="mailto:${esc(email)}" style="color: #2563eb;">${esc(email)}</a></td></tr>
      ${phone ? `<tr><td style="padding: 10px 0; color: #64748b; font-size: 14px;">Phone</td><td style="padding: 10px 0;"><a href="tel:${esc(phone)}" style="color: #2563eb;">${esc(phone)}</a></td></tr>` : ''}
      <tr><td style="padding: 10px 0; color: #64748b; font-size: 14px;">Position</td><td style="padding: 10px 0; font-weight: 600;">${esc(position)}</td></tr>
    </table>
  </div>
  <div style="background: white; padding: 24px; border: 1px solid #e2e8f0; border-top: none;">
    <h2 style="margin: 0 0 12px; font-size: 16px; color: #0f172a;">Experience</h2>
    <p style="color: #475569; margin: 0; white-space: pre-wrap; line-height: 1.6;">${esc(experience)}</p>
  </div>
  <div style="background: #f8fafc; padding: 16px 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px; text-align: center;">
    <p style="margin: 0; color: #94a3b8; font-size: 12px;">Sent from hlsdeland.com job application form</p>
  </div>
</div>`.trim()

    const textContent = [
      'New Job Application — hlsdeland.com/join',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      `Position: ${position}`,
      '',
      'Experience:',
      experience,
    ]
      .filter((line) => line !== null)
      .join('\n')

    const sent = await sendFormEmail({
      subject: `Job Application: ${name} — ${position}`,
      html: htmlContent,
      text: textContent,
      replyTo: email,
    })

    if (!sent.ok) {
      console.error('[JOIN] Resend error:', sent.status, sent.error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 502 })
    }

    console.log(`[JOIN] Email sent for ${name} (${email}) — ${position}`)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[JOIN ERROR]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
