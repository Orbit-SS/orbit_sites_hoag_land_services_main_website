import { NextRequest, NextResponse } from 'next/server'
import { createTransport } from 'nodemailer'

const NOTIFY_EMAIL =
  process.env.CONTACT_NOTIFY_EMAIL ||
  process.env.NOTIFY_EMAIL ||
  'tyler@hlsdeland.com'
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com'
const SMTP_PORT = Number.parseInt(process.env.SMTP_PORT || '587', 10)
const SMTP_USER = process.env.SMTP_USER || ''
const SMTP_PASS = process.env.SMTP_PASS || ''
const FROM_EMAIL = process.env.FROM_EMAIL || SMTP_USER || 'noreply@servicestorm.io'
const MAX_REQUEST_BYTES = 16_000

export const runtime = 'nodejs'

type ContactPayload = {
  name?: string
  email?: string
  phone?: string
  service?: string
  propertyLocation?: string
  message?: string
  source?: string
  company?: string
}

function cleanLine(value: unknown, maxLength = 300) {
  return typeof value === 'string'
    ? value.trim().replace(/[\r\n]+/g, ' ').slice(0, maxLength)
    : ''
}

function cleanMessage(value: unknown) {
  return typeof value === 'string' ? value.trim().slice(0, 3000) : ''
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(request: NextRequest) {
  const contentLength = Number.parseInt(
    request.headers.get('content-length') || '0',
    10
  )

  if (contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ error: 'Request is too large.' }, { status: 413 })
  }

  const origin = request.headers.get('origin')
  const allowedOriginHosts = new Set([
    'www.hlsdeland.com',
    'hlsdeland.com',
    '127.0.0.1',
    'localhost',
  ])

  if (origin) {
    try {
      if (!allowedOriginHosts.has(new URL(origin).hostname)) {
        return NextResponse.json(
          { error: 'Request origin is not allowed.' },
          { status: 403 }
        )
      }
    } catch {
      return NextResponse.json(
        { error: 'Request origin is not allowed.' },
        { status: 403 }
      )
    }
  }

  try {
    const body = (await request.json()) as ContactPayload

    if (cleanLine(body.company)) {
      return NextResponse.json({ success: true })
    }

    const lead = {
      name: cleanLine(body.name),
      email: cleanLine(body.email),
      phone: cleanLine(body.phone),
      service: cleanLine(body.service),
      propertyLocation: cleanLine(body.propertyLocation),
      message: cleanMessage(body.message),
      source: cleanLine(body.source, 1000),
    }

    if (
      !lead.name ||
      !lead.service ||
      !lead.message ||
      (!lead.email && !lead.phone)
    ) {
      return NextResponse.json(
        {
          error:
            'Please include your name, service needed, project details, and either a phone number or email.',
        },
        { status: 400 }
      )
    }

    if (lead.email && !isValidEmail(lead.email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    if (!SMTP_USER || !SMTP_PASS) {
      console.error('[CONTACT] SMTP is not configured; lead was not delivered')
      return NextResponse.json(
        { error: 'Online requests are temporarily unavailable. Please call us.' },
        { status: 503 }
      )
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

Project Details:
${lead.message}
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
    ]
      .map(
        ([label, value]) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #d9e2ec;color:#52606d;width:160px;">${label}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #d9e2ec;">${escapeHtml(value)}</td>
      </tr>`
      )
      .join('')}
  </table>
  <div style="border:1px solid #d9e2ec;border-top:0;padding:16px;">
    <h2 style="font-size:16px;margin:0 0 8px;">Project Details</h2>
    <p style="white-space:pre-wrap;margin:0;">${escapeHtml(lead.message)}</p>
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
  } catch (error) {
    console.error(
      '[CONTACT] Lead delivery failed',
      error instanceof Error ? error.message : 'Unknown error'
    )
    return NextResponse.json(
      { error: 'Unable to send your request. Please call us instead.' },
      { status: 500 }
    )
  }
}
