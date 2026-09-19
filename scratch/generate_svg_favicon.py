import base64

with open('public/android-chrome-512x512.png', 'rb') as f:
    b64 = base64.b64encode(f.read()).decode('utf-8')

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <title>Pujya Agritech Favicon</title>
  <image href="data:image/png;base64,{b64}" x="0" y="0" width="512" height="512" />
</svg>
'''

with open('public/favicon.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

print("Generated public/favicon.svg with embedded 512x512 emblem")
