# Resend email setup — hlsdeland.com

Form notifications (`/api/contact`, `/api/join`) send through Resend on the
shared Service Storm account, matching axeengineering.com, welightkc.com and
coolerdoorparts.com.

Sending domain: **`send.hlsdeland.com`**
Resend domain id: `a9bf3302-330d-4a91-9958-fabb411e7a3d`
Region: `us-east-1`
Created: 2026-09-07 · status `not_started` until the DNS below is added.

## Why a `send.` subdomain and not the root

`hlsdeland.com` runs **live Zoho email** — `tyler@hlsdeland.com` depends on the
root MX records (`mx.zoho.com`, `mx2`, `mx3`). Verifying at the root would put
Resend's SPF and bounce-handling MX in contention with Zoho's.

Every record below sits under `send.` or `send.send.`, so **the root MX and TXT
records are never touched** and the client's mail is unaffected.

## Records to add — GoDaddy

DNS for this domain is at **GoDaddy** (NS `ns25`/`ns26.domaincontrol.com`), not
Cloudflare. Add at https://dcc.godaddy.com/control/portfolio → `hlsdeland.com`
→ DNS → Add. GoDaddy stores the host relative to the apex, so enter the Name
column exactly as written — do **not** append `.hlsdeland.com`.

| Type | Name | TTL | Value |
|---|---|---|---|
| TXT | `resend._domainkey.send` | Auto (1 hr) | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDNV1jdWWnnvYCOdjLPTkVS8vGn1ngfgWu8Amx0uKoiASEYEM5vB+y3cTgp90+cugFfWfKpXSZBPqZtd5neNSFvTAp6U/Jgju7VsvUDeWxGpSdZHJIoMLbK7cpSdIMsQlheATqZSOTuJQ+MXsllxvjCwnJaxhhpTkSY/wkCMhM6cwIDAQAB` |
| MX | `send.send` | Auto (1 hr) | `feedback-smtp.us-east-1.amazonses.com` · **priority 10** |
| TXT | `send.send` | Auto (1 hr) | `v=spf1 include:amazonses.com ~all` |

The DKIM value is one continuous string — paste it whole. GoDaddy will split it
into 255-char chunks internally, which is correct and expected.

**Do not add, edit or reorder any record whose Name is `@`.** Those are Zoho.

After the records propagate, click Verify on the Resend domain page. Typical
propagation on GoDaddy is 10–60 minutes.

## Vercel environment variables

Project `hoag-site` (team `service-storm`,
`prj_9wAYv244d0BNMPWNDH8bidEpLAgC`).

| Variable | Value | Scope |
|---|---|---|
| `RESEND_API_KEY` | `re_…` (shared Service Storm account) | Production, Preview |
| `FORM_FROM_EMAIL` | `Hoag Land Services <leads@send.hlsdeland.com>` | Production, Preview |
| `FORM_NOTIFY_EMAIL` | `tyler@hlsdeland.com` | Production, Preview |

Remove once cut over: `BREVO_API_KEY`, `CONTACT_TO_EMAIL`. Also stale on this
project: `MAIL_RELAY_URL`, `MAIL_RELAY_TOKEN`.

### Testing without emailing the client

`FORM_NOTIFY_OVERRIDE` reroutes every submission away from Tyler:

```
FORM_NOTIFY_OVERRIDE=oscar@servicestorm.io
```

Set it before exercising the forms on a preview deploy or locally; delete it
afterwards and delivery falls back to `FORM_NOTIFY_EMAIL`. The previous Brevo
setup had no such guard — any test submission went straight to the live client.

## What this replaced

Brevo, sending from `leads@servicestorm.io`. Every lead Tyler received came
from a Service Storm address on a Service Storm domain rather than his own.
