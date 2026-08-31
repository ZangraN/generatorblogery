import re

with open('docx_part.txt', 'r') as f:
    text = f.read()

# Very basic conversion
# Replace new TextRun({ text: "...", bold: true }) with <b>...</b>
# Replace new Paragraph({ children: [ ... ] }) with <p> ... </p>

out = []
paragraphs = re.findall(r'new Paragraph\(\{(.*?)\}\)', text, re.DOTALL)
for p in paragraphs:
    runs = re.findall(r'new TextRun\((.*?)\)', p, re.DOTALL)
    p_html = "<p>"
    for r in runs:
        text_match = re.search(r'text:\s*(`.*?`|".*?"|\'.*?\')', r, re.DOTALL)
        if not text_match: continue
        t = text_match.group(1).strip('`"\'')
        if 'bold: true' in r:
            t = f"<b>{t}</b>"
        p_html += t
    p_html += "</p>"
    out.append(p_html)

with open('html_template.txt', 'w') as f:
    f.write("\n".join(out))
