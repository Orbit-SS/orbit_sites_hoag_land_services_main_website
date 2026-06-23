import { NextRequest, NextResponse } from 'next/server'
import { createTransport } from 'nodemailer'

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'support@servicestorm.io'
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com'
const SMTP_PORT = Number.parseInt(process.env.SMTP_PORT || '587', 10)
const SMTP_USER = process.env.SMTP_USER || ''
const SMTP_PASS = process.env.SMTP_PASS || ''
const FROM_EMAIL = process.env.FROM_EMAIL || SMTP_USER || 'noreply@servicestorm.io'

type ContactPayload = {
  name?: string
  email?: string
  phone?: string
  service?: string
  propertyLocation?: string
  message?: string
  source?: string
  zip?: string
  company?: string
}

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim().slice(0, 2000) : ''
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactPayload

    if (clean(body.company)) {
      return NextResponse.json({ success: true })
    }

    const lead = {
      name: clean(body.name),
      email: clean(body.email),
      phone: clean(body.phone),
      service: clean(body.service),
      propertyLocation: clean(body.propertyLocation || body.zip),
      message: clean(body.message),
      source: clean(body.source),
    }

    if (!lead.name || (!lead.email && !lead.phone) || !lead.service) {
      return NextResponse.json(
        { error: 'Please include your name, service needed, and either a phone number or email.' },
        { status: 400 }
      )
    }

    if (!SMTP_USER || !SMTP_PASS) {
      console.error('[CONTACT] SMTP not configured; lead not delivered', {
        source: lead.source,
        service: lead.service,
      })
      return NextResponse.json({ error: 'Lead delivery is not configured.' }, { status: 503 })
    }

    const textBody = `
New Hoag Land Services Lead
===========================

Name: ${lead.name}
Email: ${lead.email || 'Not provided'}
Phone: ${lead.phone || 'Not provided'}
Service: ${lead.service}
Property Location: ${lead.propertyLocation || 'Not provided'}
Source Page: ${lead.source || 'Not provided'}

Message:
${lead.message || 'Not provided'}
    `.trim()

    const htmlBody = `
<div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #1f2933;">
  <h1 style="background:#172018;color:#fff;padding:20px;margin:0;">New Hoag Land Services Lead</h1>
  <table style="width:100%;border-collapse:collapse;border:1px solid #d9e2ec;">
    ${[
      ['Name', lead.name],
      ['Email', lead.email || 'Not provided'],
      ['Phone', lead.phone || 'Not provided'],
      ['Service', lead.service],
      ['Property Location', lead.propertyLocation || 'Not provided'],
      ['Source Page', lead.source || 'Not provided'],
    ].map(([label, value]) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #d9e2ec;color:#52606d;width:160px;">${label}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #d9e2ec;">${escapeHtml(value)}</td>
      </tr>
    `).join('')}
  </table>
  <div style="border:1px solid #d9e2ec;border-top:0;padding:16px;">
    <h2 style="font-size:16px;margin:0 0 8px;">Message</h2>
    <p style="white-space:pre-wrap;margin:0;">${escapeHtml(lead.message || 'Not provided')}</p>
  </div>
</div>`.trim()

    const transporter = createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })

    await transporter.sendMail({
      from: `"Hoag Land Services Website" <${FROM_EMAIL}>`,
      to: NOTIFY_EMAIL,
      replyTo: lead.email || undefined,
      subject: `Hoag website lead: ${lead.service} - ${lead.name}`,
      text: textBody,
      html: htmlBody,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[CONTACT ERROR]', err)
    return NextResponse.json({ error: 'Unable to send request.' }, { status: 500 })
  }
}
