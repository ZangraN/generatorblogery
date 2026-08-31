import re

with open('main.js', 'r') as f:
    text = f.read()

start = text.find('const doc = new Document({')
end = text.find('Packer.toBlob(doc).then')
docx_code = text[start:end]

# Basic transformations
html = docx_code
html = re.sub(r'new TextRun\(\{\s*text:\s*(.*?),\s*bold:\s*true.*?\}\)', r'<b>\1</b>', html, flags=re.DOTALL)
html = re.sub(r'new TextRun\(\{\s*text:\s*(.*?)\s*\}\)', r'\1', html, flags=re.DOTALL)
html = re.sub(r'new TextRun\((.*?)\)', r'\1', html, flags=re.DOTALL)

html = re.sub(r'new Paragraph\(\{.*?children:\s*\[(.*?)\][^\}]*?\}\)', r'<p>\1</p>', html, flags=re.DOTALL)

print(html[:1000])

