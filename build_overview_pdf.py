"""Generate HLS_Project_Overview.pdf — comprehensive project context for future Claude sessions."""
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    KeepTogether,
)

OUTPUT = r"C:\Users\OzThe\ClaudeWork\Co_Work_Projects\CatchyVid\hls-nextjs\HLS_Project_Overview.pdf"

# ── Brand colors (Ironclad theme) ──
DARK = colors.HexColor('#1a1c1a')
GREEN = colors.HexColor('#4a7c59')
TAN = colors.HexColor('#c2a878')
DARKER = colors.HexColor('#141614')
LIGHT_BG = colors.HexColor('#f5f5f4')
BORDER = colors.HexColor('#d4d4d4')

# ── Styles ──
styles = getSampleStyleSheet()

H1 = ParagraphStyle('H1', parent=styles['Heading1'], fontName='Helvetica-Bold',
                    fontSize=22, textColor=DARK, spaceAfter=12, spaceBefore=18, leading=26)
H2 = ParagraphStyle('H2', parent=styles['Heading2'], fontName='Helvetica-Bold',
                    fontSize=15, textColor=GREEN, spaceAfter=8, spaceBefore=14, leading=18)
H3 = ParagraphStyle('H3', parent=styles['Heading3'], fontName='Helvetica-Bold',
                    fontSize=12, textColor=DARK, spaceAfter=6, spaceBefore=10, leading=14)
Body = ParagraphStyle('Body', parent=styles['BodyText'], fontName='Helvetica',
                      fontSize=10, leading=14, spaceAfter=6, textColor=colors.HexColor('#1a1a1a'))
Mono = ParagraphStyle('Mono', parent=Body, fontName='Courier', fontSize=9, leading=12,
                      backColor=LIGHT_BG, borderColor=BORDER, borderWidth=0.5,
                      borderPadding=6, spaceAfter=8)
Label = ParagraphStyle('Label', parent=Body, fontName='Helvetica-Bold',
                       fontSize=9, textColor=TAN, spaceAfter=2)
TitleStyle = ParagraphStyle('Title', parent=styles['Title'], fontName='Helvetica-Bold',
                            fontSize=32, textColor=DARK, alignment=TA_CENTER, leading=38, spaceAfter=8)
Subtitle = ParagraphStyle('Subtitle', parent=Body, fontName='Helvetica',
                          fontSize=14, textColor=GREEN, alignment=TA_CENTER, leading=18, spaceAfter=24)
TitleMeta = ParagraphStyle('TitleMeta', parent=Body, fontName='Helvetica',
                           fontSize=10, textColor=colors.HexColor('#666'), alignment=TA_CENTER, leading=14)


def kv_table(rows, col_widths=None):
    """Two-column key/value table."""
    if col_widths is None:
        col_widths = [1.6*inch, 5.0*inch]
    data = [[Paragraph(f'<b>{k}</b>', Body), Paragraph(v, Body)] for k, v in rows]
    t = Table(data, colWidths=col_widths, hAlign='LEFT')
    t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BACKGROUND', (0,0), (0,-1), LIGHT_BG),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    return t


def section_table(header, rows, col_widths):
    """Header-row table for structured info."""
    data = [[Paragraph(f'<b>{h}</b>', ParagraphStyle('th', parent=Body, fontName='Helvetica-Bold', textColor=colors.white, fontSize=10)) for h in header]]
    for row in rows:
        data.append([Paragraph(c if isinstance(c, str) else str(c), Body) for c in row])
    t = Table(data, colWidths=col_widths, hAlign='LEFT', repeatRows=1)
    t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BACKGROUND', (0,0), (-1,0), GREEN),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('BACKGROUND', (0,1), (-1,-1), colors.white),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, LIGHT_BG]),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    return t


# ── Build the story ──
story = []

# ═══════════════════════════════════════════
# COVER
# ═══════════════════════════════════════════
story.append(Spacer(1, 2.2*inch))
story.append(Paragraph('Hoag Land Services', TitleStyle))
story.append(Paragraph('Website Project Overview', Subtitle))
story.append(Spacer(1, 0.6*inch))

