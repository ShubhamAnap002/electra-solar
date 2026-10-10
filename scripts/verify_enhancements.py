import urllib.request
import json
import re

req = urllib.request.Request('http://localhost:3000/', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    headers = {k.lower(): v for k, v in resp.headers.items()}
    html = resp.read().decode('utf-8')

print("=== 1. HTTP SECURITY HEADERS ===")
for h in ['x-content-type-options', 'x-frame-options', 'referrer-policy', 'permissions-policy', 'x-powered-by']:
    print(f"{h}: {headers.get(h, 'NOT SET')}")

print("\n=== 2. GEO META TAGS IN HTML ===")
for meta_name in ['geo.region', 'geo.placename', 'geo.position', 'ICBM']:
    match = re.search(rf'name="{re.escape(meta_name)}" content="([^"]+)"', html)
    print(f"{meta_name}: {match.group(1) if match else 'NOT FOUND'}")

print("\n=== 3. KNOWLEDGE GRAPH SAMEAS & LOCATIONS ===")
scripts = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.DOTALL)
for s in scripts:
    try:
        data = json.loads(s.strip())
        if '@graph' in data:
            for item in data['@graph']:
                if item.get('@type') == 'Organization':
                    print("Organization sameAs:", item.get('sameAs'))
                    print("Organization department count:", len(item.get('department', [])))
                elif isinstance(item.get('@type'), list) and 'LocalBusiness' in item.get('@type'):
                    print(f"LocalBusiness: {item.get('@id')} -> {item.get('name')}")
    except Exception as e:
        pass

print("\n=== 4. PRODUCT OPEN GRAPH IMAGES ===")
prod_url = 'http://localhost:3000/products/solar-hybrid-inverters/sunmagic-three-phase-solar-hybrid-inverter'
prod_req = urllib.request.Request(prod_url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(prod_req) as prod_resp:
    prod_html = prod_resp.read().decode('utf-8')

og_img = re.search(r'<meta property="og:image" content="([^"]+)"', prod_html)
tw_img = re.search(r'<meta name="twitter:image" content="([^"]+)"', prod_html)
print("Product OG Image:", og_img.group(1) if og_img else "NOT FOUND")
print("Product Twitter Image:", tw_img.group(1) if tw_img else "NOT FOUND")

print("\n=== 5. CONTACT PAGE REGIONAL MAP MARKUP ===")
contact_url = 'http://localhost:3000/contact'
contact_req = urllib.request.Request(contact_url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(contact_url) as c_resp:
    c_html = c_resp.read().decode('utf-8')

print("Contains Pune:", "Pune" in c_html)
print("Contains Mumbai:", "Mumbai" in c_html)
print("Contains Jaipur:", "Jaipur" in c_html)
print("Contains Google Maps Embed iframe:", "maps.google.com/maps?q=" in c_html)
