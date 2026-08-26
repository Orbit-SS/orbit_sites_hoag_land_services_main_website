"""Generate HLS_Sales_Cheatsheet.pdf — at-a-glance talking points for the Tyler conversation."""
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
)

OUTPUT = r"C:\Users\OzThe\ClaudeWork\Co_Work_Projects\CatchyVid\hls-nextjs\HLS_Sales_Cheatsheet.pdf"

DARK = colors.HexColor('#1a1c1a')
GREEN = colors.HexColor('#4a7c59')
TAN = colors.HexColor('#9a7b4f')
DARK_GREEN = colors.HexColor('#3d6a4a')
SOFT_BG = colors.HexColor('#f4f4f2')
NUM_BG = colors.HexColor('#eef3eb')
WARN_BG = colors.HexColor('#fef3e7')
QUOTE_BG = colors.HexColor('#2a3a2e')
BORDER = colors.HexColor('#d4d4d4')
GREY = colors.HexColor('#555')
TIER_FLOOR_BG = colors.HexColor('#f7f4ed')
TIER_MID_BG = colors.HexColor('#fbf6ec')
TIER_TOP_BG = colors.HexColor('#e8f2ea')

styles = getSampleStyleSheet()

PageTitle = ParagraphStyle('PageTitle', parent=styles['Title'], fontName='Helvetica-Bold',
                           fontSize=20, textColor=DARK, alignment=TA_CENTER, leading=24, spaceAfter=2)
TopSub = ParagraphStyle('TopSub', parent=styles['BodyText'], fontName='Helvetica',
                        fontSize=10, textColor=GREEN, alignment=TA_CENTER, leading=12, spaceAfter=12)
SectionH = ParagraphStyle('SectionH', parent=styles['Heading2'], fontName='Helvetica-Bold',
                          fontSize=11.5, textColor=colors.white, spaceBefore=0, spaceAfter=0,
                          leftIndent=8, leading=14, alignment=TA_LEFT)
BodyB = ParagraphStyle('BodyB', parent=styles['BodyText'], fontName='Helvetica',
                       fontSize=9.5, leading=13, textColor=colors.HexColor('#1a1a1a'), spaceAfter=4)
NumBig = ParagraphStyle('NumBig', parent=styles['BodyText'], fontName='Helvetica-Bold',
                        fontSize=22, textColor=GREEN, alignment=TA_CENTER, leading=24, spaceAfter=0)
NumLabel = ParagraphStyle('NumLabel', parent=styles['BodyText'], fontName='Helvetica',
                          fontSize=8, textColor=DARK, alignment=TA_CENTER, leading=10, spaceAfter=0)
QuoteText = ParagraphStyle('QuoteText', parent=styles['BodyText'], fontName='Helvetica-Oblique',
                           fontSize=10, textColor=colors.white, leading=14, spaceAfter=4,
                           leftIndent=8, rightIndent=8)
TierTitle = ParagraphStyle('TierTitle', parent=styles['Heading2'], fontName='Helvetica-Bold',
                           fontSize=11, textColor=DARK, leading=13, spaceAfter=2,
                           alignment=TA_CENTER)
TierPrice = ParagraphStyle('TierPrice', parent=styles['BodyText'], fontName='Helvetica-Bold',
                           fontSize=18, textColor=GREEN, leading=20, alignment=TA_CENTER, spaceAfter=2)
TierTag = ParagraphStyle('TierTag', parent=styles['BodyText'], fontName='Helvetica-Oblique',
                         fontSize=8, textColor=GREY, leading=10, alignment=TA_CENTER, spaceAfter=6)
TierItem = ParagraphStyle('TierItem', parent=styles['BodyText'], fontName='Helvetica',
                          fontSize=8.5, leading=11.5, textColor=colors.HexColor('#1a1a1a'), spaceAfter=2)
ChartHeader = ParagraphStyle('ChartHeader', parent=styles['BodyText'], fontName='Helvetica-Bold',
                             fontSize=9.5, textColor=colors.white, alignment=TA_CENTER, leading=11)
