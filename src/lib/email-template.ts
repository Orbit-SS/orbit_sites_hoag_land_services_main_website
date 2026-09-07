// Branded HTML email shell for form notifications.
//
// Matches the site: the circular HLS badge, the Oswald-style condensed
// uppercase display type, forest green #4a7c59 and warm tan #c2a878 on the
// #0d0f0d/#1a1c1a darks.
//
// Email is not the web, so a few site conventions are deliberately dropped:
//
//   * Tables, not flex/grid. Outlook renders through Word, which has no
//     support for modern layout.
//   * Inline styles only, plus bgcolor attributes — Outlook drops background
//     colours declared in CSS shorthand.
//   * Oswald cannot be webfont-loaded in Gmail or Outlook. The display stack
//     falls back through Arial Narrow, which keeps the condensed uppercase
//     character rather than collapsing to something unrelated.
//   * The logo is referenced by absolute URL. Relative paths and CID
//     attachments both fail in webmail.
//   * Content sits on white rather than the site's dark. Tyler reads these on
//     a phone in the field, and lead details need maximum legibility; the
//     brand carries in the header, accent rules, buttons and footer.

import { esc } from './form-email'

const SITE = 'https://www.hlsdeland.com'
const LOGO = `${SITE}/photos/HLSlogo-nobackground.png`

const GREEN = '#4a7c59'
const GREEN_DARK = '#3d6b4a'
const TAN = '#c2a878'
const INK = '#0d0f0d'
const INK_SOFT = '#1a1c1a'

// Oswald first for the clients that honour it (Apple Mail), then condensed
// fallbacks so the display type keeps its proportions everywhere else.
const DISPLAY = "'Oswald','Arial Narrow',Arial,Helvetica,sans-serif"
const BODY = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif"

export type Field = { label: string; value: string; href?: string }

/** A row of the detail table. Empty values are dropped by the caller. */
function fieldRow({ label, value, href }: Field): string {
  const shown = href
    ? `<a href="${esc(href)}" style="color:${GREEN_DARK};text-decoration:underline">${esc(value)}</a>`
    : esc(value)
  return `<tr>
    <td style="padding:11px 16px 11px 0;font-family:${BODY};font-size:11px;letter-spacing:.09em;text-transform:uppercase;color:#7c8a7c;vertical-align:top;white-space:nowrap;border-bottom:1px solid #eceee9">${esc(label)}</td>
    <td style="padding:11px 0;font-family:${BODY};font-size:15px;color:${INK};vertical-align:top;border-bottom:1px solid #eceee9">${shown}</td>
  </tr>`
}

/**
 * Render the full branded email.
 *
 * @param eyebrow  Small tan label above the title, e.g. "hlsdeland.com".
 * @param title    Headline, e.g. "New Estimate Request".
 * @param preheader The grey line inbox lists show next to the subject. Without
 *                 it clients scrape the first visible text, which would be the
 *                 company name on every single message.
 * @param fields   Detail rows. Blank values are skipped.
 * @param body     Optional free-text block (the message / experience answer).
 * @param bodyLabel Heading for that block.
 * @param actions  Buttons — first is solid green, rest outlined.
 */