cover_meta = [
    ['Client', 'Hoag Land Services, LLC (DeLand, FL)'],
    ['Owner', 'Tyler Hoag — ISA Certified Arborist (FL-9491A)'],
    ['Live URL', 'https://www.hlsdeland.com'],
    ['Tech Stack', 'Next.js 16 · React 19 · TypeScript · Tailwind · Vercel Pro'],
    ['Total Pages', '410+ (50 static + 3 dynamic [location] routes × 120 cities)'],
    ['Last Updated', 'May 2026'],
]
t = kv_table(cover_meta, col_widths=[1.4*inch, 4.4*inch])
t.hAlign = 'CENTER'
story.append(t)

story.append(Spacer(1, 0.8*inch))
story.append(Paragraph(
    'This document is a context briefing for future Claude Code or Claude.ai chat sessions. '
    'It captures architecture, deployment, important paths, environment variables, '
    'and the state of the SEO/content systems.',
    ParagraphStyle('cover-blurb', parent=Body, alignment=TA_CENTER, fontSize=10,
                   textColor=colors.HexColor('#555'), leading=14, leftIndent=0.5*inch, rightIndent=0.5*inch)))

story.append(PageBreak())

# ═══════════════════════════════════════════
# 1. PROJECT OVERVIEW
# ═══════════════════════════════════════════
story.append(Paragraph('1. Project Overview', H1))
story.append(Paragraph(
    'Hoag Land Services is a Central Florida land services company providing land clearing, '
    'site work, tree care, and fencing for residential and commercial properties. The website '
    'we built is a full production marketing site with deep SEO infrastructure, structured for '
    'AI-search visibility (LLM crawlers) as well as traditional Google ranking.',
    Body))

story.append(Paragraph(
    'The site replaced an older HTML site at the same domain. Key business positioning: '
    'family-owned, ISA Certified Arborist on staff, licensed and insured, established 2017, '
    '5.0 stars across 33 Google reviews.',
    Body))

story.append(Paragraph('Business contact info', H3))
story.append(kv_table([
    ['Phone', '(386) 561-0003 — tel:+13865610003'],
    ['Email', 'tyler@hlsdeland.com'],
    ['Address', 'DeLeon Springs, FL 32130'],
    ['Service area', 'DeLand, DeLeon Springs &amp; surrounding Central Florida (9 counties)'],
    ['Founded', '2017'],
    ['Facebook', 'facebook.com/hoaglandservices'],
    ['Instagram', 'instagram.com/hls_deland'],
]))

# ═══════════════════════════════════════════
# 2. TECH STACK
# ═══════════════════════════════════════════
story.append(Paragraph('2. Tech Stack', H1))
story.append(kv_table([
    ['Framework', 'Next.js 16.2.1 (App Router, Turbopack)'],
    ['UI Library', 'React 19.2.4'],
    ['Language', 'TypeScript 5'],
    ['Styling', 'Tailwind CSS (v4 inline @theme)'],
    ['Fonts', 'Inter (body) + Oswald (display) via next/font/google'],
    ['Email', 'Brevo API (transactional) for contact + job application forms'],
    ['Map', 'Mapbox GL (service-areas page)'],
    ['Deployment', 'Vercel Pro — team: service-storm, project: hoag-site'],
]))

story.append(Paragraph('Design system', H3))
story.append(kv_table([
    ['Primary BG', '#1a1c1a (dark)'],
    ['Darker BG', '#141614'],
    ['Darkest BG', '#0d0f0d (footer)'],
    ['Forest green accent', '#4a7c59 (buttons, hover, CTA)'],
    ['Warm tan secondary', '#c2a878 (labels, stars)'],
    ['Display font', 'Oswald — uppercase, bold, tracking-wider'],
    ['Body font', 'Inter — regular weight'],
]))

# ═══════════════════════════════════════════
# 3. REPOS & DEPLOYMENT
# ═══════════════════════════════════════════
story.append(Paragraph('3. Repositories &amp; Deployment', H1))

story.append(Paragraph('GitHub repos (kept in sync)', H3))
story.append(kv_table([
    ['Working repo', 'github.com/Oscaredgeiv/StormSiteDesigns (push commits here first)'],
    ['Production repo', 'github.com/Orbit-SS/orbit_sites_hoag_land_services_main_website'],
]))

story.append(Paragraph('Vercel', H3))
story.append(kv_table([
    ['Team', 'service-storm (team ID: team_ABBxDUrWTlwmYCaEBVM8xCOl)'],
    ['Project', 'hoag-site (project ID: prj_9wAYv244d0BNMPWNDH8bidEpLAgC)'],
    ['Plan', 'Pro (allows team-member commits to deploy)'],
    ['Live domain', 'https://www.hlsdeland.com (non-www 308 redirects to www)'],
    ['Vercel URL', 'hoag-site.vercel.app'],
]))