ChartFeature = ParagraphStyle('ChartFeature', parent=styles['BodyText'], fontName='Helvetica',
                              fontSize=8.5, textColor=DARK, leading=11)
ChartCell = ParagraphStyle('ChartCell', parent=styles['BodyText'], fontName='Helvetica-Bold',
                           fontSize=10, alignment=TA_CENTER, leading=12)

story = []


def section_header(label):
    t = Table([[Paragraph(label.upper(), SectionH)]], colWidths=[7.0*inch], rowHeights=[20])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), GREEN),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    return t


def bullet_block(items):
    rows = [[Paragraph(f'<font color="#4a7c59"><b>&bull;</b></font>', BodyB),
             Paragraph(t, BodyB)] for t in items]
    t = Table(rows, colWidths=[0.18*inch, 6.7*inch])
    t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    return t


def number_cards(cards):
    cells = []
    for big, lbl in cards:
        cells.append(Table([[Paragraph(big, NumBig)], [Paragraph(lbl, NumLabel)]],
                           colWidths=[1.65*inch],
                           style=TableStyle([
                               ('BACKGROUND', (0,0), (-1,-1), NUM_BG),
                               ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
                               ('TOPPADDING', (0,0), (-1,0), 10),
                               ('BOTTOMPADDING', (0,1), (-1,1), 10),
                               ('LEFTPADDING', (0,0), (-1,-1), 4),
                               ('RIGHTPADDING', (0,0), (-1,-1), 4),
                               ('BOX', (0,0), (-1,-1), 0.5, BORDER),
                           ])))
    t = Table([cells], colWidths=[1.7*inch]*len(cards), rowHeights=[1.0*inch])
    t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 2),
        ('RIGHTPADDING', (0,0), (-1,-1), 2),
    ]))
    return t


def quote_box(quotes):
    rows = []
    for q in quotes:
        rows.append([Paragraph(f'"{q}"', QuoteText)])
    t = Table(rows, colWidths=[7.0*inch])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), QUOTE_BG),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LINEABOVE', (0,1), (-1,-1), 0.3, colors.HexColor('#4a7c59')),
    ]))
    return t


def warn_box(text):
    t = Table([[Paragraph(text, BodyB)]], colWidths=[7.0*inch])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), WARN_BG),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LINEBEFORE', (0,0), (0,-1), 3, TAN),
    ]))
    return t


def tier_card(title, price, tagline, items, bg_color, current=False):
    """Build a pricing-tier card."""
    inner = []
    title_text = f'{title}' + ('<br/><font color="#4a7c59" size="7"><b>(CURRENT)</b></font>' if current else '')
    inner.append([Paragraph(title_text, TierTitle)])
    inner.append([Paragraph(price, TierPrice)])
    inner.append([Paragraph(tagline, TierTag)])
    bullet_rows = [[Paragraph(f'<font color="#4a7c59"><b>&bull;</b></font>&nbsp;{item}', TierItem)] for item in items]
    bullet_table = Table(bullet_rows, colWidths=[2.05*inch])
    bullet_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ]))
    inner.append([bullet_table])
    t = Table(inner, colWidths=[2.25*inch])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), bg_color),
        ('BOX', (0,0), (-1,-1), 1.5, GREEN if current else BORDER),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    return t


