import urllib.request
import urllib.error
import sys

base_url = "http://localhost:3000"

urls_to_test = [
    "/",
    "/products",
    "/products/solar-hybrid-inverters",
    "/products/solar-hybrid-inverters/sunmagic-three-phase-solar-hybrid-inverter",
    "/products/solar-hybrid-inverters/sunmagic-single-phase-solar-hybrid-inverter",
    "/products/solar-hybrid-inverters/wall-mounted-hf-solar-hybrid-inverter",
    "/products/bess",
    "/products/bess/enercube-commercial-battery-energy-storage-system",
    "/products/batteries",
    "/products/batteries/lfp-lithium-iron-phosphate-battery-module",
    "/products/solar-online-ups",
    "/products/solar-online-ups/solar-online-ups-system",
    "/products/power-conditioning",
    "/products/power-conditioning/industrial-servo-voltage-stabilizer",
    "/products/power-conditioning/industrial-igbt-scr-battery-charger",
    "/calculator",
    "/compare",
    "/solutions",
    "/solutions/commercial-industrial-power-solutions",
    "/solutions/residential-solar-hybrid",
    "/solutions/critical-infrastructure-and-healthcare",
    "/solutions/remote-microgrids-and-agriculture",
    "/services",
    "/services/turnkey-installation-and-commissioning",
    "/projects",
    "/projects/chakan-automotive-manufacturing-plant",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/sitemap.xml",
    "/robots.txt",
    "/images/products/sunmagic-1ph.webp",
    "/images/products/sunmagic-3ph.webp",
    "/images/products/enercube-bess.webp",
    "/images/brand/enertech-partner.png",
    "/images/hero/hero-bg.jpg",
]

failed = []
passed = []

for u in urls_to_test:
    target = f"{base_url}{u}"
    try:
        req = urllib.request.Request(target, headers={"User-Agent": "ElectraTester/1.0"})
        with urllib.request.urlopen(req, timeout=5) as resp:
            code = resp.getcode()
            length = len(resp.read())
            if code == 200:
                passed.append((u, code, length))
                print(f"PASS [200]: {u} ({length} bytes)")
            else:
                failed.append((u, code))
                print(f"WARN [{code}]: {u}")
    except Exception as e:
        failed.append((u, str(e)))
        print(f"FAIL: {u} -> {e}")

print("\n" + "=" * 50)
print(f"SUMMARY: {len(passed)} PASSED, {len(failed)} FAILED")
print("=" * 50)

if failed:
    sys.exit(1)