story.append(Paragraph('Deploy folder (Vercel CLI link)', H3))
story.append(Paragraph(
    'For CLI deploys without GitHub connection: <font face="Courier">/tmp/hoag-site-clone-new/</font>. '
    'Contains .vercel/project.json linked to hoag-site. When syncing code from the working folder, '
    '<b>always copy the FULL public/ tree</b> in addition to src/ — otherwise images deploy empty and break the site.',
    Body))

story.append(Paragraph('Sync command (use this before any CLI deploy):', Label))
story.append(Paragraph(
    'cp -r &lt;source&gt;/src &lt;deploy&gt;/<br/>'
    'cp -r &lt;source&gt;/public/* &lt;deploy&gt;/public/<br/>'
    'cp &lt;source&gt;/{next.config.ts,tsconfig.json,package.json,package-lock.json,postcss.config.mjs,eslint.config.mjs} &lt;deploy&gt;/<br/>'
    'cd &lt;deploy&gt; &amp;&amp; npx vercel --prod --yes --scope team_ABBxDUrWTlwmYCaEBVM8xCOl',
    Mono))

# ═══════════════════════════════════════════
# 4. ENVIRONMENT VARIABLES
# ═══════════════════════════════════════════
story.append(Paragraph('4. Environment Variables (Vercel)', H1))
story.append(Paragraph(
    'All set in Vercel project settings for production / preview / development environments. '
    'Never commit secrets to git.',
    Body))
story.append(section_table(
    ['Variable', 'Purpose / Notes'],
    [
        ['BREVO_API_KEY', 'Brevo transactional email API key. Used by /api/contact and /api/join. If invalid, forms silently 500. Regenerate at app.brevo.com → Account → SMTP &amp; API.'],
        ['CONTACT_TO_EMAIL', 'Recipient address (defaults to tyler@hlsdeland.com)'],
        ['NEXT_PUBLIC_MAPBOX_TOKEN', 'Mapbox public access token for service-areas map (NEXT_PUBLIC_ prefix exposes to client)'],
    ],
    [1.8*inch, 4.8*inch]
))

story.append(PageBreak())

# ═══════════════════════════════════════════
# 5. SITE ARCHITECTURE
# ═══════════════════════════════════════════
story.append(Paragraph('5. Site Architecture (410+ pages)', H1))

story.append(Paragraph('Top-level pages (6)', H3))
story.append(section_table(
    ['Route', 'Purpose'],
    [
        ['/', 'Home — hero, services overview, about teaser, reviews, CTA'],
        ['/about', 'Family + crew photos, founder bio, certs, service area'],
        ['/services', 'Hub — links to 3 category landings'],
        ['/portfolio', 'Project gallery (49 photos in categories)'],
        ['/contact', 'Contact form (Brevo) + direct contact info'],
        ['/join', 'Job application form (Brevo) + hiring info'],
        ['/service-areas', 'All cities listing + Mapbox map'],
    ],
    [1.8*inch, 4.8*inch]
))

story.append(Paragraph('Service category hubs (3)', H3))
story.append(section_table(
    ['Route', 'Purpose'],
    [
        ['/services/site-work', 'Site work hub — links to 4 subservices + 4 pain-point pages'],
        ['/services/tree-services', 'Tree services hub — links to 4 subservices + 4 pain-point pages'],
        ['/services/fencing', 'Fencing hub — links to 3 subservices + 4 pain-point pages'],
    ],
    [2.4*inch, 4.2*inch]
))

story.append(Paragraph('Subservice pages (11)', H3))
story.append(Paragraph(
    '<b>Site Work:</b> land-clearing · earthworks-excavation · erosion-control · environmental-services<br/>'
    '<b>Tree Services:</b> tree-removal · tree-trimming · palm-pruning · tree-installation<br/>'
    '<b>Fencing:</b> wood-fencing · vinyl-fencing · aluminum-fencing',
    Body))

story.append(Paragraph('Pain-point pages (12)', H3))
story.append(Paragraph(
    '<b>Site Work:</b> overgrown-land-clearing · drainage-grading · land-preparation · invasive-vegetation-removal<br/>'
    '<b>Tree Services:</b> dangerous-trees · storm-damage · overgrown-trees · wrong-tree-wrong-place<br/>'
    '<b>Fencing:</b> privacy-fencing · property-boundary · fence-replacement · livestock-containment',
    Body))

