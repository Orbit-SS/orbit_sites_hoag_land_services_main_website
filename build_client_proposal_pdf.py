"""Generate HLS_Service_Plans.pdf — clean client-facing proposal of the three service tiers.
Email this directly to Tyler. No internal talking points, no warnings."""
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
)
from datetime import date

OUTPUT = r"C:\Users\OzThe\ClaudeWork\Co_Work_Projects\CatchyVid\hls-nextjs\HLS_Service_Plans.pdf"

# ── Brand palette (clean professional) ──
DARK = colors.HexColor('#1a1c1a')
GREEN = colors.HexColor('#4a7c59')
TAN = colors.HexColor('#9a7b4f')
SOFT_BG = colors.HexColor('#f7f5f1')
BORDER = colors.HexColor('#d4d4d4')
GREY = colors.HexColor('#555')
TIER_FLOOR_BG = colors.HexColor('#faf7ef')
TIER_MID_BG = colors.HexColor('#fbf6ec')
TIER_TOP_BG = colors.HexColor('#edf4ef')

styles = getSampleStyleSheet()

# ── Styles ──
Brand = ParagraphStyle('Brand', parent=styles['BodyText'], fontName='Helvetica-Bold',
                       fontSize=10, textColor=TAN, leading=12, spaceAfter=2,
                       alignment=TA_LEFT)
DocTitle = ParagraphStyle('DocTitle', parent=styles['Title'], fontName='Helvetica-Bold',
                          fontSize=22, textColor=DARK, alignment=TA_LEFT, leading=26, spaceAfter=4)
DocSub = ParagraphStyle('DocSub', parent=styles['BodyText'], fontName='Helvetica',
                        fontSize=11, textColor=GREEN, alignment=TA_LEFT, leading=14, spaceAfter=14)
Meta = ParagraphStyle('Meta', parent=styles['BodyText'], fontName='Helvetica',
                      fontSize=9, textColor=GREY, leading=12, spaceAfter=14)
Intro = ParagraphStyle('Intro', parent=styles['BodyText'], fontName='Helvetica',
                       fontSize=10.5, leading=15, textColor=DARK, spaceAfter=14)
SectionH = ParagraphStyle('SectionH', parent=styles['Heading2'], fontName='Helvetica-Bold',
                          fontSize=12, textColor=DARK, leading=15, spaceAfter=8, spaceBefore=4,
                          alignment=TA_LEFT)
TierTitle = ParagraphStyle('TierTitle', parent=styles['Heading2'], fontName='Helvetica-Bold',
                           fontSize=12, textColor=DARK, leading=14, spaceAfter=2,
                           alignment=TA_CENTER)
TierPrice = ParagraphStyle('TierPrice', parent=styles['BodyText'], fontName='Helvetica-Bold',
                           fontSize=20, textColor=GREEN, leading=22, alignment=TA_CENTER, spaceAfter=2)
TierTag = ParagraphStyle('TierTag', parent=styles['BodyText'], fontName='Helvetica-Oblique',
                         fontSize=8.5, textColor=GREY, leading=11, alignment=TA_CENTER, spaceAfter=8)
TierItem = ParagraphStyle('TierItem', parent=styles['BodyText'], fontName='Helvetica',
                          fontSize=8.5, leading=12, textColor=DARK, spaceAfter=2)
ChartHeader = ParagraphStyle('ChartHeader', parent=styles['BodyText'], fontName='Helvetica-Bold',
                             fontSize=9.5, textColor=colors.white, alignment=TA_CENTER, leading=11)
ChartFeature = ParagraphStyle('ChartFeature', parent=styles['BodyText'], fontName='Helvetica',
                              fontSize=8.5, textColor=DARK, leading=11)
ChartCell = ParagraphStyle('ChartCell', parent=styles['BodyText'], fontName='Helvetica-Bold',
                           fontSize=10, alignment=TA_CENTER, leading=12)
Footer = ParagraphStyle('Footer', parent=styles['BodyText'], fontName='Helvetica',
                        fontSize=9, textColor=GREY, leading=12, alignment=TA_LEFT, spaceAfter=2)
FooterBold = ParagraphStyle('FooterBold', parent=Footer, fontName='Helvetica-Bold',
                            textColor=DARK, fontSize=10, spaceAfter=4)

story = []


def tier_card(title, price, tagline, items, bg_color):
    """Pricing tier card."""
    inner = []
    inner.append([Paragraph(title, TierTitle)])
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
        ('BOX', (0,0), (-1,-1), 1, BORDER),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('TOPPADDING', (0,0), (-1,-1), 12),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    return t


