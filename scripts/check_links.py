import os
import re

routes = [
  '/', '/products', '/calculator', '/compare', '/solutions', '/services',
  '/projects', '/about', '/contact', '/privacy-policy', '/terms',
  '/products/solar-hybrid-inverters',
  '/products/solar-online-ups',
  '/products/bess',
  '/products/batteries',
  '/products/power-conditioning',
  '/products/solar-hybrid-inverters/sunmagic-single-phase-solar-hybrid-inverter',
  '/products/solar-hybrid-inverters/sunmagic-three-phase-solar-hybrid-inverter',
  '/products/solar-hybrid-inverters/wall-mounted-hf-solar-hybrid-inverter',
  '/products/solar-online-ups/three-phase-solar-online-ups',
  '/products/solar-online-ups/single-phase-solar-online-ups',
  '/products/bess/enercube-commercial-battery-energy-storage-system',
  '/products/batteries/electra-lfp-lithium-iron-phosphate-battery-module',
  '/products/power-conditioning/industrial-servo-voltage-stabilizer',
  '/solutions/residential-solar-hybrid',
  '/solutions/commercial-industrial-power-solutions',
  '/solutions/critical-infrastructure-and-healthcare',
  '/solutions/remote-microgrids-and-agriculture',
  '/services/site-survey-and-engineering-design',
  '/services/turnkey-installation-and-commissioning',
  '/services/amc-and-preventive-maintenance',
  '/projects/chakan-automotive-manufacturing-plant',
  '/projects/hinjawadi-multispeciality-hospital',
  '/projects/lonavala-luxury-eco-villa',
  '/projects/baramati-agro-cold-chain-facility',
]

broken = []
for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.next' in root or '.git' in root:
        continue
    for f in files:
        if f.endswith('.tsx') or f.endswith('.ts'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as fl:
                content = fl.read()
                # Find static and template literal hrefs
                matches = re.findall(r'href=[{\`"\'\s]*`?(/[^?#\`"\'$ ]*)`?[\`"\'}\s]*', content)
                for m in matches:
                    if m.startswith('/_') or m.startswith('/images') or m.startswith('/api') or m.startswith('/sitemap') or m.startswith('/robots'):
                        continue
                    if m not in routes and not m.endswith('/'):
                        broken.append((path, m))

print(f"Total potentially broken static links: {len(broken)}")
for p, link in set(broken):
    print(f"  FILE: {p} -> LINK: {link}")