def comparison_chart():
    """Final-page comparison matrix: features × tiers."""
    YES = '<font color="#4a7c59"><b>&#10003;</b></font>'
    NO = '<font color="#bbb">&mdash;</font>'

    features = [
        ('Hosting + infrastructure (Vercel, Brevo, Mapbox, SSL)', YES, YES, YES),
        ('Security + dependency updates', YES, YES, YES),
        ('Uptime monitoring', YES, YES, YES),
        ('Bug fixes when things break', YES, YES, YES),
        ('Quarterly check-in', YES, YES, YES),
        ('1 content update per month', NO, YES, YES),
        ('Monthly Search Console report', NO, YES, YES),
        ('1 Google Business Profile post / month', NO, YES, YES),
        ('Up to 2 hrs support time included', NO, YES, YES),
        ('Storm-season prep package (annual)', NO, YES, YES),
        ('Review-response writing (up to 5/mo)', NO, YES, YES),
        ('Active SEO work + indexing requests', NO, NO, YES),
        ('New city / service pages added', NO, NO, YES),
        ('Stump grinding / mulching expansion ready', NO, NO, YES),
        ('Google Business Profile management', NO, NO, YES),
        ('Monthly performance reporting', NO, NO, YES),
        ('Priority response on form/site issues', NO, NO, YES),
    ]

    # Header row: feature label, three tier labels
    rows = []
    rows.append([
        Paragraph('<b>What is included</b>', ChartHeader),
        Paragraph('<b>Lights-On</b><br/><font size="7">$500/mo</font>', ChartHeader),
        Paragraph('<b>Care+</b><br/><font size="7">$1,000/mo</font>', ChartHeader),
        Paragraph('<b>Growth</b><br/><font size="7">$2,000/mo (current)</font>', ChartHeader),
    ])
    for label, a, b, c in features:
        rows.append([
            Paragraph(label, ChartFeature),
            Paragraph(a, ChartCell),
            Paragraph(b, ChartCell),
            Paragraph(c, ChartCell),
        ])

    t = Table(rows, colWidths=[3.6*inch, 1.0*inch, 1.2*inch, 1.2*inch])
    t.setStyle(TableStyle([
        # Header
        ('BACKGROUND', (0,0), (-1,0), GREEN),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('VALIGN', (0,0), (-1,0), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,0), 6),
        ('BOTTOMPADDING', (0,0), (-1,0), 6),
        # Body
        ('VALIGN', (0,1), (-1,-1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, SOFT_BG]),
        ('TOPPADDING', (0,1), (-1,-1), 4),
        ('BOTTOMPADDING', (0,1), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        # Lines
        ('GRID', (0,0), (-1,-1), 0.4, BORDER),
        # Highlight current column (Growth = column 3)
        ('BACKGROUND', (3,1), (3,-1), colors.HexColor('#eaf3ec')),
        ('LINEBEFORE', (3,0), (3,-1), 2, GREEN),
        ('LINEAFTER', (3,0), (3,-1), 2, GREEN),
    ]))
    return t


# ════════════════════════════════════════════════════
# PAGE 1 — The proof
# ════════════════════════════════════════════════════
story.append(Paragraph('Hoag Land Services — Talking Points', PageTitle))
story.append(Paragraph('Cheat sheet for the conversation with Tyler · Glance at it, do not read it', TopSub))

story.append(section_header('The numbers (use these first — they are verifiable)'))
story.append(Spacer(1, 6))
story.append(number_cards([
    ('6', 'OLD SITE PAGES'),
    ('400+', 'NEW SITE PAGES'),
    ('120+', 'CITIES COVERED'),
    ('9', 'COUNTIES SERVED'),
]))
story.append(Spacer(1, 6))
story.append(Paragraph(
    '<b>What this means in plain English:</b> his old site only ranked for searches with "DeLand" in them. '
    'The new site has a dedicated page for every city in his service area — every page is a separate chance to come up in Google.',
    BodyB))
story.append(Spacer(1, 8))

story.append(section_header('What is coded into the site that his competitors do not have'))
story.append(Spacer(1, 6))
story.append(bullet_block([
    '<b>ISA Certified Arborist credential</b> is coded as machine-readable business data — Google can display it in his search listings.',
    '<b>5.0 stars / 33 Google reviews</b> are coded the same way — they can appear as star ratings in search results, which boosts click-through.',
    '<b>Business hours, phone, address, service area (9 counties)</b> are all structured for Google to read.',
    '<b>AI search tools</b> (ChatGPT, Claude, Perplexity, Gemini) can now read his site. When someone asks an AI for a tree service near DeLand, his business can be named.',
    '<b>Most of his competitors have not done this yet</b> — this is a real, current advantage.',
]))
story.append(Spacer(1, 8))

