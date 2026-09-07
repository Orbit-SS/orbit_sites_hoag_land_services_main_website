import { NextRequest, NextResponse } from 'next/server'
import { sendFormEmail, isResendConfigured } from '@/lib/form-email'
import { renderBrandedEmail, type Field } from '@/lib/email-template'
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
      {
        label: 'Reply by Email',
        href: `mailto:${email}?subject=${encodeURIComponent(`Re: your ${service} estimate request`)}`,
      },
    ]

    const htmlContent = renderBrandedEmail({
      eyebrow: 'hlsdeland.com',
      title: 'New Estimate Request',
      preheader: `${name} — ${service}${locationContext ? ` in ${locationContext}` : ''}${phone ? ` · ${phone}` : ''}`,
      fields,
      body: { label: 'Message', text: message },
      actions,
      footerNote:
        'Submitted through the estimate request form on hlsdeland.com. Replying to this email goes straight to the customer.',
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
      'Message:',
      message,
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
