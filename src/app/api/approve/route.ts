import { NextRequest, NextResponse } from 'next/server'
import { createTransport } from 'nodemailer'

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'support@servicestorm.io'
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com'
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587')
const SMTP_USER = process.env.SMTP_USER || ''
const SMTP_PASS = process.env.SMTP_PASS || ''
const FROM_EMAIL = process.env.FROM_EMAIL || SMTP_USER || 'noreply@servicestorm.io'

export async function POST(request: NextRequest) {
  try {
    const { clientName, clientEmail, notes, projectName, picks } = await request.json()

    if (!clientName || !clientEmail || !picks?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const picksFormatted = picks
      .map((p: { id: number; name: string; desc: string }, i: number) => `  Pick #${i + 1}: ${p.name} — ${p.desc}`)
      .join('\n')

    const emailBody = `
New Landing Page Approval Received
====================================

Project: ${projectName || 'N/A'}
Client Name: ${clientName}
Client Email: ${clientEmail}

Selected Concepts:
${picksFormatted}

${notes ? `Client Notes:\n${notes}` : 'No additional notes.'}

====================================
Submitted via ServiceStorm Staging
    `.trim()

    const htmlBody = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #0f172a; color: white; padding: 24px; border-radius: 12px 12px 0 0;">
    <h1 style="margin: 0; font-size: 22px;">Landing Page Approval</h1>
    <p style="margin: 8px 0 0; color: #94a3b8; font-size: 14px;">${projectName || 'Client Project'}</p>
  </div>
  <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Client</td><td style="padding: 8px 0; font-weight: 600;">${clientName}</td></tr>
      <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${clientEmail}" style="color: #2563eb;">${clientEmail}</a></td></tr>
    </table>
  </div>
  <div style="background: white; padding: 24px; border: 1px solid #e2e8f0; border-top: none;">
    <h2 style="margin: 0 0 16px; font-size: 16px; color: #0f172a;">Selected Concepts</h2>
    ${picks.map((p: { id: number; name: string; desc: string }) => `
      <div style="background: #f1f5f9; border-radius: 8px; padding: 12px 16px; margin-bottom: 8px;">
        <strong style="color: #0f172a;">${p.name}</strong>
        <div style="color: #64748b; font-size: 13px;">${p.desc}</div>
      </div>
    `).join('')}
  </div>
  ${notes ? `<div style="background: white; padding: 24px; border: 1px solid #e2e8f0; border-top: none;"><h2 style="margin: 0 0 8px; font-size: 16px;">Client Notes</h2><p style="color: #475569; margin: 0; white-space: pre-wrap;">${notes}</p></div>` : ''}
  <div style="background: #f8fafc; padding: 16px 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px; text-align: center;">
    <p style="margin: 0; color: #94a3b8; font-size: 12px;">Sent from ServiceStorm Landing Page Staging</p>
  </div>
</div>`.trim()

    if (SMTP_USER && SMTP_PASS) {
      const transporter = createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      })

      await transporter.sendMail({
        from: `"ServiceStorm Staging" <${FROM_EMAIL}>`,
        to: NOTIFY_EMAIL,
        cc: clientEmail,
        subject: `Landing Page Approval: ${projectName} — ${clientName}`,
        text: emailBody,
        html: htmlBody,
      })

      console.log(`[APPROVAL] Email sent to ${NOTIFY_EMAIL} for project "${projectName}"`)
    } else {
      console.log('[APPROVAL] SMTP not configured — logging:')
      console.log(emailBody)
    }

    return NextResponse.json({ success: true, message: 'Approval submitted' })
  } catch (err) {
    console.error('[APPROVAL ERROR]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