story.append(Paragraph('Static city pages (9)', H3))
story.append(Paragraph(
    '<b>Hand-built priority cities:</b> deland, daytona-beach, palm-coast — one per service category (×3 = 9). '
    'Richer than the dynamic template; these are the SEO priorities and should NOT regress to template content.',
    Body))

story.append(Paragraph('Dynamic city pages (~360)', H3))
story.append(Paragraph(
    'At <font face="Courier">/services/{site-work|tree-services|fencing}/[location]/page.tsx</font>. '
    '120 cities × 3 services = 360 prerendered pages. Each gets unique title (rotated across 4 patterns), '
    'description (4 patterns), H1 (3 patterns), and 3-paragraph local-context content (5 opener × 3 middle × 3 closer = 45 combos per character bucket).',
    Body))

story.append(Paragraph('API routes (3 — non-indexable)', H3))
story.append(section_table(
    ['Route', 'Purpose'],
    [
        ['/api/contact', 'POST handler for contact form → Brevo'],
        ['/api/join', 'POST handler for job application form → Brevo'],
        ['/api/approve', 'Legacy approval endpoint (from staging-mockup phase)'],
    ],
    [1.8*inch, 4.8*inch]
))

story.append(PageBreak())

# ═══════════════════════════════════════════
# 6. KEY FILE LOCATIONS
# ═══════════════════════════════════════════
story.append(Paragraph('6. Key File Locations', H1))
story.append(Paragraph('Local working tree: <font face="Courier">C:/Users/OzThe/ClaudeWork/Co_Work_Projects/CatchyVid/hls-nextjs/</font>', Body))

story.append(Paragraph('Data &amp; constants', H3))
story.append(section_table(
    ['File', 'Contents'],
    [
        ['src/shared/constants.ts', 'PHONE, EMAIL, OWNER, COMPANY, SITE_URL, IMAGES (51), FULL_GALLERY (49 with alts), CERTS, REVIEWS, ABOUT, CONTACT_CONTENT, HIRING, EST_YEAR (2017)'],
        ['src/data/locations.ts', 'ALL_LOCATIONS (122 cities) + SERVICE_CATEGORIES + STATIC_SERVICE_SLUGS. Top-of-file comment documents how to add a new service category.'],
        ['src/data/location-content.ts', 'Per-city content generator: rotates titles, descriptions, H1, intro/middle/closer paragraphs by character bucket (coastal/rural/suburban)'],
        ['src/types/location.ts', 'LocationPageData interface'],
    ],
    [2.4*inch, 4.2*inch]
))

story.append(Paragraph('Components', H3))
story.append(section_table(
    ['File', 'Purpose'],
    [
        ['src/components/Navigation.tsx', 'Sticky top nav, mobile hamburger, phone CTA'],
        ['src/components/Footer.tsx', '5-column footer (logo, quick links, services, top cities, contact + social)'],
        ['src/components/Breadcrumbs.tsx', 'Visible breadcrumb nav with pt-20 md:pt-24 to clear fixed nav'],
        ['src/components/BackButton.tsx', 'Sticky top-left back arrow (auto-detects parent route, hides on home)'],
        ['src/components/PageTransition.tsx', 'Fade-up animation on route change'],
        ['src/components/LocationPage.tsx', 'Shared template for all 120+ dynamic city pages'],
        ['src/components/ServiceAreasMap.tsx', 'Mapbox map (lazy-loaded, uses NEXT_PUBLIC_MAPBOX_TOKEN)'],
        ['src/components/ServiceAreaLinks.tsx', 'Internal linking helper'],
    ],
    [2.6*inch, 4.0*inch]
))