story.append(section_header('Things we fixed (not promised — fixed and verifiable)'))
story.append(Spacer(1, 6))
story.append(bullet_block([
    'The contact form was <b>broken</b>. Submissions are now emailing him directly. He should pull up his inbox and confirm.',
    'The job application form on Join Our Team is wired up the same way.',
    'Old web addresses with <font face="Courier">.html</font> at the end all redirect properly — no broken links from his Google listing or business cards.',
    'Image and layout problems on phones are fixed.',
    'Family + crew photos are featured on the About page; HLS logo is the browser tab icon.',
]))
story.append(Spacer(1, 8))

story.append(section_header('The realistic timeline — set expectations now'))
story.append(Spacer(1, 6))
story.append(warn_box(
    '<b>Do NOT promise specific rankings or traffic numbers.</b> Tell him this instead:<br/><br/>'
    '• Google takes <b>4 to 12 weeks</b> to fully crawl and index a site this size. We just finished the work.<br/>'
    '• SEO compounds — the first 90 days are quiet. <b>Months 3 to 6 is when most local service businesses start seeing the call volume climb.</b><br/>'
    '• The metric to watch in Google Search Console is <b>indexed page count</b> — it climbs steadily over the next two months. Not rank. Page count first.'
))

story.append(PageBreak())

# ════════════════════════════════════════════════════
# PAGE 2 — The math + tier cards
# ════════════════════════════════════════════════════
story.append(Paragraph('The pricing conversation', PageTitle))
story.append(Paragraph('Lead with the math. Only show tiers if he still pushes back.', TopSub))

story.append(section_header('Lead with the math (this is the honest pitch)'))
story.append(Spacer(1, 6))
pitch_text = (
    '<b>"Tyler, look at it this way — a single tree removal job runs $500 to $3,000. '
    'One land clearing job is $5k to $25k. One fence install is $3k to $15k. '
    'The retainer is $2k a month. If this site brings you one extra job a month that you '
    'would not have gotten otherwise, it is paid for itself and then some. '
    'The work we did over the last 90 days is the kind that makes that one extra job happen — '
    'but only if we keep maintaining it. Pull the plug and the curve flattens. '
    'Keep going and the curve keeps climbing."</b>'
)
pitch_table = Table(
    [[Paragraph(pitch_text, ParagraphStyle('pitch', parent=BodyB, fontSize=10.5, leading=15, textColor=colors.white))]],
    colWidths=[7.0*inch]
)
pitch_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), DARK),
    ('LEFTPADDING', (0,0), (-1,-1), 12),
    ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ('TOPPADDING', (0,0), (-1,-1), 12),
    ('BOTTOMPADDING', (0,0), (-1,-1), 12),
    ('LINEBEFORE', (0,0), (0,-1), 4, GREEN),
]))
story.append(pitch_table)
story.append(Spacer(1, 12))

story.append(section_header('If he still pushes back — three real choices'))
story.append(Spacer(1, 6))
story.append(Paragraph(
    'Most clients do not drop to the floor — they drop one tier. '
    'Three options gives him the feeling of choice, not a take-it-or-downgrade ultimatum. '
    'Quick summary below — full comparison chart on page 3.',
    BodyB))
story.append(Spacer(1, 8))

tier_floor = tier_card(
    'Lights-On',
    '$500 / mo',
    'Keep the site alive. Nothing more.',
    [
        'Hosting + infrastructure',
        'Security + uptime monitoring',
        'Bug fixes when things break',
        'Quarterly check-in',
        '<b>No proactive work, no content updates</b>',
    ],
    TIER_FLOOR_BG,
)