export function renderBrandedEmail(opts: {
  eyebrow: string
  title: string
  preheader: string
  fields: Field[]
  body?: { label: string; text: string }
  actions?: { label: string; href: string }[]
  footerNote: string
}): string {
  const rows = opts.fields
    .filter((f) => String(f.value ?? '').trim())
    .map(fieldRow)
    .join('')

  const bodyBlock = opts.body?.text?.trim()
    ? `<tr><td class="em-pad" style="padding:26px 32px 0">
         <p style="margin:0 0 8px;font-family:${BODY};font-size:11px;letter-spacing:.09em;text-transform:uppercase;color:#7c8a7c">${esc(opts.body.label)}</p>
         <div style="background:#f6f7f4;border-left:3px solid ${GREEN};padding:14px 16px">
           <p style="margin:0;font-family:${BODY};font-size:15px;line-height:1.6;color:#2b332b;white-space:pre-wrap">${esc(opts.body.text)}</p>
         </div>
       </td></tr>`
    : ''

  // Buttons are table cells, not <a> blocks: Outlook ignores padding on inline
  // anchors, which would collapse them to bare underlined text.
  const actionBlock = opts.actions?.length
    ? `<tr><td class="em-pad" style="padding:26px 32px 4px">
         <table role="presentation" class="em-btn-row" cellpadding="0" cellspacing="0" border="0"><tr>${opts.actions
           .map((a, i) => {
             const solid = i === 0
             const bg = solid ? GREEN : '#ffffff'
             const fg = solid ? '#ffffff' : GREEN_DARK
             const border = solid ? GREEN : '#c9d2c6'
             return `<td class="em-btn" bgcolor="${bg}" style="background:${bg};border:1px solid ${border};padding:0;mso-padding-alt:0" ${i ? 'valign="middle"' : ''}>
               <a href="${esc(a.href)}" style="display:inline-block;padding:12px 22px;font-family:${DISPLAY};font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${fg};text-decoration:none">${esc(a.label)}</a>
             </td>${i < opts.actions!.length - 1 ? '<td class="em-btn-gap" style="width:10px">&nbsp;</td>' : ''}`
           })
           .join('')}</tr></table>
       </td></tr>`
    : ''

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>${esc(opts.title)}</title>
<style type="text/css">
/* The 600px table needs the width ATTRIBUTE for Outlook, and that attribute
   beats max-width — so on a narrow screen the layout overflows instead of
   reflowing. These overrides fix that everywhere media queries are honoured
   (iOS Mail, Apple Mail, Gmail app, most Android clients). Outlook desktop
   ignores them and keeps the fixed 600px, which is correct there anyway. */
@media only screen and (max-width:620px) {
  .em-wrap { width:100% !important; }
  .em-pad { padding-left:20px !important; padding-right:20px !important; }
  .em-title { font-size:22px !important; }
  .em-brand { font-size:16px !important; letter-spacing:.10em !important; }
  /* Stack the actions and let each fill the row — a thumb target, not a link. */
  .em-btn, .em-btn a { display:block !important; width:100% !important; box-sizing:border-box !important; text-align:center !important; }
  .em-btn-gap { display:none !important; }
  .em-btn-row, .em-btn-row tr, .em-btn-row td { display:block !important; width:100% !important; }
  .em-btn { margin-bottom:10px !important; }
}
</style>
</head>
<body style="margin:0;padding:0;background:#e8eae5">
<!-- Preheader: shown in the inbox list, never in the open message. -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all">${esc(opts.preheader)}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#e8eae5" style="background:#e8eae5">
<tr><td align="center" style="padding:24px 12px">

  <table role="presentation" class="em-wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;border-collapse:collapse">

    <!-- Brand header -->
    <tr><td class="em-pad" bgcolor="${INK}" style="background:${INK};padding:26px 32px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td width="52" style="width:52px;vertical-align:middle">
          <img src="${LOGO}" width="52" height="52" alt="Hoag Land Services"
               style="display:block;width:52px;height:52px;border:0;outline:none;text-decoration:none" />
        </td>
        <td style="padding-left:14px;vertical-align:middle">
          <div style="font-family:${DISPLAY};font-size:19px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:#ffffff;line-height:1.2" class="em-brand">Hoag Land Services</div>
          <div style="font-family:${BODY};font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:${TAN};padding-top:4px">Land Clearing &middot; Site Work &middot; Tree Services</div>
        </td>
      </tr></table>
    </td></tr>

    <!-- Accent rule -->
    <tr><td bgcolor="${GREEN}" style="background:${GREEN};height:4px;line-height:4px;font-size:0">&nbsp;</td></tr>

    <!-- Title -->
    <tr><td class="em-pad" bgcolor="${INK_SOFT}" style="background:${INK_SOFT};padding:22px 32px">
      <div style="font-family:${BODY};font-size:11px;letter-spacing:.11em;text-transform:uppercase;color:${TAN};padding-bottom:6px">${esc(opts.eyebrow)}</div>
      <div class="em-title" style="font-family:${DISPLAY};font-size:27px;font-weight:700;letter-spacing:.045em;text-transform:uppercase;color:#ffffff;line-height:1.15">${esc(opts.title)}</div>
    </td></tr>

    <!-- Detail card -->
    <tr><td class="em-pad" bgcolor="#ffffff" style="background:#ffffff;padding:8px 32px 0">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>
    </td></tr>

    ${bodyBlock ? `<tr><td bgcolor="#ffffff" style="background:#ffffff;padding:0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${bodyBlock}</table></td></tr>` : ''}
    ${actionBlock ? `<tr><td bgcolor="#ffffff" style="background:#ffffff;padding:0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${actionBlock}</table></td></tr>` : ''}

    <tr><td class="em-pad" bgcolor="#ffffff" style="background:#ffffff;padding:28px 32px 0"><div style="height:1px;background:#eceee9;font-size:0;line-height:1px">&nbsp;</div></td></tr>
    <tr><td class="em-pad" bgcolor="#ffffff" style="background:#ffffff;padding:14px 32px 26px">
      <p style="margin:0;font-family:${BODY};font-size:12px;line-height:1.6;color:#8a948a">${esc(opts.footerNote)}</p>
    </td></tr>

    <!-- Footer -->
    <tr><td class="em-pad" bgcolor="${INK}" style="background:${INK};padding:22px 32px">
      <div style="font-family:${DISPLAY};font-size:14px;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:#ffffff">Hoag Land Services, LLC</div>
      <div style="font-family:${BODY};font-size:12px;line-height:1.8;color:#98a398;padding-top:7px">
        DeLeon Springs, FL 32130 &middot; Established 2017<br />
        <a href="tel:+13865610003" style="color:${TAN};text-decoration:none">(386) 561-0003</a>
        &nbsp;&middot;&nbsp;
        <a href="${SITE}" style="color:${TAN};text-decoration:none">hlsdeland.com</a>
      </div>
    </td></tr>

  </table>

</td></tr>
</table>
</body>
</html>`
}