story.append(Paragraph('SEO infrastructure', H3))
story.append(section_table(
    ['File', 'Purpose'],
    [
        ['src/lib/schema.ts', 'JSON-LD schema helpers: localBusinessSchema, organizationSchema, serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd, abs'],
        ['src/app/layout.tsx', 'Root layout: title template, metadataBase, fonts, site-wide LocalBusiness JSON-LD, Nav + Footer + BackButton + PageTransition'],
        ['src/app/sitemap.ts', '402 URLs: core + service categories + STATIC_SERVICE_SLUGS + ALL_LOCATIONS×3'],
        ['src/app/robots.ts', 'Allow-all rules for traditional + AI crawlers (Googlebot, GPTBot, ClaudeBot, Perplexity, etc.)'],
        ['next.config.ts', 'Image config + AI-friendly X-Robots-Tag headers + 6 legacy .html 301 redirects'],
        ['public/llms.txt + llms-full.txt', 'Emerging standard for AI crawler site comprehension'],
    ],
    [2.0*inch, 4.6*inch]
))

story.append(Paragraph('Page structure pattern', H3))
story.append(Paragraph(
    'Every route uses this two-file split so metadata + JSON-LD can be server-rendered while interactive bits (FAQs, forms) stay client:',
    Body))
story.append(Paragraph(
    '<b>page.tsx</b> (server component) — exports Metadata, renders &lt;script type="application/ld+json"&gt;, then renders &lt;PageClient /&gt;<br/>'
    '<b>PageClient.tsx</b> (\'use client\') — entire interactive body. Owns useState for FAQ accordion, form state, etc.',
    Body))

story.append(PageBreak())

# ═══════════════════════════════════════════
# 7. SEO INFRASTRUCTURE
# ═══════════════════════════════════════════
story.append(Paragraph('7. SEO Infrastructure', H1))

story.append(Paragraph('Per-page metadata', H3))
story.append(Paragraph(
    'Every server page exports a Next.js Metadata object with: title (auto-suffixed by layout template), '
    'description, alternates.canonical (uses SITE_URL constant), openGraph (type/locale/siteName/title/desc/url/images), '
    'twitter (summary_large_image card), robots (index/follow/max-snippet/max-image-preview).',
    Body))
story.append(Paragraph(
    '<b>IMPORTANT:</b> Title rotation patterns in location-content.ts must NOT include the brand suffix — '
    'the layout template appends " | Hoag Land Services" automatically. Double-suffix bug was caught and fixed during QA.',
    Body))

story.append(Paragraph('JSON-LD schemas (live on production)', H3))
story.append(section_table(
    ['Page type', 'Schemas injected'],
    [
        ['Root layout (every page)', 'LocalBusiness'],
        ['Home', '+ WebPage'],
        ['About', '+ Organization + WebPage + BreadcrumbList'],
        ['Contact', '+ LocalBusiness (page-scoped) + WebPage + BreadcrumbList'],
        ['Services hub', '+ 3 Service schemas + WebPage + BreadcrumbList'],
        ['Category hubs (3)', '+ Service + FAQPage + WebPage + BreadcrumbList'],
        ['Subservice pages (11)', '+ Service + FAQPage + WebPage + BreadcrumbList'],
        ['Pain-point pages (12)', '+ Service + FAQPage + WebPage + BreadcrumbList'],
        ['Dynamic city pages', '+ LocalBusiness + TreeService/FenceContractor/GeneralContractor + BreadcrumbList + FAQPage + WebPage'],
    ],
    [2.0*inch, 4.6*inch]
))

story.append(Paragraph('Sitemap', H3))
story.append(Paragraph(
    '<font face="Courier">https://www.hlsdeland.com/sitemap.xml</font> — 402 URLs. '
    'Generated from sitemap.ts iterating core pages + SERVICE_CATEGORIES + STATIC_SERVICE_SLUGS + ALL_LOCATIONS. '
    'Submitted to Google Search Console under the www domain.',
    Body))

story.append(Paragraph('Legacy redirects (next.config.ts)', H3))
story.append(Paragraph(
    '6 permanent 308 redirects from the pre-rebuild HTML site: /index.html → / · /about.html → /about · '
    '/services.html → /services · /contact.html → /contact · /portfolio.html → /portfolio · /join.html → /join',
    Body))

# ═══════════════════════════════════════════
# 8. FORMS & EMAIL
# ═══════════════════════════════════════════
story.append(Paragraph('8. Forms &amp; Email', H1))
story.append(Paragraph(
    'Two forms submit to internal Next.js API routes which call Brevo\'s transactional email API.',
    Body))

story.append(Paragraph('Contact form (/contact)', H3))
story.append(kv_table([
    ['POST endpoint', '/api/contact'],
    ['Recipient', 'tyler@hlsdeland.com (CONTACT_TO_EMAIL env)'],
    ['Required fields', 'name, email, service, message'],
    ['Optional', 'phone, propertyLocation'],
    ['On success', '{"success": true} → form shows Message Sent'],
    ['On failure', '500 + Something went wrong message'],
]))