tier_mid = tier_card(
    'Care+',
    '$1,000 / mo',
    'Lights-On + light proactive work.',
    [
        'Everything in Lights-On, plus:',
        '1 content update / month',
        'Monthly Search Console report',
        '1 Google Business Profile post / month',
        '2 hrs support time included',
        'Storm-season prep package (annual)',
        'Review-response writing (up to 5/mo)',
    ],
    TIER_MID_BG,
)

tier_top = tier_card(
    'Growth',
    '$2,000 / mo',
    'Active SEO + content additions.',
    [
        'Everything in Care+, plus:',
        'Active SEO work + indexing requests',
        'New city + service pages added',
        'Stump grinding / mulching expansion',
        'Google Business Profile management',
        'Monthly performance reporting',
        'Priority response on issues',
    ],
    TIER_TOP_BG,
    current=True,
)

tiers_table = Table([[tier_floor, tier_mid, tier_top]], colWidths=[2.32*inch, 2.32*inch, 2.32*inch])
tiers_table.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('LEFTPADDING', (0,0), (-1,-1), 3),
    ('RIGHTPADDING', (0,0), (-1,-1), 3),
]))
story.append(tiers_table)
story.append(Spacer(1, 12))

story.append(section_header('One-liners — pick whichever fits the moment'))
story.append(Spacer(1, 6))
story.append(quote_box([
    'Your old site competed for one city. Your new site competes for over a hundred.',
    'Your reviews and your ISA certification are now coded into your search listings — most of your competition is not.',
    'You are now in a position to be the answer when someone asks ChatGPT for a tree service in your area.',
    'The form was broken. It is working now. Every lead it catches from here is one you were not getting before.',
    'One job a month pays for the retainer. The question is whether you want to keep the engine running.',
]))

story.append(PageBreak())

# ════════════════════════════════════════════════════
# PAGE 3 — The comparison chart + handling pushback
# ════════════════════════════════════════════════════
story.append(Paragraph('Plan comparison + pushback handling', PageTitle))
story.append(Paragraph('Show him this chart if he wants to see the trade-offs side by side', TopSub))

story.append(section_header('Three-tier comparison chart'))
story.append(Spacer(1, 6))
story.append(comparison_chart())
story.append(Spacer(1, 14))

story.append(section_header('If he asks "show me proof it is working"'))
story.append(Spacer(1, 6))
story.append(bullet_block([
    '<b>Pull up the live site</b>, right-click → "View Page Source" — point at the <font face="Courier">application/ld+json</font> tags. Tell him: "This is the structured data Google reads. Most contractor sites do not have any of this."',
    '<b>Pull up Google Search Console</b> → show the indexed page count. Tell him: "This number was 6 before. Watch it climb."',
    '<b>Pull up <font face="Courier">hlsdeland.com/sitemap.xml</font></b> — show 402 URLs. Tell him: "Every line is a page Google is going to find."',
    '<b>Pull up the live site on his phone</b> — show the contact form working. Have him send a test.',
]))
story.append(Spacer(1, 12))

story.append(warn_box(
    '<b>HONESTY RULE — protect the relationship:</b> if he asks specific numbers you do not have data for '
    '(rank position, traffic, click-through, conversions), say <i>"I want to pull the real numbers before I tell you anything — I will show you what is in Search Console."</i> '
    'Made-up numbers lose the customer faster than no answer.'
))

# ── Build ──
def add_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont('Helvetica', 7.5)
    canvas.setFillColor(GREY)
    page = canvas.getPageNumber()
    canvas.drawRightString(8.0*inch, 0.3*inch, f'Page {page}')
    canvas.drawString(0.5*inch, 0.3*inch, 'HLS Sales Cheatsheet · Internal use only')
    canvas.restoreState()


doc = SimpleDocTemplate(
    OUTPUT, pagesize=LETTER,
    leftMargin=0.5*inch, rightMargin=0.5*inch, topMargin=0.55*inch, bottomMargin=0.55*inch,
    title='HLS Sales Cheatsheet', author='Service Storm — internal',
)
doc.build(story, onFirstPage=add_footer, onLaterPages=add_footer)
print(f"PDF generated: {OUTPUT}")
