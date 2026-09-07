import { NextRequest, NextResponse } from 'next/server'
import { sendFormEmail, isResendConfigured } from '@/lib/form-email'
import { renderBrandedEmail, type Field } from '@/lib/email-template'
import { spamReason } from '@/lib/antispam'
import { notifyBlockedSubmission } from '@/lib/spam-notice'

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()

    // Invisible anti-spam. Runs before validation and before any send, so junk
    // never reaches Tyler or burns a Resend send. A 200 keeps a bot from
    // learning which layer caught it.
    const spam = spamReason(payload)
    if (spam) {
      console.log('[JOIN:spam-blocked]', spam)
      // Copy to the tracking alias so a false positive is visible. Awaited so
      // the serverless instance is not frozen mid-send, but never allowed to
      // change the response a bot sees.
      await notifyBlockedSubmission({ reason: spam, formName: 'Job Application', payload })
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

    const telHref = `tel:${String(phone ?? '').replace(/[^\d+]/g, '')}`

    const fields: Field[] = [
      { label: 'Name', value: name },
      { label: 'Email', value: email, href: `mailto:${email}` },
      { label: 'Phone', value: phone, href: telHref },
      { label: 'Position', value: position },
    ]

    const actions = [
      ...(phone ? [{ label: `Call ${String(name).trim().split(/\s+/)[0]}`, href: telHref }] : []),
      {
        label: 'Reply by Email',
        href: `mailto:${email}?subject=${encodeURIComponent(`Your application — ${position}`)}`,
      },
    ]

    const htmlContent = renderBrandedEmail({
      eyebrow: 'hlsdeland.com/join',
      title: 'New Job Application',
      preheader: `${name} — ${position}${phone ? ` · ${phone}` : ''}`,
      fields,
      body: { label: 'Experience', text: experience },
      actions,
      footerNote:
        'Submitted through the job application form on hlsdeland.com. Replying to this email goes straight to the applicant.',
    })

    const textContent = [
      'NEW JOB APPLICATION — hlsdeland.com/join',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      `Position: ${position}`,
      '',
      'Experience:',
      experience,
      '',
      '—',
      'Hoag Land Services, LLC · DeLeon Springs, FL 32130',
      '(386) 561-0003 · hlsdeland.com',
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