story.append(Paragraph('Job application (/join)', H3))
story.append(kv_table([
    ['POST endpoint', '/api/join'],
    ['Recipient', 'tyler@hlsdeland.com (CONTACT_TO_EMAIL env)'],
    ['Fields', 'name, email, phone (optional), position dropdown, experience textarea'],
    ['Positions', 'Equipment operator · Tree crew · Fence installer · General labor · Other'],
]))

story.append(Paragraph('Brevo gotchas', H3))
story.append(Paragraph(
    '• Invalid API key returns 401 from Brevo with {"code":"unauthorized","message":"Key not found"} — our API route logs the error but returns generic 500 to the client.<br/>'
    '• Sender email (leads@servicestorm.io) must be verified in Brevo Senders &amp; IPs.<br/>'
    '• To regenerate API key: app.brevo.com → Account → SMTP &amp; API → Generate.<br/>'
    '• Free tier: 300 emails/day.',
    Body))

story.append(PageBreak())

# ═══════════════════════════════════════════
# 9. CONTENT SYSTEM
# ═══════════════════════════════════════════
story.append(Paragraph('9. City Content System (Phase 5)', H1))
story.append(Paragraph(
    'To avoid Google flagging 360 dynamic city pages as duplicate content (the previous templating produced near-identical pages), '
    'the generator rotates phrasing patterns deterministically per slug. Same city always renders the same combination.',
    Body))

story.append(Paragraph('Variation budget per page', H3))
story.append(section_table(
    ['Element', 'Variants', 'How they\'re chosen'],
    [
        ['Title', '4 per service', 'variant(slug, 4) — stable hash'],
        ['Meta description', '4 per service', 'variant(slug, 4)'],
        ['H1 headline', '3 per service', 'variant(slug, 3)'],
        ['Opening paragraph', '5 × 3 character buckets', 'variant(slug, 5) within coastal/rural/suburban branch'],
        ['Middle paragraph', '3 per service', 'variant(slug, 3)'],
        ['Closing paragraph', '3 per service', 'variant(slug, 3)'],
        ['Subheadline', '2-3 per service', 'Branches by character (coastal/rural/other)'],
    ],
    [1.6*inch, 1.2*inch, 3.8*inch]
))

story.append(Paragraph('Character buckets', H3))
story.append(Paragraph(
    'Each city in locations.ts has a <font face="Courier">character</font> field used to select content branch:',
    Body))
story.append(section_table(
    ['Character', 'Cities', 'Content focus'],
    [
        ['coastal', 'Daytona Beach, Edgewater, Palm Coast, etc.', 'Salt spray, hurricane prep, palms/sabal/live oak, pool barriers'],
        ['rural', 'DeLeon Springs, Pierson, Geneva, etc.', 'Oak hammocks, acreage, pasture clearing, agricultural/equestrian'],
        ['suburban', 'DeLand, Sanford, Lake Mary, etc.', 'Tight lots, HOA, residential subdivisions'],
        ['urban', 'Orlando (only)', 'Treated as suburban with extra phrasing'],
    ],
    [1.2*inch, 2.6*inch, 2.8*inch]
))

story.append(Paragraph('Flagged for hand-written copy', H3))
story.append(Paragraph(
    'Closely-clustered groups where even rotation may not fully differentiate. Consider hand-writing these later:<br/>'
    '<b>Coastal cluster:</b> Daytona Beach Shores · Ponce Inlet · Wilbur-by-the-Sea · Bethune Beach · Glencoe<br/>'
    '<b>Rural Putnam cluster:</b> Hollister · Lake Como · Putnam Hall · Fruitland · Bostwick',
    Body))

# ═══════════════════════════════════════════
# 10. WORKING ON THIS PROJECT
# ═══════════════════════════════════════════
story.append(Paragraph('10. Working on This Project (Future Sessions)', H1))

