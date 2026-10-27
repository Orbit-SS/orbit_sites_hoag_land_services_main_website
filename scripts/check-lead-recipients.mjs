// Who actually ends up on a Hoag lead email, under each configuration.
//
// Written 27 Oct 2026 after Hoag's leads stopped reaching Orbit on 30 Sep.
// Orbit only ingests from its own seven mailboxes, so a lead that carries none
// of them is invisible to us no matter how well it delivers to the client.
// This prints the To and CC lists so that is checkable without sending mail.
//
//   node scripts/check-lead-recipients.mjs

const CASES = [
  {
    name: 'before 27 Oct (alias in CC only, nothing Orbit reads)',
    env: {
      FORM_NOTIFY_EMAIL: 'tyler@hlsdeland.com',
      CONTACT_CC_EMAIL: 'hoag.leads@servicestorm.io',
    },
  },
  {
    name: 'after the port, matching AXE',
    env: {
      FORM_NOTIFY_EMAIL: 'tyler@hlsdeland.com',
      LEAD_TRACKING_EMAIL: 'hoag.leads@servicestorm.io,oscar@servicestorm.io',
      CONTACT_CC_EMAIL: 'hoag.leads@servicestorm.io',
    },
  },
  {
    name: 'test override set',
    env: {
      FORM_NOTIFY_EMAIL: 'tyler@hlsdeland.com',
      LEAD_TRACKING_EMAIL: 'hoag.leads@servicestorm.io,oscar@servicestorm.io',
      FORM_NOTIFY_OVERRIDE: 'oscar@servicestorm.io',
    },
  },
]

const ORBIT_INBOXES = new Set([
  'sales@servicestorm.io', 'josey.h@servicestorm.io', 'savannah.r@servicestorm.io',
  'spencer@servicestorm.io', 'oscar@servicestorm.io', 'marketing@servicestorm.io',
  'support@servicestorm.io',
])

let failures = 0

for (const c of CASES) {
  for (const k of ['FORM_NOTIFY_EMAIL', 'LEAD_TRACKING_EMAIL', 'CONTACT_CC_EMAIL',
                   'FORM_NOTIFY_OVERRIDE']) {
    delete process.env[k]
  }
  Object.assign(process.env, c.env)

  const mod = await import('../src/lib/form-email.ts?' + Date.now())
  const to = mod.getNotifyRecipients()
  const cc = mod.getCcRecipients(to)
  const all = [...to, ...cc]
  const reachesOrbit = all.some((a) => ORBIT_INBOXES.has(a.toLowerCase()))

  console.log('\n' + c.name)
  console.log('   to : ' + to.join(', '))
  console.log('   cc : ' + (cc.length ? cc.join(', ') : '(none)'))
  console.log('   reaches Orbit: ' + (reachesOrbit ? 'yes' : 'NO'))

  const dupes = all.filter((a, i) => all.findIndex(
    (b) => b.toLowerCase() === a.toLowerCase()) !== i)
  if (dupes.length) {
    console.log('   DUPLICATE RECIPIENT: ' + dupes.join(', '))
    failures++
  }
  if (c.env.FORM_NOTIFY_OVERRIDE && all.some(
        (a) => a.toLowerCase() === 'tyler@hlsdeland.com')) {
    console.log('   LEAK: the override must never reach Tyler')
    failures++
  }
}

console.log('\n' + (failures ? failures + ' problem(s)' : 'all cases clean'))
process.exit(failures ? 1 : 0)
