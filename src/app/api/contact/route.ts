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
      console.log('[CONTACT:spam-blocked]', spam)
      // Copy to the tracking alias so a false positive is visible. Awaited so
      // the serverless instance is not frozen mid-send, but never allowed to
      // change the response a bot sees.
      await notifyBlockedSubmission({ reason: spam, formName: 'Estimate Request', payload })
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

    // Phone is the required contact channel now; email and message are
    // optional. Mirrors the form (see contact/PageClient.tsx for the why).
    if (!name || !phone || !service) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    // An email, when given, still has to be shaped like one: it becomes the
    // Reply-To header, and a malformed value would be injected into outbound mail.
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 })
    }

    if (!isResendConfigured()) {
      console.error('[CONTACT] RESEND_API_KEY missing — submission not delivered')
      return NextResponse.json({ error: 'Email is not configured' }, { status: 503 })
    }

    const subjectContext = locationContext
      ? `${name} - ${service} in ${locationContext}`
      : `${name} - ${service}`

    const telHref = `tel:${String(phone ?? '').replace(/[^\d+]/g, '')}`

    const fields: Field[] = [
      { label: 'Name', value: name },
      { label: 'Email', value: email, href: `mailto:${email}` },
      { label: 'Phone', value: phone, href: telHref },
      { label: 'Service', value: service },
      { label: 'Property ZIP', value: propertyLocation },
      { label: 'City / Page', value: locationContext },
      { label: 'Source Page', value: sourcePage, href: `https://www.hlsdeland.com${sourcePage}` },
    ]

    // Call first when there's a number: a lead answered in five minutes is a
    // different conversation than one answered tomorrow.
    const actions = [
      ...(phone ? [{ label: `Call ${String(name).trim().split(/\s+/)[0]}`, href: telHref }] : []),
      ...(email
        ? [
            {
              label: 'Reply by Email',
              href: `mailto:${email}?subject=${encodeURIComponent(`Re: your ${service} estimate request`)}`,
            },
          ]
        : []),
    ]

    const htmlContent = renderBrandedEmail({
      eyebrow: 'hlsdeland.com',
      title: 'New Estimate Request',
      preheader: `${name} — ${service}${locationContext ? ` in ${locationContext}` : ''}${phone ? ` · ${phone}` : ''}`,
      fields,
      body: message ? { label: 'Message', text: message } : undefined,
      actions,
      footerNote: email
        ? 'Submitted through the estimate request form on hlsdeland.com. Replying to this email goes straight to the customer.'
        : 'Submitted through the estimate request form on hlsdeland.com. No email was given — call the number above.',
    })

    const textContent = [
      'NEW ESTIMATE REQUEST — hlsdeland.com',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      `Service: ${service}`,
      propertyLocation ? `Property ZIP: ${propertyLocation}` : null,
      locationContext ? `City / Page: ${locationContext}` : null,
      sourcePage ? `Source Page: https://www.hlsdeland.com${sourcePage}` : null,
      '',
      message ? 'Message:' : null,
      message || null,
      '',
      '—',
      'Hoag Land Services, LLC · DeLeon Springs, FL 32130',
      '(386) 561-0003 · hlsdeland.com',
    ]
      .filter((line) => line !== null)
      .join('\n')

    const sent = await sendFormEmail({
      subject: `New Estimate Request: ${subjectContext}`,
      html: htmlContent,
      text: textContent,
      replyTo: email || undefined,
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
