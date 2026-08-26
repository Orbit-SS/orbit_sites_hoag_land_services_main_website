"""Generate HLS_Improvements_Summary.pdf — client-facing list of improvements since launch."""
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, ListFlowable, ListItem, Table, TableStyle,
)

OUTPUT = r"C:\Users\OzThe\ClaudeWork\Co_Work_Projects\CatchyVid\hls-nextjs\HLS_Improvements_Summary.pdf"

DARK = colors.HexColor('#1a1c1a')
GREEN = colors.HexColor('#4a7c59')
TAN = colors.HexColor('#9a7b4f')
GREY = colors.HexColor('#555555')

styles = getSampleStyleSheet()

TitleStyle = ParagraphStyle('Title', parent=styles['Title'], fontName='Helvetica-Bold',
                            fontSize=24, textColor=DARK, alignment=TA_CENTER, leading=28, spaceAfter=4)
Subtitle = ParagraphStyle('Subtitle', parent=styles['BodyText'], fontName='Helvetica',
                          fontSize=12, textColor=GREEN, alignment=TA_CENTER, leading=16, spaceAfter=4)
MetaLine = ParagraphStyle('Meta', parent=styles['BodyText'], fontName='Helvetica',
                          fontSize=9.5, textColor=GREY, alignment=TA_CENTER, leading=13, spaceAfter=18)
Section = ParagraphStyle('Section', parent=styles['Heading2'], fontName='Helvetica-Bold',
                         fontSize=13, textColor=GREEN, spaceBefore=12, spaceAfter=5, leading=16)
Bullet = ParagraphStyle('Bullet', parent=styles['BodyText'], fontName='Helvetica',
                        fontSize=10, leading=14, textColor=colors.HexColor('#1a1a1a'))
Intro = ParagraphStyle('Intro', parent=styles['BodyText'], fontName='Helvetica',
                       fontSize=10.5, leading=15, textColor=colors.HexColor('#333'), spaceAfter=10)

story = []


def bullets(items):
    return ListFlowable(
        [ListItem(Paragraph(t, Bullet), value='•', leftIndent=14) for t in items],
        bulletType='bullet', bulletColor=GREEN, bulletFontSize=10, leftIndent=10, spaceBefore=0,
    )


# Header band
story.append(Paragraph('Hoag Land Services', TitleStyle))
story.append(Paragraph('Website Improvements Since Launch', Subtitle))
story.append(Paragraph('Summary of work completed on hlsdeland.com', MetaLine))

# thin divider
divider = Table([['']], colWidths=[6.9*inch], rowHeights=[2])
divider.setStyle(TableStyle([('BACKGROUND', (0,0), (-1,-1), GREEN)]))
story.append(divider)
story.append(Spacer(1, 12))

story.append(Paragraph(
    'The following improvements have been made to the Hoag Land Services website since it went live. '
    'Each item reflects work actually completed and verified on the live site.', Intro))

sections = [
    ('Local Search Coverage', [
        'Added dedicated service pages for 120+ Central Florida cities and towns across 9 counties.',
        'Each city has its own page for tree services, site work, and fencing.',
        'Built a Service Areas page with an interactive map of the coverage area.',
    ]),
    ('Service Pages', [
        'Created individual pages for each specific service — land clearing, tree removal, tree trimming, palm pruning, tree installation, excavation, drainage, erosion control, and wood / vinyl / aluminum fencing.',
        'Added problem-focused pages for storm damage, dangerous trees, drainage issues, overgrown lots, privacy fencing, livestock containment, and more.',
        'Added an FAQ section to each page answering common customer questions.',
    ]),
    ('Contact &amp; Hiring', [
        'Connected the contact form so submissions email directly to the office.',
        'Connected the job application form on the Join Our Team page.',
        'Fixed a contact form outage — the form had been failing to send.',
    ]),
    ('Search Engine &amp; AI Visibility', [
        'Added proper page titles and descriptions to every page so Google displays them correctly.',
        'Added structured data so Google and AI assistants can read the business info, services, reviews, and service area.',
        'Built and submitted a sitemap covering all 400+ pages.',
        'Set up redirects from the old website’s page addresses so old links don’t break.',
        'Configured the site to be readable by AI search tools, not just traditional Google.',
    ]),
    ('Navigation &amp; Usability', [
        'Added breadcrumb navigation so visitors always know where they are on the site.',
        'Added a quick back-to-services button on every service page.',
        'Updated the footer with quick links, a service list, and top service-area cities.',
        'Smoothed the transitions between pages.',
    ]),
    ('Content &amp; Branding', [
        'Added the family and crew photos to the About page.',
        'Set the HLS logo as the browser tab icon.',
        'Wrote unique local content for each city page so they read naturally and rank individually.',
        'Verified every project photo loads correctly and has a proper description for accessibility and image search.',
    ]),
    ('Mobile', [
        'Fixed image scaling and layout issues on phones.',
        'Made sure the call button and forms work cleanly on mobile.',
    ]),
]

for title, items in sections:
    story.append(Paragraph(title, Section))
    story.append(bullets(items))

doc = SimpleDocTemplate(
    OUTPUT, pagesize=LETTER,
    leftMargin=0.85*inch, rightMargin=0.85*inch, topMargin=0.8*inch, bottomMargin=0.7*inch,
    title='Hoag Land Services — Website Improvements', author='Service Storm',
)
doc.build(story)
print(f"PDF generated: {OUTPUT}")