story.append(Paragraph('Hard rules', H3))
story.append(Paragraph(
    '1. <b>All images LOCAL.</b> Reference /public paths (e.g. /photos/site1.JPEG). NEVER use external URLs — '
    'the previous site\'s photos disappeared when the domain was repointed.<br/>'
    '2. <b>Always sync public/ before deploy.</b> The deploy folder has had photos accidentally wiped before.<br/>'
    '3. <b>Brand details from constants.</b> Never hardcode PHONE, EMAIL, OWNER, etc.<br/>'
    '4. <b>Server-component pattern.</b> Route page.tsx is server with metadata + JSON-LD; PageClient.tsx is client.<br/>'
    '5. <b>Title patterns must NOT include brand suffix</b> — layout template auto-appends " | Hoag Land Services".<br/>'
    '6. <b>params is async in Next.js 16.</b> Use <font face="Courier">const { slug } = await params</font>.',
    Body))

story.append(Paragraph('Common commands', H3))
story.append(Paragraph(
    '<b>Build:</b> cd hls-nextjs &amp;&amp; npm run build<br/>'
    '<b>Dev:</b> cd hls-nextjs &amp;&amp; npm run dev (default port 3000)<br/>'
    '<b>Commit + push working repo:</b> git add -A &amp;&amp; git commit -m "..." &amp;&amp; git push origin main<br/>'
    '<b>Deploy:</b> sync to /tmp/hoag-site-clone-new/ then npx vercel --prod --yes --scope team_ABBxDUrWTlwmYCaEBVM8xCOl',
    Mono))

story.append(Paragraph('Adding a new service category', H3))
story.append(Paragraph(
    'See the top-of-file comment in src/data/locations.ts above SERVICE_CATEGORIES. '
    '7-step process: extend ServiceCategory type → add entry → add to STATIC_SERVICE_SLUGS → create '
    'folder structure → extend location-content.ts generators → title/H1 rotation auto-picks up → build &amp; verify sitemap. '
    'Should take 30 min for a new category.',
    Body))

story.append(Paragraph('Common pitfalls', H3))
story.append(Paragraph(
    '• <b>Broken plugin hook</b> ("check-sql-files.py") fires after every Edit but doesn\'t actually block — ignore it.<br/>'
    '• <b>Two lockfiles warning</b> at build time (parent CatchyVid/ has one, hls-nextjs/ has one) — harmless, can ignore.<br/>'
    '• <b>Image broken on first render</b> when checking with JS — Next.js Image is lazy-loaded, wait 2s before checking.<br/>'
    '• <b>Spencer (other dev)</b> commits sometimes get blocked by Vercel since his email isn\'t on the Pro team — push a follow-up commit under your identity to trigger deploy.',
    Body))

story.append(Paragraph('SEO follow-ups (per the May 2026 cleanup)', H3))
story.append(Paragraph(
    '• Submit https://www.hlsdeland.com/sitemap.xml to Google Search Console (resubmit if already there)<br/>'
    '• Request indexing on the 9 priority static city pages + 3 service hubs + 11 subservices<br/>'
    '• Re-check GSC \'Alternate page with proper canonical tag\' report in 4-6 weeks<br/>'
    '• Hand-write content for the 10 flagged closely-clustered cities when time allows<br/>'
    '• Add visible breadcrumbs to LocationPage.tsx (currently only JSON-LD breadcrumbs)<br/>'
    '• Consider adding stump-grinding and forestry-mulching as new service categories',
    Body))

# ═══════════════════════════════════════════
# Footer page
# ═══════════════════════════════════════════
story.append(Spacer(1, 0.4*inch))
story.append(Paragraph(
    'End of overview · Generated for Claude project context · Update this PDF after any significant architecture changes',
    ParagraphStyle('footer', parent=Body, fontSize=8, textColor=colors.HexColor('#999'),
                   alignment=TA_CENTER)))


# ── Build the PDF ──
def add_page_number(canvas, doc):
    canvas.saveState()
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(colors.HexColor('#999'))
    page_num = canvas.getPageNumber()
    canvas.drawRightString(7.75*inch, 0.4*inch, f'Page {page_num}')
    canvas.drawString(0.75*inch, 0.4*inch, 'Hoag Land Services — Project Overview')
    canvas.restoreState()


doc = SimpleDocTemplate(
    OUTPUT,
    pagesize=LETTER,
    leftMargin=0.75*inch,
    rightMargin=0.75*inch,
    topMargin=0.75*inch,
    bottomMargin=0.75*inch,
    title='Hoag Land Services — Project Overview',
    author='Generated by Claude',
)

doc.build(story, onFirstPage=add_page_number, onLaterPages=add_page_number)
print(f"PDF generated: {OUTPUT}")
