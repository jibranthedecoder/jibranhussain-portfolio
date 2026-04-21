#!/usr/bin/env python3
"""
Build CV PDF from markdown source.

Usage:
    python tools/build-cv.py

Source:  cv/public.en.md
Output:  assets/Jibran-Hussain-CV-EN.pdf

Requires:
    pip install reportlab
"""

import re
import sys
from pathlib import Path

try:
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.units import mm
    from reportlab.lib.styles import ParagraphStyle
    from reportlab.lib.colors import HexColor
    from reportlab.platypus import (
        SimpleDocTemplate,
        Paragraph,
        Spacer,
        HRFlowable,
        KeepTogether,
        Table,
        TableStyle,
    )
    from reportlab.lib import colors
except ImportError:
    sys.exit(
        "\nreportlab is required.\n"
        "Install with:  pip install reportlab\n"
    )

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------

REPO   = Path(__file__).resolve().parent.parent
SOURCE = REPO / "cv" / "public.en.md"
OUTPUT = REPO / "assets" / "Jibran-Hussain-CV-EN.pdf"

# ---------------------------------------------------------------------------
# Colours
# ---------------------------------------------------------------------------

C_NAME   = HexColor("#111111")
C_TEXT   = HexColor("#111111")
C_MUTED  = HexColor("#444444")
C_LABEL  = HexColor("#777777")
C_ACCENT = HexColor("#1a2128")
C_RULE   = HexColor("#cccccc")
C_LINK   = "#1a5276"

# ---------------------------------------------------------------------------
# Styles
# ---------------------------------------------------------------------------

def make_styles():
    base = ParagraphStyle(
        "base",
        fontName="Helvetica",
        fontSize=9.7,
        leading=13.5,
        textColor=C_TEXT,
    )
    return {
        # Large bold name matching the approved reference
        "name": ParagraphStyle(
            "s_name", parent=base,
            fontName="Helvetica-Bold",
            fontSize=26,
            leading=30,
            textColor=C_NAME,
            spaceAfter=1.5 * mm,
        ),
        # Bold subtitle (not muted) to match reference weight
        "subtitle": ParagraphStyle(
            "s_subtitle", parent=base,
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=15,
            textColor=C_MUTED,
            spaceAfter=3 * mm,
        ),
        # Compact contact row: small label prefix + value
        "meta": ParagraphStyle(
            "s_meta", parent=base,
            fontSize=8.8,
            leading=12.5,
            textColor=C_MUTED,
            spaceAfter=0.8 * mm,
        ),
        # Section heading: prominent, bold, with room to breathe
        "h2": ParagraphStyle(
            "s_h2", parent=base,
            fontName="Helvetica-Bold",
            fontSize=13,
            leading=16,
            textColor=C_ACCENT,
            spaceBefore=5.5 * mm,
            spaceAfter=1.2 * mm,
        ),
        # Body paragraph
        "body": ParagraphStyle(
            "s_body", parent=base,
            fontSize=9.7,
            leading=14,
            textColor=C_MUTED,
            spaceAfter=2 * mm,
        ),
        # Bullet item — supports inline bold for "Category:" labels
        "bullet": ParagraphStyle(
            "s_bullet", parent=base,
            fontSize=9.7,
            leading=13.5,
            textColor=C_MUTED,
            leftIndent=3.5 * mm,
            bulletIndent=0,
            spaceAfter=1.2 * mm,
        ),
    }

# ---------------------------------------------------------------------------
# Frontmatter parser
# ---------------------------------------------------------------------------

def parse_frontmatter(text):
    """Return (dict, body_str). Handles YAML-style --- blocks."""
    m = re.match(r"^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$", text.strip())
    if not m:
        return {}, text.strip()
    fm = {}
    for line in m.group(1).splitlines():
        sep = line.find(":")
        if sep == -1:
            continue
        k = line[:sep].strip()
        v = line[sep + 1:].strip()
        if k:
            fm[k] = v
    return fm, m.group(2).strip()

# ---------------------------------------------------------------------------
# Inline markup
# ---------------------------------------------------------------------------

def inline_markup(text):
    """Convert **bold** and [label](url) to ReportLab XML markup."""
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    def _link(m):
        label = m.group(1)
        url   = m.group(2).strip()
        if not re.match(r"^(https?://|mailto:)", url):
            return label
        return f'<a href="{url}" color="{C_LINK}">{label}</a>'
    return re.sub(r"\[([^\]]+)\]\(([^)]+)\)", _link, text)

def auto_bold_label(text):
    """
    If text begins with 'Category: rest…', bold the label portion.
    Matches labels up to 45 chars before the first colon, with no
    period or existing markup in the label itself.
    Applied only when the text doesn't already open with a tag.
    """
    if text.startswith("<"):
        return text
    m = re.match(r"^([^:<.]{2,45}):\s+(.*)", text, re.DOTALL)
    if m:
        return f"<b>{m.group(1)}:</b> {m.group(2)}"
    return text

# ---------------------------------------------------------------------------
# Body section parser
# ---------------------------------------------------------------------------

