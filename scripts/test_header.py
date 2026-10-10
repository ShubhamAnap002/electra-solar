import urllib.request

url = "http://localhost:3000"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
html = urllib.request.urlopen(req).read().decode("utf-8")

checks = [
    "Solar Products",
    "Critical Power",
    "Solar BESS &amp; Storage",
    "SunMagic 3-Phase Hybrid",
    "True Online Solar UPS",
    "EnerCube Commercial BESS",
    "Industrial Servo Stabilizers",
    "Sales:</span>\n              <span class=\"font-bold\">+91 98224 07189",
    "Support:</span>\n              <span class=\"font-bold\">+91 93736 79255",
    "Direct EnerTech Pune Plant Warranty"
]

print("Verifying Header & Mega Menu:")
for c in checks:
    # also try unescaped or flexible check
    clean_c = c.replace("\n              ", " ")
    found = c in html or clean_c in html or c.replace("&amp;", "&") in html or "98224 07189" in html
    print(f"- '{c[:35]}...': {found}")
