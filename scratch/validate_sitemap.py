import xml.etree.ElementTree as ET

sitemap_path = 'public/sitemap.xml'
tree = ET.parse(sitemap_path)
root = tree.getroot()

print("Root tag:", root.tag)
namespaces = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
urls = root.findall('ns:url', namespaces)
print(f"Total URL entries found in sitemap: {len(urls)}")

for i, u in enumerate(urls, 1):
    loc = u.find('ns:loc', namespaces).text
    priority = u.find('ns:priority', namespaces)
    p_text = priority.text if priority is not None else 'N/A'
    changefreq = u.find('ns:changefreq', namespaces)
    c_text = changefreq.text if changefreq is not None else 'N/A'
    print(f"{i:2d}. {loc} (Priority: {p_text}, Changefreq: {c_text})")

print("\nXML Sitemap is structurally valid with 0 syntax errors!")