def parse_body(text):
    """Return list of ('h2'|'para'|'bullets', content) tuples."""
    items           = []
    current_bullets = None

    for raw in text.splitlines():
        line = raw.strip()

        if not line:
            if current_bullets is not None:
                items.append(("bullets", current_bullets))
                current_bullets = None
            continue

        if line.startswith("## "):
            if current_bullets is not None:
                items.append(("bullets", current_bullets))
                current_bullets = None
            items.append(("h2", line[3:].strip()))

        elif line.startswith("- "):
            if current_bullets is None:
                current_bullets = []
            current_bullets.append(line[2:].strip())

        else:
            if current_bullets is not None:
                items.append(("bullets", current_bullets))
                current_bullets = None
            items.append(("para", line))

    if current_bullets is not None:
        items.append(("bullets", current_bullets))

    return items

# ---------------------------------------------------------------------------
# Contact meta rows
# ---------------------------------------------------------------------------

def meta_rows(fm):
    """Build (label, display, href_or_None) list for the contact block."""
    rows = []

    if fm.get("location"):
        rows.append(("Location", fm["location"], None))

    email_raw = fm.get("email", "")
    em = re.match(r"\[([^\]]+)\]\((mailto:[^)]+)\)", email_raw)
    if em:
        rows.append(("Email", em.group(1), em.group(2)))
    elif "@" in email_raw:
        rows.append(("Email", email_raw, f"mailto:{email_raw}"))

    if fm.get("website"):
        display = re.sub(r"^https?://(www\.)?", "", fm["website"])
        rows.append(("Website", display, fm["website"]))

    if fm.get("linkedin"):
        display = re.sub(r"^https?://(www\.)?", "", fm["linkedin"])
        rows.append(("LinkedIn", display, fm["linkedin"]))

    if fm.get("updated"):
        rows.append(("Updated", fm["updated"], None))

    return rows

# ---------------------------------------------------------------------------
# PDF builder
# ---------------------------------------------------------------------------

def build(source: Path, output: Path) -> None:
    raw      = source.read_text(encoding="utf-8")
    fm, body = parse_frontmatter(raw)
    sections = parse_body(body)
    S        = make_styles()

    name      = fm.get("name", "")
    doc_title = f"{name} — CV" if name else "CV"

    doc = SimpleDocTemplate(
        str(output),
        pagesize=A4,
        leftMargin=16 * mm,
        rightMargin=16 * mm,
        topMargin=14 * mm,
        bottomMargin=14 * mm,
        title=doc_title,
        author=name,
        subject="",
        keywords="",
    )

    story = []

    # --- Header block: name + subtitle ---
    if name:
        story.append(Paragraph(name, S["name"]))
    if fm.get("title"):
        story.append(Paragraph(fm["title"], S["subtitle"]))

    story.append(HRFlowable(
        width="100%", thickness=0.7, color=C_RULE,
        spaceBefore=0, spaceAfter=2.5 * mm,
    ))

    # --- Contact meta rows ---
    for label, display, href in meta_rows(fm):
        label_tag = f'<font color="#999999">{label}</font>'
        if href:
            val_tag = f'<a href="{href}" color="{C_LINK}">{display}</a>'
        else:
            val_tag = display
        story.append(Paragraph(f"{label_tag}   {val_tag}", S["meta"]))

    story.append(Spacer(1, 2.5 * mm))
    story.append(HRFlowable(
        width="100%", thickness=0.7, color=C_RULE,
        spaceBefore=0, spaceAfter=0,
    ))

    # --- Body sections ---
    for kind, content in sections:

        if kind == "h2":
            # Keep heading + its rule together so they never orphan
            story.append(KeepTogether([
                Paragraph(content, S["h2"]),
                HRFlowable(
                    width="100%", thickness=0.3, color=C_RULE,
                    spaceBefore=0, spaceAfter=1.5 * mm,
                ),
            ]))

        elif kind == "para":
            story.append(Paragraph(inline_markup(content), S["body"]))

        elif kind == "bullets":
            block = []
            for item in content:
                marked = inline_markup(item)
                marked = auto_bold_label(marked)
                block.append(
                    Paragraph(
                        f"• {marked}",   # bullet + en-space
                        S["bullet"],
                    )
                )
            # Keep each bullet group together where possible
            story.append(KeepTogether(block))
            story.append(Spacer(1, 1.2 * mm))

    # --- Privacy: minimise PDF metadata leakage ---
    def _set_meta(canvas, _doc):
        canvas.setAuthor(name)
        canvas.setTitle(doc_title)
        canvas.setSubject("")
        canvas.setKeywords("")
        try:
            canvas.setCreator("")
        except AttributeError:
            pass

    output.parent.mkdir(parents=True, exist_ok=True)
    doc.build(story, onFirstPage=_set_meta, onLaterPages=_set_meta)

    rel     = output.relative_to(REPO)
    size_kb = output.stat().st_size // 1024
    print(f"  Written: {rel}  ({size_kb} KB)")

# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    if not SOURCE.exists():
        sys.exit(f"\nSource not found: {SOURCE}\n")
    print(f"Source : {SOURCE.relative_to(REPO)}")
    print(f"Output : {OUTPUT.relative_to(REPO)}")
    build(SOURCE, OUTPUT)
    print("Done. Commit assets/Jibran-Hussain-CV-EN.pdf to deploy.")
