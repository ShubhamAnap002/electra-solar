import urllib.request
import json
import re

urls = [
    "http://localhost:3000/",
    "http://localhost:3000/products/solar-hybrid-inverters/sunmagic-three-phase-solar-hybrid-inverter",
    "http://localhost:3000/solutions/commercial-industrial-power-solutions",
    "http://localhost:3000/projects/chakan-automotive-manufacturing-plant",
    "http://localhost:3000/blog/hybrid-vs-ongrid-inverters-factories-guide",
    "http://localhost:3000/about",
    "http://localhost:3000/contact",
    "http://localhost:3000/calculator",
]

total_valid = 0
for url in urls:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode("utf-8")
    scripts = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.DOTALL)
    print(f"\n=== URL: {url} (Found {len(scripts)} ld+json scripts) ===")
    for i, s in enumerate(scripts):
        try:
            data = json.loads(s.strip())
            total_valid += 1
            if isinstance(data, dict):
                if "@graph" in data:
                    types = [item.get("@type") for item in data["@graph"]]
                    print(f"  [{i+1}] @graph -> {types}")
                else:
                    print(f"  [{i+1}] @type: {data.get('@type')} -> {data.get('name', 'N/A')}")
        except Exception as e:
            print(f"  [{i+1}] ERROR parsing JSON: {e}")

print(f"\nTotal Valid JSON-LD Scripts Parsed: {total_valid}")

# Verify Topic Cluster Internal Links
print("\n=== VERIFYING TOPIC CLUSTER INTERNAL LINKS ===")
cluster_pages = [
    ("Project -> Products", "http://localhost:3000/projects/chakan-automotive-manufacturing-plant", r'href="(/products/[^"]+)"'),
    ("Product -> Project/Solution", "http://localhost:3000/products/solar-hybrid-inverters/sunmagic-three-phase-solar-hybrid-inverter", r'href="(/projects/[^"]+|/solutions/[^"]+)"'),
    ("Solution -> Project/Calculator", "http://localhost:3000/solutions/commercial-industrial-power-solutions", r'href="(/projects/[^"]+|/calculator)"'),
    ("Blog -> Product", "http://localhost:3000/blog/hybrid-vs-ongrid-inverters-factories-guide", r'href="(/products/[^"]+)"'),
]

for label, page_url, pattern in cluster_pages:
    req = urllib.request.Request(page_url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode("utf-8")
    links = set(re.findall(pattern, html))
    print(f"[{label}] on {page_url.split(':3000')[1]}: Found {len(links)} links:")
    for link in links:
        full_url = f"http://localhost:3000{link}"
        sub_req = urllib.request.Request(full_url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(sub_req) as sub_resp:
            print(f"   -> {link} [{sub_resp.status} OK]")