def comparison_chart():
    YES = '<font color="#4a7c59"><b>&#10003;</b></font>'
    NO = '<font color="#bbb">&mdash;</font>'

    features = [
        ('Hosting + infrastructure (Vercel, Brevo, Mapbox, SSL)', YES, YES, YES),
        ('Security + dependency updates', YES, YES, YES),
        ('Uptime monitoring', YES, YES, YES),
        ('Bug fixes when issues arise', YES, YES, YES),
        ('Quarterly check-in', YES, YES, YES),
        ('1 content update per month', NO, YES, YES),
        ('Monthly Search Console report', NO, YES, YES),
        ('1 Google Business Profile post / month', NO, YES, YES),
        ('Up to 2 hrs support time included', NO, YES, YES),
        ('Storm-season prep package (annual)', NO, YES, YES),
        ('Review-response writing (up to 5/mo)', NO, YES, YES),
        ('Active SEO work + indexing requests', NO, NO, YES),
        ('New city / service pages added', NO, NO, YES),
        ('New service category expansions', NO, NO, YES),
        ('Google Business Profile management', NO, NO, YES),
        ('Monthly performance reporting', NO, NO, YES),
        ('Priority response on form / site issues', NO, NO, YES),
    ]

    rows = [[
        Paragraph('<b>What is included</b>', ChartHeader),
        Paragraph('<b>Lights-On</b><br/><font size="8">$500 / mo</font>', ChartHeader),
        Paragraph('<b>Care+</b><br/><font size="8">$1,000 / mo</font>', ChartHeader),
        Paragraph('<b>Growth</b><br/><font size="8">$2,000 / mo</font>', ChartHeader),
    ]]
    for label, a, b, c in features:
        rows.append([
            Paragraph(label, ChartFeature),
            Paragraph(a, ChartCell),
            Paragraph(b, ChartCell),
            Paragraph(c, ChartCell),
        ])

    t = Table(rows, colWidths=[3.5*inch, 1.05*inch, 1.2*inch, 1.25*inch])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), GREEN),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('VALIGN', (0,0), (-1,0), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,0), 8),
        ('BOTTOMPADDING', (0,0), (-1,0), 8),
        ('VALIGN', (0,1), (-1,-1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, SOFT_BG]),
        ('TOPPADDING', (0,1), (-1,-1), 4),
        ('BOTTOMPADDING', (0,1), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('GRID', (0,0), (-1,-1), 0.4, BORDER),
    ]))
    return t


# ════════════════════════════════════════════════════
# Header block
# ════════════════════════════════════════════════════
story.append(Paragraph('SERVICE STORM', Brand))
story.append(Paragraph('Website &amp; SEO Service Plans', DocTitle))
story.append(Paragraph('Hoag Land Services · hlsdeland.com', DocSub))

# Meta line — date + prepared for
today_str = date.today().strftime('%B %Y')
story.append(Paragraph(
    f'Prepared for: <b>Tyler Hoag</b>, Hoag Land Services, LLC &nbsp;&nbsp;|&nbsp;&nbsp; '
    f'Date: {today_str}',
    Meta))

# Intro
story.append(Paragraph(
    'The following service plans cover the ongoing work that keeps your website running, secure, and ranking. '
    'Each plan builds on the one below it. Choose the level of service that fits your goals and budget — '
    'you can move between plans at any time.',
    Intro))

# Three tier cards
story.append(Paragraph('Choose Your Plan', SectionH))

tier_floor = tier_card(
    'Lights-On',
    '$500 / mo',
    'Keep the site live, secure, and online.',
    [
        'Hosting + infrastructure',
        'Security + uptime monitoring',
        'Bug fixes when issues arise',
        'Quarterly check-in',
        'No proactive content or SEO work',
    ],
    TIER_FLOOR_BG,
)

tier_mid = tier_card(
    'Care+',
    '$1,000 / mo',
    'Lights-On plus light proactive work.',
    [
        'Everything in Lights-On, plus:',
        '1 content update per month',
        'Monthly Search Console report',
        '1 Google Business Profile post',
        '2 hours support time included',
        'Storm-season prep (annual)',
        'Review-response writing',
    ],
    TIER_MID_BG,
)

tier_top = tier_card(
    'Growth',
    '$2,000 / mo',
    'Care+ plus active SEO and growth work.',
    [
        'Everything in Care+, plus:',
        'Active SEO + indexing requests',
        'New city + service pages',
        'Service category expansions',
        'Google Business Profile management',
        'Monthly performance reporting',
        'Priority response on issues',
    ],
    TIER_TOP_BG,
)

tiers_table = Table([[tier_floor, tier_mid, tier_top]], colWidths=[2.4*inch, 2.4*inch, 2.4*inch])
tiers_table.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('LEFTPADDING', (0,0), (-1,-1), 3),
    ('RIGHTPADDING', (0,0), (-1,-1), 3),
]))
story.append(tiers_table)
story.append(Spacer(1, 18))

# Comparison chart
story.append(Paragraph('Plan Comparison', SectionH))
story.append(comparison_chart())
story.append(Spacer(1, 18))

# Footer / contact block
footer_table = Table([[
    Paragraph(
        '<b>Questions or ready to move forward?</b><br/>'
        'Reach out anytime and we will set you up with the plan that fits.',
        Footer),
    Paragraph(
        '<b>Service Storm</b><br/>'
        'oscar@servicestorm.io<br/>'
        'servicestorm.io',
        Footer),
]], colWidths=[4.5*inch, 2.5*inch])
footer_table.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('LINEABOVE', (0,0), (-1,0), 1, GREEN),
    ('TOPPADDING', (0,0), (-1,-1), 12),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 0),
]))
story.append(footer_table)

# ── Build ──
def add_page_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont('Helvetica', 7.5)
    canvas.setFillColor(GREY)
    canvas.drawCentredString(4.25*inch, 0.35*inch,
        'Service Storm  ·  Website &amp; SEO Service Plans  ·  Hoag Land Services')
    canvas.restoreState()


doc = SimpleDocTemplate(
    OUTPUT, pagesize=LETTER,
    leftMargin=0.55*inch, rightMargin=0.55*inch, topMargin=0.55*inch, bottomMargin=0.6*inch,
    title='Hoag Land Services — Website &amp; SEO Service Plans',
    author='Service Storm',
)
doc.build(story, onFirstPage=add_page_footer, onLaterPages=add_page_footer)
print(f"PDF generated: {OUTPUT}")
